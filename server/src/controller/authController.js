import User from "../models/userModels.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import sendMail from "../utils/email.js";

export const register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const userExists = await User.findOne({ username });

    if (userExists) {
      return res.status(409).json({message : "username already exists"});
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });

    newUser.emailVerification()

    await newUser.save();
    const emailText = `Please click the following link to verify your email: 
    ${process.env.CLIENT_URL}/Verified?token=${newUser.emailVerificationToken}`
 
     await sendMail(newUser.email, 'Please verify your email', emailText)
 
    
    res.status(200).send({message : "Please verify your email"});
  } catch (err) {
    next(err);
  }
};


export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query
    console.log(token)
    const user = await User.findOne({ emailVerificationToken: token })
    if (!user) {
      return res.status(400).json({ message: 'Invalid token.' })
    }

    user.verified = true
    user.emailVerificationToken = undefined
    await user.save()
    const access_token = jwt.sign(
      {
        userId: user.id,
        isAdmin: user.isAdmin,
        role: user.role,
        username: user.username,
        bookings: user.bookings,
        avatar:user.avatar,
        phoneNumber:user.phoneNumber,
        email:user.email
      },
      process.env.JWT,
      { expiresIn: "1h" }
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", access_token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        message: "Login successful",
        details: { ...otherDetails },
        isAdmin,
        access_token,
      });

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      {
        userId: user.id,
        isAdmin: user.isAdmin,
        role: user.role,
        username: user.username,
        bookings: user.bookings,
        avatar:user.avatar,
        phoneNumber:user.phoneNumber,
        email:user.email
      },
      process.env.JWT,
      { expiresIn: "1h" }
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        message: "Login successful",
        details: { ...otherDetails },
        isAdmin,
        token,
      });
  } catch (err) {
    next(err);
  }
};



