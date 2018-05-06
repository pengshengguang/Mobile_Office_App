var express = require('express')
var router = express.Router()

var fs = require('fs')
// 引入表单处理模块
var Formidable = require('formidable')

var Upload = require('./../models/uploads')

router.post('/', (req, res, next) => {
  let groupMark = req.query.mark
  let group = ''
  if (req.query.mark === 'new' || req.query.mark === 'all') {
    group = 'default' // 图片的分组标记
  } else {
    group = req.query.mark // 图片的分组标记
  }
  let form = new Formidable.IncomingForm()
  form.encoding = 'utf-8'
  form.uploadDir = '/workspace/webstorm_workspace/Mobile_Office_App/server/public/images'// 定义文件存放地址
  form.keepExtensions = true
  form.multiples = false // 以单文件依次上传的方式，实现多文件上传
  form.maxFieldsSize = 1 * 1024
  // 解析图片，重命名图片名称，返回给前端。
  let fileData = ''
  let fileDir = 'images' // 定义文件的存放路径
  let route = 'upload_' // 定义路由
  let serverIp = 'http://localhost:3000/' // 定义服务器IP
  let newPic = []
  function handleFile (file) {
    let filename = file.name
    let nameArray = filename.split('.')
    let type = nameArray[nameArray.length - 1]
    let name = ''
    for (let i = 0; i < nameArray.length - 1; i++) {
      name = name + nameArray[i]
    }
    let date = new Date()
    let time = '_' + date.getFullYear() + '_' + date.getMonth() + '_' + date.getDay() + '_' + date.getHours() + '_' + date.getMinutes() + '_' + date.getSeconds() + '_' + date.getMilliseconds()
    let picName = name + time + '.' + type
    let newPath = form.uploadDir + '/' + picName
    let oldPath = form.uploadDir + '/' + file.path.substring(file.path.indexOf(route))
    fs.renameSync(oldPath, newPath) // 重命名
    fileData = {
      id: `${new Date().getTime()}`,
      url: serverIp + newPath.substring(newPath.indexOf(fileDir)),
      name: file.name,
      size: file.size,
      isSelected: false,
      newName: picName
    }
    UploadData.findOne({group: group}, (err, doc) => {
      if (err) {
        res.json({
          result: false,
          msg: err.message
        })
      } else {
        if (doc) {
          doc.picList.push(fileData)
          doc.save((err, saveResult) => {
            if (err) {
              return res.json({
                result: false
              })
            } else {
              let length = doc.picList.length
              console.log(doc.picList.length)
              if (groupMark === 'all') {
                UploadData.find({}, (err, queryResult) => {
                  if (err) {
                    res.json({
                      result: false,
                      mgs: '发生错误了'
                    })
                  } else {
                    let allPic = []
                    queryResult.forEach((item) => {
                      if (item.group !== 'default') {
                        allPic = allPic.concat(item.picList)
                      }
                    })
                    res.json({
                      result: true,
                      data: allPic.concat(queryResult[1].picList)
                    })
                  }
                })
              } else if (groupMark === 'new') {
                UploadData.findOne({group: 'default'}, (err, queryResult) => {
                  if (err) {
                    return res.json({
                      result: false,
                      msg: err.message
                    })
                  } else {
                    console.log(queryResult.picList[queryResult.picList.length - 1])
                    return res.json({
                      result: true,
                      data: queryResult.picList[queryResult.picList.length-1]
                    })
                  }
                })
              } else {
                UploadData.findOne({group: group}, (err, queryResult) => {
                  if (err) {
                    return res.json({
                      result: false,
                      msg: err.message
                    })
                  } else {
                    return res.json({
                      result: true,
                      data: queryResult.picList
                    })
                  }
                })
              }
            }
          })
        }
      }
    })
  }
  form.parse(req, (err, fields, files) => {
    // 传多个文件
    if (files.file instanceof Array) {
      console.log('hhh')
    } else {
      // 传单个文件
      handleFile(files.file)
    }
  })
})
module.exports = router
