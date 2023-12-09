const Message = require("../model/message");

exports.getReply = async (req, res) => {
  try {
    // console.log("req body", req.body);
    const { id } = req.body;
    // console.log(name,message,id);

    const reply = await Message.findOne(id
        );
      
        // return reply;

    return res.status(200).json({
      status: 201,
      message: `All Reply for ${id} fetched successfully`,
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
