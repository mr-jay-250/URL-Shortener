import mongoose from "mongoose";

export const mongoDbConnect = (url) => {
  return mongoose.connect(url);
}
