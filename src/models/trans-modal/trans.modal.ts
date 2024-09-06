import mongoose, { Schema, model, models } from "mongoose";

const transactionSchema = new Schema(
  {
    transaction_id: {
      type: Schema.ObjectId,
      require: true,
    },
    user_id: {
      type: Schema.ObjectId,
      ref: "User",
      require: true,
    }, //(FK -> Users.user_id)

    amount: {
      type: Number,
      min: [0, "Amount must be than 0"],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true, //(FK -> Categories.category_id)
    },
    date: {
      type: Date,
      required: true,
      default: Date.now, // Ngày giao dịch
    },
    type: {
      type: String,
      enum: ["income", "expense"], // "thu nhập" hoặc "chi tiêu"
      required: true,
    },
    status: {
      type: String,
      enum: ["completed", "pending", "failed"], // Trạng thái giao dịch
      required: true,
    },
  },
  {
    timestamps: true, // Tự động thêm createdAt và updatedAt
  }
);

const Transaction =
  models.Transaction || model("Transaction", transactionSchema);

export default Transaction;
