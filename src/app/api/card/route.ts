import connectDB from "@/lib/connectDb";
import CreditCard from "@/models/card-modal/credit-card.modal";
import { NextResponse } from "next/server";
import CountId from "@/models/card-modal/counting-id.modal";
import { verifyToken } from "@/utils/auth-token";

async function getNextSequence(name: string) {
  const counter = await CountId.findOneAndUpdate(
    { _id: name },
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true } // Tạo tài liệu nếu không tồn tại
  );

  if (!counter) {
    throw new Error("Failed to generate number_id");
  }

  return counter.sequence_value;
}

export async function POST(request: Request) {
  connectDB();
  const decoded = await verifyToken(request);
  // if (error) {
  //   return NextResponse.json({ message: error }, { status });
  // }

  try {
    const { user_id } = decoded as { user_id: string };
    const { bank_name, card_number } = await request.json();
    // Lấy number_id tiếp theo
    const number_id = await getNextSequence("credit_card_id");
    console.log(number_id);

    // Kiểm tra xem số number_id có bị trùng không
    const existingCard = await CreditCard.findOne({ number_id });
    if (existingCard) {
      return NextResponse.json(
        { message: `Card with number_id ${number_id} already exists` },
        { status: 409 }
      );
    }

    // Kiểm tra xem số card_number có bị trùng không
    const existingNumber = await CreditCard.findOne({ card_number });
    if (existingNumber) {
      return NextResponse.json(
        { message: `Card with card_number ${card_number} already exists` },
        { status: 409 }
      );
    }
    const newCard = new CreditCard({
      bank_name,
      card_number,
      number_id,
      user_id,
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

  const decoded = await verifyToken(request);
  // if (error) {
  //   return NextResponse.json({ message: error }, { status });
  // }
  console.log(decoded);

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

  const decoded = await verifyToken(request);
  // if (error) {
  //   return NextResponse.json({ message: error }, { status });
  // }
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

  const decoded = await verifyToken(request);
  // if (error) {
  //   return NextResponse.json({ message: error }, { status });
  // }

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
