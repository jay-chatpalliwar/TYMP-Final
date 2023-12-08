const User = require("../../model/user");


exports.deleteprofile = async(req,res)=>{
    try{
        //auth route will be in between
        const email = req.body.email;
        const token =req.body.token;
        const profile = await User.findOneAndDelete({ email: email });
        
         res.status(200).json({
            success:true,
            message:'Profile deleted successfully',
    
        })

    }
    catch(e)
    {
        res.status(500).json({
            success:false,
            message:'Error in deleteprofile',
            error:e.message
        })
    }
}