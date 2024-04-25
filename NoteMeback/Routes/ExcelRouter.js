const express = require('express')
const ExcelRouter = express.Router()
const checkAuthToken = require('../middleware');

const {updateExcel,createExcel, getExcel} = require('../Services/ExcelService');
ExcelRouter.post('/updateexcel',checkAuthToken,updateExcel);
ExcelRouter.post('/createexcel',checkAuthToken,createExcel);
ExcelRouter.get('/getexcel',checkAuthToken,getExcel);

module.exports = ExcelRouter;