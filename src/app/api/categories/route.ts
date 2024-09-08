import connectDB from "@/lib/connectDb";
import Category from "@/models/categories-modal/categories.modal";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  connectDB();
  const { category_name } = await request.json();

  const newCategory = new Category({
    category_name,
  });
  try {
    await newCategory.save();

    return NextResponse.json(
      { message: "Add category successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { message: "Add category failed" },
      { status: 500 }
    );
  }
}
