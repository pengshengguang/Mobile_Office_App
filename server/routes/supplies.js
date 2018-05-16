var express = require('express')
var router = express.Router()
require('./../../src/services/util')

var Classifiers = require('./../models/classifiers')
var Supplies = require('./../models/supplies')
var User = require('./../models/user')
var SuppliesOrder = require('./../models/suppliesOrder')

router.get('/', function (req, res, next) {
  res.send('response with a resource')
})

/* 获取一级目录 */
router.get('/getLargeClass', (req, res, next) => {
  Classifiers.find({}, (err, classifiersDoc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (classifiersDoc) {
        let largeClassList = []
        // 只获取一级目录
        classifiersDoc.forEach((item) => {
          let classObj = {
            largeClass: '',
            largeClassCode: ''
          }
          classObj.largeClass = item.largeClass
          classObj.largeClassCode = item.largeClassCode
          largeClassList.push(classObj)
        })
        res.json({
          status: '0',
          msg: '',
          result: largeClassList
        })
      }
    }
  })
})

/* 根据一级目录获取二级目录 */
router.get('/getSmallClass', (req, res, next) => {
  let largeClassCode = req.param('largeClassCode')
  if (!largeClassCode) {
    res.json({
      status: '1',
      msg: '一级目录值为空',
      result: ''
    })
  }
  let queryParams = {
    largeClassCode: largeClassCode
  }
  Classifiers.findOne(queryParams, (err, classifyDoc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (classifyDoc) {
        let smallClassList = []
        smallClassList = classifyDoc.smallClassList
        res.json({
          status: '0',
          msg: '',
          result: smallClassList
        })
      } else {
        res.json({
          status: '1',
          msg: '大类不存在',
          result: ''
        })
      }
    }
  })
})

/* 根据二级类别代码smallClassCode获取对于类别下的办公用品列表 */
router.get('/getSuppliesList', (req, res, next) => {
  // 获取二级类别代码
  let smallClassCode = req.param('smallClassCode')
  // 获取分页参数
  let page = parseInt(req.param('page'))
  let pageSize = parseInt(req.param('pageSize'))
  let skip = (page - 1) * pageSize
  if (!smallClassCode) {
    res.json({
      status: '1',
      msg: '二级类别代码为空',
      result: ''
    })
  }
  let queryParams = {
    smallClassCode: smallClassCode
  }
  let suppliesModel = Supplies.find(queryParams).skip(skip).limit(pageSize)
  suppliesModel.exec((err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (doc) {
        res.json({
          status: '0',
          msg: '',
          result: {
            count: doc.length,
            list: doc
          }
        })
      } else {
        res.json({
          status: '1',
          msg: '二级类别代码为：' + smallClassCode + '下的办公用品不存在',
          result: ''
        })
      }
    }
  })
})

/* 根据用户名获取办公用品购物车列表 */
router.get('/getSuppliesCart', (req, res, next) => {
  let queryParams = {
    userName: req.cookies.userName
  }
  User.findOne(queryParams, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (doc) {
        res.json({
          status: '0',
          msg: '',
          result: doc.suppliesCart
        })
      } else {
        res.json({
          status: '1',
          msg: '办公用品购物车为空',
          result: ''
        })
      }
    }
  })
})

/* 保存购物车 */
router.post('/saveSuppliesCart', (req, res, next) => {
  // 获取前端传过来的购物车suppliesCart
  let suppliesCart = req.body.suppliesCart
  // 获取当前用户
  let queryParams = {
    userName: req.cookies.userName
  }
  User.findOne(queryParams, (err, userDoc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (userDoc) {
        // 清空原来购物车
        userDoc.suppliesCart = []
        // 购物车赋值
        userDoc.suppliesCart = suppliesCart
        // 保存
        userDoc.save((err1, doc1) => {
          if (err1) {
            res.json({
              status: '1',
              msg: err1.message
            })
          } else {
            res.json({
              status: '0',
              msg: '',
              result: 'suc'
            })
          }
        })
      } else {
        res.json({
          status: '1',
          msg: '办公用品购物车为空',
          result: ''
        })
      }
    }
  })
})

/* 获取所有二级目录 */
router.get('/getAllSmallClass', (req, res, next) => {
  Classifiers.find({}, (err, classifiersDoc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (classifiersDoc) {
        let smallClassList = []
        classifiersDoc.forEach((item) => {
          smallClassList = smallClassList.concat(item.smallClassList)
        })
        res.json({
          status: '0',
          msg: '',
          result: smallClassList
        })
      }
    }
  })
})

/* 根据商品编号删除购物车商品 */
router.post('/removeSupplies', (req, res, next) => {
  let code = req.body.code
  let queryParams = {
    userName: req.cookies.userName
  }
  User.findOne(queryParams, (err, userDoc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (userDoc) {
        userDoc.suppliesCart.forEach((item, index) => {
          if (item.code === code) {
            userDoc.suppliesCart.splice(index, 1)
          }
        })
        // 保存
        userDoc.save((err1, doc1) => {
          if (err1) {
            res.json({
              status: '1',
              msg: err1.message
            })
          } else {
            res.json({
              status: '0',
              msg: '购物车商品编码为:' + code + '删除成功',
              result: 'suc'
            })
          }
        })
      } else {
        res.json({
          status: '1',
          msg: '办公用品购物车为空',
          result: ''
        })
      }
    }
  })
})

/* 创建用户申请订单 */
router.post('/suppliesApply', (req, res, next) => {
  let applicant = req.cookies.userName // 申请人名字
  let approver = 'admin' // 审批人名子
  let supplies = req.body.supplies // 购物车列表
  let orderNeeds = req.body.orderNeeds // 其他需求
  // 订单ID的拼凑
  let platform = '622' // 系统平台，622代表当前系统架构的一个码
  let r1 = Math.floor(Math.random() * 10) // 随机数1
  let r2 = Math.floor(Math.random() * 10) // 随机数2
  let sysDate = new Date().Format('yyyyMMddhhmmss') // 系统时间
  let startDate = new Date().Format('yyyy-MM-dd hh:mm:ss')
  let orderId = platform + r1 + sysDate + r2 // 订单ID为21位，这么复杂是为了让订单ID不重复，但也有重复的可能
  // 整理订单信息
  let order = {
    orderId: orderId,
    applicant: applicant,
    approver: approver,
    startTime: startDate,
    endTime: '', // 暂时为空
    feedback: '', // 暂时为空
    state: 0,
    orderNeeds: orderNeeds,
    supplies: supplies
  }
  // 把订单保存至suppliesOrder表中
  var newSuppliesOrder = new SuppliesOrder(order)
  newSuppliesOrder.save((err, hhh) => {
    if (err) {
      res.json({
        status: '1',
        msg: '接口异常',
        result: ''
      })
    } else {
      res.json({
        status: '0',
        msg: '订单插入成功',
        result: hhh
      })
    }
  })
})

module.exports = router
