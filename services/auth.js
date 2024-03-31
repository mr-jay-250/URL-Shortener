import jwt from "jsonwebtoken";
import 'dotenv/config';

const secret = process.env.JWT_SECRET_KEY; // JAY@123$%321!HEY@123&321$

export const setUser = (user) => {
  const payload = {
    _id: user._id,
    email: user.email,
  }
  return jwt.sign(payload, secret);
}

export const getUser = (token) => {
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
}
