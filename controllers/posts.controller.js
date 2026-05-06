const Post=require("../models/Post")
const User = require("../models/User")
const getAllPost= async(req,res)=>{
    try{
const posts=await Post.find().populate("postBy")
res.status(200).json({
    message:"post fetching sucessfully",
    data:posts
})
    }
    catch(err){
        res.status(500).json({
            message:"server error"
        })

    }
}
const createPost =async(req,res)=>{
    try{
        const {id}=req.params
        const{title,description}=req.body
        if(!id){
            return res.status(400).json({
                message:"id is required"
            })
        }
        if(!title ||!description){
            return res.status(400).json({
                message:"missing data !!!"
            })
        }
        const userExist=await User.find()
        if(!userExist){
            return res.status(404).json({
                message:"user was not found"
            })
        }
        const newPost =await Post.create({
            title,
            description,
            postBy:id
        })
        res.status(201).json({
            message:"post created sucessfully",
            data:newPost
        })
    }
    catch(err){
        res.status(500).json({
            message:"server error"
        })

    }
}
module.exports={
getAllPost,createPost
}