var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var createError = require('http-errors');
var favicon = require('serve-favicon');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var app = express();

app.locals.pretty = true;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');
var deviceRouter = require('./routes/device');
var rentalRouter = require('./routes/rental');
var authRouter = require('./routes/auth');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'source', 'images', 'favicon.ico')));

app.use(session({
  secret: 'pr0ject-dub1in',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/device', deviceRouter);
app.use('/rental', rentalRouter);
app.use('/auth', authRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
