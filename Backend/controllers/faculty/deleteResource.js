const User = require('../../model/user');
const Resource = require('../../model/Resource');

exports.deleteResource =async(req,res)=>{
try
{ 
   const id= req.body.id;
   
    const user = await User.findById({id:id});
  
   if(!user) return res.status(400).json({success:false,message:'No user found'})
   
   const rsid= req.body.rsid;
   
   const resource = await Resource.findByIdAndDelete({id:rsid});
   
   if(!resource) return res.status(400).json({
   success:false,message:'Nothing to delete'});
   
   res.status(200).json({
   success:true,
   message:'Resource deleted successfully'
   })
   
}
catch(e)
{
  return res.status(500).json({
  success:false,
  message:'error in deleting the resource'
  })
}
}