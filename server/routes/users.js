var express = require('express')
var router = express.Router()

var User = require('./../models/user')
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource')
})

/* 相当与二级路由，user路径下的子路由 */
router.get('/test', function (req, res, next) {
  res.send('test')
})

/* 登陆 */
router.post('/login', (req, res, next) => { // next 就是往后留着，什么都不处理，接着往后走
  let params = {
    userName: req.body.userName,
    userPwd: req.body.userPwd
  }
  User.findOne(params, (err, userDoc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      if (userDoc) {
        // cookie是在服务器响应response的时候写，这样前端才能拿到cookie，cookie可以伪造
        res.cookie('userId', userDoc.userId, {
          path: '/', // 把cookie写入服务器的根路径下（放到域名里面去，而不是子域名）
          maxAge: 1000 * 60 * 60 // cookie周期
        })
        res.cookie('userName', userDoc.userName, {
          path: '/', // 把cookie写入服务器的根路径下（放到域名里面去，而不是子域名）
          maxAge: 1000 * 60 * 60 // cookie周期
        })
        // 把用户信息存到session里面去，注意，session是放在请求req里面去的。
        // req.session.user = userDoc
        res.json({
          status: '0',
          msg: '',
          result: {
            userName: userDoc.userName
          }
        })
      } else {
        res.json({
          status: '1',
          msg: '数据库没有该用户'
        })
      }
    }
  })
})

/* 登出 */
router.post('/logout', (req, res, next) => {
  res.cookie('userId', '', {
    path: '/',
    maxAge: -1 // 0 或者 -1都可以，让它失效
  })
  res.json({
    status: '0',
    msg: '',
    result: ''
  })
})

/* 查询当前用户购物车数据 */
router.get('/cartList', (req, res, next) => {
  let userId = req.cookies.userId
  User.findOne({userId: userId}, (err, userDoc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (userDoc) {
        res.json({
          status: '0',
          msg: '',
          result: userDoc.cartList
        })
      } else {
        res.json({
          status: '1',
          msg: '数据库无该用户',
          result: ''
        })
      }
    }
  })
})

/* 检查是否登陆 */
router.get('/checkLogin', (req, res, next) => {
  if (req.cookies.userId) {
    res.json({
      status: '0',
      msg: '',
      result: req.cookies.userName || '你还没起名字'
    })
  } else {
    res.json({
      status: '1',
      msg: '未登录',
      result: ''
    })
  }
})
module.exports = router
