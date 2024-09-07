import connectDB from "@/lib/connectDb";
import Category from "@/models/categories-modal/categories.modal";
import Transactions from "@/models/trans-modal/trans.modal";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await connectDB();
  const { amount, description, category_name, type, status } =
    await request.json();

  let category = await Category.findOne({ category_name });

  if (!category) {
    console.log("Category name not found");
  }

  const newTrans = new Transactions({
    amount,
    description,
    category_id: category._id,
    type,
    status,
  });

  try {
    const saveTrans = await newTrans.save();

    const getCateName = await Transactions.findById(saveTrans._id).populate({
      path: "category_id",
      select: "category_name",
    });

    return NextResponse.json({ transaction: getCateName }, { status: 200 });
  } catch (error: any) {
    console.log("Error: ", error);
    return NextResponse.json(
      { message: "Failed to add Transactions" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  await connectDB();

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type"); // Lọc theo loại giao dịch ("income" hoặc "expense")
  const category = searchParams.get("category_id"); // Lọc theo danh mục giao dịch
  const startDate = searchParams.get("startDate"); // Lọc theo khoảng thời gian (bắt đầu)
  const endDate = searchParams.get("endDate"); // Lọc theo khoảng thời gian (kết thúc)

  const query: any = {};

  // Áp dụng các bộ lọc nếu có
  if (type) {
    query.type = type;
  }
  if (category) {
    query.category_id = category;
  }
  if (startDate && endDate) {
    query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
  }

  try {
    const transactions = await Transactions.find(query).populate({
      path: "category_id",
      select: "category_name",
    });

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
  await connectDB();

  // Lấy transaction_id từ URL
  const { searchParams } = new URL(request.url);
  const transaction_id = searchParams.get("transaction_id");

  if (!transaction_id) {
    return NextResponse.json(
      { message: "Transaction ID is required" },
      { status: 400 }
    );
  }

  try {
    const { amount, description, category_name, type, status } =
      await request.json();

    // Tìm danh mục
    let category;
    if (category_name) {
      category = await Category.findOne({ category_name });
      if (!category) {
        console.log("Category name not found, creating a new category");
      }
    }

    // Cập nhật giao dịch
    const updatedTransaction = await Transactions.findByIdAndUpdate(
      transaction_id,
      {
        amount,
        description,
        category_id: category ? category._id : undefined,
        type,
        status,
      },
      { new: true }
    ).populate({
      path: "category_id",
      select: "category_name",
    });

    if (!updatedTransaction) {
      return NextResponse.json(
        { message: "Transaction not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Transaction updated successfully",
        transaction: updatedTransaction,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating transaction:", error);
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
