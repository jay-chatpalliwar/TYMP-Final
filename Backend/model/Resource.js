const mongoose = require('mongoose')

const Resource =  new mongoose.Schema({
  title:
  { 
  type:String
  },
   files:
   [{
    type:String
   }],
   link:
   [{
   type:String
   }],
   author:
   {
    type:String
   },
   image:
   {
    type:String
   },
   tags:
  [ { 
   type:String
   }],
   difficulty:{
   type:String
   },
   desc:
   {
    type:String
   },
   semester:
   {
    type:String
   }
   
})
module.exports = mongoose.model('Resource',Resource);


