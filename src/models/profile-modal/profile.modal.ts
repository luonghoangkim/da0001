import mongoose, { Schema, model, models } from "mongoose";

const profileSchema = new Schema(
  {
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
    date_of_birth: {
      type: Date,
      required: false,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"], // Giới tính
      required: false,
    },
  },
  {
    timestamps: true, // Tự động thêm createdAt và updatedAt
  }
);

// Kiểm tra nếu model đã tồn tại thì dùng model đó, nếu không thì tạo model mới
const Profile = models.Profile || model("Profile", profileSchema);

export default Profile;
