"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Category } from "@/src/types";
import { toast } from "sonner";

interface CategoryFormProps {
  category?: Category;
  onSubmit: (formData: FormData) => Promise<void>;
}

export function CategoryForm({ category, onSubmit }: CategoryFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [nameValue, setNameValue] = useState(category?.name ?? "");

  // Live slug preview
  const slugPreview = nameValue
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    try {
      await onSubmit(formData);
      toast.success(category ? "Category updated!" : "Category created!");
      router.push("/admin/categories");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">

      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Name *</Label>
        <Input
          id="name"
          name="name"
          value={nameValue}
          onChange={(e) => setNameValue(e.target.value)}
          placeholder="e.g. Skincare"
          required
        />
        {nameValue && (
          <p className="text-xs text-gray-400">
            Slug: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">{slugPreview}</code>
          </p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <textarea
          id="description"
          name="description"
          defaultValue={category?.description ?? ""}
          placeholder="Brief description shown to customers..."
          rows={3}
          className="w-full border rounded-md p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Sort order */}
      <div className="space-y-2">
        <Label htmlFor="sort_order">Display Order</Label>
        <Input
          id="sort_order"
          name="sort_order"
          type="number"
          defaultValue={category?.sort_order ?? 0}
          min={0}
          placeholder="0"
        />
        <p className="text-xs text-gray-400">Lower numbers appear first in the store.</p>
      </div>

      {/* Published toggle */}
      <div className="space-y-2">
        <Label htmlFor="is_published">Visibility</Label>
        <select
          id="is_published"
          name="is_published"
          defaultValue={category?.is_published === false ? "false" : "true"}
          className="w-full border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="true">✅ Published — visible in store</option>
          <option value="false">🚫 Hidden — all products in this category are hidden</option>
        </select>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : category ? "Update Category" : "Create Category"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}