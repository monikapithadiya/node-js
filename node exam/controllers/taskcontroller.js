// controllers/taskController.js
import Task from "../models/task.js";
import User from "../models/user.js";

// ✅ Create a new task
export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = await Task.create({
      title,
      description,
      user: req.user.id, // user id from token
    });
    await User.findByIdAndUpdate(req.user.id, { $push: { tasks: task._id } });
    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error });
  }
};

// ✅ Get all tasks for the logged-in user
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).populate("user", "username role");
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};

// ✅ Update a task
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const task = await Task.findOneAndUpdate(
      { _id: id, user: req.user.id },
      { title, description },
      { new: true }
    );
    if (!task) return res.status(404).json({ message: "Task not found or not yours" });
    res.status(200).json({ message: "Task updated", task });
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
};

// ✅ Delete a task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOneAndDelete({ _id: id, user: req.user.id });
    if (!task) return res.status(404).json({ message: "Task not found or not yours" });
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
};
