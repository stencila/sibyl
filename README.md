## Sibyl

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)
[![Build status](https://travis-ci.org/stencila/sibyl.svg?branch=master)](https://travis-ci.org/stencila/sibyl)
[![Code coverage](https://codecov.io/gh/stencila/sibyl/branch/master/graph/badge.svg)](https://codecov.io/gh/stencila/sibyl)
[![Community](https://img.shields.io/badge/join-community-green.svg)](https://community.stenci.la)
[![Chat](https://badges.gitter.im/stencila/stencila.svg)](https://gitter.im/stencila/stencila)

> *ˈsɪbɪl* _noun_
> 1. in ancient Greece a woman believed to be an oracle incapable of speaking mistruths
> 2. a tool for building and running containers for reproducible documents

Sibyl builds and runs execution environments for reproducible document bundles. A *bundle* is a collection of one or more files that contain the source of the document, supporting data and/or specifications of dependencies. Sibyl fetches a bundle, builds a container for it and opens the document.

Sibyl runs http://open.stenci.la. Documentation is at http://sibyl.surge.sh.

Feature                                       | Ready / Issue
:---------------------------------------------| :-----------:
**Schemes** for getting document bundles      |
[bitbucket://](docs/schemes/bitbucket.md)     |
[dat://](docs/schemes/dat.md)                 | ✓
[dropbox://](docs/schemes/dropbox.md)         | ✓
[file://](docs/schemes/file.md)               | ✓ (CLI only see [#6](https://github.com/stencila/sibyl/issues/6))
[github://](docs/schemes/github.md)           | ✓
[gitlab://](docs/schemes/gitlab.md)           |
[http://](docs/schemes/http.md)               | [#4](https://github.com/stencila/sibyl/issues/4)
**Languages** for running code cells          |
[Node.js](docs/langs/node.md)                 | ✓
[Python](docs/langs/python.md)                | ✓
[R](docs/langs/r.md)                          | ✓
**Images** for running languages              |
[alpha (α)](docs/images/alpha.md)             | ✓
[iota (ι)](docs/images/iota.md)               | ✓
[Customize](docs/images/customize-image.md)   | ✓
[Contribute](docs/images/contribute-image.md) | ✓
**Hooks** for triggering builds               |
Email                                         | [#51](https://github.com/stencila/sibyl/issues/51)
[Github](docs/hooks/github-hook.md)           | 
[Gitlab](docs/hooks/gitlab-hook.md)           | 
[Bitbucket](docs/hooks/bitbucket-hook.md)     | 


Installation and contribution guides are available in the [docs](http://sibyl.surge.sh) or directly from:

- [docs/install.md](docs/install.md)
- [docs/images/contribute-image.md](docs/images/contribute-image.md)
