const mongoose = require('mongoose');

const Sem5 =  new mongoose.Schema({
  
  email:
  {
  type:String,
  },
  CD:{
  type:Number,
  },
  DAA:
  {
   type:Number
  } ,
  AI:{
   type:Number
  },
  IOT:
  {
   type:Number
  },
  IP:
  {
  type:Number
  }
})
module.exports = mongoose.model('Sem5',Sem5);
