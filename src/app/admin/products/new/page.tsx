// ══════════════════════════════════════════════════════════════
// FILE 1 → src/app/admin/products/new/page.tsx
// ══════════════════════════════════════════════════════════════

import { createProduct } from "@/src/actions/products";
import { getAllCategories } from "@/src/actions/categories";
import { ProductForm } from "@/src/components/products/ProductForm";

export default async function NewProductPage() {
  const categories = await getAllCategories();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8" style={{ color: "#524A4E" }}>
        New Product
      </h1>
      <ProductForm categories={categories} onSubmit={createProduct} />
    </div>
  );
}