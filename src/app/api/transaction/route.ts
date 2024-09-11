import connectDB from "@/lib/connectDb";
import Category from "@/models/categories-modal/categories.modal";
import Transactions from "@/models/trans-modal/trans.modal";
import { message } from "antd";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET || "your-secret-key";

async function verifyToken(request: Request) {
  const authHeader = request.headers.get("Authorization");
  console.log("Authorization Header:", authHeader); // Kiểm tra giá trị tiêu đề

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { error: "Authorization token missing", status: 401 };
  }

  const token = authHeader.split(" ")[1];
  console.log("Token:", token); // Kiểm tra giá trị token

  try {
    const decoded = jwt.verify(token, secretKey!);
    return { decoded };
  } catch (error) {
    return { error: "Invalid or expired token", status: 403 };
  }
}

export async function POST(request: Request) {
  const { decoded, error, status } = await verifyToken(request);
  if (error) {
    return NextResponse.json({ message: error }, { status });
  }
  const { user_id } = decoded as { user_id: string };
  const { payload } = await request.json();
  await connectDB();

  const newTrans = new Transactions({
    user_id,
    amount: payload?.amount,
    description: payload?.description,
    category_name: payload?.category_name,
    type: payload?.type,
    status: payload?.status,
  });

  try {
    const saveTrans = await newTrans.save();

    return NextResponse.json({ transaction: saveTrans }, { status: 200 });
  } catch (error: any) {
    console.log("Error: ", error);
    return NextResponse.json(
      { message: "Failed to add Transactions" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const category_name = searchParams.get("category_name");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  await connectDB();

  const query: any = {};

  if (type) {
    query.type = type;
  }

  if (category_name) {
    query.category_name = category_name;
  }

  if (startDate && endDate) {
    query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
  }

  try {
    const transactions = await Transactions.find(query);
    return NextResponse.json({ transactions }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching transactions: ", error);
    return NextResponse.json(
      { message: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  const { decoded, error, status } = await verifyToken(request);
  if (error) {
    return NextResponse.json({ message: error }, { status });
  }
  const { user_id } = decoded as { user_id: string };
  const { id, payload } = await request.json();

  await connectDB();

  try {
    const updatedTrans = await Transactions.findOneAndUpdate(
      { _id: id, user_id },
      {
        $set: {
          amount: payload?.amount,
          description: payload?.description,
          category_name: payload?.category_name,
          type: payload?.type,
          status: payload?.status,
        },
      },
      { new: true } // Return the updated document
    );

    if (!updatedTrans) {
      return NextResponse.json(
        { message: "Transaction not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ transaction: updatedTrans }, { status: 200 });
  } catch (error: any) {
    console.error("Error updating transaction: ", error);
    return NextResponse.json(
      { message: "Failed to update transaction" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const transaction_id = searchParams.get("transaction_id");

  try {
    const deletedTransaction = await Transactions.findByIdAndDelete(
      transaction_id
    );

    if (!deletedTransaction) {
      return NextResponse.json(
        { message: "Transaction not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Transaction deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error deleting transaction: ", error);
    return NextResponse.json(
      { message: "Failed to delete transaction" },
      { status: 500 }
    );
  }
}
