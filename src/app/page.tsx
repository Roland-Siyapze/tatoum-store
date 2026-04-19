import { Navbar } from "@/src/components/layout/Navbar";
import { ProductCard } from "@/src/components/products/ProductCard";
import { getProducts } from "@/src/actions/products";

export const revalidate = 60; // ISR: revalidate every 60s

export default async function HomePage() {
  const products = await getProducts();

  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Our Products</h1>
          <p className="text-gray-500 mt-2">
            Discover our curated selection of quality items
          </p>
        </div>

        {products.length === 0 ? (
          <p className="text-center text-gray-400 py-20 text-lg">
            No products available yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}