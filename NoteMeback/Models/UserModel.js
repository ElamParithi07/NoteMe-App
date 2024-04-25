const mongoose = require('mongoose')

const UserModel = mongoose.model('users',mongoose.Schema({
    username: {type:String, required: true},
    email:{type:String,required:true},
    name: {type: String, required:true},
    password: {type:String, required:true}
}))

module.exports = UserModel;