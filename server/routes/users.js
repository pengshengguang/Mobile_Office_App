var express = require('express')
var router = express.Router()

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource')
})

/* 相当与二级路由，user路径下的子路由 */
router.get('/test', function (req, res, next) {
  res.send('test')
})

module.exports = router
