const mongoose =  require('mongoose');
const connectdb=async()=>{
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/Student-Record-Management-System",)
        console.log("Database connected successfully");
    }
    catch(error){
        console.error("Database connection failed:", error);
    }
}
module.exports=connectdb;