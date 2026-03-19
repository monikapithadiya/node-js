const mongoose = require('mongoose');
const express = require('express');
const usercontroller = require('../Controllers/studentController');  // ✅ spelling fixed
const user = express.Router();

user.get("/get", usercontroller.getallstudents);
user.post("/add", usercontroller.addstudent);
user.put("/edit/:id", usercontroller.editstudent);
user.delete("/delete/:id", usercontroller.deletestudent);

module.exports = user;
