import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "@/models/auth-modal/user.modal";
import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDb";

export async function POST(request: any) {
  const { username, email, password } = await request.json();
  await connectDB();

  const existUser = await User.findOne({ email });
  if (existUser) {
    return new NextResponse("User already exists", { status: 400 });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashPassword,
    phoneNumber: null, // Đặt giá trị mặc định là null
    addressUser: null, // Đặt giá trị mặc định là null
    genderUser: null, // Đặt giá trị mặc định là null
  });

  try {
    await newUser.save();

    // Tạo token JWT sau khi người dùng đăng ký thành công
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1h",
      }
    );

    return NextResponse.json(
      { message: "User registered successfully", token }, // Trả token về client
      { status: 200 }
    );
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json(
      { message: "Failed to register user" },
      { status: 500 }
    );
  }
}
