var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
//var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');


import { registerSignalR, notifySiteUsers } from './signalrService'
import { initializeServices } from './mockservice/services/index'


// var http = require('http');
// Increase Max Sockets to a high number to allow multiple HTTP requests
// Otherwise, the default 5 is too low. Not needed in .11+
// http.globalAgent.maxSockets = 64;

var app = express();
var config = require('./conf/config.js');

var statisDir = __dirname + "/../";

// view engine setup
app.set('views', path.join('./server/', 'views'));
app.set('view engine', 'jade');

app.param(function (param, option) {
  return function (req, res, next, val) {
    if (val == option) {
      next();
    }
    else {
      res.sendStatus(403);
    }
  }
});

app.use(cors());
// app.use(favicon(path.join(statisDir, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// console.log("Static files from " + path.join(statisDir, 'dist'));
// app.use(express.static(path.join(statisDir, 'dist')));


registerSignalR(app);

app.use(function (req, res, next) {
  console.log("Request : ", req.originalUrl);
  next();
});


app.use('/Captcha', require('./routes/user'));
app.use('/api/notifications', require('./routes/queueManager'));
app.use('/api/role', require('./routes/role'));
app.use('/api/group', require('./routes/group'));
app.use('/api/user', require('./routes/user'));
app.use('/api/site', require('./routes/site'));
app.use('/api/gateway', require('./routes/gateway'));
app.use('/api/zone', require('./routes/zone'));
app.use('/api/device', require('./routes/device'));
app.use('/api/history', require('./routes/history'));
app.use('/api/report/', require('./routes/report'));
app.use('/api', require('./routes/api'));
app.use('/Tenant', require('./routes/tenant'));
app.use('/OnBoarding', require('./routes/onBoarding'));
app.use('/Global', require('./routes/global'));
app.use('/Device', require('./routes/device'));
app.use('/History', require('./routes/history'));
app.use('/old-api', require('./routes/index'));
app.use('/ReportGenerator', require('./routes/reportGenerator'));


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Page Not Found');
  err.status = 404;
  next(err);
});

app.use(config.error_handler);



module.exports = app;

var server = require('http').createServer(app);


server.listen(8000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('USP Application Listening at http://%s:%s', host, port);

  // Inititalizing services
  initializeServices();
});


// let x = 1;
// setInterval(function () { notifySiteUsers('Test1', "SampleNotification", "SITE MESSAGE : #" + x++) }, 6000);

