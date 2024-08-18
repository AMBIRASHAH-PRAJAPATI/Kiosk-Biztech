import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    originalprice: {
      type: Number,
      required: false,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.ObjectId,
      ref: "Category",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    specifications: {
      processor: { type: String, required: true },
      ram: { type: String, required: true },
      storage: { type: String, required: true },
      display: { type: String, required: false },
      operatingSystem: { type: String, required: false },
      otherDetails: { type: String, required: false },
    },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("Product", productSchema);
export default ProductModel;

// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     slug: {
//       type: String,
//       required: true,
//     },
//     description: {
//       type: String,
//       require: true,
//     },
//     price: {
//       type: Number,
//       required: true,
//     },
//     category: {
//       type: mongoose.ObjectId,
//       ref: "Category",
//       require: true,
//     },
//     quantity: {
//       type: Number,
//       required: true,
//     },
//     image: {
//       type: String,
//       require: true,
//     },
//   },
//   { timestamps: true }
// );

// const ProductModel = new mongoose.model("Product", productSchema);
// export default ProductModel;
