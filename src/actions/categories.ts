"use server";

import { createClient } from "@/src/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { Category } from "@/src/types";

// ── Public (published only) ──────────────────────────────────
export async function getPublishedCategories(): Promise<Category[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });

  if (error) throw new Error(error.message);
  return data ?? [];
}

// ── Admin (all categories) ───────────────────────────────────
export async function getAllCategories(): Promise<Category[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getCategoryById(id: string): Promise<Category | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data;
}

export async function createCategory(formData: FormData) {
  const supabase = await createClient();

  const name        = formData.get("name") as string;
  const description = formData.get("description") as string;
  const sort_order  = parseInt(formData.get("sort_order") as string) || 0;
  const is_published = formData.get("is_published") === "true";

  // Auto-generate slug from name
  const slug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

  const { error } = await supabase
    .from("categories")
    .insert({ name, slug, description, sort_order, is_published });

  if (error) throw new Error(error.message);
  revalidatePath("/admin/categories");
  revalidatePath("/");
}

export async function updateCategory(id: string, formData: FormData) {
  const supabase = await createClient();

  const name        = formData.get("name") as string;
  const description = formData.get("description") as string;
  const sort_order  = parseInt(formData.get("sort_order") as string) || 0;
  const is_published = formData.get("is_published") === "true";

  const slug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

  const { error } = await supabase
    .from("categories")
    .update({ name, slug, description, sort_order, is_published })
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/categories");
  revalidatePath("/");
}

export async function deleteCategory(id: string) {
  const supabase = await createClient();
  // Products with this category_id will be SET NULL (per DB constraint)
  const { error } = await supabase
    .from("categories")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/categories");
  revalidatePath("/admin/products");
  revalidatePath("/");
}

export async function toggleCategoryPublished(id: string, is_published: boolean) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("categories")
    .update({ is_published })
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/categories");
  revalidatePath("/");
}