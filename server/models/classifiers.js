var mongoose = require('mongoose')
var Schema = mongoose.Schema

var classifierSchema = new Schema({
  'largeClass': String, // 一级目录名称
  'largeClassCode': String, // 一级目录代码
  'smallClassList': [{ // 二级目录数组
    'smallClass': String, // 二级目录名称
    'smallClassCode': String // 二级目录代码
  }]
})

module.exports = mongoose.model('classifier', classifierSchema)
