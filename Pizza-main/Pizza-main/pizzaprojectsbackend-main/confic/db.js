const mongoose = require("mongoose");

const connectToDB = ()=>{
       mongoose.connect("mongodb://127.0.0.1:27017/pizzas")
       console.log("data is connected");
}
module.exports = connectToDB;

