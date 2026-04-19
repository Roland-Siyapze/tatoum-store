"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Eye } from "lucide-react";
import { useCartStore } from "@/src/store/cartStore";
import { Product } from "@/src/types";
import { formatPrice } from "@/src/lib/whatsapp";
import { toast } from "sonner";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const addItem = useCartStore((s) => s.addItem);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast.success(`${product.name} added to cart!`);
  };

  const delayClass = ["fade-up-1", "fade-up-2", "fade-up-3", "fade-up-4"][index % 4];

  return (
    <div className={`product-card fade-up ${delayClass} group`}>
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "#ffffff",
          border: "1px solid rgba(255, 192, 211, 0.4)",
          boxShadow: "0 2px 12px rgba(82, 74, 78, 0.06)",
        }}
      >
        {/* Image area */}
        <Link href={`/products/${product.id}`}>
          <div
            className="relative overflow-hidden"
            style={{ aspectRatio: "1/1", background: "#FDEFF4" }}
          >
            {product.image_url ? (
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-108"
                style={{ transition: "transform 0.5s ease" }}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-2 dot-pattern">
                <span className="text-5xl">🛍️</span>
              </div>
            )}

            {/* Overlay on hover */}
            <div
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "rgba(82, 74, 78, 0.35)" }}
            >
              <span
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white"
                style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)" }}
              >
                <Eye className="h-4 w-4" /> Quick View
              </span>
            </div>

            {/* Stock badge */}
            {product.stock <= 5 && product.stock > 0 && (
              <div className="absolute top-3 left-3">
                <span className="brand-badge">Only {product.stock} left</span>
              </div>
            )}
            {product.stock === 0 && (
              <div className="absolute top-3 left-3">
                <span
                  className="text-xs font-semibold px-3 py-1 rounded-full"
                  style={{ background: "#524A4E", color: "white" }}
                >
                  Sold out
                </span>
              </div>
            )}
          </div>
        </Link>

        {/* Content */}
        <div className="p-4">
          <Link href={`/products/${product.id}`}>
            <h3
              className="font-semibold text-base leading-snug truncate mb-1 hover:opacity-70 transition-opacity"
              style={{ color: "#524A4E", fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {product.name}
            </h3>
          </Link>

          {product.description && (
            <p
              className="text-xs line-clamp-2 mb-3 leading-relaxed"
              style={{ color: "#8a7a80" }}
            >
              {product.description}
            </p>
          )}

          <div className="flex items-center justify-between gap-3">
            <span
              className="text-lg font-bold"
              style={{ color: "#FF5C8D" }}
            >
              {formatPrice(product.price)}
            </span>

            <button
              onClick={handleAdd}
              disabled={product.stock === 0}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background: product.stock === 0
                  ? "#e0d0d5"
                  : "linear-gradient(135deg, #FF5C8D, #e0417a)",
                color: product.stock === 0 ? "#8a7a80" : "white",
                boxShadow: product.stock > 0 ? "0 4px 12px rgba(255, 92, 141, 0.35)" : "none",
              }}
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}