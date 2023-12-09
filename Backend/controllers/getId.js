const Message = require("../model/message");
exports.getId = async (req, res) => {
	try {
        const {name,message,time} = req.body;
        console.log(time);
		const messageData = await Message.findOne({name,message,time});
		res.status(200).json({ success: true,
        data: messageData});
		// console.log("api called");
		// res.send(messageData);
		return messageData;
	} catch (error) {
		res.status(500).json({ success: false, error: error });
	}
};
