const mongoose =require("mongoose");
const bcrypt=require("bcrypt")
const userSchema =new mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    isDeleted:{ type :Boolean,default:false},
    posts:[{type:mongoose.Schema.Types.ObjectId,ref:"Post"}],
    role:{type:mongoose.Schema.Types.ObjectId,ref:"Role",required:true}
},({
    timestamps:true
}))
userSchema.pre("save",async function(next){
    this.password=await bcrypt.hash(this.password,9)
    
    
})
userSchema.post("find",function(next){
    console.log("check after method");
    
})

userSchema.statics.getInfo=function(email){
    return this.findOne({email})
}
userSchema.methods.getEmail=function(){
    return `this data for user with email ${this.email}`
}
userSchema.methods.comparePassword=async function(password){
    return bcrypt.compare(password,this.password)
}




module.exports=mongoose.model("User",userSchema);
