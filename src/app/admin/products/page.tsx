// FILE → src/app/admin/products/page.tsx

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
        <h1 className="text-3xl font-bold" style={{ color: "#524A4E" }}>Products</h1>
        <Link href="/admin/products/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> New Product
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-pink-100">
        <table className="w-full">
          <thead style={{ background: "#FDEFF4", borderBottom: "1px solid rgba(255,192,211,0.4)" }}>
            <tr>
              <th className="text-left p-4 text-sm font-semibold" style={{ color: "#524A4E" }}>Product</th>
              <th className="text-left p-4 text-sm font-semibold" style={{ color: "#524A4E" }}>Category</th>
              <th className="text-left p-4 text-sm font-semibold" style={{ color: "#524A4E" }}>Price</th>
              <th className="text-left p-4 text-sm font-semibold" style={{ color: "#524A4E" }}>Stock</th>
              <th className="text-left p-4 text-sm font-semibold" style={{ color: "#524A4E" }}>Status</th>
              <th className="text-left p-4 text-sm font-semibold" style={{ color: "#524A4E" }}>Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-pink-50">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-pink-50/30 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-11 h-11 rounded-xl overflow-hidden flex-shrink-0"
                      style={{ background: "#FDEFF4" }}>
                      {product.image_url ? (
                        <Image src={product.image_url} alt={product.name} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-lg">🛍️</div>
                      )}
                    </div>
                    <span className="font-medium text-sm" style={{ color: "#524A4E" }}>
                      {product.name}
                    </span>
                  </div>
                </td>

                {/* Category column */}
                <td className="p-4">
                  {product.category ? (
                    <span
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium"
                      style={{
                        background: product.category.is_published
                          ? "rgba(255,192,211,0.3)"
                          : "rgba(100,100,100,0.1)",
                        color: product.category.is_published ? "#FF5C8D" : "#888",
                      }}
                    >
                      {!product.category.is_published && "🚫 "}
                      {product.category.name}
                    </span>
                  ) : (
                    <span className="text-xs text-gray-400">—</span>
                  )}
                </td>

                <td className="p-4 text-sm font-semibold" style={{ color: "#FF5C8D" }}>
                  {formatPrice(product.price)}
                </td>
                <td className="p-4 text-sm" style={{ color: "#524A4E" }}>{product.stock}</td>
                <td className="p-4">
                  <span
                    className="px-2 py-1 rounded-full text-xs font-semibold"
                    style={{
                      background: product.is_active ? "rgba(37,211,102,0.1)" : "rgba(255,92,141,0.1)",
                      color: product.is_active ? "#1aad50" : "#FF5C8D",
                    }}
                  >
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