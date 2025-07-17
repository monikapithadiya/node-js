const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());


// read file
app.get("/readfile",(req,res)=>{
    fs.readFile("./files/data.txt","utf-8",(err,data)=>{
        if(err){
            res.status(500).send("Error reading file");
        }else{
            res.send(data);
        }
    })
})

app.get("/writefile",(req,res)=>{
    fs.writeFile("./files/data.txt","i am write file",(err,data)=>{
        if(err){
            res.status(500).send("Error reading file");
        }else{
            res.send(data);
        }
    })
})

app.get("/appendfile",(req,res)=>{
    fs.appendFile("./files/data.txt","i am append file",(err,data)=>{
        if(err){
            res.status(500).send("Error reading file");
        }else{
            res.send(data);
        }
    })
})





app.listen(1414,()=>{
    console.log("server is running in port 1414")
});
//http://localhost:1414