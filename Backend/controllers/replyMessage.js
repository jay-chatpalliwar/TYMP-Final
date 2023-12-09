const Message = require("../model/message");

exports.replyMessage = async (req, res) => {
  try {
    // console.log("req body", req.body);
    const { name,message,id } = req.body;
    // console.log(name,message,id);

    const reply = await Message.findByIdAndUpdate(id,
        { $push: { reply: {name,url:`https://api.dicebear.com/5.x/initials/svg?seed=${name}`,message}} },
        { new: true }
        )
      
        // return reply;

    return res.status(200).json({
      status: 201,
      message: `Reply for ${id} created successfully`,
      data: reply,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};
