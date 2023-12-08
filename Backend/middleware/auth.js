//auth , isStudent , isAdmin

const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
  try {
    //extract jwt token
    // const token = req.body.token;

    //differnt ways to extract the token from the request
    // console.log(req.cookies);
    // console.log("HIIII...");
    const token =
      req.body.token ||
      req.cookies.token ||
      req.header("Authorization").replace("Bearer ", "");

    // const token = req.cookies.token ;
    // const token = req.header("Authorization").replace("Bearer ", "");
    // req.header("Authorization").replace("Bearer ","") this is considered to be the safe way to extract the token

    // console.log(token);
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing",
      });
    }
    //verify the roken
    try {
      const decode = jwt.verify(token, process.env.jwt_secret);
      // console.log(decode);
      req.user = decode;
      // console.log(req);/
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "token is invalid",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong , while verifying the token",
    });
  }
};

exports.isStudent = (req, res, next) => {
  try {
    if (req.user.role !== "student") {
      return res.status(401).json({
        success: false,
        message: "This is protected route for students",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role not matching",
    });
  }
};

exports.isAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: "This is protected route for Admin",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role not matching",
    });
  }
};
