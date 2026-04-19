import { Navbar } from "@/src/components/layout/Navbar";
import { ProductCard } from "@/src/components/products/ProductCard";
import { getProducts } from "@/src/actions/products";

export const revalidate = 60;

export default async function HomePage() {
  const products = await getProducts();

  return (
    <div className="store-bg">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">

        {/* ── Hero section ─────────────────────────────────────── */}
        <section className="py-12 sm:py-20 text-center relative">
          {/* Decorative circles */}
          <div
            className="absolute top-8 left-4 w-32 h-32 rounded-full opacity-30 pointer-events-none"
            style={{
              background: "radial-gradient(circle, #FFC0D3, transparent)",
              filter: "blur(20px)",
            }}
          />
          <div
            className="absolute bottom-0 right-8 w-40 h-40 rounded-full opacity-20 pointer-events-none"
            style={{
              background: "radial-gradient(circle, #FF5C8D, transparent)",
              filter: "blur(28px)",
            }}
          />

          <div className="relative">
            <span className="brand-badge inline-block mb-4">New Collection</span>
            <h1
              className="text-4xl sm:text-6xl font-bold leading-tight mb-4"
              style={{
                color: "#524A4E",
                fontFamily: "'Playfair Display', Georgia, serif",
              }}
            >
              Discover Your{" "}
              <span
                className="italic"
                style={{
                  background: "linear-gradient(135deg, #FF5C8D, #FFC0D3)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Style
              </span>
            </h1>
            <p
              className="text-base sm:text-lg max-w-md mx-auto leading-relaxed"
              style={{ color: "#8a7a80" }}
            >
              Curated pieces crafted for those who appreciate beauty in every detail.
            </p>
          </div>
        </section>

        {/* ── Product grid ─────────────────────────────────────── */}
        <section>
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h2
              className="text-2xl sm:text-3xl font-bold"
              style={{
                color: "#524A4E",
                fontFamily: "'Playfair Display', Georgia, serif",
              }}
            >
              Our Products
            </h2>
            <span
              className="text-sm font-medium px-3 py-1 rounded-full"
              style={{
                background: "rgba(255,192,211,0.3)",
                color: "#FF5C8D",
              }}
            >
              {products.length} items
            </span>
          </div>

          {products.length === 0 ? (
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
                style={{
                  color: "#524A4E",
                  fontFamily: "'Playfair Display', Georgia, serif",
                }}
              >
                No products yet
              </p>
              <p className="text-sm" style={{ color: "#8a7a80" }}>
                Check back soon — beautiful things are coming.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
              {products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          )}
        </section>

        {/* ── Footer ───────────────────────────────────────────── */}
        <footer
          className="mt-20 pt-8 text-center text-sm"
          style={{
            borderTop: "1px solid rgba(255,192,211,0.4)",
            color: "#8a7a80",
          }}
        >
          <p>© 2025 Tatoum&apos;Store · Order via WhatsApp for fast delivery 🚀</p>
        </footer>
      </main>
    </div>
  );
}