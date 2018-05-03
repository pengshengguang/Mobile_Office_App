var mongoose = require('mongoose')
var securitySchema = new mongoose.Schema({
  'title': String
})

// 为什么models中的user导出的时候（最后一个代码），第三个参数可有可无，而这里的第三个参数就一定要有？
module.exports = mongoose.model('Security', securitySchema, 'securitys')
