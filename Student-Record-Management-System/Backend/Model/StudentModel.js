const mongoose = require("mongoose");

const studentschema= new mongoose.Schema({
    name:{
        type : String,
        required: true
    },
    img:{
        type:String,
        required: true
    },
    email:{
        type: String,
        required: true,
    },
    phonenumber:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    }
})


const student = mongoose.model("Studentlistofmanagment", studentschema);
module.exports = student;

