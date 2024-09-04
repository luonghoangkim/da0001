import mongoose from "mongoose";

// Định nghĩa mô hình (model) MongoDB

const { Schema } = mongoose;

const loginSchema = new Schema({
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

const LoginUser = mongoose.models.login || mongoose.model("Login", loginSchema);

export default LoginUser;
