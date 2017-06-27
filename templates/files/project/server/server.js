var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var statisDir = __dirname + "/../";

app.set('views', path.join('./server/', 'views'));
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(function (req, res, next) {
  console.log("Request : ", req.originalUrl);
  next();
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Page Not Found');
  err.status = 404;
  next(err);
});


module.exports = app;
var server = require('http').createServer(app);
server.listen(8000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Application Listening at http://%s:%s', host, port);
});



