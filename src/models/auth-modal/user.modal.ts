import mongoose from "mongoose";

// Định nghĩa mô hình (model) MongoDB
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    trim: true,
    default: null,
  },
  address: {
    type: String,
    default: null,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    default: null,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
