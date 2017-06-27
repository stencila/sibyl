const cookie = require('cookie')
const jwt = require('jsonwebtoken')
const merry = require('merry')
const path = require('path')
const pump = require('pump')
const send = require('send')
const spawn = require('child_process').spawn
const url = require('url')

const sibylToStream = require('./sibyl-to-stream')
const errors = require('./errors')

const env = {
  PORT: 3000,            // Port for the server to listen on
  TOKEN_SECRET: String,  // JWT token secret should be set as an environment variable
  BETA_TOKEN: 'platypus' // Random client token, required during the beta
}

const app = merry({ env: env })

// Static content in `client` folder
app.route('GET', '/~client/*', function (req, res, ctx) {
  const source = send(req, path.join('client', req.url.subString(8)))
  pump(source, res, function (err) {
    if (err) errors.EPIPE(req, res, ctx, err)
  })
})

// Launch stream.
//
// Runs the `sibyl` Bash script and creates a server send event stream of it's
// output which is displayed by `client.js`.
// See https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events
app.route('GET', '/~launch/*', function (req, res, ctx) {
  res.setHeader('content-type', 'text/event-stream')

  // Prevent nginx from buffering the stream
  if (req.headers['x-nginx']) res.setHeader('X-Accel-Buffering', 'no')

  // NOTE: For beta only
  const uri = url.parse(req.url, true)
  const token = uri.query.token
  if (token !== ctx.env.BETA_TOKEN) {
    return errors.EBETATOKENINVALID(req, res, ctx)
  }

  // Launch `sibyl` Bash script and send output
  // and errors as SSE events until it exits
  const address = uri.pathname.substring(9)
  const mock = uri.query && uri.query.mock ? '--mock' : ''

  ctx.log.info('starting container for ' + address)
  const sibyl = spawn('./sibyl.sh', ['launch', address, mock])
  sibylToStream(sibyl, req, res, ctx)
})

// Container session
app.route([ 'GET', 'POST', 'PUT', 'DELETE' ], '/~session/*', proxyToSession)

// All other non-tilded paths get "rewritten" to
// container sessions
app.route([ 'POST', 'PUT', 'DELETE' ], '/*', rewriteToSession)
app.route('GET', '/*', function (req, res, ctx) {
  let session = req.headers.referer && req.headers.referer.match(/\/~session\/([^/]+)/)
  if (!session && (req.url === '/' || req.url.match(/^\/[a-z]+:\/\/.+/))) {
    const source = send(req, 'dist/index.html')
    pump(source, res, function (err) {
      if (err) errors.EPIPE(req, res, ctx, err)
    })
  } else {
    rewriteToSession(req, res, ctx)
  }
})

app.route('GET', '/bundle.js', function (req, res, ctx) {
  const source = send(req, 'dist/bundle.js')
  pump(source, res, function (err) {
    if (err) errors.EPIPE(req, res, ctx, err)
  })
})

app.route('GET', '/bundle.css', function (req, res, ctx) {
  const source = send(req, 'dist/bundle.css')
  pump(source, res, function (err) {
    if (err) errors.EPIPE(req, res, ctx, err)
  })
})

// Handle 404 routes
app.route('default', errors.EURLNOTFOUND)

// Start the app
app.listen()

// Proxy/redirect requests to a container session
function proxyToSession (req, res, ctx) {
  const match = req.url.match(/\/~session\/([^/]+)((\/)(.*))?/)
  const token = match[1]
  const slash = match[3]
  const path = match[4]

  // Redirect to trailing slash URL so that relative paths in session
  // requests work as expected
  if (!slash) {
    res.statusCode = 301
    res.setHeader('Location', `/~session/${token}/`)
    return res.end()
  }

  jwt.verify(token, ctx.env.TOKEN_SECRET, function (err, payload) {
    if (err) return errors.ESESSIONINVALID(req, res, ctx, err)

    const url = payload.url
    if (req.headers['x-nginx']) {
      // Proxy to session URL using Nginx
      res.statusCode = 200
      res.setHeader('X-Accel-Redirect', `/proxy-to-session/${req.method}/${url}/${path}`)
      // Set a cookie so that subsequent requests to absolute paths can
      // be rewritten to the session
      let cookies = cookie.parse(req.headers.cookie || '')
      if (!cookies.session) res.setHeader('Set-Cookie', cookie.serialize('session', token))
    } else {
      // Redirect to session URL
      res.statusCode = 308
      res.setHeader('Location', `${url}/${path}`)
    }

    res.end()
  })
}

// Rewrite the URL to point to the session obtained from the
// `Referer` header or from the `session` cookie
//
// Need to use a cookie because `Referer` is not always set or
// is set but not as a URL including the session token (e.g for fonts)
// Should we just use the cookie and forget about Referer?
//
// This allows us to deal with absolute paths in requests made from
// HTML & JavaScript hosted within the container. Although this seems
// a bit hacky, a previous approach required an equal amount of hackyness
// (and much URL ugliness) within the container hosted HTML/JS and servers.
function rewriteToSession (req, res, ctx) {
  let token
  let referer = req.headers.referer
  if (referer) {
    let match = referer.match(/\/~session\/([^/]+)/)
    if (match) token = match[1]
  }
  if (!token) {
    let cookies = cookie.parse(req.headers.cookie || '')
    if (cookies.session) token = cookies.session
  }
  if (token) {
    req.url = `/~session/${token}${req.url}`
    return proxyToSession(req, res, ctx)
  }
  errors.EURLNOTFOUND(req, res, ctx)
}
