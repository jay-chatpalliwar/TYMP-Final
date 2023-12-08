const { default: mongoose } = require('mongoose');
const Resource= require('../../model/Resource');

exports.updateResource = async(req,res)=>{

try
{ 
   const rsid= req.body.rsid;
   
     if (!mongoose.isValidObjectId(rsid)) {
      return res.status(400).json({ success: false, message: 'Invalid resource ID' });
    }
  
   
   const resource = await Resource.findById({_id:rsid});
   
   if(!resource) return res.status(500).json({success:false,message:'no such resource'})
   
    const {links,tags,title,difficulty,desc,type}=req.body;
    
    if(links) resource.link=links;
    if(tags) resource.tags=tags;
    if(title) resource.title=title;
    if(difficulty) resource.difficulty=difficulty;
    if(desc) resource.type=type;
    
    await resource.save();
    
    res.status(200).json({
    success:true,
    message:'resource updated successfully',
    
    })
}
catch(e)
{
 console.log(e);
  return res.status(500).json({
   success:false,
   message:'Error in updating resource',
   error:e.message
  })
}

}