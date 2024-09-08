import mongoose, { Schema, model, models } from "mongoose";

const cardSchema = new Schema({
  card_id: {
    type: mongoose.Schema.ObjectId,
    require: true,
  },
  card_name: {
    type: String,
    require: true,
  },
  card_number: {
    type: Number,
    require: true,
  },
  user_id: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    require: true,
  },
});

const CreditCard =
  mongoose.models.CreditCard || mongoose.model("CreditCard", cardSchema);

export default CreditCard;
