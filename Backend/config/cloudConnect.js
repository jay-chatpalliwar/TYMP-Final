const CLOUD_NAME= process.env.CLOUD_NAME;
const API_KEY = process.env.API_KEY;
const API_SECRET= process.env.API_SECRET;
const cloudinary = require('cloudinary').v2;

const cloudConnect = ()=>{
  try{  
   cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key:API_KEY,
    api_secret:API_SECRET,
    secure:true
   })

   console.log("cloud connection estabilished")
}catch(e)
{
   console.log("error in cloud connection "+e.message);
}
}

module.exports = cloudConnect;