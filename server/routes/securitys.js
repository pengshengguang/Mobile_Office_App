var express = require('express')
var router = express.Router()

var Security = require('./../models/security')

router.get('/', (req, res, next) => {
  res.send('securitys api success!')
})
// 加载密保问题
router.get('/getSecurity', (req, res, next) => {
  Security.find((err, securityDoc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (!securityDoc) {
        res.json({
          status: '0',
          msg: '密保题目为空',
          result: ''
        })
      } else {
        res.json({
          status: '0',
          msg: '',
          result: securityDoc
        })
      }
    }
  })
})

module.exports = router
