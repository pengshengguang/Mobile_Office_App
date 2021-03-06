var mongoose = require('mongoose')
var userSchema = new mongoose.Schema({
  'userId': String,
  'userName': String,
  'userPwd': String,
  'phone': String,
  'orderList': Array,
  'question': String,
  'answer': String,
  'avatar': String,
  'cartList': [
    {
      'productId': String,
      'productName': String,
      'salePrice': String,
      'productImage': String,
      'checked': String,
      'productNum': String
    }
  ],
  'addressList': [
    {
      'addressId': String,
      'userName': String,
      'streetName': String,
      'postCode': String,
      'tel': String,
      'isDefault': Boolean
    }
  ],
  'suppliesCart': [
    {
      describe: String,
      code: String,
      quantity: Number,
      smallClassCode: String,
      isSelected: Boolean
    }
  ],
  'questionnaireList': []
})

module.exports = mongoose.model('User', userSchema, 'users')
