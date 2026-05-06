const { getAllPost, createPost } = require("../controllers/posts.controller");

const express=require("express");
const postRouter=express.Router();
postRouter.get("/",getAllPost)
postRouter.post("/:id",createPost)
module.exports=postRouter