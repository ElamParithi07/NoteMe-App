const mongoose = require('mongoose')

const NotesModel = mongoose.model('notes', mongoose.Schema({
    createdBy: {type: mongoose.Schema.Types.ObjectId,required:true},    
    title: { type: String, required: true },
    content: { type: String, required: true },
    type: { type: String, required: true }
}, {
    timestamps: true // Enable automatic timestamps
}))

module.exports = NotesModel;