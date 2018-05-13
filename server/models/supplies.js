var mongoose = require('mongoose')
var Schema = mongoose.Schema

var suppliesSchema = new Schema({
  'describe': String, // 办公用品描述
  'smallClassCode': String, // 二级目录
  'code': String // 编号
})

module.exports = mongoose.model('Supplies', suppliesSchema)
