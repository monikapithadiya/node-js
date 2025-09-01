const jwt = require("jsonwebtoken")
require("dotenv").config();
function checkisAuth(req,res,next)
{
    const user = req.cookies.Access_TOKEN;
   if(!user)
   {
       return res.status(401).json({ message: "Unauthorized: No cookie found" });
   }
   const decoded = jwt.verify(user, process.env.JWT_SECRET);
   if(!decoded)
   {
       return res.status(401).json({ message: "Unauthorized: Invalid cookie" });
   }
   req.user = decoded;
   console.log("hello",req.user)

   next();
}
module.exports = checkisAuth