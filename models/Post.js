const mongoose=require("mongoose");
const postSchema=new mongoose.Schema({
    title:{type:String},
    description:{type:String},
    postBy:{type:mongoose.Schema.Types.ObjectId,ref:"User"}
})
module.exports= mongoose.model("Post",postSchema)