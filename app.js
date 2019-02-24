const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const createError = require('http-errors')
const favicon = require('serve-favicon')
const session = require('express-session')
const sessionDB = require('./config/sessiondb')
const passport = require('./config/passport')
const MongoStore = require('connect-mongo')(session)

const app = express()

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/user')
const deviceRouter = require('./routes/device')
const rentalRouter = require('./routes/rental')
const authRouter = require('./routes/auth')

app.locals.pretty = true

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser())
app.use(logger('dev'))
app.use(favicon(path.join(__dirname, 'public', 'source', 'images', 'favicon.ico')))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: new MongoStore ({ mongooseConnection: sessionDB })
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/', indexRouter)
app.use('/user', usersRouter)
app.use('/device', deviceRouter)
app.use('/rental', rentalRouter)
app.use('/auth', authRouter)

app.use(function (req, res, next) {
  next(createError(404))
})

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
