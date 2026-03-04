// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { toast } from "react-hot-toast";

// const inputClass = "mt-1 block w-full rounded-xl border border-[var(--border)] bg-white/5 px-3 py-2.5 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-start)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-start)]";
// const labelClass = "block text-sm font-medium text-[var(--text-muted)]";
// const errorClass = "mt-1 text-sm text-[var(--danger)]";

// export default function AddProductPage() {
//   const router = useRouter();
//   const [form, setForm] = useState({ title: "", shortDescription: "", fullDescription: "", price: "", priority: "Medium", image: "" });
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});

//   const validate = () => {
//     const err = {};
//     if (!form.title.trim()) err.title = "Title is required";
//     if (!form.shortDescription.trim()) err.shortDescription = "Short description is required";
//     if (!form.fullDescription.trim()) err.fullDescription = "Full description is required";
//     const price = parseFloat(form.price);
//     if (isNaN(price) || price < 0) err.price = "Valid price is required";
//     setErrors(err);
//     return Object.keys(err).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) { toast.error("Please fix the errors in the form."); return; }
//     setLoading(true);
//     try {
//       const res = await fetch("/api/products", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ title: form.title.trim(), shortDescription: form.shortDescription.trim(), fullDescription: form.fullDescription.trim(), price: parseFloat(form.price), priority: form.priority, image: form.image.trim() || undefined }),
//       });
//       if (!res.ok) throw new Error("Failed to add product");
//       toast.success("Product added successfully!");
//       setForm({ title: "", shortDescription: "", fullDescription: "", price: "", priority: "Medium", image: "" });
//       setErrors({});
//       router.refresh();
//     } catch (err) {
//       toast.error(err.message || "Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="min-h-screen relative overflow-hidden">
//       {/* Blurred e-commerce/product background */}
//       <div 
//         className="fixed inset-0 z-[-2] bg-cover bg-center bg-no-repeat"
//         style={{
//           backgroundImage: `url('https://thumbs.dreamstime.com/b/empty-shopping-cart-vibrant-illuminated-urban-nighttime-setting-ai-generated-image-390455764.jpg')`,
//           filter: 'blur(10px) brightness(0.5)',
//           transform: 'scale(1.05)',
//         }}
//       />

//       {/* Dark overlay for readability */}
//       <div className="fixed inset-0 bg-black/65 z-[-1]" />

//       <div className="relative z-10 mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
//         <Link href="/dashboard/manage-products" className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--accent-start)]">← Manage Products</Link>

//         <h1 className="text-2xl font-bold">Add Product</h1>
//         <p className="mt-1 text-[var(--text-muted)]">Add a new product to your catalog.</p>

//         <form onSubmit={handleSubmit} className="mt-8 space-y-6 rounded-2xl glass-card p-6 bg-black/40 backdrop-blur-md border border-white/10">
//           <div>
//             <label htmlFor="title" className={labelClass}>Title *</label>
//             <input id="title" type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputClass} placeholder="Product title" aria-invalid={!!errors.title} />
//             {errors.title && <p className={errorClass}>{errors.title}</p>}
//           </div>
//           <div>
//             <label htmlFor="shortDescription" className={labelClass}>Short description *</label>
//             <input id="shortDescription" type="text" value={form.shortDescription} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} className={inputClass} placeholder="Brief summary" maxLength={200} aria-invalid={!!errors.shortDescription} />
//             {errors.shortDescription && <p className={errorClass}>{errors.shortDescription}</p>}
//           </div>
//           <div>
//             <label htmlFor="fullDescription" className={labelClass}>Full description *</label>
//             <textarea id="fullDescription" rows={4} value={form.fullDescription} onChange={(e) => setForm({ ...form, fullDescription: e.target.value })} className={inputClass} placeholder="Detailed description" aria-invalid={!!errors.fullDescription} />
//             {errors.fullDescription && <p className={errorClass}>{errors.fullDescription}</p>}
//           </div>
//           <div className="grid gap-6 sm:grid-cols-2">
//             <div>
//               <label htmlFor="price" className={labelClass}>Price *</label>
//               <input id="price" type="number" step="0.01" min="0" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className={inputClass} placeholder="0.00" aria-invalid={!!errors.price} />
//               {errors.price && <p className={errorClass}>{errors.price}</p>}
//             </div>
//             <div>
//               <label htmlFor="priority" className={labelClass}>Priority</label>
//               <select id="priority" value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })} className={inputClass}>
//                 <option value="High">High</option>
//                 <option value="Medium">Medium</option>
//                 <option value="Low">Low</option>
//               </select>
//             </div>
//           </div>
//           <div>
//             <label htmlFor="image" className={labelClass}>Image URL (optional)</label>
//             <input id="image" type="url" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className={inputClass} placeholder="https://example.com/image.jpg" />
//           </div>
//           <div className="flex gap-4">
//             <button type="submit" disabled={loading} className="btn-accent flex-1 rounded-xl px-4 py-3 font-semibold text-white disabled:opacity-70">
//               {loading ? "Adding..." : "Add Product"}
//             </button>
//             <Link href="/dashboard/manage-products" className="rounded-xl border border-[var(--border)] px-4 py-3 font-medium text-[var(--text-muted)] hover:bg-white/5">Cancel</Link>
//           </div>
//         </form>
//       </div>
//     </main>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";

