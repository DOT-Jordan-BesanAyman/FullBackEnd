const express= require("express");
const { getUsers, getUserByID, getUserByEmail, register, updateUser, userDelte, deleteUserSoft, login } = require("../controllers/users.controller");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const userRouter =express.Router();
userRouter.get("/",authentication,authorization("delete"),getUsers);
userRouter.get("/user",getUserByEmail)
userRouter.get("/user/:id",getUserByID)
userRouter.post("/",register)
userRouter.put("/:id",updateUser)
userRouter.delete("/:id",userDelte)
userRouter.delete("/delete/:id",deleteUserSoft)
userRouter.post("/login",login)
module.exports=userRouter;