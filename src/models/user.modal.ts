// models/YourModel.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IYourModel extends Document {
  name: string;
  age: number;
}

const YourModelSchema: Schema<IYourModel> = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
});

const YourModel: Model<IYourModel> =
  mongoose.models.YourModel || mongoose.model("YourModel", YourModelSchema);

export default YourModel;