const inputClass = "mt-1 block w-full rounded-xl border border-[var(--border)] bg-white/5 px-3 py-2.5 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-start)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-start)]";
const labelClass = "block text-sm font-medium text-[var(--text-muted)]";
const errorClass = "mt-1 text-sm text-[var(--danger)]";

export default function AddProductPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    shortDescription: "",
    fullDescription: "",
    price: "",
    priority: "Medium",
    image: ""
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const err = {};
    if (!form.title.trim()) err.title = "Title is required";
    if (!form.shortDescription.trim()) err.shortDescription = "Short description is required";
    if (!form.fullDescription.trim()) err.fullDescription = "Full description is required";
    const price = parseFloat(form.price);
    if (isNaN(price) || price < 0) err.price = "Valid price is required";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix the errors in the form.");
      return;
    }

    setLoading(true);
    try {
      // ✅ Use absolute URL from environment variable
      const base = process.env.NEXT_PUBLIC_BASE_URL || "";
      const res = await fetch(`${base}/api/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title.trim(),
          shortDescription: form.shortDescription.trim(),
          fullDescription: form.fullDescription.trim(),
          price: parseFloat(form.price),
          priority: form.priority,
          image: form.image.trim() || undefined
        }),
      });

      if (!res.ok) throw new Error("Failed to add product");

      toast.success("Product added successfully!");
      setForm({ title: "", shortDescription: "", fullDescription: "", price: "", priority: "Medium", image: "" });
      setErrors({});
      router.refresh();
    } catch (err) {
      toast.error(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden">
      <div
        className="fixed inset-0 z-[-2] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://thumbs.dreamstime.com/b/empty-shopping-cart-vibrant-illuminated-urban-nighttime-setting-ai-generated-image-390455764.jpg')`,
          filter: 'blur(10px) brightness(0.5)',
          transform: 'scale(1.05)',
        }}
      />
      <div className="fixed inset-0 bg-black/65 z-[-1]" />

      <div className="relative z-10 mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
        <Link href="/dashboard/manage-products" className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--accent-start)]">
          ← Manage Products
        </Link>

        <h1 className="text-2xl font-bold">Add Product</h1>
        <p className="mt-1 text-[var(--text-muted)]">Add a new product to your catalog.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6 rounded-2xl glass-card p-6 bg-black/40 backdrop-blur-md border border-white/10">
          <div>
            <label htmlFor="title" className={labelClass}>Title *</label>
            <input id="title" type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputClass} placeholder="Product title" aria-invalid={!!errors.title} />
            {errors.title && <p className={errorClass}>{errors.title}</p>}
          </div>

          <div>
            <label htmlFor="shortDescription" className={labelClass}>Short description *</label>
            <input id="shortDescription" type="text" value={form.shortDescription} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} className={inputClass} placeholder="Brief summary" maxLength={200} aria-invalid={!!errors.shortDescription} />
            {errors.shortDescription && <p className={errorClass}>{errors.shortDescription}</p>}
          </div>

          <div>
            <label htmlFor="fullDescription" className={labelClass}>Full description *</label>
            <textarea id="fullDescription" rows={4} value={form.fullDescription} onChange={(e) => setForm({ ...form, fullDescription: e.target.value })} className={inputClass} placeholder="Detailed description" aria-invalid={!!errors.fullDescription} />
            {errors.fullDescription && <p className={errorClass}>{errors.fullDescription}</p>}
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="price" className={labelClass}>Price *</label>
              <input id="price" type="number" step="0.01" min="0" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className={inputClass} placeholder="0.00" aria-invalid={!!errors.price} />
              {errors.price && <p className={errorClass}>{errors.price}</p>}
            </div>
            <div>
              <label htmlFor="priority" className={labelClass}>Priority</label>
              <select id="priority" value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })} className={inputClass}>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="image" className={labelClass}>Image URL (optional)</label>
            <input id="image" type="url" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className={inputClass} placeholder="https://example.com/image.jpg" />
          </div>

          <div className="flex gap-4">
            <button type="submit" disabled={loading} className="btn-accent flex-1 rounded-xl px-4 py-3 font-semibold text-white disabled:opacity-70">
              {loading ? "Adding..." : "Add Product"}
            </button>
            <Link href="/dashboard/manage-products" className="rounded-xl border border-[var(--border)] px-4 py-3 font-medium text-[var(--text-muted)] hover:bg-white/5">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}