import { notFound } from "next/navigation";
import { getProductById, updateProduct } from "@/src/actions/products";
import { ProductForm } from "@/src/components/products/ProductForm";

interface Props { params: Promise<{ id: string }> }

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) notFound();

  const update = updateProduct.bind(null, id);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Edit Product</h1>
      <ProductForm product={product} onSubmit={update} />
    </div>
  );
}