// FILE → src/components/products/CategoryTabs.tsx
"use client";

import { useState } from "react";
import { ProductCard } from "./ProductCard";
import { Category, Product } from "@/src/types";

interface Props {
  categories: Category[];
  products: Product[];
}

export function CategoryTabs({ categories, products }: Props) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const filtered = activeSlug
    ? products.filter((p) => p.category?.slug === activeSlug)
    : products;

  return (
    <div>
      {/* ── Tab bar ───────────────────────────────────── */}
      {categories.length > 0 && (
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {/* All tab */}
          <button
            onClick={() => setActiveSlug(null)}
            className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap"
            style={
              activeSlug === null
                ? {
                    background: "linear-gradient(135deg, #FF5C8D, #e0417a)",
                    color: "white",
                    boxShadow: "0 4px 12px rgba(255,92,141,0.35)",
                  }
                : {
                    background: "rgba(255,192,211,0.25)",
                    color: "#524A4E",
                    border: "1px solid rgba(255,192,211,0.4)",
                  }
            }
          >
            All ({products.length})
          </button>

          {categories.map((cat) => {
            const count = products.filter((p) => p.category?.slug === cat.slug).length;
            const isActive = activeSlug === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveSlug(cat.slug)}
                className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap"
                style={
                  isActive
                    ? {
                        background: "linear-gradient(135deg, #FF5C8D, #e0417a)",
                        color: "white",
                        boxShadow: "0 4px 12px rgba(255,92,141,0.35)",
                      }
                    : {
                        background: "rgba(255,192,211,0.25)",
                        color: "#524A4E",
                        border: "1px solid rgba(255,192,211,0.4)",
                      }
                }
              >
                {cat.name}
                <span
                  className="ml-1.5 text-xs px-1.5 py-0.5 rounded-full inline-block"
                  style={{
                    background: isActive ? "rgba(255,255,255,0.25)" : "rgba(255,92,141,0.15)",
                    color: isActive ? "white" : "#FF5C8D",
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* ── Header row ────────────────────────────────── */}
      <div className="flex items-center justify-between mb-6">
        <h2
          className="text-2xl sm:text-3xl font-bold"
          style={{ color: "#524A4E", fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {activeSlug
            ? categories.find((c) => c.slug === activeSlug)?.name ?? "Products"
            : "All Products"}
        </h2>
        <span
          className="text-sm font-medium px-3 py-1 rounded-full"
          style={{ background: "rgba(255,192,211,0.3)", color: "#FF5C8D" }}
        >
          {filtered.length} {filtered.length === 1 ? "item" : "items"}
        </span>
      </div>

      {/* ── Product grid ─────────────────────────────── */}
      {filtered.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-24 rounded-3xl text-center"
          style={{
            background: "rgba(255,255,255,0.5)",
            border: "1px dashed rgba(255,192,211,0.6)",
          }}
        >
          <span className="text-6xl mb-4">🛍️</span>
          <p
            className="text-xl font-semibold mb-2"
            style={{ color: "#524A4E", fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            No products in this category
          </p>
          <p className="text-sm" style={{ color: "#8a7a80" }}>
            Check back soon — new items are coming!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
          {filtered.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}