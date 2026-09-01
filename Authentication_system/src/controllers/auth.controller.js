const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")

async function registerUser(req, res) {
   const {username, email, password}  = req.body

   const useralreadyExist = await userModel.findOne({
      email
   })

   if(useralreadyExist){
      res.status(409).json({
         "message":"Email alraedy exist"
      })
   }

   const user = await userModel.create({
    username, email, password
   })

   const token = jwt.sign({
    id:user._id
   }, process.env.JWT_SECRET)

   res.cookie("token", token)

   res.status(201).json({
    message:"User created successfully",
    user
   })
}

module.exports = {registerUser}