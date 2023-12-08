const User = require("../../model/user");
const { cloudUpload } = require("../../utils/cloudUpload");

exports.updateprofile = async(req,res)=>{
    try{
        //auth route will be in between
        const email = req.body.email;
        const token =req.body.token;
        const profile = await User.findOne({ email: email });
        
        const {name,gender,mobile,branch,specialization,year,sem,department}= req.body;
        
        
        if(name) profile.name = name;
        if(gender) profile.gender=gender;
        if(mobile) profile.mobile=mobile;
        if(branch) profile.branch=branch;
    
       if(department) profile.department = department;
       console.log("department "+ department)
        if(specialization) profile.specialization = specialization;
        if(year) profile.year = year;
        if(sem) profile.current_sem = sem;
        if(req.files)
        { 
            
            if(req.files.image)
            {
                profile.image = await cloudUpload(req.files.image);
                console.log(profile.image);
            }
        }

        await profile.save();
         res.status(200).json({
            success:true,
            message:'Profile updated successfully',
            profile:profile
        })

    }
    catch(e)
    {
        res.status(500).json({
            success:false,
            message:'Error in updateprofile',
            error:e.message
        })
    }
}