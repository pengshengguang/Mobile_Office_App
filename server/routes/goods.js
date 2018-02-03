var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var Goods = require('../models/goods')
// 连接MongoDB数据库
mongoose.connect('mongodb://127.0.0.1:27017/db_demo')

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected success.')
})

mongoose.connection.on('error', () => {
  console.log('MongoDB connected fail.')
})

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB connected disconnected.')
})

// 查询商品列表数据
router.get('/', (req, res, next) => {
  let params = {} // 查询参数
  // 接受前端传来的参数 h
  let page = parseInt(req.param('page'))
  let pageSize = parseInt(req.param('pageSize'))
  let sort = req.param('sort')
  let skip = (page - 1) * pageSize
  // 过滤金额区间
  let priceLevel = req.param('priceLevel')
  let priceGt = 0 // 大于最小值
  let priceLte = 0 // 小于等于最大值
  if (priceLevel !== 'all') {
    switch (priceLevel) {
      case '0':
        priceGt = 0
        priceLte = 500
        break
      case '1':
        priceGt = 500
        priceLte = 1000
        break
      case '2':
        priceGt = 1000
        priceLte = 2000
        break
      default:
        priceGt = 0
        priceLte = 100
        break
    }
    params = {
      salePrice: {
        $gt: priceGt,
        $lte: priceLte
      }
    }
  }
  let goodsModel = Goods.find(params).skip(skip).limit(pageSize)
  // mongodb提供的api
  goodsModel.sort({'salePrice': sort})
  goodsModel.exec((err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: {
          count: doc.length,
          list: doc
        }
      })
    }
  })
})
// 加入购物车
router.post('/addCart', (req, res, next) => {
  let userId = '100000077'
  let productId = req.body.productId
  // 通过模型来执行数据库更新的aip
  let User = require('../models/user')

  // 根据userId获取当前用户信息
  User.findOne({userId: userId}, (err, userDoc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      if (userDoc) {
        let goodsItem = ''
        userDoc.cartList.forEach((item) => {
          if (item.productId === productId) {
            goodsItem = item
            item.productNum ++
          }
        })
        if (goodsItem) {
          userDoc.save((err2, doc2) => {
            if (err2) {
              res.json({
                status: '1',
                msg: err2.message
              })
            } else {
              res.json({
                status: '0',
                msg: '',
                result: 'suc',
                doc2: doc2
              })
            }
          })
        } else {
          Goods.findOne({productId: productId}, (err1, doc) => {
            if (err1) {
              res.json({
                status: '1',
                msg: err1.message
              })
            } else {
              if (doc) {
                doc._doc.productNum = 1
                doc._doc.checked = 1
                userDoc.cartList.push(doc)
                userDoc.save((err2, doc2) => {
                  if (err2) {
                    res.json({
                      status: '1',
                      msg: err2.message
                    })
                  } else {
                    res.json({
                      status: '0',
                      msg: '',
                      result: 'suc',
                      doc2: doc2
                    })
                  }
                })
              }
            }
          })
        }
      }
    }
  })
})

module.exports = router
