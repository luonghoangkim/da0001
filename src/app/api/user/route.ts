import connectDB from "@/lib/connectDb";
import User from "@/models/auth-modal/user.modal";
import { NextResponse } from "next/server";
import { verifyToken } from "@/utils/auth-token";

export async function GET(request: Request) {
  await connectDB();

  const decoded = await verifyToken(request);
  if (!decoded) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  let user_id: string;
  if (typeof decoded === "string") {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  } else if ("id" in decoded) {
    user_id = decoded.id;
  } else {
    return NextResponse.json(
      { message: "Invalid token structure" },
      { status: 401 }
    );
  }

  try {
    const user = await User.findById(user_id).select("-password");
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user profile: ", error);
    return NextResponse.json(
      { message: "Failed to fetch user profile" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  await connectDB();

  const decoded = await verifyToken(request);
  if (!decoded) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  let user_id: string;
  if (typeof decoded === "string") {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  } else if ("id" in decoded) {
    user_id = decoded.id;
  } else {
    return NextResponse.json(
      { message: "Invalid token structure" },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { fullName, email, phoneNumber, addressUser, genderUser } = body;

    const updatedUser = await User.findByIdAndUpdate(
      user_id,
      {
        username: fullName, // Cập nhật theo tên người dùng
        email,
        phone_number: phoneNumber,
        address: addressUser,
        gender: genderUser,
      },
      { new: true, runValidators: true }
    ).select("-password"); // Exclude password

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error("Error updating user profile: ", error);
    return NextResponse.json(
      { message: "Failed to update user profile" },
      { status: 500 }
    );
  }
}
