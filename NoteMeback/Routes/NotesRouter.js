const express = require('express')
const checkAuthToken = require('../middleware');
const NotesRouter = express.Router()

const {create,update,getNotes,deletNotes} = require('../Services/NoteService')
NotesRouter.post('/create',checkAuthToken,create);
NotesRouter.post('/update',checkAuthToken,update);
NotesRouter.get('/getNotes',checkAuthToken,getNotes);
NotesRouter.delete('/deleteNotes',checkAuthToken,deletNotes);

module.exports = NotesRouter;
