let UserModel = require('../Models/UserModel');
const jwt = require('jsonwebtoken')
// const bcrypt = require('bcrypt')
require('dotenv').config()
const SECRET_KEY = process.env.SECRETKEY;

async function register(req,res){
    let { username, name, email, password } = req.body;
    try {
        const Hashpassword = await bcrypt.hash(password, 10);
        const user = new UserModel({ username, name, email, password: Hashpassword});
        await user.save();
        return res.status(200).json({ status: true, data: user });
    }
    catch (e) {
        console.log(e);
        return res.status(404).json({ status: false, message: e });
    }
}


async function login(req,res){
    let {email, password } = req.body;
    try {
        const user =await UserModel.findOne({email});
        if(user){
            const isValidPassword = await bcrypt.compare(password, user.password);
            if(!isValidPassword) return res.status(401).json({status:false, message: "Invalid Password"})
            const token = jwt.sign({userid: user._id, email: email},SECRET_KEY)
            // console.log(token)
            return res.status(200).json({ status: true, data: user, token: token });
        }
        else{
            return res.status(404).json({ status: false, message: "invalid user" });
        }
    }
    catch (e) {
        console.log(e);
        return res.status(404).json({ status: false, message: "Error" });
    }
}

module.exports = {register,login};