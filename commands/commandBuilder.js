var path = require('path')
var methods = require('../functions');
var vorpal = require('vorpal')();

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
    .delimiter('react-cli-$')
    .show();
}
