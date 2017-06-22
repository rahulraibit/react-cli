#! /usr/bin/env node

var builder = require('./commandBuilder')
var vorpal = require('vorpal')();

builder.commandBuilder();
