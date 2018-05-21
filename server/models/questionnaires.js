var mongoose = require('mongoose')
var Schema = mongoose.Schema

var questionnaireSchema = new Schema({
  'attendNum': Number, // 参加人数
  'participants': [], // 参与者名单
  'questionnaireId': String, // 问卷Id
  'questionnaireTitle': String, // 问卷题目
  'questionnaireDescribe': String, // 问卷描述
  'timeStart': String, // 开始时间
  'timeEnd': String, // 结束时间
  'list': [ // 问题列表
    // {
    //   'questionId': String, // 问卷Id
    //   'isDid': Boolean, // 是否已做
    //   'required': Boolean, // 是否为必选题
    //   'type': String, // 题目类型 1：单选题；2：多选题；3：简答题
    //   'title': String, // 题目
    //   'options': [ // 选项
    //     {
    //       'name': String, // 选项名称
    //       'selectedNum': Number, // 此选项选择的数量
    //       'optionId': String // 选项Id
    //       // 'isSelect': Boolean // 是否选中
    //     }
    //   ]
    // }
  ]
})
module.exports = mongoose.model('Questionnaire', questionnaireSchema)
