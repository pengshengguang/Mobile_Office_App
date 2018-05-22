var express = require('express')
var router = express.Router()
require('./../../src/services/util')

var User = require('./../models/user')
var Questionnaire = require('./../models/questionnaires')

router.get('/', function (req, res, next) {
  res.send('response with a resource')
})

/* 获取用户待参与问卷 */
router.get('/getNotInvolved', (req, res, next) => {
  let userName = req.cookies.userName
  // let currentDate = new Date().Format('yyyy-MM-dd')
  // let params = {// 查询参数，&lte：意为小于。即问卷结束时间小于当前时间
  //   timeEnd: {
  //     $lte: currentDate
  //   }
  // }
  let questionnaireModel = Questionnaire.find({})
  questionnaireModel.sort({'timeEnd': -1}) // 按开始时间降序排序
  questionnaireModel.exec((err, questionnaireDoc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (questionnaireDoc) {
        let questionnaireList = []
        questionnaireDoc.forEach(questionnaireItem => {
          if (questionnaireItem.participants.indexOf(userName) === -1) { // 当前用户没答过该问卷
            questionnaireList.push(questionnaireItem)
          }
        })
        res.json({
          status: '0',
          msg: '',
          result: questionnaireList
        })
      } else {
        res.json({
          status: '1',
          msg: err.message,
          result: '问卷为空！'
        })
      }
    }
  })
})

/* 获取用户已参与问卷 */
router.get('/getInvolved', (req, res, next) => {
  let userName = req.cookies.userName
  let params = {
    userName: userName
  }
  User.find(params, (err, userDoc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (userDoc.length !== 0) {
        let list = userDoc[0].questionnaireList
        res.json({
          status: '0',
          msg: '',
          result: list
        })
      } else {
        res.json({
          status: '1',
          msg: err.message,
          result: '无法从cookies中获取用户姓名！'
        })
      }
    }
  })
})

/* 获取所有问卷，即统计数据 */
router.get('/getAllQuestionnaires', (req, res, next) => {
  // let currentDate = new Date().Format('yyyy-MM-dd')
  // let params = {// 查询参数，&lte：意为小于。即问卷结束时间小于当前时间
  //   timeEnd: {
  //     $lte: currentDate
  //   }
  // }
  let questionnaireModel = Questionnaire.find({})
  questionnaireModel.sort({'timeEnd': -1}) // 按开始时间降序排序
  questionnaireModel.exec((err, questionnaireDoc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (questionnaireDoc) {
        let questionnaireList = questionnaireDoc
        res.json({
          status: '0',
          msg: '',
          result: questionnaireList
        })
      } else {
        res.json({
          status: '1',
          msg: err.message,
          result: '问卷为空！'
        })
      }
    }
  })
})

module.exports = router
