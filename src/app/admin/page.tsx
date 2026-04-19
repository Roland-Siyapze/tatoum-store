import { getAllProductsAdmin } from "@/src/actions/products";

export default async function AdminDashboard() {
  const products = await getAllProductsAdmin();
  const active = products.filter((p) => p.is_active).length;
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { label: "Total Products", value: products.length, color: "bg-blue-50 text-blue-700" },
          { label: "Active Products", value: active, color: "bg-green-50 text-green-700" },
          { label: "Total Stock", value: totalStock, color: "bg-purple-50 text-purple-700" },
        ].map((stat) => (
          <div key={stat.label} className={`rounded-xl p-6 ${stat.color}`}>
            <p className="text-sm font-medium opacity-70">{stat.label}</p>
            <p className="text-4xl font-bold mt-1">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}