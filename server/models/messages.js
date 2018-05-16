var mongoose = require('mongoose')
var Schema = mongoose.Schema

var messageSchema = new Schema({
  'userName': String,
  'supplies': {
    'checkedCount': Number, // 已审批数
    'inApprovalCount': Number // 待审批数
  },
  'questionnaire': {}
})

module.exports = mongoose.model('Message', messageSchema)
