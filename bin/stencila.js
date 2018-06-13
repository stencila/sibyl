#!/usr/bin/env node

const cli = require('caporal')

const packag = require('../package.json')
const convert = require('../src/convert')
const logger = require('../src/logger')
const setup = require('../src/setup')

cli
  .bin('stencila')
  .version(packag.version)
  .logger(logger)

  .command('convert', 'Convert files or folders to other formats')
  .argument('[from]', 'File/folder to convert from', null, '.')
  .argument('[to]', 'File/folder to convert to', null)
  .action(convert)

  .command('setup', 'Setup required software dependencies')
  .action(setup)

cli.parse(process.argv)
