const Post = require("../model/postModel");

exports.createPost = async (req, res) => {
  try {
    let { title, body, createdBy } = req.body;
    if(createdBy===undefined)
    {
      createdBy="Sourabh Patil"
      console.log("hello");
    }
    let createdAt = Date.now();
    const post = new Post({
      title,
      body,
      createdBy,
      createdAt,
    });
    console.log(createdBy);
    const savedPost = await post.save();

    res.status(200).json({
      success: true,
      message: "Post created successfully",
      post: savedPost,
    });
  } catch (error) {
    console.log("error : ",error.message);
    return res.status(400).json({
      error: "error while creating the post",
      message: error.message,
    });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("comments").exec();
    res.json({
      post: posts,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
      message: error,
    });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await Post.findById(id);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch(e) {
    return res.status(500).json({
      error: "Internal server error",
      message: e,
    });
  }
};
