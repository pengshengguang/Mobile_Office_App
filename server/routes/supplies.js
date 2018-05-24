var express = require('express')
var router = express.Router()
require('./../../src/services/util')

var Classifiers = require('./../models/classifiers')
var Supplies = require('./../models/supplies')
var User = require('./../models/user')
var SuppliesOrder = require('./../models/suppliesOrder')
var Message = require('./../models/messages')

router.get('/', function (req, res, next) {
  res.send('response with a resource')
})

/* 获取一级目录 */
router.get('/getLargeClass', (req, res, next) => {
  Classifiers.find({}, (err, classifiersDoc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (classifiersDoc) {
        let largeClassList = []
        // 只获取一级目录
        classifiersDoc.forEach((item) => {
          let classObj = {
            largeClass: '',
            largeClassCode: ''
          }
          classObj.largeClass = item.largeClass
          classObj.largeClassCode = item.largeClassCode
          largeClassList.push(classObj)
        })
        res.json({
          status: '0',
          msg: '',
          result: largeClassList
        })
      }
    }
  })
})

/* 根据一级目录获取二级目录 */
router.get('/getSmallClass', (req, res, next) => {
  let largeClassCode = req.param('largeClassCode')
  if (!largeClassCode) {
    res.json({
      status: '1',
      msg: '一级目录值为空',
      result: ''
    })
  }
  let queryParams = {
    largeClassCode: largeClassCode
  }
  Classifiers.findOne(queryParams, (err, classifyDoc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (classifyDoc) {
        let smallClassList = []
        smallClassList = classifyDoc.smallClassList
        res.json({
          status: '0',
          msg: '',
          result: smallClassList
        })
      } else {
        res.json({
          status: '1',
          msg: '大类不存在',
          result: ''
        })
      }
    }
  })
})

/* 根据二级类别代码smallClassCode获取对于类别下的办公用品列表 */
router.get('/getSuppliesList', (req, res, next) => {
  // 获取二级类别代码
  let smallClassCode = req.param('smallClassCode')
  // 获取分页参数
  let page = parseInt(req.param('page'))
  let pageSize = parseInt(req.param('pageSize'))
  let skip = (page - 1) * pageSize
  if (!smallClassCode) {
    res.json({
      status: '1',
      msg: '二级类别代码为空',
      result: ''
    })
  }
  let queryParams = {
    smallClassCode: smallClassCode
  }
  let suppliesModel = Supplies.find(queryParams).skip(skip).limit(pageSize)
  suppliesModel.exec((err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (doc) {
        res.json({
          status: '0',
          msg: '',
          result: {
            count: doc.length,
            list: doc
          }
        })
      } else {
        res.json({
          status: '1',
          msg: '二级类别代码为：' + smallClassCode + '下的办公用品不存在',
          result: ''
        })
      }
    }
  })
})

/* 根据用户名获取办公用品购物车列表 */
router.get('/getSuppliesCart', (req, res, next) => {
  let queryParams = {
    userName: req.cookies.userName
  }
  User.findOne(queryParams, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (doc) {
        res.json({
          status: '0',
          msg: '',
          result: doc.suppliesCart
        })
      } else {
        res.json({
          status: '1',
          msg: '办公用品购物车为空',
          result: ''
        })
      }
    }
  })
})

/* 保存购物车 */
router.post('/saveSuppliesCart', (req, res, next) => {
  // 获取前端传过来的购物车suppliesCart
  let suppliesCart = req.body.suppliesCart
  // 获取当前用户
  let queryParams = {
    userName: req.cookies.userName
  }
  User.findOne(queryParams, (err, userDoc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (userDoc) {
        // 清空原来购物车
        userDoc.suppliesCart = []
        // 购物车赋值
        userDoc.suppliesCart = suppliesCart
        // 保存
        userDoc.save((err1, doc1) => {
          if (err1) {
            res.json({
              status: '1',
              msg: err1.message
            })
          } else {
            res.json({
              status: '0',
              msg: '',
              result: 'suc'
            })
          }
        })
      } else {
        res.json({
          status: '1',
          msg: '办公用品购物车为空',
          result: ''
        })
      }
    }
  })
})

