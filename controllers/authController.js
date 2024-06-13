import Jwt from "jsonwebtoken";
import { hash, compare } from "bcrypt";
import User from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";

// Create Token
const signToken = (id) => {
  return Jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Create and send JWT token
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  // const cookieOptions = {
  //   expires: new Date(
  //     Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
  //   ),
  //   httponly: true,
  // };
  // if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  // res.cookie("jwt", token, cookieOptions);
  // remove the password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user: user,
    },
  });
};

// ROOT Signup
const createRoot = catchAsync(async (req, res, next) => {
  
  const hashedPassword = await hash(req.body.password, 10);

  const newSuperuser = await User.create({
      ...req.body,
    password: hashedPassword,
  });

  res.status(200).json({
    status: "success",
    data: "Account Created Successfully!",
  });
});


// Root Login
const rootLogin = catchAsync(async (req, res, next) => {
 

  // check if user exists
  const superuser = await User.findOne({ email: req.body.email }).select(
    "+password"
  );

  // Check whether the provided password matches the stored password.
  if (!superuser || !(await compare(req.body.password, superuser.password))) {
    return next(new Error("invalid password or user", 400));
  }

  //if everything ok, sent token to the client
  createSendToken(superuser, 200, res);
});



export {
  createRoot,
  rootLogin,
};
