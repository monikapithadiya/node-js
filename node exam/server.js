import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import taskRoutes from "./Routes/taskRoutes.js";
import authRoutes from "./Routes/authRoutes.js"; 
import categoryRoutes from "./Routes/categoryRoutes.js";


dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

// ✅ Basic API to check if server is running
app.get("/", (req, res) => {
  res.json({ message: "Server running" });
});

app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);

mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/taskDB")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.listen(5000, () => console.log("Server running on port 5000"));
