const bcrypt = require("bcrypt");
const User = require("../model/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { options } = require("../routes/user");

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    console.log(req.body);
    //check if user is already registered
    // or not
    // by checking email in db
    const extingUser = await User.findOne({ email });

    if (extingUser) {
      console.log("User  : ", extingUser);
      return res.status(400).json({
        success: false,
        message: "user already exist",
      });
    }

    let hashedPassword;

    try {
      //hash password using bcyrpt
      hashedPassword = await bcrypt.hash(password, 10);
      console.log("Password hased");
    } catch (error) {
      return res.status(500).json({
        sucess: false,
        message: "error in hashing password",
      });
    }

    //create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    return res.status(200).json({
      role: role,
      success: true,
      message: "User Created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "User Cannot be registered please try again later",
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if it filler properly or not
    if (!email || !password) {
      console.log("Please fill all the details carefully");
      return res.status(500).json({
        successs: false,
        message: "please provide all the details",
      });
    }

    //check existing user or not
    const user = await User.findOne({ email });

    if (!user) {
      console.log("email does not exist");
      return res.status(401).json({
        success: false,
        message: "Email doesnot exist",
      });
    }

    // verify password and generate jwt token

    const payload = {
      email: user.email,
      id: user._id,
      role: user.role,
    };

    if (await bcrypt.compare(password, user.password)) {
      let token = jwt.sign(payload, process.env.jwt_secret, {
        expiresIn: "2h",
      });

      // let newUser = {...user}.toObject();
      // newUser.token = token;
      // newUser.password = undefined;

      console.log(user);
      user.toObject();
      user.token = token;
      console.log(user);
      user.password = undefined;
      // console.log(user);

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      // return res.status(400).json({
      //     success:true,
      //     user:user,
      //     message:"user logged in successfully"
      // })

      // return user;
      return res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "User logged in succefully",
      });
    } else {
      return res.status(403).json({
        success: false,
        message: "Password incorrect",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "login failure",
      error: error,
    });
  }
};
