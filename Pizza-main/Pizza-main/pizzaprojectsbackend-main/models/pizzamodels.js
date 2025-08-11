// const mongoose = require("mongoose");

// const pizzaSchema = new mongoose.Schema({
//   name: String,
//   price: Number,
//   size: String,
// });

// module.exports = mongoose.model("Pizza", pizzaSchema);



const mongoose = require("mongoose");

 const pizzaSchema =  new mongoose.Schema({
     name: String,
     price:Number,
     size: String
 })



 module.exports = mongoose.model("Pizza", pizzaSchema);