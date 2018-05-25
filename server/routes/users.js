var express = require('express')
var router = express.Router()
require('./../util/util')

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
  res.cookie('userName', '', {
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
  let userName = req.cookies.userName
  User.findOne({userName: userName}, (err, userDoc) => {
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
  if (req.cookies.userName) {
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

/* 删除购物车 */
router.post('/delCart', (req, res, next) => {
  // 从缓存获取用户id
  let userName = req.cookies.userName
  // post请求使用body获取参数
  let productId = req.body.productId
  User.update({userName: userName}, {$pull: {'cartList': {'productId': productId}}}, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: '删除失败'
      })
    } else {
      res.json({
        status: '0',
        msg: '删除成功',
        result: ''
      })
    }
  })
})

/* 编辑购物车商品数量 */
router.post('/cartEdit', (req, res, next) => {
  let userName = req.cookies.userName
  let productId = req.body.productId
  let productNum = req.body.productNum
  let checked = req.body.checked
  let conditions = {
    'userName': userName,
    'cartList.productId': productId
  }
  let update = {
    'cartList.$.productNum': productNum,
    'cartList.$.checked': checked
  }
  User.update(conditions, update, (err) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: '商品编辑失败'
      })
    } else {
      res.json({
        status: '0',
        msg: '商品编辑成功',
        result: ''
      })
    }
  })
})

/* 全选与否 */
router.post('/editCheckAll', (req, res, next) => {
  let userName = req.cookies.userName
  let checkAll = req.body.checkAll ? '1' : '0'
  User.findOne({userName: userName}, (err, userDoc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: '该用户不存在'
      })
    } else {
      if (userDoc) {
        userDoc.cartList.forEach((item) => {
          item.checked = checkAll
        })
      }
      userDoc.save((err1, doc1) => {
        if (err1) {
          res.json({
            status: '1',
            msg: err1.message,
            result: ''
          })
        } else {
          let msg1 = ''
          if (checkAll === '1') {
            msg1 = '全选操作成功，数据库已更新'
          } else {
            msg1 = '全不选操作成功，数据库已更新'
          }
          res.json({
            status: '0',
            msg: msg1,
            result: doc1
          })
        }
      })
    }
  })
})

/* 查询用户地址 */
router.get('/addressList', (req, res, next) => {
  let userName = req.cookies.userName
  User.findOne({userName: userName}, (err, userDoc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: '查询用户地址失败'
      })
    } else {
      if (userDoc) {
        res.json({
          status: '0',
          msg: '',
          result: userDoc.addressList
        })
      }
    }
  })
})

/* 设置默认收货地址 */
router.post('/setDefault', (req, res, next) => {
  let userName = req.cookies.userName
  let addressId = req.body.addressId
  // 对addressId作一个判断,如果前端传过来的addressId为空，则报一下错误
  if (!addressId) {
    res.json({
      status: '1',
      msg: 'address is null',
      result: ''
    })
  }
  User.findOne({userName: userName}, (err, userDoc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (userDoc) {
        let addressList = userDoc.addressList
        addressList.forEach((item) => {
          item.isDefault = false
          if (item.addressId === addressId) {
            item.isDefault = true
          }
        })
      }
      userDoc.save((err, doc) => {
        if (err) {
          res.json({
            status: '1',
            msg: err.message,
            result: '设置默认地址失败'
          })
        } else {
          res.json({
            status: '0',
            msg: '',
            result: doc
          })
        }
      })
    }
  })
})

/* 添加收货地址 */
router.post('/addNewAddress', (req, res, next) => {
  let userName = req.cookies.userName
  let addressObj = req.body.addressObj
  let newAddress = {
    addressId: '',
    userName: addressObj.userName,
    streetName: addressObj.address + addressObj.details,
    postCode: addressObj.postCode,
    tel: addressObj.phone,
    isDefault: false
  }
  /* 生成地址随机数 */
  let platform = '622' // 系统平台，622代表当前系统架构的一个码
  let r1 = Math.floor(Math.random() * 10) // 随机数1
  let r2 = Math.floor(Math.random() * 10) // 随机数2
  let sysDate = new Date().Format('yyyyMMddhhmmss') // 系统时间
  let addressId = platform + r1 + sysDate + r2 // 订单ID为21位，这么复杂是为了让订单ID不重复，但也有重复的可能
  newAddress.addressId = addressId
  // 开始查询插入地址
  let conditions = { // 查询条件
    userName: userName
  }
  let update = { // 更新内容
    '$push': {
      addressList: newAddress
    }
  }
  User.update(conditions, update, (err, userDoc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      if (userDoc) {
        res.json({
          status: '0',
          msg: '',
          result: '地址保存成功'
        })
      }
    }
  })
})

/* 删除地址接口 */
router.post('/delAddress', (req, res, next) => {
  let userId = req.cookies.userId
  let addressId = req.body.addressId
  User.update({userId: userId}, {$pull: {'addressList': {'addressId': addressId}}}, (err, userDoc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,  // 这个错误是系统级别的错误，就是mongoose通过底层mongodb查询更新数据的时候，它能捕捉到这个错误，保存再message里面
        result: '地址删除失败'
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: userDoc
      })
    }
  })
})

