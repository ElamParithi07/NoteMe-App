const mongoose = require('mongoose')

const MyDataModel = mongoose.model('mydata', new mongoose.Schema({
    Owner:{type:mongoose.Schema.Types.ObjectId, ref:'UserModel', unique:true},
    email:{type:String, unique:true},
    NamewitInitial:{type:String, default:null},
    RollNo:{type:String, default:null},
    RegNo:{type:String, default:null},
    Department:{type:String, default:"Information Technology"},
    PersonalMail:{type:String, default:null},
    mobile:{type:String, default:null},
    Domain:{type:String, default:null},
    Gender:{type:String, default:null},
    ResumeLink:{type:String, default:null},
    NamewitInitial:{type:String, default:null},
    DOB:{type:String,default:null},
    TenthPercent:{type:String, default:null},
    TwelvethPercent:{type:String, default:null},
    CGPA:{type:String, default:null}
}))

module.exports = MyDataModel