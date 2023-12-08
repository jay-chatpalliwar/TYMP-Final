const Message = require("../model/message");
exports.getMessages = async (req, res) => {
	try {
		const messageData = await Message.find({});
		res.status(200).json({ success: true,
        data: messageData});
		// console.log("api called");
		// res.send(messageData);
		return messageData;
	} catch (error) {
		res.status(500).json({ success: false, error: error });
	}
};
