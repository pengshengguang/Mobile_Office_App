var mongoose = require('mongoose')
var Schema = mongoose.Schema

var informationSchema = new Schema({
  'informationId': String,
  'publisher': String,
  'publishTime': String,
  'title': String,
  'content': String,
  'commitList': []
})

module.exports = mongoose.model('Information', informationSchema)
