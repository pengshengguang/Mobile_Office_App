var mongoose = require('mongoose')
var uploadScheam = new mongoose.Schema({
  'id': String,
  'url': String,
  'size': Number,
  'name': String,
  'isSelected': false,
  'newName': String
})

module.exports = mongoose.model('Upload', uploadScheam)
