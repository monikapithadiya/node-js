const express = require("express");
const connectToDB = require("./confic/db"); // fixed spelling from confic → config
const routers = require("./routes/pizzaroutes");
const cors = require("cors")


const app = express();
app.use(express.json()); 
app.use(cors())
app.use("/",routers);

app.listen(1919, async () => {
  try {
    await connectToDB();
    console.log("✅ Server is Running on http://localhost:1919");
  } catch (error) {
    console.error("❌ DB Connection Failed:", error);
  }
});
