const jwt =require("jsonwebtoken")
const authentication=(req,res,next)=>{
    const authHeader=req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({
            message:"incorrect login"
        })
    }
    try{
    const token=authHeader.split(" ")[1]
    console.log("Token ",token);
   const decode=jwt.verify(token,process.env.SECRET)
   req.user=decode;
   console.log("detaile of user send request ",req.user);
   
    next()}
    catch(err){
res.status(403).json({
    message:"expired token"
})
    }
    
}
module.exports=authentication;