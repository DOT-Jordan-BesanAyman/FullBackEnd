const express=require("express");
const { createRole, fetchingRole } = require("../controllers/roles.controller");
const roleRouter=express.Router();
roleRouter.post("/",createRole)
roleRouter.get("/",fetchingRole)
module.exports=roleRouter;