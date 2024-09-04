import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDb";
import User from "@/models/authModal/user.modal";
import bcrypt from "bcrypt";


// Xử lý phương thức POST
export async function POST(request: any) {
  
  const {username, email, password} = await request.json()
  await connectDB();

  const existUser = await User.findOne({ email });
  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashPassword,
  });
  
  if (existUser) {
    return new NextResponse("User already existing", {status:400})
  }

  try {
    await newUser.save();

    return NextResponse.json(
      { message: "User registered successfully" },
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
