var express = require('express')
var router = express.Router()

var Classifiers = require('./../models/classifiers')
var Supplies = require('./../models/supplies')

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
  Supplies.find(queryParams, (err, suppliesListDoc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (suppliesListDoc) {
        res.json({
          status: '0',
          msg: '',
          result: suppliesListDoc
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

module.exports = router
