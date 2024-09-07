import mongoose, { Schema, model, models } from "mongoose";

const transactionSchema = new Schema(
  {
    transaction_id: {
      type: mongoose.Schema.ObjectId,
      require: true,
    },
    user_id: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      require: true,
    }, //(FK -> Users.user_id)

    category_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: true,
    },
    amount: {
      type: Number,
      min: [0, "Amount must be than 0"],
      required: true,
    },
    description: {
      type: String,
      required: true,
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
