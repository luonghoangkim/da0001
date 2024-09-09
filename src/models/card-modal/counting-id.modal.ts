import mongoose from "mongoose";

const counterSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  sequence_value: {
    type: Number,
    required: true,
  },
});

const CountId =
  mongoose.models.CountId || mongoose.model("CountId", counterSchema);
export default CountId;