/* 获取所有二级目录 */
router.get('/getAllSmallClass', (req, res, next) => {
  Classifiers.find({}, (err, classifiersDoc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (classifiersDoc) {
        let smallClassList = []
        classifiersDoc.forEach((item) => {
          smallClassList = smallClassList.concat(item.smallClassList)
        })
        res.json({
          status: '0',
          msg: '',
          result: smallClassList
        })
      }
    }
  })
})

/* 根据商品编号删除购物车商品 */
router.post('/removeSupplies', (req, res, next) => {
  let code = req.body.code
  let queryParams = {
    userName: req.cookies.userName
  }
  User.findOne(queryParams, (err, userDoc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (userDoc) {
        userDoc.suppliesCart.forEach((item, index) => {
          if (item.code === code) {
            userDoc.suppliesCart.splice(index, 1)
          }
        })
        // 保存
        userDoc.save((err1, doc1) => {
          if (err1) {
            res.json({
              status: '1',
              msg: err1.message
            })
          } else {
            res.json({
              status: '0',
              msg: '购物车商品编码为:' + code + '删除成功',
              result: 'suc'
            })
          }
        })
      } else {
        res.json({
          status: '1',
          msg: '办公用品购物车为空',
          result: ''
        })
      }
    }
  })
})

/* 创建用户申请订单 */
router.post('/suppliesApply', (req, res, next) => {
  let applicant = req.cookies.userName // 申请人名字
  let approver = 'admin' // 审批人名子
  let supplies = req.body.supplies // 购物车列表
  let orderNeeds = req.body.orderNeeds // 其他需求
  // 订单ID的拼凑
  let platform = '622' // 系统平台，622代表当前系统架构的一个码
  let r1 = Math.floor(Math.random() * 10) // 随机数1
  let r2 = Math.floor(Math.random() * 10) // 随机数2
  let sysDate = new Date().Format('yyyyMMddhhmmss') // 系统时间
  let startDate = new Date().Format('yyyy-MM-dd hh:mm:ss')
  let orderId = platform + r1 + sysDate + r2 // 订单ID为21位，这么复杂是为了让订单ID不重复，但也有重复的可能
  // 整理订单信息
  let order = {
    orderId: orderId,
    applicant: applicant,
    approver: approver,
    startTime: startDate,
    endTime: '', // 暂时为空
    feedback: '', // 暂时为空
    state: 0,
    orderNeeds: orderNeeds,
    supplies: supplies
  }
  // 把订单保存至suppliesOrder表中
  var newSuppliesOrder = new SuppliesOrder(order)
  newSuppliesOrder.save((err, hhh) => {
    if (err) {
      res.json({
        status: '1',
        msg: '接口异常',
        result: ''
      })
    } else {
      // 订单生成成功，清理购物车
      User.findOne({userName: applicant}, (err, userDoc) => {
        if (err) {
          res.json({
            status: '1',
            msg: err.message,
            result: ''
          })
        } else {
          if (userDoc) {
            userDoc.suppliesCart = []
            userDoc.save((err1, haha) => {
              if (err1) {
                res.json({
                  status: '1',
                  msg: '用户购物车保存异常',
                  result: ''
                })
              } else {
                res.json({
                  status: '0',
                  msg: '用户订单成功生成，用户购物车清空成功',
                  result: ''
                })
              }
            })
          } else {
            res.json({
              status: '1',
              msg: '该用户不存在，无法清空购物车',
              result: ''
            })
          }
        }
      })
    }
  })
})

/* 根据 当前用户+订单标识 获取订单 (分页加载) */
router.get('/getOrderByState', (req, res, next) => {
  let userName = req.cookies.userName
  let page = parseInt(req.param('page'))
  let pageSize = parseInt(req.param('pageSize'))
  let skip = (page - 1) * pageSize
  let queryParams = {}
  if (userName === 'admin') {
    queryParams = {
      state: parseInt(req.param('state')) // 订单状态
    }
  } else {
    queryParams = {
      applicant: req.cookies.userName,
      state: parseInt(req.param('state')) // 订单状态
    }
  }
  let suppliesOrderModel = SuppliesOrder.find(queryParams).skip(skip).limit(pageSize)
  // mongodb提供的api
  suppliesOrderModel.sort({'startTime': -1}) // 降序排序
  suppliesOrderModel.exec((err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      res.json({
        status: '0',
        msg: '用户订单查询成功',
        result: {
          count: doc.length,
          list: doc
        }
      })
    }
  })
})