/* 订单确认按钮功能 */
router.post('/payment', (req, res, next) => {
  let userName = req.cookies.userName
  let addressId = req.body.addressId
  let orderTotal = req.body.orderTotal
  User.findOne({userName: userName}, (err, userDoc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      let address = '' // 收货地址
      let goodsList = []// 订单商品集合
      // 获取当前用户的收获地址
      userDoc.addressList.forEach((item) => {
        if (addressId === item.addressId) {
          address = item
        }
      })
      // 获取当前用户的订单商品集合
      userDoc.cartList.forEach((item) => {
        if (item.checked === '1') {
          goodsList.push(item)
        }
      })
      // 订单ID的拼凑
      let platform = '622' // 系统平台，622代表当前系统架构的一个码
      let r1 = Math.floor(Math.random() * 10) // 随机数1
      let r2 = Math.floor(Math.random() * 10) // 随机数2
      let sysDate = new Date().Format('yyyyMMddhhmmss') // 系统时间
      let createDate = new Date().Format('yyyy-MM-dd hh:mm:ss')
      let orderId = platform + r1 + sysDate + r2 // 订单ID为21位，这么复杂是为了让订单ID不重复，但也有重复的可能
      // 整理订单信息
      let order = {
        orderId: orderId,
        orderTotal: orderTotal,
        addressInfo: address,
        goodsList: goodsList,
        orderState: '1',
        createData: createDate
      }
      // 把订单信息插入到数据库
      userDoc.orderList.push(order)
      userDoc.save((err1, doc1) => {
        if (err1) {
          res.json({
            status: '1',
            msg: err1.message,
            result: ''
          })
        } else {
          res.json({
            status: '0',
            msg: '订单成功插入数据库',
            result: {
              orderId: order.orderId,
              orderTotal: order.orderTotal
            }
          })
        }
      })
    }
  })
})

/* 获取订单详情 */
router.get('/orderDetail', (req, res, next) => {
  let userName = req.cookies.userName
  // let orderId = req.body.orderId
  let orderId = req.param('orderId')
  User.findOne({userName: userName}, (err, userDoc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      let orderList = userDoc.orderList
      if (orderList.length > 0) {
        let orderTotal = 0
        orderList.forEach((item) => {
          if (item.orderId === orderId) {
            orderTotal = item.orderTotal
          }
        })
        if (orderTotal > 0) {
          res.json({
            status: '0',
            msg: '',
            result: {
              orderId: orderId,
              orderTotal: orderTotal
            }
          })
        } else {
          res.json({
            status: '120001',
            msg: '通过查询出来的orderList，然后匹配orderId,发现无此订单',
            result: ''
          })
        }
      } else {
        res.json({
          status: '120001',
          msg: '当前用户未创建订单',
          result: ''
        })
      }
    }
  })
})

/* 获取购物车数量 */
router.get('/getCartCount', (req, res, next) => {
  if (req.cookies && req.cookies.userName) {
    let userName = req.cookies.userName
    User.findOne({userName: userName}, (err, userDoc) => {
      if (err) {
        res.json({
          status: '1',
          msg: err.message,
          result: ''
        })
      } else {
        if (userDoc) {                        // 这里为了配合userId没有的用户，特意这样修改
          let cartList = userDoc.cartList
          let cartCount = 0
          cartList.map(item => {
            cartCount += parseInt(item.productNum)
          })
          res.json({
            status: '0',
            msg: '',
            result: cartCount
          })
          return
        }
        res.json({
          status: '0',
          msg: '',
          result: 0
        })
      }
    })
  }
})

// 根据姓名查询用户
router.get('/findUserByName', (req, res, next) => {
  let userName = req.param('userName')
  User.findOne({userName: userName}, (err, userDoc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (!userDoc) {
        res.json({
          status: '0',
          msg: '用户不存在',
          result: false
        })
      } else {
        res.json({
          status: '0',
          msg: '用户存在',
          result: true
        })
      }
    }
  })
})

// 新增用户
router.post('/register', (req, res, next) => {
  let userConfig = req.body.userConfig
  var newUser = new User(userConfig)
  newUser.save((err, hhh) => {
    if (err) {
      res.json({
        status: '1',
        msg: '接口异常',
        result: ''
      })
    } else {
      res.json({
        status: '0',
        msg: '插入成功',
        result: hhh
      })
    }
  })
})

// 根据用户名成获取密保信息
router.get('/getQuestionByUserName', (req, res, next) => {
  let userName = req.param('userName')
  User.findOne({userName: userName}, (err, userDoc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (!userDoc) {
        res.json({
          status: '0',
          msg: '用户不存在',
          result: false
        })
      } else {
        User.findOne({'userName': userName}, (err, userDoc) => {
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
                msg: '密保获取成功',
                result: userDoc
              })
            } else {
              res.json({
                status: '1',
                msg: '该用户不存在',
                result: ''
              })
            }
          }
        })
      }
    }
  })
})

// 根据用户姓名修改密码
router.post('/modifyPwd', (req, res, next) => {
  let userName = req.body.userName
  let userPwd = req.body.userPwd
  let conditions = {
    'userName': userName
  }
  let update = {
    'userPwd': userPwd
  }
  User.update(conditions, update, (err, result) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: false
      })
    } else {
      res.json({
        status: '0',
        msg: '修改密码成功',
        result: true
      })
    }
  })
})

/* 获取用户信息 */
router.get('/getPersonalInfo', (req, res, next) => {
  let userName = req.cookies.userName
  let params = {
    userName: userName
  }
  User.findOne(params, (err, userDoc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      res.json({
        status: '0',
        msg: '获取用户信息成功',
        result: userDoc
      })
    }
  })
})

module.exports = router
