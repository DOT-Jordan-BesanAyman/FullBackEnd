const mongoose=require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/PROJECT").then(()=>{
    console.log("Data Base is Connected");
}).catch(()=>{
    console.log("Faild Connection");
    
})