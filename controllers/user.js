import User from "../models/user.js";
import { v4 } from "uuid";
import { setUser, getUser } from "../services/auth.js";

export const handleUserSignUp = async (req, res) => {
  const { name, email, password } = req.body;

  await User.create ({
    name,
    email,
    password,
  });

  return res.redirect('/');
}

export const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });

  if(!user) {
    return res.render("login", {
      error: "Invalid Email or Password"
    })
  }
  const sessionId = v4();
  setUser(sessionId, user);
  res.cookie('uid', sessionId);
  
  return res.redirect('/');
}