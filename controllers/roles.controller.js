const Role=require("../models/Role")
const createRole = async(req,res)=>{
    try{
        
     const {name,permissions}=req.body
     const role = await Role.create({
        name,
        permissions
     })
     res.status(201).json({
        message:"New Role Was Created Sucessfully",
        data : role
     })
    }
    catch(error){
        res.status(500).json({
            message:"INTERNAL SERVER ERROR"
        })
    }
}
const fetchingRole =async(req,res)=>{
    try{
        const role=await Role.find()
        res.status(201).json({
        message:"Role Was Fetching Sucessfully",
        data : role
     })
    }
    catch(error){
        res.status(500).json({
            message:"INTERNAL SERVER ERROR"
        })
    }
}
module.exports={
    createRole,
    fetchingRole
}