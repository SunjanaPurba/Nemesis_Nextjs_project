import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

// GET all products
export async function GET() {
  try {
    await connectDB();
    const products = await Product.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(products);
  } catch (err) {
    console.error("Products API error:", err.message);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

// POST create new product
export async function POST(req) {
  try {
    const body = await req.json();
    await connectDB();

    const product = await Product.create(body);
    return NextResponse.json(product);
  } catch (err) {
    console.error("Products create error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}