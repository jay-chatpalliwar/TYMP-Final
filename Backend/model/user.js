const mongoose = require('mongoose');

const User= new mongoose.Schema({
    name:{
        type: String,
    },
    email:{
        type:String
    },
    mobile:{
        type:Number
    },
    gender:{
     type:String
    },
    password:{
        type:String
    },
    image:
    {
        type:String
    },
    branch:{
        type:String
    },
    year:
    {
     type:Number,
    },
    current_sem:
    {
     type:String,
    },
    institute:{
     type:String
    },
    specialization:{
     type:String
    },
    subjects:
    {
     type:mongoose.Schema.Types.ObjectId,
     ref:'Subject'
    },
    role:
    {
        type:String /* student , admin , faculty */
    },
    
    saved_resources: /**for student */
    [{
     type:mongoose.Schema.Types.ObjectId,
     ref:'Resource'
    }],
    
   Blogs:
   {
    type:mongoose.Schema.Types.ObjectId,
    ref:'Blog'
   },
    
    resources:   /**for teacher */
    [{
     type:mongoose.Schema.Types.ObjectId,
     Ref:'Resource'
    }],
    
    resetToken :{  /**password recovery token */
        type:String
    },
    resetTokenExpiry :{
        type:Date
    },
    piechart:
    {
     type:mongoose.Schema.Types.ObjectId,
     ref:'Chart'
    },
    recommended_resources:
    {
     type:mongoose.Schema.Types.ObjectId,
     ref:'Resource'
    },
    otp:
    {
    type:String,
    },
    expiresIn:{  /**otp expiry */
    type:Date,
     defaut: new Date(Date.now() + 600000),
    }
})

module.exports = mongoose.model('User',User);