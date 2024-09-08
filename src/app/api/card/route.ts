import connectDB from "@/lib/connectDb";
import CreditCard from "@/models/card-modal/credit-card.modal";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET;

// Helper function to extract and verify token
async function verifyToken(request: Request) {
  const authHeader = request.headers.get("authorization");

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

export async function POST(request: Request) {
  connectDB();
  const { decoded, error, status } = await verifyToken(request);
  if (error) {
    return NextResponse.json({ message: error }, { status });
  }

  try {
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

export async function GET(request: Request) {
  connectDB();

  const { decoded, error, status } = await verifyToken(request);
  if (error) {
    return NextResponse.json({ message: error }, { status });
  }

  const { user_id } = decoded as { user_id: string };

  try {
    // Find all credit cards associated with the user_id
    const creditCards = await CreditCard.find({ user_id });

    return NextResponse.json({ creditCards }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to retrieve cards" },
      { status: 500 }
    );
  }
}

// PATCH method to update a credit card
export async function PATCH(request: Request) {
  connectDB();

  const { decoded, error, status } = await verifyToken(request);
  if (error) {
    return NextResponse.json({ message: error }, { status });
  }

  const { user_id } = decoded as { user_id: string };

  try {
    const { card_id, bank_name, card_number } = await request.json();

    // Find and update the credit card if it belongs to the authenticated user
    const updatedCard = await CreditCard.findOneAndUpdate(
      { _id: card_id, user_id },
      { bank_name, card_number },
      { new: true }
    );

    if (!updatedCard) {
      return NextResponse.json(
        { message: "Card not found or unauthorized" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Card updated successfully", updatedCard },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to update card" },
      { status: 500 }
    );
  }
}

// DELETE method to remove a credit card
export async function DELETE(request: Request) {
  connectDB();

  const { decoded, error, status } = await verifyToken(request);
  if (error) {
    return NextResponse.json({ message: error }, { status });
  }

  const { user_id } = decoded as { user_id: string };

  try {
    const { card_id } = await request.json();

    // Find and delete the credit card if it belongs to the authenticated user
    const deletedCard = await CreditCard.findOneAndDelete({
      _id: card_id,
      user_id,
    });

    if (!deletedCard) {
      return NextResponse.json(
        { message: "Card not found or unauthorized" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Card deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to delete card" },
      { status: 500 }
    );
  }
}
