import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    lowercase: true,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});

// define model or collectiion name
const CategoryModel = new mongoose.model("Category", categorySchema);
export default CategoryModel;
