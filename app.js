const express = require("express");
const userRouter = require("./routes/users.route");
const postRouter = require("./routes/posts.route");
const roleRouter = require("./routes/roles.route");
const cors =require("cors")
const morgan=require("morgan")
require("dotenv").config()
require("./models/db")
const app = express();
const PORT =8000;
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))
console.log(process.env.SALT);

app.use("/api/v1/users",userRouter);
app.use("/api/v1/posts",postRouter)
app.use("/api/v1/roles",roleRouter)

app.listen(PORT,()=>{
    console.log(`our server run in port ${PORT}` );
    
})