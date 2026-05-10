const bcrypt =require("bcrypt");
const jwt =require("jsonwebtoken")
const hashing=async(password)=>{
    return await bcrypt.hash(password,9)
}
const SECRET="secret"
const generate=()=>{
const payload={
    id:"1234321",
    role:"user"
}
return jwt.sign(payload,SECRET,{expiresIn:"1h"})
}
const run=async()=>{
    const password = await hashing("admin123")
    console.log(password);
    console.log(generate());
    const decode=jwt.verify(generate(),SECRET)
    console.log("decode",decode);
}
run()
