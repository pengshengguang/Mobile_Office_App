var express = require('express')
var router = express.Router()
require('./../util/util')

var User = require('./../models/user')
var Questionnaire = require('./../models/questionnaires')
var Message = require('./../models/messages')

router.get('/', function (req, res, next) {
  res.send('response with a resource')
})

/* 获取用户待参与问卷 */
router.get('/getNotInvolved', (req, res, next) => {
  let userName = req.cookies.userName
  // 获取分页参数
  let page = parseInt(req.param('page'))
  let pageSize = parseInt(req.param('pageSize'))
  let skip = (page - 1) * pageSize
  // let currentDate = new Date().Format('yyyy-MM-dd')
  // let params = {// 查询参数，&lte：意为小于。即问卷结束时间小于当前时间
  //   timeEnd: {
  //     $lte: currentDate
  //   }
  // }
  let questionnaireModel = Questionnaire.find({}).skip(skip).limit(pageSize)
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
  // 获取分页参数
  let page = parseInt(req.param('page'))
  let pageSize = parseInt(req.param('pageSize'))
  let skip = (page - 1) * pageSize
  let userModel = User.findOne(params).skip(skip).limit(pageSize)
  userModel.exec((err, userDoc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (userDoc) {
        if (userDoc.questionnaireList.length === 0) {
          res.json({
            status: '0',
            msg: '当前用户无参与的问卷',
            result: []
          })
          return
        }
        Questionnaire.find({}, (err1, questionnairesDoc) => { // 获取系统所有问卷
          if (err1) {
            res.json({
              status: '1',
              msg: err.message,
              result: ''
            })
          } else {
            if (questionnairesDoc) {
              for (let i = 0; i < userDoc.questionnaireList.length; i++) { // 循环用户问卷列表
                for (let j = 0; j < questionnairesDoc.length; j++) { // 循环系统所有问卷列表
                  if (userDoc.questionnaireList[i].questionnaireId === questionnairesDoc[j].questionnaireId) {
                    userDoc.questionnaireList[i].attendNum = questionnairesDoc[j].attendNum
                    break
                  }
                }
              }
            }
            let list = userDoc.questionnaireList
            res.json({
              status: '0',
              msg: '',
              result: list
            })
          }
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
  let userName = req.cookies.userName
  let params = {
    userName: userName
  }
  // 获取分页参数
  let page = parseInt(req.param('page'))
  let pageSize = parseInt(req.param('pageSize'))
  let skip = (page - 1) * pageSize
  // 分页查询
  let questionnaireModel = Questionnaire.find({}).skip(skip).limit(pageSize)
  questionnaireModel.sort({'timeEnd': -1}) // 按开始时间降序排序
  questionnaireModel.exec((err, questionnairesDoc) => { // 第一步：获取系统所有问卷
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (questionnairesDoc) {
        let sysQuestionnaireList = questionnairesDoc // 系统所有问卷
        User.findOne(params, (err1, userDoc) => { // 第二步：获取当前用户的所有问卷列表
          if (err) {
            res.json({
              status: '1',
              msg: err.message,
              result: ''
            })
          } else {
            if (userDoc) {
              let userQuestionnaireList = userDoc.questionnaireList // 当前用户所有参与问卷
              for (let i = 0; i < sysQuestionnaireList.length; i++) { // 第三步：循环系统问卷，如果当前用户参与该问卷，就把当前用户的选项答案赋值给对应的系统问卷
                if (sysQuestionnaireList[i].participants.indexOf(userName) !== -1) { // 如果用户参与了该问卷
                  for (let j = 0; j < userQuestionnaireList.length; j++) { // 循环用户问卷列表，找出该问卷，然后赋值答案
                    if (sysQuestionnaireList[i].questionnaireId === userQuestionnaireList[j].questionnaireId) {
                      sysQuestionnaireList[i] = getAnswer(sysQuestionnaireList[i], userQuestionnaireList[j])
                      break
                    }
                  }
                }
              }
              res.json({
                status: '0',
                msg: '',
                result: modifyType(sysQuestionnaireList)
              })
            } else {
              res.json({
                status: '1',
                msg: '系统不存在该用户',
                result: ''
              })
            }
          }
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

// 获取当前用户未参与+已参与的记录条数
router.get('/getTabState', (req, res, next) => {
  let userName = req.cookies.userName
  let queryParams = {
    userName: userName
  }
  Questionnaire.find({}, (err, questionnairesDoc) => { // 第一步，获取系统所有问卷
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      let oldNotDidCount = 0 // 初始化历史待参与/已参与条目数
      let oldDidCount = 0
      // 查询消息表，获取当前已读未读状态
      Message.findOne(queryParams, (err1, messageDoc) => {  // 第二步， 获取当前用户所有已读未读信息，赋值到历史待参与/已参与条目数
        if (err1) {
          res.json({
            status: '1',
            msg: err1.message,
            result: ''
          })
        } else {
          if (messageDoc == null) { // 如果messageDoc的长度为0，表示当前用户尚未拥有已读未读记录，需要新建已读未读记录 message
            let messageConfig = {
              userName: userName,
              questionnaire: {
                notDidCount: 0,
                didCount: 0
              }
            }
            var newMessage = new Message(messageConfig)
            newMessage.save((err2, newMessageDoc) => {
              if (err2) {
                res.json({
                  status: '1',
                  msg: 'message新建数据保存异常',
                  result: ''
                })
              } else {
                let notDidCount = 0 // 最新 待参与 记录数累加器
                let didCount = 0 // 最新 已参与 记录数累加器
                questionnairesDoc.forEach(questionnaire => {
                  if (questionnaire.participants.indexOf(userName) !== -1) { // 如果系统问卷中的参与人有当前用户，证明用户参与过该问卷
                    didCount += 1
                  } else {
                    notDidCount += 1
                  }
                })
                let noDidNoRead = false // 待参与未读？
                let didNoRead = false // 已参与未读？
                // 判断是否有未读
                if (notDidCount > oldNotDidCount) {
                  noDidNoRead = true
                }
                if (didCount > oldDidCount) {
                  didNoRead = true
                }
                // 封装数据返回给前端
                let tabState = {
                  noDidNoRead: noDidNoRead,
                  didNoRead: didNoRead,
                  notDidCount: notDidCount,
                  didCount: didCount
                }
                // 更新message中的questionnaire
                Message.findOne(queryParams, (err3, updateDoc) => { // 第三部，把最新的待参与/已参与条目数更新到Message表中
                  if (err3) {
                    res.json({
                      status: '1',
                      msg: err3.message,
                      result: '更新message中的questionnaire失败'
                    })
                  } else {
                    updateDoc.questionnaire.notDidCount = notDidCount
                    updateDoc.questionnaire.didCount = didCount
                    updateDoc.save((err4, newestDoc) => {
                      if (err) {
                        res.json({
                          status: '1',
                          msg: err4.messages,
                          result: '最终更新message中的supplies失败'
                        })
                      } else {
                        res.json({
                          status: '0',
                          msg: '',
                          result: tabState  // 第六步，值给前端
                        })
                      }
                    })
                  }
                })
              }
            })
          } else if (JSON.stringify(messageDoc.questionnaire) === '{}') { // 如果message.questionnaire为{}，证明该用户问卷已读未读信息不存在，就更新
            let questionnaire = {
              notDidCount: 0,
              didCount: 0
            }
            messageDoc.questionnaire = questionnaire
            messageDoc.save((err, updateMessageDoc) => {
              if (err) {
                res.json({
                  status: '1',
                  msg: err.message,
                  result: '更新message中的questionnaire失败'
                })
              } else {
                let notDidCount = 0 // 最新 待参与 记录数累加器
                let didCount = 0 // 最新 已参与 记录数累加器
                questionnairesDoc.forEach(questionnaire => {
                  if (questionnaire.participants.indexOf(userName) !== -1) { // 如果系统问卷中的参与人有当前用户，证明用户参与过该问卷
                    didCount += 1
                  } else {
                    notDidCount += 1
                  }
                })
                let noDidNoRead = false // 待参与未读？
                let didNoRead = false // 已参与未读？
                // 判断是否有未读
                if (notDidCount > oldNotDidCount) {
                  noDidNoRead = true
                }
                if (didCount > oldDidCount) {
                  didNoRead = true
                }
                // 封装数据返回给前端
                let tabState = {
                  noDidNoRead: noDidNoRead,
                  didNoRead: didNoRead,
                  notDidCount: notDidCount,
                  didCount: didCount
                }
                // 更新message中的questionnaire
                Message.findOne(queryParams, (err3, updateDoc) => { // 第三部，把最新的待参与/已参与条目数更新到Message表中
                  if (err3) {
                    res.json({
                      status: '1',
                      msg: err3.message,
                      result: '更新message中的questionnaire失败'
                    })
                  } else {
                    updateDoc.questionnaire.notDidCount = notDidCount
                    updateDoc.questionnaire.didCount = didCount
                    updateDoc.save((err4, newestDoc) => {
                      if (err) {
                        res.json({
                          status: '1',
                          msg: err4.messages,
                          result: '最终更新message中的supplies失败'
                        })
                      } else {
                        res.json({
                          status: '0',
                          msg: '',
                          result: tabState  // 第六步，值给前端
                        })
                      }
                    })
                  }
                })
              }
            })
          } else {
            oldNotDidCount = messageDoc.questionnaire.notDidCount // 获取历史未参与数
            oldDidCount = messageDoc.questionnaire.didCount // 获取历史已参与数
            let notDidCount = 0 // 最新 待参与 记录数累加器
            let didCount = 0 // 最新 已参与 记录数累加器
            questionnairesDoc.forEach(questionnaire => {
              if (questionnaire.participants.indexOf(userName) !== -1) { // 如果系统问卷中的参与人有当前用户，证明用户参与过该问卷
                didCount += 1
              } else {
                notDidCount += 1
              }
            })
            let noDidNoRead = false // 待参与未读？
            let didNoRead = false // 已参与未读？
            // 判断是否有未读
            if (notDidCount > oldNotDidCount) {
              noDidNoRead = true
            }
            if (didCount > oldDidCount) {
              didNoRead = true
            }
            // 封装数据返回给前端
            let tabState = {
              noDidNoRead: noDidNoRead,
              didNoRead: didNoRead,
              notDidCount: notDidCount,
              didCount: didCount
            }
            // 更新message中的questionnaire
            Message.findOne(queryParams, (err3, updateDoc) => { // 第三部，把最新的待参与/已参与条目数更新到Message表中
              if (err3) {
                res.json({
                  status: '1',
                  msg: err3.message,
                  result: '更新message中的questionnaire失败'
                })
              } else {
                updateDoc.questionnaire.notDidCount = notDidCount
                updateDoc.questionnaire.didCount = didCount
                updateDoc.save((err4, newestDoc) => {
                  if (err) {
                    res.json({
                      status: '1',
                      msg: err4.messages,
                      result: '最终更新message中的supplies失败'
                    })
                  } else {
                    res.json({
                      status: '0',
                      msg: '',
                      result: tabState  // 第六步，值给前端
                    })
                  }
                })
              }
            })
          }
        }
      })
    }
  })
})

// 获取用户已参与问卷的答案，赋值到总问卷中
function getAnswer (sysQuestionnaire, perQuestionnaire) {
  for (let i = 0; i < perQuestionnaire.list.length; i++) { // 循环当前用户问卷问题列表
    if (perQuestionnaire.list[i].isDid) { // 如果该问题有做
      if (perQuestionnaire.list[i].type === '3') { // 如果该题为简答题
        sysQuestionnaire.list[i].answer = perQuestionnaire.list[i].answer
      } else { // 该题为单选或多选题
        for (let j = 0; j < perQuestionnaire.list[i].options.length; j++) { // 循环选项
          if (perQuestionnaire.list[i].options[j].isSelected) { // 如果该选项是当前用户选中的
            sysQuestionnaire.list[i].options[j]._doc.isSelected = true // 就把系统问卷该题该选项选中标志变为true     !!!!!! 这里超厉害的，因为系统问卷表中没有isSelected这个字段，用_doc.xxxx，就可以新增字段了！！！！
          }
        }
      }
    }
  }
  return sysQuestionnaire
}

// 将总问卷的type改为4
function modifyType (questionnaireList) {
  for (let i = 0; i < questionnaireList.length; i++) {
    for (let j = 0; j < questionnaireList[i].list.length; j++) {
      if (questionnaireList[i].list[j]._doc.type !== '3') {  // 这里注意了，因为questionnaires的模型中没有type这个字段，所有你是找不到type的，但是通过_doc这一层，就能找到type的值！！！！（这里为什么不把type字段写在questionnaires.js模型里面呢？原因是模型里面的list[]这个字段里面的值，可能包含单选题（多选题）和简答题！！！，把type加上去，不知道为什么，系统就不能检查出list字段里面的值出来了！！！这个搞了很久啊！！！！！）
        questionnaireList[i].list[j]._doc.type = '4'
      }
    }
  }
  return questionnaireList
}

/* 提交问卷，且更新总问卷中的选中数量 */
router.post('/commitQuestionnaire', (req, res, next) => {
  let userName = req.cookies.userName
  let questionnaire = req.body.questionnaire
  let params = {
    userName: userName
  }
  User.findOne(params, (err, userDoc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (userDoc) { // 第一步，找出当前用户，把问卷加入到用户已参与问卷数组列表中 questionnaireList[]
        userDoc.questionnaireList.push(questionnaire)
        // 保存
        userDoc.save((err1, userDoc1) => {
          if (err1) {
            res.json({
              status: '1',
              msg: err1.message,
              result: ''
            })
          } else { // 第二步，保存问卷到个人问卷列表成功之后，查找问卷列表，更新答题数量
            let queryParams = {
              questionnaireId: questionnaire.questionnaireId
            }
            Questionnaire.findOne(queryParams, (err1, questionnairesDoc) => {
              if (err1) {
                res.json({
                  status: '1',
                  msg: err1.message,
                  result: ''
                })
              } else {
                if (questionnairesDoc) {
                  questionnairesDoc.attendNum += 1 // 当前问卷已参与人数+1
                  questionnairesDoc.participants.push(userName) // 将当前用户加入到问卷参与者列表中
                  for (let i = 0; i < questionnaire.list.length; i++) {  // 循环答题者问卷的所有问题
                    if (questionnaire.list[i].isDid && questionnaire.list[i].type !== '3') { // 该问题是否已做，并且不为简答题
                      for (let j = 0; j < questionnaire.list[i].options.length; j++) { // 循环该问题的所有选项
                        if (questionnaire.list[i].options[j].isSelected) {
                          questionnairesDoc.list[i].options[j].selectedNum += 1
                        }
                      }
                    }
                  }
                  questionnairesDoc.save((err2, questionnairesDoc2) => {
                    if (err1) {
                      res.json({
                        status: '1',
                        msg: err1.message,
                        result: ''
                      })
                    } else {
                      res.json({
                        status: '0',
                        msg: '问卷数据全部联动保存成功！',
                        result: ''
                      })
                    }
                  })
                } else {
                  res.json({
                    status: '1',
                    msg: '问卷不存在！',
                    result: ''
                  })
                }
              }
            })
          }
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

module.exports = router
