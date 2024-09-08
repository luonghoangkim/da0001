import connectDB from "@/lib/connectDb";
import CreditCard from "@/models/card-modal/credit-card.modal";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET;

export async function POST(request: Request) {
  connectDB();

  // Extract the token from the Authorization header
  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { message: "Authorization token missing" },
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1]; // Extract the token from the Bearer token

  try {
    // Verify the token and decode it
    const decoded = jwt.verify(token, secretKey!);

    const { user_id } = decoded as { user_id: string }; // Extract user_id from the decoded token

    // Extract the bank_name from the request body
    const { bank_name, card_number } = await request.json();

    // Create the new credit card with the user_id
    const newCard = new CreditCard({
      bank_name,
      card_number,
      user_id, // Store the user_id in the credit card document
    });
    await newCard.save();

    return NextResponse.json(
      { message: "Add Card successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: "Add Card failed" }, { status: 500 });
  }
}
