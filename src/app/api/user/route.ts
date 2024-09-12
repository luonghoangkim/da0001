import connectDB from "@/lib/connectDb";
import Category from "@/models/categories-modal/categories.modal";
import Transactions from "@/models/trans-modal/trans.modal";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/auth-modal/user.modal";

const secretKey = process.env.JWT_SECRET || "your-secret-key";

async function verifyToken(request: Request) {
  const authHeader = request.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { error: "Authorization token missing", status: 401 };
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, secretKey!);
    return { decoded };
  } catch (error) {
    return { error: "Invalid or expired token", status: 403 };
  }
}
export async function GET(request: Request) {
  const { decoded, error, status } = await verifyToken(request);
  if (error) {
    return NextResponse.json({ message: error }, { status });
  }

  const { user_id } = decoded as { user_id: string };

  await connectDB();

  try {
    const user = await User.findById(user_id).select("-password"); // Exclude password
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
