import User from "./Models/User.js"
import bcrypt from 'bcrypt'
import connectDB from "./db/db.js"

const userRegister = async ()=>{
    connectDB()
    try
    {
        const hashPassowrd = await bcrypt.hash("admin",10)
        const newUser  = new User({
            name : "Admin",
            email : "admin@gmail.com",
            password : hashPassowrd,
            role : "admin"
        })
        await  newUser.save()
    }
    catch(err)
    {
        console.log(err)
    }
}
userRegister();