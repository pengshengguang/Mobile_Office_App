var express = require('express')
var path = require('path')
// var favicon = require('serve-favicon') // 服务的一个icon
var logger = require('morgan') // 日志文件，morgan就是对日志文件进行输出
var cookieParser = require('cookie-parser') // 一个插件，专门做cookie处理的
var bodyParser = require('body-parser') // 一个插件，对post请求进行json转换，获取我们post参数
var ejs = require('ejs')

var index = require('./routes/index')
var users = require('./routes/users')
var goods = require('./routes/goods')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.engine('.html', ejs.__express) // 设置引擎后缀，为.html
app.set('view engine', 'html') // 设置视图引擎为html

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(function (req, res, next) {
  if (req.cookies.userId) {
    next()
  } else {
    console.log('url:' + req.originalUrl)
    if (req.originalUrl === '/users/login' || req.originalUrl === '/users/logout' || req.originalUrl.indexOf('/goods/list') > -1) {
      next()
    } else {
      res.json({
        status: '10001',
        msg: '当前未登录',
        result: ''
      })
    }
  }
})

/* 相当于一级路由 */
app.use('/', index)
app.use('/users', users)
app.use('/goods', goods)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
