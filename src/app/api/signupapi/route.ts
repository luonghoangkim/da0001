import { NextResponse } from "next/server";
import mongoose from "mongoose";

// Kết nối tới MongoDB
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  return mongoose.connect(process.env.MONGODB_URI as string);
};

// Định nghĩa mô hình (model) MongoDB
const UserSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

// Xử lý phương thức POST
export async function POST(request: Request) {
  await connectDB();

  try {
    const data = await request.json();
    const newUser = new User(data);
    await newUser.save();

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json(
      { message: "Failed to register user" },
      { status: 500 }
    );
  }
}
