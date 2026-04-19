import { notFound } from "next/navigation";
import Image from "next/image";
import { Navbar } from "@/src/components/layout/Navbar";
import { getProductById } from "@/src/actions/products";
import { createStaticClient } from "@/src/lib/supabase/static";
import { AddToCartButton } from "@/src/components/products/AddToCartButton";
import { formatPrice } from "@/src/lib/whatsapp";
import type { Metadata } from "next";

interface Props { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) return { title: "Product not found" };
  return {
    title: `${product.name} — MyStore`,
    description: product.description ?? undefined,
  };
}

// ✅ Uses plain client — no cookies(), safe at build time
export async function generateStaticParams() {
  const supabase = createStaticClient();
  const { data } = await supabase
    .from("products")
    .select("id")
    .eq("is_active", true);

  return (data ?? []).map((p) => ({ id: p.id }));
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) notFound();

  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
            {product.image_url ? (
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-8xl">
                📦
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-3xl font-bold text-green-600">
              {formatPrice(product.price)}
            </p>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
            <p className="text-sm text-gray-400">
              Stock: {product.stock > 0 ? `${product.stock} available` : "Out of stock"}
            </p>
            <AddToCartButton product={product} disabled={product.stock === 0} />
          </div>
        </div>
      </main>
    </>
  );
}