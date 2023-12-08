const User = require('../../model/user');
const Resource = require('../../model/Resource');
const { default: mongoose } = require('mongoose');


const saveResource = async(req,res)=>{

try{

const id= req.body.id;
const rsid= req.body.rsid; {/**this is objid */}

{/**what will happen is when the user will click the resource for saving then its objid will be captured */}

{/**and i will save the resource ids to user */}
const user= await User.findById({id:id});
 if(!user) return res.status(400).json({success:false,message:'No user found'})
const rsidObjectId = mongoose.Types.ObjectId(rsid);

user.saved_resources.push(rsidObjectId);

await user.save();

res.status(200).json({
success:true,
message:'resource saved successfully',
resource:rsidObjectId
})

}
catch(e)
{
 return res.status(500).json({
  success:false,
  message:'Error occured while saving resource',
  error:e.message
 })
}

}