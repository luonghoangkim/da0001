import mongoose, { Schema, model, models } from "mongoose";

const goalsSchema = new Schema(
  {
    card_id: {
      type: mongoose.Schema.ObjectId,
      require: true,
    },
    number_id: {
      type: Number,
      unique: true,
    },
    bank_name: {
      type: String,
      require: true,
    },
    card_number: {
      type: Number,
      require: true,
    },
    total_amount: {
      type: Number,
      require: true,
    },
    user_id: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      require: true,
    },
    date: {
      type: Date,
      require: true,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Goals =
  mongoose.models.Goals || mongoose.model("Goals", goalsSchema);

export default Goals;
