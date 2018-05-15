var express = require('express')
var router = express.Router()

var Classifiers = require('./../models/classifiers')
var Supplies = require('./../models/supplies')
var User = require('./../models/user')

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

module.exports = router
