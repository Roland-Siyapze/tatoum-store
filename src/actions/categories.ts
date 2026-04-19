"use server";

import { createClient } from "@/src/lib/supabase/server";
import { createAdminClient } from "@/src/lib/supabase/admin";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Category } from "@/src/types";

// ─── helper: assert the caller is an authenticated admin ─────
async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/admin/login");
  }

  return user;
}

// ── Public (published only) ───────────────────────────────────
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

// ── Admin reads (all categories including unpublished) ────────
export async function getAllCategories(): Promise<Category[]> {
  await requireAdmin();

  // Use admin client so RLS never filters out unpublished rows
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getCategoryById(id: string): Promise<Category | null> {
  const supabase = createAdminClient(); // need to fetch even unpublished ones
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data;
}

// ── Admin writes — all use service-role client ────────────────
export async function createCategory(formData: FormData) {
  await requireAdmin();

  const supabase = createAdminClient();

  const name         = formData.get("name") as string;
  const description  = formData.get("description") as string;
  const sort_order   = parseInt(formData.get("sort_order") as string) || 0;
  const is_published = formData.get("is_published") === "true";

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
  await requireAdmin();

  const supabase = createAdminClient();

  const name         = formData.get("name") as string;
  const description  = formData.get("description") as string;
  const sort_order   = parseInt(formData.get("sort_order") as string) || 0;
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
  await requireAdmin();

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("categories")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/categories");
  revalidatePath("/admin/products");
  revalidatePath("/");
}

export async function toggleCategoryPublished(
  id: string,
  is_published: boolean
) {
  await requireAdmin();

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("categories")
    .update({ is_published })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/categories");
  revalidatePath("/");
}