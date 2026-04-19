// ── src/app/admin/categories/new/page.tsx ────────────────────
// Copy this content into that file

import { createCategory } from "@/src/actions/categories";
import { CategoryForm } from "@/src/components/admin/CategoryForm";

export default function NewCategoryPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2" style={{ color: "#524A4E" }}>
        New Category
      </h1>
      <p className="text-sm mb-8" style={{ color: "#8a7a80" }}>
        Create a category to group your products.
      </p>
      <CategoryForm onSubmit={createCategory} />
    </div>
  );
}


// ══════════════════════════════════════════════════════════════
// ── src/app/admin/categories/[id]/page.tsx ───────────────────
// Copy this content into a SEPARATE file at that path

// import { notFound } from "next/navigation";
// import { getCategoryById, updateCategory } from "@/src/actions/categories";
// import { CategoryForm } from "@/src/components/admin/CategoryForm";
//
// interface Props { params: Promise<{ id: string }> }
//
// export default async function EditCategoryPage({ params }: Props) {
//   const { id } = await params;
//   const category = await getCategoryById(id);
//   if (!category) notFound();
//
//   const update = updateCategory.bind(null, id);
//
//   return (
//     <div>
//       <h1 className="text-3xl font-bold mb-2" style={{ color: "#524A4E" }}>
//         Edit Category
//       </h1>
//       <p className="text-sm mb-8" style={{ color: "#8a7a80" }}>
//         Changes affect product visibility immediately.
//       </p>
//       <CategoryForm category={category} onSubmit={update} />
//     </div>
//   );
// }