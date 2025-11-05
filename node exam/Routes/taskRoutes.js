import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
} from "../controllers/taskcontroller.js";

const router = express.Router();

// Protected routes
router.post("/", verifyToken, createTask);
router.get("/", verifyToken, getAllTasks);
router.put("/:id", verifyToken, updateTask);
router.delete("/:id", verifyToken, deleteTask);

export default router;
