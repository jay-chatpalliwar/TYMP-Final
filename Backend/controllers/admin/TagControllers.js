const Tag = require('../../model/Tag')
exports.createTag =async(req,res)=>{
 
 try
 {  
    const {name , semester} = req.body;
    console.log(semester)
    const tag = await Tag.create({name:name ,semester:semester});
    
    res.status(200).json({
     success:true,
     message:"tag created successfully"
    })
    
    console.log(tag)
 }
 
 
 catch(e)
 {
   res.status(500).json({
    success:false,
     message:'Error in tag creation'
   })
 }
  
}

exports.getTagBySem = async(req,res)=>{

try
{  
    const semester = req.body.semester;
    
    const tags =await Tag.find({semester:semester});
    
    const tagarray = [];
    
    tags.forEach(element => {
       tagarray.push(element.name);
    });
    
    console.log(tagarray);
    
    res.status(200).json({
     success:true,
     message:'Tags fetched successfully',
     tags : tagarray
    })
}
catch(e)
{
   res.status(500).json({
    success:false,
    message:'error in getting tags',
    error:e.message
   })
}

}