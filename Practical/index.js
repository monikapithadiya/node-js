const express = require("express")

const app = express();
const path = require("path")



app.get("/test",(req,res)=>{
    res.sendFile(path.join(__filename,'hello.html'))
    res.send("Test Routing run.....")
})

app.listen(8080,()=>{
    console.log("Server Running ");
})