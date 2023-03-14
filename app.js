const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const editRouter = require('./routes/edit');
const usersRouter = require('./routes/users');
const pageConfigRouter = require('./routes/pageConfig');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/edit', editRouter);
app.use('/pageconfig', pageConfigRouter);
app.use('/users', usersRouter);



app.use('/test', function(req, res) {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello, world");
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log('### create 404 ###')
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
console.log('err here...');
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
