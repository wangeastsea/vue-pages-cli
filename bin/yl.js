#!/usr/bin/env node
const program = require('commander')
program.version(require('../package.json').version)
program
    .command('init <name>')
    .description('init project')
    .action(name => {
        require('../lib/init.js').init(name)
    })


program
    .command('refresh <name>')
    .description('refresh routers...')
    .action(name => {
        require('../lib/refresh')(name)
    })
program.parse(process.argv)