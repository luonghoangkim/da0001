import mongoose from "mongoose";

// Định nghĩa mô hình (model) MongoDB

const { Schema } = mongoose;

const userSchema = new Schema({
  user_id: {
    type: Schema.ObjectId,
    require: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
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

  phone_number: {
    type: String,
    trim: true,
  },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    postal_code: { type: String },
    country: { type: String },
  },
  date_of_birth: {
    type: Date,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
