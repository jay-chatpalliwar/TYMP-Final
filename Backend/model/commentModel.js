//import mongoose
const mongoose = require("mongoose");
const Post = require("../model/postModel");

//route handler
const commentSchema =  new mongoose.Schema(
    {
        post:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Post"
        },
        user:{
            type:String,
            required:true
        },
        createdAt:{
            type:Date,
            default:Date.now()
        },
        body:{
            type:String,
            required:true
        }
    }
)


//export
module.exports = mongoose.model("Comment",commentSchema);