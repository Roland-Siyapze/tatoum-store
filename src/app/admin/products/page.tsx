import Link from "next/link";
import Image from "next/image";
import { getAllProductsAdmin, deleteProduct } from "@/src/actions/products";
import { Button } from "@/src/components/ui/button";
import { formatPrice } from "@/src/lib/whatsapp";
import { Plus, Pencil, Trash2 } from "lucide-react";

export default async function AdminProductsPage() {
  const products = await getAllProductsAdmin();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Products</h1>
        <Link href="/admin/products/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> New Product
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left p-4 font-medium text-gray-600">Product</th>
              <th className="text-left p-4 font-medium text-gray-600">Price</th>
              <th className="text-left p-4 font-medium text-gray-600">Stock</th>
              <th className="text-left p-4 font-medium text-gray-600">Status</th>
              <th className="text-left p-4 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-md overflow-hidden bg-gray-100">
                      {product.image_url ? (
                        <Image src={product.image_url} alt={product.name} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">📦</div>
                      )}
                    </div>
                    <span className="font-medium">{product.name}</span>
                  </div>
                </td>
                <td className="p-4 text-green-600 font-semibold">
                  {formatPrice(product.price)}
                </td>
                <td className="p-4">{product.stock}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    product.is_active
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}>
                    {product.is_active ? "Active" : "Hidden"}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <Link href={`/admin/products/${product.id}`}>
                      <Button size="icon" variant="outline">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </Link>
                    <form action={async () => {
                      "use server";
                      await deleteProduct(product.id);
                    }}>
                      <Button size="icon" variant="destructive" type="submit">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}