import mongoose from "mongoose";

// Định nghĩa mô hình (model) MongoDB

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique:true
  },
  email: {
    type: String,
    required: true,
    unique: true, // Đánh dấu trường email là duy nhất
  },
  password: {
    type: String,
    required: true,
  },
});



const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
