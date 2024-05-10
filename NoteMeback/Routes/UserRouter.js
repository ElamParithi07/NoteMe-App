const express = require('express')
const checkAuthToken = require('../middleware');
const UserRouter = express.Router();

const {register, sendotp, verifyotp, checkvalidemail} = require('../Services/UserService');

UserRouter.post('/register',register)
UserRouter.post('/sendotp', sendotp)
UserRouter.post('/verifyotp', verifyotp)
UserRouter.post('/verifyemail', checkvalidemail)

module.exports = UserRouter