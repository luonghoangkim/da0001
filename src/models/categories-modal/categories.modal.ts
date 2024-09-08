import mongoose, { Schema, model, models } from "mongoose";

const cateSchema = new Schema({
  category_id: {
    type: mongoose.Schema.ObjectId,
    require: true,
  },
  category_name: {
    type: String,
    require: true,
  },
});

const Category =
  mongoose.models.Category || mongoose.model("Category", cateSchema);

export default Category;
