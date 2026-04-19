import { createProduct } from "@/src/actions/products";
import { ProductForm } from "@/src/components/products/ProductForm";

export default function NewProductPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">New Product</h1>
      <ProductForm onSubmit={createProduct} />
    </div>
  );
}