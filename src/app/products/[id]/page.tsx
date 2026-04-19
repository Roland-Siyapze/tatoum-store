import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Package } from "lucide-react";
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
    title: `${product.name} — Tatoum'Store`,
    description: product.description ?? undefined,
  };
}

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
    <div className="store-bg min-h-screen">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium mb-8 transition-opacity hover:opacity-60"
          style={{ color: "#8a7a80" }}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to store
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">

          {/* ── Image ──────────────────────────────────── */}
          <div
            className="relative rounded-3xl overflow-hidden"
            style={{
              aspectRatio: "1/1",
              background: "#FDEFF4",
              border: "1px solid rgba(255,192,211,0.4)",
              boxShadow: "0 8px 40px rgba(82,74,78,0.1)",
            }}
          >
            {product.image_url ? (
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-3 dot-pattern">
                <span className="text-8xl">🛍️</span>
              </div>
            )}

            {/* Stock badge */}
            {product.stock > 0 && product.stock <= 5 && (
              <div className="absolute top-4 left-4">
                <span className="brand-badge">Only {product.stock} left</span>
              </div>
            )}
          </div>

          {/* ── Info ───────────────────────────────────── */}
          <div className="flex flex-col justify-center gap-5">

            <div>
              <span className="brand-badge inline-block mb-3">In Stock</span>
              <h1
                className="text-3xl sm:text-4xl font-bold leading-snug"
                style={{
                  color: "#524A4E",
                  fontFamily: "'Playfair Display', Georgia, serif",
                }}
              >
                {product.name}
              </h1>
            </div>

            <p
              className="text-3xl sm:text-4xl font-bold"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                background: "linear-gradient(135deg, #FF5C8D, #e0417a)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {formatPrice(product.price)}
            </p>

            {product.description && (
              <p
                className="text-base leading-relaxed"
                style={{ color: "#8a7a80" }}
              >
                {product.description}
              </p>
            )}

            {/* Stock info */}
            <div
              className="flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-medium"
              style={{
                background: product.stock > 0
                  ? "rgba(37, 211, 102, 0.08)"
                  : "rgba(255,92,141,0.08)",
                color: product.stock > 0 ? "#1aad50" : "#FF5C8D",
                border: `1px solid ${product.stock > 0 ? "rgba(37,211,102,0.2)" : "rgba(255,92,141,0.2)"}`,
              }}
            >
              <Package className="h-4 w-4" />
              {product.stock > 0
                ? `${product.stock} units available`
                : "Currently out of stock"}
            </div>

            {/* Add to cart */}
            <AddToCartButton product={product} disabled={product.stock === 0} />

            {/* Reassurance */}
            <p
              className="text-xs text-center"
              style={{ color: "#8a7a80" }}
            >
              🚀 Fast delivery · 💬 Order via WhatsApp · ✅ Secure checkout
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}