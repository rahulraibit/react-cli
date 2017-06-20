#! /usr/bin/env node

var fs = require("fs");
var utils = require('./utils');
var program = require('commander');
var co = require('co');
var prompt = require('co-prompt');
var chalk = require('chalk');
var ProgressBar = require('progress');

'use strict';
//  var bar = new ProgressBar(' uploading [:bar] :percent :etas', barOpts);
//  bar.tick(chunk.length);
//  (yield prompt('fileName: ')

program
  .version('0.0.1')
  .option('-f, --filename <filename>', 'filename')
  .action(function () {
    co(function* () {
      var fileName = utils.toTitleCase(program.filename || (yield prompt('fileName: ')));
      if (fileName) {
        utils.createFile(fileName, 'js');
        utils.createFile(fileName, 'js', 'Action');
        utils.createFile(fileName, 'js', 'Reducer');
        utils.generateTemplate('./containerTemplate', fileName, 'js', 'ClassName', fileName);
        utils.generateTemplate('./actionTemplate', fileName + 'Action', 'js');
        utils.generateTemplate('./reducerTemplate', fileName + 'Reducer', 'js', 'ClassName', fileName);
      } else {
        console.log(chalk.red('create-container filename'));
      }
    })
  })
  .parse(process.argv);