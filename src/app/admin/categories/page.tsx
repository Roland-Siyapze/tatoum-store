import Link from "next/link";
import { getAllCategories, deleteCategory, toggleCategoryPublished } from "@/src/actions/categories";
import { Button } from "@/src/components/ui/button";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";

export default async function AdminCategoriesPage() {
  const categories = await getAllCategories();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: "#524A4E" }}>
            Categories
          </h1>
          <p className="text-sm mt-1" style={{ color: "#8a7a80" }}>
            Unpublished categories hide all their products from the store.
          </p>
        </div>
        <Link href="/admin/categories/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> New Category
          </Button>
        </Link>
      </div>

      {categories.length === 0 ? (
        <div className="text-center py-20 rounded-2xl border border-dashed border-pink-200 bg-white/50">
          <p className="text-gray-400 text-lg">No categories yet.</p>
          <Link href="/admin/categories/new" className="mt-4 inline-block text-sm text-pink-500 underline">
            Create your first category
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-pink-100">
          <table className="w-full">
            <thead style={{ background: "#FDEFF4", borderBottom: "1px solid rgba(255,192,211,0.4)" }}>
              <tr>
                <th className="text-left p-4 text-sm font-semibold" style={{ color: "#524A4E" }}>Category</th>
                <th className="text-left p-4 text-sm font-semibold" style={{ color: "#524A4E" }}>Slug</th>
                <th className="text-left p-4 text-sm font-semibold" style={{ color: "#524A4E" }}>Order</th>
                <th className="text-left p-4 text-sm font-semibold" style={{ color: "#524A4E" }}>Status</th>
                <th className="text-left p-4 text-sm font-semibold" style={{ color: "#524A4E" }}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pink-50">
              {categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-pink-50/30 transition-colors">
                  <td className="p-4">
                    <div>
                      <p className="font-semibold text-sm" style={{ color: "#524A4E" }}>{cat.name}</p>
                      {cat.description && (
                        <p className="text-xs mt-0.5 text-gray-400 line-clamp-1">{cat.description}</p>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <code className="text-xs px-2 py-1 rounded-md bg-gray-100 text-gray-600">
                      {cat.slug}
                    </code>
                  </td>
                  <td className="p-4 text-sm text-gray-500">{cat.sort_order}</td>
                  <td className="p-4">
                    {/* Toggle publish inline */}
                    <form action={async () => {
                      "use server";
                      await toggleCategoryPublished(cat.id, !cat.is_published);
                    }}>
                      <button
                        type="submit"
                        className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all hover:opacity-80"
                        style={{
                          background: cat.is_published ? "rgba(37,211,102,0.1)" : "rgba(255,92,141,0.1)",
                          color: cat.is_published ? "#1aad50" : "#FF5C8D",
                          border: `1px solid ${cat.is_published ? "rgba(37,211,102,0.3)" : "rgba(255,92,141,0.3)"}`,
                        }}
                      >
                        {cat.is_published
                          ? <><Eye className="h-3 w-3" /> Published</>
                          : <><EyeOff className="h-3 w-3" /> Hidden</>
                        }
                      </button>
                    </form>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Link href={`/admin/categories/${cat.id}`}>
                        <Button size="icon" variant="outline">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </Link>
                      <form action={async () => {
                        "use server";
                        await deleteCategory(cat.id);
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
      )}
    </div>
  );
}