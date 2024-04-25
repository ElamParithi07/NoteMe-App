const mongoose = require('mongoose')

const ExcelModel = mongoose.model('excelsheets', mongoose.Schema({
    createdBy: {type: mongoose.Schema.Types.ObjectId,required:true},    
    name: { type: String, required: true },
    sheetURL: { type: String, required: true },
    labels: [{ type: String, required: true }]
}, {
    timestamps: true // Enable automatic timestamps
}))

module.exports = ExcelModel;