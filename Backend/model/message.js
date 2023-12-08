const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
	name: {
		type: String,
		required: false,
	},
	url: {
		type: String,
		required: false,
	},
	
    message: {
        type: String,
        required: true,
    },

    time : {
        type: Date,
        default:  Date.now("<YYYY-MM-DD HH:MM:SS>"),
    },

    reply :[{
        name: {
            type: String,
            required: false,
        },
        url: {
            type: String,
            required: false,
        },
        
        message: {
            type: String,
            required: true,
        },
    
        time : {
            type: Date,
            default:  Date.now("<YYYY-MM-DD HH:MM:SS>"),
        },
    }]
});

module.exports = mongoose.model("Message", messageSchema);