/* 获取当前用户已审批+审批中的记录条数 */
router.get('/getTabState', (req, res, next) => {
  let userName = req.cookies.userName
  let queryParams = {}
  if (userName !== 'admin') {
    queryParams.applicant = userName
  }
  SuppliesOrder.find(queryParams, (err, orderListDoc) => { // 第一步，获取当前用户所有的申请记录
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      let oldCheckedCount = 0
      let oldInApprovalCount = 0
      // 查询消息表，获取当前已读未读状态
      Message.findOne({userName: userName}, (err1, messageDoc) => {  // 第二步， 获取当前用户所有已读未读信息
        if (err1) {
          res.json({
            status: '1',
            msg: err1.message,
            result: ''
          })
        } else {
          if (messageDoc == null) {   // 如果messageDoc的长度为0，表示当前用户尚未拥有已读未读记录，需要新建已读未读记录 message
            let messageConfig = {
              userName: userName,
              supplies: {
                checkedCount: 0,
                inApprovalCount: 0
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
                let checkedCount = 0 // 已审批数                       // // 计算当前最新的记录
                let inApprovalCount = 0 // 待审批数/审批中数
                // todo:代码冗余
                orderListDoc.forEach(item => {                    // 第三步，统计不同状态的（审批中0、已审批1）已读未读记录总数
                  if (item.state === 0) {
                    inApprovalCount++
                  }
                  if (item.state === 1) {
                    checkedCount++
                  }
                })
                let checkedNoRead = false // 是否已审批中有未读
                let inApprovalNoRead = false // 是否待审批中有未读
                // 判断是否有未读
                if (checkedCount > oldCheckedCount) {    // 第四步， 通过新旧值对比，得出已读未读标识 (只有记录条数增，才能显示未读，因为撤回是待审批记录数减少！)
                  checkedNoRead = true
                }
                if (inApprovalCount > oldInApprovalCount) {
                  inApprovalNoRead = true
                }
                // 封装数据返回给前端
                let tabState = {
                  checkedNoRead: checkedNoRead,
                  inApprovalNoRead: inApprovalNoRead,
                  checkedCount: checkedCount,
                  inApprovalCount: inApprovalCount
                }    // 第五步，到这里，数据已经完全可以传递给前端，但是为了确保massage得到成功的更新，就需等message更新完后再传值给前端
                // 更新message中的supplies
                Message.find({userName: userName}, (err1, updateDoc) => {
                  if (err1) {
                    res.json({
                      status: '1',
                      msg: err1.message,
                      result: '更新message中的supplies失败'
                    })
                  } else {
                    updateDoc[0].supplies.checkedCount = checkedCount
                    updateDoc[0].supplies.inApprovalCount = inApprovalCount
                    updateDoc[0].save((err3, newestDoc) => {
                      if (err) {
                        res.json({
                          status: '1',
                          msg: err3.messages,
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
                // todo：end
              }
            })
          } else if (JSON.stringify(messageDoc.supplies) === '{}') {
            let supplies = {
              checkedCount: 0,
              inApprovalCount: 0
            }
            messageDoc.supplies = supplies
            messageDoc.save((err2, newMessageDoc) => {
              if (err2) {
                res.json({
                  status: '1',
                  msg: 'message新建数据保存异常',
                  result: ''
                })
              } else {
                let checkedCount = 0 // 已审批数                       // // 计算当前最新的记录
                let inApprovalCount = 0 // 待审批数/审批中数
                // todo:代码冗余
                orderListDoc.forEach(item => {                    // 第三步，统计不同状态的（审批中0、已审批1）已读未读记录总数
                  if (item.state === 0) {
                    inApprovalCount++
                  }
                  if (item.state === 1) {
                    checkedCount++
                  }
                })
                let checkedNoRead = false // 是否已审批中有未读
                let inApprovalNoRead = false // 是否待审批中有未读
                // 判断是否有未读
                if (checkedCount > oldCheckedCount) {    // 第四步， 通过新旧值对比，得出已读未读标识 (只有记录条数增，才能显示未读，因为撤回是待审批记录数减少！)
                  checkedNoRead = true
                }
                if (inApprovalCount > oldInApprovalCount) {
                  inApprovalNoRead = true
                }
                // 封装数据返回给前端
                let tabState = {
                  checkedNoRead: checkedNoRead,
                  inApprovalNoRead: inApprovalNoRead,
                  checkedCount: checkedCount,
                  inApprovalCount: inApprovalCount
                }    // 第五步，到这里，数据已经完全可以传递给前端，但是为了确保massage得到成功的更新，就需等message更新完后再传值给前端
                // 更新message中的supplies
                Message.find({userName: userName}, (err1, updateDoc) => {
                  if (err1) {
                    res.json({
                      status: '1',
                      msg: err1.message,
                      result: '更新message中的supplies失败'
                    })
                  } else {
                    updateDoc[0].supplies.checkedCount = checkedCount
                    updateDoc[0].supplies.inApprovalCount = inApprovalCount
                    updateDoc[0].save((err3, newestDoc) => {
                      if (err) {
                        res.json({
                          status: '1',
                          msg: err3.messages,
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
                // todo：end
              }
            })
          } else {
            oldCheckedCount = messageDoc.supplies.checkedCount   // 如果系统已经存在已读未读记录，则把已读未读记录赋值给old值
            oldInApprovalCount = messageDoc.supplies.inApprovalCount
            let checkedCount = 0 // 已审批数                       // // 计算当前最新的记录
            let inApprovalCount = 0 // 待审批数/审批中数
            orderListDoc.forEach(item => {                    // 第三步，统计不同状态的（审批中0、已审批1）已读未读记录总数
              if (item.state === 0) {
                inApprovalCount++
              }
              if (item.state === 1) {
                checkedCount++
              }
            })
            let checkedNoRead = false // 是否已审批中有未读
            let inApprovalNoRead = false // 是否待审批中有未读
            // 判断是否有未读
            if (checkedCount > oldCheckedCount) {    // 第四步， 通过新旧值对比，得出已读未读标识 (只有记录条数增，才能显示未读，因为撤回是待审批记录数减少！)
              checkedNoRead = true
            }
            if (inApprovalCount > oldInApprovalCount) {
              inApprovalNoRead = true
            }
            // 封装数据返回给前端
            let tabState = {
              checkedNoRead: checkedNoRead,
              inApprovalNoRead: inApprovalNoRead,
              checkedCount: checkedCount,
              inApprovalCount: inApprovalCount
            }    // 第五步，到这里，数据已经完全可以传递给前端，但是为了确保massage得到成功的更新，就需等message更新完后再传值给前端
            // 更新message中的supplies
            Message.find({userName: userName}, (err1, updateDoc) => {
              if (err1) {
                res.json({
                  status: '1',
                  msg: err1.message,
                  result: '更新message中的supplies失败'
                })
              } else {
                updateDoc[0].supplies.checkedCount = checkedCount
                updateDoc[0].supplies.inApprovalCount = inApprovalCount
                updateDoc[0].save((err3, newestDoc) => {
                  if (err) {
                    res.json({
                      status: '1',
                      msg: err3.messages,
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

/* 撤回申请操作 */
router.post('/cancelByOrderId', (req, res, next) => {
  let orderId = req.body.orderId
  let conditions = {
    orderId: orderId
  }
  let update = {
    'state': -1
  }
  SuppliesOrder.update(conditions, update, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      res.json({
        status: '0',
        msg: '订单状态已改为-1，已撤回',
        result: doc
      })
    }
  })
})

/* 审批操作 */
router.post('/approval', (req, res, next) => {
  let orderId = req.body.orderId
  let orderNeeds = req.body.orderNeeds
  let conditions = {
    orderId: orderId
  }
  let update = {
    'state': 1,
    'orderNeeds': orderNeeds,
    'endTime': new Date().Format('yyyy-MM-dd hh:mm:ss')
  }
  SuppliesOrder.update(conditions, update, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      res.json({
        status: '0',
        msg: '订单状态已修改成功，已审批',
        result: doc
      })
    }
  })
})

module.exports = router
