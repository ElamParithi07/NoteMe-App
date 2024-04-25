// Middleware function to check authorization token
const jwt = require('jsonwebtoken')
const UserModel = require('./Models/UserModel');
const { isValidObjectId } = require('mongoose');
require('dotenv').config()
const SECRET_KEY = process.env.SECRETKEY;
const checkAuthToken = async(req, res, next) => {
    let token = req.headers.authorization;
    if(!token){
        return res.status(401).json("Token not provided");
    }
    token = token.replace("Bearer ", "");
    
    try{
        const decoded = jwt.verify(token,SECRET_KEY)
        req.user= decoded
        const isValid = await UserModel.findOne({_id : decoded.userid})
        if(!isValid) return res.status(401).json("user not found");
        req.locals = {
            userid: decoded.userid
        };
        next(); // Pass control to the next middleware or route handler
    }
    catch(e){
        return res.status(403).json("Invalid Token");
    }
};

module.exports =  checkAuthToken;