const express = require("express");
const userController = require("../Controller/user.controller");


const userRouter = express.Router();

userRouter.get("/test",userController.test)

userRouter.post("/register",userController.register)

userRouter.post("/signIn",userController.signIn)


module.exports = userRouter