var mongoose = require('mongoose')
var Schema = mongoose.Schema

var suppliesOrderSchema = new Schema({
  'orderId': String, // 订单编号
  'applicant': String, // 申请人名字
  'approver': String, // 审批人名字
  'startTime': String, // 申请时间
  'endTime': String, // 审批时间 / 撤回时间
  'feedback': String, // 审批语
  'state': Number, // 订单状态，0：审批中；1：已审批；2：已撤回
  'orderNeeds': String, // 其他需求
  'supplies': [
    {
      'count': Number,
      'smallClass': String,
      'suppliesList': [
        {
          'code': String,
          'describe': String,
          'isSelected': Boolean,
          'quantity': Number,
          'smallClassCode': String
        }
      ]
    }
  ]
})

module.exports = mongoose.model('SuppliesOrders', suppliesOrderSchema)
