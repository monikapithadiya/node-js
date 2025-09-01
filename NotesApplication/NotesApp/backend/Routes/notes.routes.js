
const express = require('express');
const notesController = require('../Controller/notes.controller');

const checkisAuth = require('../middleware/auth');
const NotesRouter = express.Router();


NotesRouter.get('/test',notesController.test)
NotesRouter.get('/test',notesController.test);
NotesRouter.post('/create',checkisAuth,notesController.create)

module.exports = NotesRouter;