var path = require('path')
var methods = require('../functions');
var vorpal = require('vorpal')();
var fs = require('fs-extra')

'use strict';

var exports = module.exports = {};

exports.commandBuilder = function () {

  vorpal
    .command('create [filetype]')
    .option('--file', 'file type', ['action', 'reducer', 'component', 'container'])
    .option('-f, --filename <filename>', 'required filename')
    .action(function (args, cb) {
      if (args.options.filename && args.options.file) {
        methods.common.create(args.options.filename, args.filetype);
      } else {
        console.log('Command is not correct, type --help for more information');
      }
    })
  vorpal
    .command('init')
    .action(function (args, cb) {
      fs.ensureDir(process.cwd() + '/react-sample')
        .then(() => {
          console.log('directory created!')
        })
        .catch(err => {
          console.error(err)
        })
      fs.copy(path.join(__dirname, './..', '/templates/files/project'), process.cwd() + '/react-sample')
        .then(() => {
          console.log('success!')
        })
        .catch(err => {
          console.error(err)
        })
    })

  vorpal
    .delimiter('react-cli-$')
    .show();
}
