// const express = require("express");
// const router = express.Router();

// //controllers
// const { createComment } = require("../controllers/commemts");
// const { createPost } = require("../controllers/post");
// const { getPosts, getPostById } = require("../controllers/post");

// //mapping
// router.post("/comments/create", createComment);
// router.post("/posts/create", createPost);
// router.get("/posts", getPosts);
// router.get("/post/:id", getPostById);

// //export
// module.exports = router;

const express = require("express");
const router = express.Router();

//controllers
const { createComment } = require("../controllers/commemts");
const { createPost } = require("../controllers/post");
const { getPosts, getPostById } = require("../controllers/post");
const { getCommentsForPost } = require("../controllers/commemts");
const { createCommentForPost } = require("../controllers/commemts");

//mapping
router.post("/comments/create", createComment);
router.post("/posts/create", createPost);
router.get("/posts", getPosts);
router.get("/post/:id", getPostById);
router.get("/post/:postId/comments", getCommentsForPost);
router.post("/post/:postId/comments/create", createCommentForPost);

//export
module.exports = router;