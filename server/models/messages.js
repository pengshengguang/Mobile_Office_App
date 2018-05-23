var mongoose = require('mongoose')
var Schema = mongoose.Schema

var messageSchema = new Schema({
  'userName': String,
  'supplies': {
    'checkedCount': Number, // 已审批数
    'inApprovalCount': Number // 待审批数
  },
  'questionnaire': {
    'notDidCount': Number, // 未参与数
    'didCount': Number // 参与数
  }
})

module.exports = mongoose.model('Message', messageSchema)
