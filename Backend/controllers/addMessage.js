const Message = require("../model/message");

exports.addMessage = async (req, res) => {
  try {
    // console.log("req body", req.body);
    const { name,message,time } = req.body;

    const result = await Message.create({
      name,
      url:`https://api.dicebear.com/5.x/initials/svg?seed=${name}`,
      message
    });
    return res.status(200).json({
      status: 201,
      message: "Message created successfully",
      // data: user,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};
