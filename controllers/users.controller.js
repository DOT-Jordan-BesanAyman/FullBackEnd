const User = require("../models/User");
const Role=require("../models/Role")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
//--------------------------------------------
const getUsers = async(req,res)=>{
    console.log(req.user.id);
    
 try{
   const users = await User.find()
   res.status(200).json({
    message:"users data fetching sucessfully",
    data :users
 })
 }
 catch(error){
   res.status(500).json({
    message:"INTERNAL SERVER ERROR"
   })
 }

}
//--------------------------------------------
const getUserByID =async(req,res)=>{
 try{
    console.log("check!!!!!!1");
    
    const {id}=req.params
    if(!id){
        return res.status(400).json({
            message:" user id is required "
        })
    }
    const user = await User.findById(id)
    if(!user){
        return res.status(404).json({
            message:"no user have this id"
        })
    }
    res.status(200).json({
        message:"the user fetching sucessfully",
        data:user
    })
 }
 catch(error){
   res.status(500).json({
     message:"INTERNAL SERVER ERROR"
   })
 }
}
//--------------------------------------------
const getUserByEmail =async(req,res)=>{
    try{
        const {email} = req.query;
        const user =await User.findOne({email})
        if(!user){
        return res.status(404).json({
            message:"no user have this email"
        })
    }
    res.status(200).json({
        message:"the user fetching sucessfully",
        data:user
    })
        
    }
    catch(error){
   res.status(500).json({
     message:"INTERNAL SERVER ERROR"
   })
 }
}
//--------------------------------------------
const register=async(req,res)=>{
    try{
     const {firstName,lastName,email,password}=req.body;
     if(!firstName || !lastName || !email || !password){
        return res.status(400).json({
            message:"Missing Data !!! "
        })
     }
     const emailExist=await User.findOne({email})
     if(emailExist){
        return res.status(409).json({
            message:"User already have account"
        })
     }
    //  const hashPassword=await bcrypt.hash(password,9)
     const role=await Role.findOne({name:"user"})
     const user=await User.create({
        firstName,
        lastName,
        email,
        password,
        role:role._id
     })
     res.status(201).json({
        message:"new uswe was created",
        data:user
     })
    }
    catch(error){
        console.log(error);
        
        res.status(500).json({
     message:"INTERNAL SERVER ERROR"
   })
    }
}
const login=async(req,res)=>{
    try{
        const{email,password}=req.body
        const user =await User.findOne({email}).populate("role")
        if(!user){
            return res.staus(404).json({
        message:"user was not found"        
            })
        }
        // const isMatch=await bcrypt.compare(password,user.password);
        const isMatch=user.comparePassword(password)
        if(!isMatch){
            return res.status(404).json({
                message:"incorrect password"
            })
        }
        const payload={
            id:user._id,
            role:user.role.name
        }
        const generate=jwt.sign(payload,process.env.SECRET,{expiresIn:"1d"})
        res.status(200).json({
            message:"login done",
            data:"user",
            token:generate
        })
    }
     catch(error){
        res.status(500).json({
     message:"INTERNAL SERVER ERROR"
   })
    }
}
// const register = async(req,res)=>{
//     try{
//         console.log("check!!!!!!!!");
        
//         const{firstName,lastName,email,password}=req.body
//         if(!firstName || !lastName || !email || !password){
//             return res.status(400).json({
//                 message:"Missing Data !!!"
//             })
//         }
//         console.log("user dats",firstName,lastName);
        
//         // const userExist= await User.findOne({email})
//         const userExist=await User.getInfo(email)
//         console.log(userExist.getEmail());
        
//         if(userExist){
//             return res.status(409).json({
//                 message:"User already have account"
//             })
//         }

//         const newUser =await User.create({firstName,
//             lastName,
//             email,
//             password})
//         res.status(201).json({
//         message:"the new user was register sucessfully",
//         data:newUser
//     })
//     }
//      catch(error){
//    res.status(500).json({
//      message:"INTERNAL SERVER ERROR"
//    })
//  }
// }
//--------------------------------------------
const updateUser = async(req,res)=>{
    try{
        const {id}=req.params
        const {firstName,lastName,email}=req.body
        if(!id){
            return res.status(400).json({
                message :"user id is required"
            })
        }
        const user= await User.findByIdAndUpdate(id,{firstName,lastName,email},{new:true})
         if(!user){
            return res.status(404).json({
                message:"no user have this id"
            })
         }     
         res.status(200).json({
            message:"user data was updated sucessfully",
            data :user
         })
    }

     catch(error){
   res.status(500).json({
     message:"INTERNAL SERVER ERROR"
   })
 
}}
//--------------------------------------------
const userDelte =async(req,res)=>{
    try{
        const{id}=req.params
        if(!id){
            return res.status(400).json({
                message :"user id is required"
            })
        }
        await User.findByIdAndDelete(id)
        res.status(200).json({
            message:"user was deleted "
        })

    }
      catch(error){
   res.status(500).json({
     message:"INTERNAL SERVER ERROR"
   })}
}
const deleteUserSoft=async(req,res)=>{
    try{
        const{id}=req.params
        if(!id){
            return res.status(400).json({
                message :"user id is required"
            })
        }
        const user= await User.findByIdAndUpdate(id,{isDeleted:true})
        res.status(200).json({
            message:"user was deleted "
        })

    }
     catch(error){
   res.status(500).json({
     message:"INTERNAL SERVER ERROR"
   })}
}
module.exports ={
    getUsers,
    getUserByEmail,
    getUserByID,
    register,
    updateUser,
    userDelte,
    deleteUserSoft,
    login
}