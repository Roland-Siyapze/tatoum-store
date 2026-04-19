// FILE → src/app/page.tsx

import { Navbar } from "@/src/components/layout/Navbar";
import { ProductCard } from "@/src/components/products/ProductCard";
import { getProducts } from "@/src/actions/products";
import { getPublishedCategories } from "@/src/actions/categories";
import { CategoryTabs } from "@/src/components/products/CategoryTabs";

export const revalidate = 60;

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getPublishedCategories(),
  ]);

  return (
    <div className="store-bg">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="py-12 sm:py-20 text-center relative overflow-hidden">
          <div className="absolute top-8 left-4 w-32 h-32 rounded-full opacity-30 pointer-events-none"
            style={{ background: "radial-gradient(circle, #FFC0D3, transparent)", filter: "blur(20px)" }} />
          <div className="absolute bottom-0 right-8 w-40 h-40 rounded-full opacity-20 pointer-events-none"
            style={{ background: "radial-gradient(circle, #FF5C8D, transparent)", filter: "blur(28px)" }} />

          <div className="relative">
            <span className="brand-badge inline-block mb-4">New Collection</span>
            <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-4"
              style={{ color: "#524A4E", fontFamily: "'Playfair Display', Georgia, serif" }}>
              Discover Your{" "}
              <span className="italic"
                style={{
                  background: "linear-gradient(135deg, #FF5C8D, #FFC0D3)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                Style
              </span>
            </h1>
            <p className="text-base sm:text-lg max-w-md mx-auto leading-relaxed" style={{ color: "#8a7a80" }}>
              Curated pieces crafted for those who appreciate beauty in every detail.
            </p>
          </div>
        </section>

        {/* ── Category filter tabs + product grid ──────────────── */}
        <section>
          <CategoryTabs
            categories={categories}
            products={products}
          />
        </section>

        {/* ── Footer ───────────────────────────────────────────── */}
        <footer className="mt-20 pt-8 text-center text-sm"
          style={{ borderTop: "1px solid rgba(255,192,211,0.4)", color: "#8a7a80" }}>
          <p>© 2025 MyStore · Order via WhatsApp for fast delivery 🚀</p>
        </footer>
      </main>
    </div>
  );
}