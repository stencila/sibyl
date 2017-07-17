#!/usr/bin/env node

var minimist = require('minimist')
var path = require('path')

var commands = [ 'fetch', 'check', 'compile', 'build', 'run', 'open' ]
var argv = minimist(process.argv.slice(2), {
  string: commands,
  alias: {
    help: 'h',
    version: 'v'
  }
})

var usage = `
  Usage:
    $ sibyl <command> [options]

  Commands:
    fetch      Fetch a bundle
    check      Check a bundle's content
    compile    Compile a bundle
    build      Build a bundle image
    run        Run a bundle container
    open       Open a bundle in browser

  Options:
    -h, --help              Print usage
    -v, --version           Print version

  Examples:
    sibyl fetch --help    Print usage for the "fetch" command
`

;(function main (argv) {
  var subcommand = argv._[0]
  if (argv.help && !subcommand) {
    console.log(usage)
  } else if (argv.version) {
    console.log(require('../package.json').version)
  } else if (commands.indexOf(subcommand) === -1) {
    console.log('Please provide a valid command from the list below.')
    console.log(usage)
  } else {
    var sub = require(path.join(__dirname, subcommand))
    sub(process.argv.slice(3))
  }
})(argv)
