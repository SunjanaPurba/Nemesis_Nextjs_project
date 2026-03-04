import { NextResponse } from "next/server";

const FAKE_STORE_URL = "https://fakestoreapi.com/products";

function categoryToPriority(category) {
  const c = (category || "").toLowerCase();
  if (c.includes("electronic") || c.includes("jewel")) return "High";
  if (c.includes("cloth") || c.includes("men") || c.includes("women")) return "Medium";
  return "Low";
}

function mapToProduct(item) {
  const desc = item.description || "";
  return {
    _id: `demo-${item.id}`,
    title: item.title,
    shortDescription: desc.length > 120 ? desc.slice(0, 120) + "..." : desc,
    fullDescription: desc,
    price: item.price,
    image: item.image,
    priority: categoryToPriority(item.category),
    isDemo: true,
  };
}

export async function GET() {
  try {
    const res = await fetch(FAKE_STORE_URL, { cache: "no-store" });
    if (!res.ok) return NextResponse.json([]);
    const data = await res.json();
    const products = Array.isArray(data) ? data.map(mapToProduct) : [];
    return NextResponse.json(products);
  } catch (err) {
    console.error("Demo products API error:", err.message);
    return NextResponse.json([]);
  }
}
