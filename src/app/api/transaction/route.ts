import connectDB from "@/lib/connectDb";
import Category from "@/models/transaction-categories-modal/transaction-categories.modal";
import Transactions from "@/models/trans-modal/trans.modal";
import { verifyToken } from "@/utils/auth-token";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const decoded = await verifyToken(request);
  if (!decoded) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
  // Check if decoded is a JwtPayload and contains an id
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

  const { payload } = await request.json();
  await connectDB();

  const newTrans = new Transactions({
    user_id: decoded.id,
    amount: payload?.amount,
    description: payload?.description,
    category_name: payload?.category_name,
    type: payload?.type,
    status: payload?.status,
    card_id: payload?.card_id,
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
  const decoded = await verifyToken(request);
  if (!decoded) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
  // Check if decoded is a JwtPayload and contains an id
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

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const category_name = searchParams.get("category_name");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const page = parseInt(searchParams.get("page") || "1", 10); // Trang hiện tại
  const limit = parseInt(searchParams.get("limit") || "10", 10); // Số lượng bản ghi mỗi trang

  await connectDB();

  const query: any = { user_id };

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
    const total = await Transactions.countDocuments(query); // Tổng số bản ghi
    const transactions = await Transactions.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit) // Bỏ qua số lượng bản ghi dựa trên trang
      .limit(limit); // Giới hạn số lượng bản ghi mỗi trang

    return NextResponse.json(
      {
        transactions,
        total,
        page,
        pages: Math.ceil(total / limit), // Tổng số trang
        limit,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching transactions: ", error);
    return NextResponse.json(
      { message: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  const decoded = await verifyToken(request);
  if (!decoded) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
  // Check if decoded is a JwtPayload and contains an id
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
