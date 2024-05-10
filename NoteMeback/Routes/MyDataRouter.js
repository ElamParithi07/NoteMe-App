const express = require('express')
const MyDataRouter = express.Router()
const checkAuthToken = require('../middleware');

const {updateData} = require('../Services/MyDataService')

MyDataRouter.post('/updatedata',checkAuthToken,updateData)

module.exports = MyDataRouter