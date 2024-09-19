import bcryptjs from "bcryptjs";
import { User } from "../models/User.js";
import { generateTokenAndSetCookie } from "../middleware/generateTokenAndSetCookie.js";

export const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const userExists = await User.findOne({ email });    
    if (userExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    const hashedPass = await bcryptjs.hash(password, 10);
    const verificationCode = Math.floor(100000 + Math.random() * 9000).toString();
    const user = new User({
      name,
      email,
      password:hashedPass,
      verificationCode,
      verificationCodeExpiresAt: Date.now() + 3600000, //on 1 hour
    });
    await user.save();
    //jwt
    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      success: true,
      message: "User created successfully",
      user:{
        ...user._doc,
        password: null
      }
    })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message ,user:null});
  }
};
export const login = async (req, res) => {
  console.log("login controller");
};
export const logout = async (req, res) => {
  console.log("logout controller");
};
