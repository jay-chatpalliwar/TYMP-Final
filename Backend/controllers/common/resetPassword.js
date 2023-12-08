const bcrypt = require('bcrypt');
const User = require('../../model/user');

exports.resetPassword = async(req,res)=>{
    try{
        
        const {currentpassword ,newpassword,confirmpassword} = req.body;

        if(!newpassword || !confirmpassword) 
        return res.status(400).json({
            success:false,
            message:'please provide required fields'
        })

        const email = req.body.email;
        const user = await User.findOne({email:email});  
        
        const status = await bcrypt.compare(currentpassword,user.password);
       if(!status)
       {  
         
          return res.status(400).json({
            success:false,
            message:'Wrong password'
          })
       }

        if(newpassword !== confirmpassword)
        return res.status(403).json({
            success:false,
            message:'both Passwords should match'
        })
        
        const hashedpassword = await bcrypt.hash(newpassword,10);

        
        user.password = hashedpassword;

        await user.save();

//        await mailSender('password updated successfull',`Dear ${user.name} password for you your account has been updated successfully. if it is not done by us please contact us at <a href="CampusConnect19@gmail.com">CampusConnect19@gmail.com</a>`)

        res.status(200).json({
            success:true,
            message:'password reset successfull'    
        })

    }
    catch(e)
    {  
       console.log(e);
        res.status(500).json({
            success:false,
            message:'Error in reseting password',
            error:e.message
        })
    }
}