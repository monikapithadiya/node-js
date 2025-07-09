const http=require("http");
let server=http.createServer((req,res)=>{

    res.end("hello world");

})


server.listen(4000,()=>{
    console.log("Server is running on port 4000");
})
// http://localhost:4000