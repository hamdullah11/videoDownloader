import mongoose from "mongoose";

const user_schema = mongoose.Schema({
  Name: String,
  Email: String,
  Contact: String,
  Password: String,
  Role: String,
  Level: String,
});

export default mongoose.model("user", user_schema);
