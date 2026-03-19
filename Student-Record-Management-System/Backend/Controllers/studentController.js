const student = require("../Model/StudentModel");

const usercontoller = {
  // ✅ Get all students
  getallstudents: async (req, res) => {
    try {
      const alldata = await student.find(); 
      console.log("All students data fetched successfully");
      res.status(200).json(alldata);
    } catch (error) {
      console.error("Error fetching students data:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  // ✅ Add student
  addstudent: async (req, res) => {
    const { name, img, email, phonenumber, address } = req.body;
    try {
      const createdStudent = await student.create({
        name,
        img,
        email,
        phonenumber,
        address,
      });
      res.status(201).json(createdStudent);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // ✅ Edit student
  editstudent: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, img, email, phonenumber, address } = req.body;
      const updatedStudent = await student.findByIdAndUpdate(
        id,
        { name, img, email, phonenumber, address },
        { new: true }
      );
      console.log("Student updated successfully");
      res.status(200).json(updatedStudent);
    } catch (error) {
      console.error("Error updating student:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  // ✅ Delete student
  deletestudent: async (req, res) => {
    try {
      const { id } = req.params;
      await student.findByIdAndDelete(id);
      console.log("Student deleted successfully");
      res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
      console.error("Error deleting student:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

module.exports = usercontoller;
