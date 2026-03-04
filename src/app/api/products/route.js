import { connectDB } from "../../../lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find().sort({ createdAt: -1 });
    return NextResponse.json(products);
  } catch (err) {
    console.error("Products API error:", err.message);
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(req) {
  const body = await req.json();
  await connectDB();

  const product = await Product.create(body);
  return NextResponse.json(product);
}