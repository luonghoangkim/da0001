import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDb";
import User from "@/models/authModal/user.modal";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET;

// Xử lý phương thức POST
export async function POST(request: Request) {
  const { email, password } = await request.json();
  await connectDB();

  try {
    // Kiểm tra xem user có tồn tại không
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // So sánh mật khẩu
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 401 }
      );
    }

    // Tạo token JWT
    const token = jwt.sign({ id: user._id, email: user.email }, secretKey!, {
      expiresIn: "1h", // Thời gian hết hạn token
    });

    return NextResponse.json(
      { token: token },
      { status: 200 }
    );
    
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { message: "Failed to login user" },
      { status: 500 }
    );
  }
}
