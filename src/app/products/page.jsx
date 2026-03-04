// import { Suspense } from "react";
// import { getBaseUrl } from "@/lib/api";
// import ProductsClient from "./ProductsClient";

// const FAKE_STORE_URL = "https://fakestoreapi.com/products";

// function mapToProduct(item) {
//   const desc = item.description || "";
//   return {
//     _id: `demo-${item.id}`,
//     title: item.title,
//     shortDescription: desc.length > 120 ? desc.slice(0, 120) + "..." : desc,
//     fullDescription: desc,
//     price: item.price,
//     image: item.image,
//     priority: /electronic|jewel/i.test(item.category || "") ? "High" : /cloth|men|women/i.test(item.category || "") ? "Medium" : "Low",
//   };
// }

// async function fetchDemoProducts() {
//   try {
//     const res = await fetch(FAKE_STORE_URL, { cache: "no-store" });
//     if (!res.ok) return [];
//     const data = await res.json();
//     return Array.isArray(data) ? data.map(mapToProduct) : [];
//   } catch {
//     return [];
//   }
// }

// async function getProducts() {
//   try {
//     const base = await getBaseUrl();
//     const controller = new AbortController();
//     const timeout = setTimeout(() => controller.abort(), 8000);
//     const res = await fetch(`${base}/api/products`, { cache: "no-store", signal: controller.signal });
//     clearTimeout(timeout);
//     if (!res.ok) return fetchDemoProducts();
//     const text = await res.text();
//     if (!text) return fetchDemoProducts();
//     const products = JSON.parse(text);
//     if (Array.isArray(products) && products.length > 0) return products;
//     return fetchDemoProducts();
//   } catch {
//     return fetchDemoProducts();
//   }
// }

// export default async function ProductsPage() {
//   const products = await getProducts();

//   return (
//     <main className="min-h-screen">
//       <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
//         <h1 className="text-3xl font-bold">Products</h1>
//         <p className="mt-2 text-[var(--text-muted)]">
//           Browse our product catalog. Use search or filters to find what you need.
//         </p>

//         <Suspense fallback={<ProductsGridSkeleton />}>
//           <ProductsClient initialProducts={products} />
//         </Suspense>
//       </div>
//     </main>
//   );
// }

// function ProductsGridSkeleton() {
//   return (
//     <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//       {[...Array(6)].map((_, i) => (
//         <div key={i} className="h-80 animate-pulse rounded-2xl bg-white/10" />
//       ))}
//     </div>
//   );
// }

import { Suspense } from "react";
import ProductsClient from "./ProductsClient";

const FAKE_STORE_URL = "https://fakestores.onrender.com/products"; // more stable

function mapToProduct(item) {
  const desc = item.description || "";
  return {
    _id: `demo-${item.id}`,
    title: item.title,
    shortDescription:
      desc.length > 120 ? desc.slice(0, 120) + "..." : desc,
    fullDescription: desc,
    price: item.price,
    image: item.image,
    priority: /electronic|jewel/i.test(item.category || "")
      ? "High"
      : /cloth|men|women/i.test(item.category || "")
      ? "Medium"
      : "Low",
  };
}

async function fetchDemoProducts() {
  try {
    const res = await fetch(FAKE_STORE_URL, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Demo API failed");

    const data = await res.json();

    if (!Array.isArray(data)) throw new Error("Invalid demo data");

    return data.map(mapToProduct);
  } catch (err) {
    console.error("Demo products failed:", err);
    return [];
  }
}

async function fetchInternalProducts() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/products`,
      { cache: "no-store" }
    );

    if (!res.ok) throw new Error("Internal API failed");

    const data = await res.json();

    if (!Array.isArray(data)) throw new Error("Invalid internal data");

    return data;
  } catch (err) {
    console.error("Internal products failed:", err);
    return null;
  }
}

async function getProducts() {
  // 1️⃣ Try internal DB products
  const internal = await fetchInternalProducts();

  if (internal && internal.length > 0) {
    return internal;
  }

  // 2️⃣ Fallback to demo products
  const demo = await fetchDemoProducts();

  return demo;
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold">Products</h1>
        <p className="mt-2 text-[var(--text-muted)]">
          Browse our product catalog. Use search or filters to find what you need.
        </p>

        <Suspense fallback={<ProductsGridSkeleton />}>
          <ProductsClient initialProducts={products || []} />
        </Suspense>
      </div>
    </main>
  );
}

function ProductsGridSkeleton() {
  return (
    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="h-80 animate-pulse rounded-2xl bg-white/10"
        />
      ))}
    </div>
  );
}