const mongoose = require('mongoose')

const UserModel = mongoose.model('users',mongoose.Schema({
    email:{type:String,required:true, unique:true},
    name: {type: String, required:true},
    password: {type:String, required:true},
    mydata:{type:mongoose.Schema.Types.ObjectId, ref:'MyDataModel',default:null},
    mysheets:[
        {type:mongoose.Schema.Types.ObjectId, ref:'ExcelModel'}
    ]
},{
    timestamps:true 
}))

module.exports = UserModel;