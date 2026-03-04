import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

// GET single product
export async function GET(req, { params }) {
  const { id } = params;

  try {
    await connectDB();
    const product = await Product.findById(id).lean();
    if (!product) return NextResponse.json(null, { status: 404 });
    return NextResponse.json(product);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE single product
export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    await connectDB();
    await Product.findByIdAndDelete(id);
    return NextResponse.json({ message: "Deleted" });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}