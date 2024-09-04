import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDb";
import LoginUser from "@/models/authModal/login.modal";
import bcrypt from "bcrypt";

// Xử lý phương thức POST
export async function POST(request: Request) {
  const { email, password } = await request.json();
  await connectDB();

  try {
    // Kiểm tra xem user có tồn tại không
    const user = await LoginUser.findOne({ email });

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

    // Nếu mọi thứ đều ổn, trả về thông báo đăng nhập thành công
    return NextResponse.json(
      {
        message: "Login successful",
        user: { name: user.name, email: user.email },
      },
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
