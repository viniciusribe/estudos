var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./app/routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

app.use(function(req, res, next) {
  // 60s x 60m x 24h 
  // 3600 cache de 1 hora
  // 600 cache de 10 minutos
  res.setHeader('Cache-Control', 'max-age=30, public'); //Cache funciona para todas as instancias CDN e Browser
  // res.setHeader('Cache-Control', 'max-age=30, private'); //Cache funciona somente para instancias CDN
  // res.setHeader('Cache-Control', 'max-age=30, no-cache'); //Não coloca cache no navegador, porem pode trazer da CDN, opção default
  // res.setHeader('Cache-Control', 'max-age=30, no-store'); //Não armazena cache no computador ou CDN
  res.header('Vary', 'X-Device');
  next();
});

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
