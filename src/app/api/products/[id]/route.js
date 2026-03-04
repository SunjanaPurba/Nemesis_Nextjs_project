import { connectDB } from "../../../../lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = await params;

 
  if (id && id.startsWith("demo-")) {
    try {
      const numId = id.replace("demo-", "");
      const res = await fetch(`https://fakestoreapi.com/products/${numId}`, { cache: "no-store" });
      if (!res.ok) return NextResponse.json(null, { status: 404 });
      const item = await res.json();
      const c = (item.category || "").toLowerCase();
      const priority = c.includes("electronic") || c.includes("jewel") ? "High" : c.includes("cloth") || c.includes("men") || c.includes("women") ? "Medium" : "Low";
      return NextResponse.json({
        _id: `demo-${item.id}`,
        title: item.title,
        shortDescription: (item.description || "").slice(0, 120),
        fullDescription: item.description || "",
        price: item.price,
        image: item.image,
        priority,
        isDemo: true,
      });
    } catch {
      return NextResponse.json(null, { status: 404 });
    }
  }

  try {
    await connectDB();
    const product = await Product.findById(id);
    return NextResponse.json(product);
  } catch {
    return NextResponse.json(null, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const { id } = await params;
  if (id?.startsWith("demo-")) {
    return NextResponse.json({ error: "Demo products cannot be deleted" }, { status: 400 });
  }
  try {
    await connectDB();
    await Product.findByIdAndDelete(id);
    return NextResponse.json({ message: "Deleted" });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}