const express = require('express')
const checkAuthToken = require('../middleware');
const UserControl = express.Router();

const {register,login} = require('../Services/UserService');
UserControl.post('/register',register)
UserControl.post('/login',login)

module.exports = UserControl