const Post = require("../model/postModel");
const Comment = require("../model/commentModel");

exports.createComment = async (req, res) => {
  try {
    //fetch data from req body
    const { post, user, body } = req.body;
    //create comment object
    const comment = new Comment({
      post,
      user,
      body,
      createdAt:Date.now(),
    });

    //save the comment
    // to db and return it back in response
    const savedComment = await comment.save();
    console.log(savedComment._id);
    //change in post section is also needed
    // here

    // we are fetching all posts with same id as that of current post
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $push: { comments: savedComment._id } },
      { new: true }
    )
      .populate("comments")
      .exec();

    res.json({
      // post: updatedPost._id,
      success:true,
      message:"comment added successfully",
      post:updatedPost
    });
  } catch (error) {
    console.log("error while creating a comment");
    return res.status(500).json({
      error: "Internal server error",
      message: error,
    });
  }
};


exports.getCommentsForPost = async (req, res) => {
  try {
    const postId = req.params.postId;

    // Fetch comments for the specified post from the database
    const comments = await Comment.find({ post: postId });

    res.status(200).json({ 
      success:true,
      comments:comments });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Error fetching comments" });
  }
};


exports.createCommentForPost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const { user, body } = req.body; // Assuming you send the user and body in the request body

    // Create a new comment
    const newComment = new Comment({
      post: postId,
      user,
      body,
      createdAt:Date.now(),
    });

    

    // Save the comment to the database
    const savedComment = await newComment.save();
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $push: { comments: savedComment._id } },
      { new: true }
    )
      .populate("comments")
      .exec();
      // console.log(updatedPost);
    res.status(201).json({ 
      success:true,
      comment: savedComment ,
    });
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ error: "Error creating comment" });
  }
};