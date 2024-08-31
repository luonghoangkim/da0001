import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
  name: { type: string },
  email: { type: string, require: true, unique: true },
  phone: { type: string, require: true },
});

const User = mongoose.model.User || mongoose.model('User', Schema)
export default User