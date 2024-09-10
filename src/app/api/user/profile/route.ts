import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDb";
import Profile from "@/models/profile-modal/profile.modal"; // Đường dẫn đến Profile model

export async function POST(request: Request) {
  await connectDB();

  const {
    user_id,
    first_name,
    last_name,
    email,
    phone_number,
    address,
    profile_picture,
    date_of_birth,
    gender,
    bio,
    social_links,
  } = await request.json();

  const newProfile = new Profile({
    user_id,
    first_name,
    last_name,
    email,
    phone_number,
    address,
    profile_picture,
    date_of_birth,
    gender,
    bio,
    social_links,
  });

  try {
    const savedProfile = await newProfile.save();
    return NextResponse.json({ profile: savedProfile }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating profile:", error);
    return NextResponse.json(
      { message: "Failed to create profile" },
      { status: 500 }
    );
  }
}
