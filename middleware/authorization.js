const User = require("../models/User")

const authorization=(authorize)=>{
return async(req,res,next)=>{
    const userid=req.user.id
    const user =await User.findById(userid).populate("role")
    const permissions =user.role.permissions
    const check =permissions.includes(authorize)
    if(!check){
        return res.status(403).json({
            message:"No Authorization TO Accsess"
        })
    }
    next()
}
}
module.exports=authorization