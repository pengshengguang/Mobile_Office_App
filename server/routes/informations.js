var express = require('express')
var router = express.Router()
require('./../util/util')

var Information = require('./../models/informations')

router.get('/', function (req, res, next) {
  res.send('response with a resource')
})

/* 发布资讯 */
router.post('/publicInformation', (req, res, next) => {
  let information = req.body.userConfig
  // 资讯ID
  let platform = '622' // 系统平台，622代表当前系统架构的一个码
  let r1 = Math.floor(Math.random() * 10) // 随机数1
  let r2 = Math.floor(Math.random() * 10) // 随机数2
  let sysDate = new Date().Format('yyyyMMddhhmmss') // 系统时间
  let informationId = platform + r1 + sysDate + r2 // 订单ID为21位，这么复杂是为了让订单ID不重复，但也有重复的可能
  // 资讯Id组装
  information.informationId = informationId
  // 发布时间
  information.publishTime = new Date().Format('yyyy-MM-dd hh:mm:ss')
  // 新建对象
  let newInformation = new Information(information)
  newInformation.save((err, hhh) => {
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

/* 查询所有资讯 */
router.get('/getInformations', (req, res, next) => {
  Information.find({}, (err, informationsDoc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (Information) {
        res.json({
          status: '0',
          msg: '',
          result: informationsDoc
        })
      }
    }
  })
})

/* 评论资讯 */
router.post('/commitInformations', (req, res, next) => {
  let userName = req.cookies.userName
  let speech = req.body.speech // 评论内容
  let commitTime = new Date().Format('yyyy-MM-dd hh:mm:ss')
  let informationId = req.body.informationId
  let newSpeech = {
    userName: userName,
    speech: speech,
    commitTime: commitTime
  }
  Information.findOne({informationId: informationId}, (err, informationDoc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (Information) {
        informationDoc.commitList.push(newSpeech)
        informationDoc.save((err, hhh) => {
          if (err) {
            res.json({
              status: '1',
              msg: '接口异常',
              result: ''
            })
          } else {
            res.json({
              status: '0',
              msg: '评论成功',
              result: hhh
            })
          }
        })
      }
    }
  })
})

/* 删除资讯 */
router.post('/deleteInformations', (req, res, next) => {
  let informationId = req.body.informationId
  Information.remove({informationId: informationId}, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      res.json({
        status: '0',
        msg: '删除成功',
        result: doc
      })
    }
  })

})

module.exports = router
