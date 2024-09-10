import mongoose, { Schema, model, models } from "mongoose";

const profileSchema = new Schema(
  {
    user_id: {
      type: mongoose.Schema.ObjectId,
      ref: "User", // Liên kết với bảng User
      required: true,
    },
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    phone_number: {
      type: String,
      required: false,
      trim: true,
    },
    address: {
      street: { type: String, required: false },
      city: { type: String, required: false },
      state: { type: String, required: false },
      postal_code: { type: String, required: false },
      country: { type: String, required: false },
    },
    profile_picture: {
      type: String, // URL hoặc đường dẫn đến ảnh đại diện
      required: false,
    },
    date_of_birth: {
      type: Date,
      required: false,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"], // Giới tính
      required: false,
    },
    bio: {
      type: String,
      required: false,
      trim: true,
    },
    social_links: {
      linkedin: { type: String, required: false },
      twitter: { type: String, required: false },
      facebook: { type: String, required: false },
    },
  },
  {
    timestamps: true, // Tự động thêm createdAt và updatedAt
  }
);

// Kiểm tra nếu model đã tồn tại thì dùng model đó, nếu không thì tạo model mới
const Profile = models.Profile || model("Profile", profileSchema);

export default Profile;
