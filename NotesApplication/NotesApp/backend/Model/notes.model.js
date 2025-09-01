const mongoose = require('mongoose');
const noteSchema = new mongoose.Schema({
    title: {    
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    notesImage: {
        type: String,
        default:"https://img.freepik.com/premium-vector/notes-icon-logo-vector-design-template_827767-4987.jpg"
    },
    userID :{
        type: String,
        required: true
    }

}, { 
    timestamps: true ,
    versionKey: false


});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;