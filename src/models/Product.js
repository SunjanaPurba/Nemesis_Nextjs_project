import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    shortDescription: String,
    fullDescription: String,
    price: { type: Number, required: true },
    image: String,
    priority: { type: String, enum: ["High", "Medium", "Low"], default: "Low" },
    userEmail: String,
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);