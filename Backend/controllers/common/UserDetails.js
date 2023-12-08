// const { useState } = require("react");
const User = require("../../model/user");

exports.UserDetails = async(req,res)=>{
   try{
 
     const email = req.body.email;
      const token = req.body.token;
      if(!email) return res.status(400).json({
      success:false,
      message:'Try to login again'
      })
      
      const user = await User.findOne({email:email})
      if(!user) return res.status(400).json({success:false, message:' No user found'});
      
      return res.status(200).json(
      {
       success:true,
       user:user
      })
      
   } 
   catch(e)
   {
    return res.status(500).json({
    success:false,
    message:'Error in getting user info'
    })
   }
}