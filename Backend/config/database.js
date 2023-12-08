const mongoose = require('mongoose');
require('dotenv').config();

const url = "mongodb+srv://bjambhale7:l2VsCpHUAUaeM1FG@miniproject1.pmtryyj.mongodb.net/";
console.log(url)

const dbConnect = async () =>{
    try{
        await mongoose.connect(url,{
            useUnifiedTopology:true,
            useNewUrlParser:true
        });

        console.log("Connected to Database successfully.");
    }catch(e){
        console.log("Error connecting to database.");
    }
}


module.exports = dbConnect;