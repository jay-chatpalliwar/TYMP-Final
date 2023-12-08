const Message = require("../model/message");
exports.Messages = async (req, res) => {
	try {
        const value = req.body.data;
        console.log(value);
		const messageData = await Message.findOne({time:value.time});
		res.status(200).json({ success: true,
        data: messageData});
		console.log(messageData);
		// res.send(messageData);
		return messageData;
	} catch (error) {
		res.status(500).json({ success: false, error: error });
	}
};
