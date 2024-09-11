import mongoose, { Schema, model, models } from "mongoose";

const transactionSchema = new Schema(
  {
    transaction_id: {
      type: mongoose.Schema.ObjectId,
      require: true,
    },
    user_id: {
      type: String,
      ref: "User",
      require: true,
    }, //(FK -> Users.user_id)
    card_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CreditCard",
    },
    category_name: {
      type: String,
    },
    amount: {
      type: Number,
      min: [0, "Amount must be than 0"],
      required: true,
    },
    description: {
      type: String,
    },

    date: {
      type: Date,
      default: Date.now, // Chỉ lưu trữ ngày hiện tại với giờ, phút, giây là 0
    },
    type: {
      type: String,
      enum: ["income", "expense"], // "thu nhập" hoặc "chi tiêu"
    },
    status: {
      type: String,
      enum: ["completed", "pending", "failed"], // Trạng thái giao dịch
    },
  },
  {
    timestamps: true, // Tự động thêm createdAt và updatedAt
  }
);

const Transaction =
  models.Transaction || model("Transaction", transactionSchema);

export default Transaction;
