const Note = require("../Model/notes.model");

const notesController = {
    test :(req,res)=>{
        res.status(200).json({message: "Notes controller is working!"});
    },
    create :async(req,res)=>{
        console.log(req.user)
         if(!req.body.title || !req.body.content) {
            return res.status(400).json({error: 'Title and content are required'});
        } 
        try {
            await Note.create({ ...req.body,  userID:req.user});
            res.status(201).json({message: 'Note created successfully'});

        } catch (error) {
            res.status(500).json({error: 'Internal server error'});
        }
    }
};

module.exports = notesController;
