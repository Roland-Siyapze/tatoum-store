// FILE → src/app/admin/products/[id]/page.tsx

import { notFound } from "next/navigation";
import { getProductById, updateProduct } from "@/src/actions/products";
import { getAllCategories } from "@/src/actions/categories";
import { ProductForm } from "@/src/components/products/ProductForm";

interface Props { params: Promise<{ id: string }> }

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    getProductById(id),
    getAllCategories(),
  ]);
  if (!product) notFound();

  const update = updateProduct.bind(null, id);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8" style={{ color: "#524A4E" }}>
        Edit Product
      </h1>
      <ProductForm product={product} categories={categories} onSubmit={update} />
    </div>
  );
}