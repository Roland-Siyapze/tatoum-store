"use server";

import { createClient } from "@/src/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { Product } from "@/src/types";

// ── Public store ─────────────────────────────────────────────
// RLS already filters: active=true AND category is published (or null)
export async function getProducts(): Promise<Product[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      category:categories(*)
    `)
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}

// Products filtered by a specific category slug (public)
export async function getProductsByCategorySlug(slug: string): Promise<Product[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      category:categories(*)
    `)
    .eq("is_active", true)
    .eq("categories.slug", slug)
    .not("category_id", "is", null)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}

// ── Admin ─────────────────────────────────────────────────────
export async function getAllProductsAdmin(): Promise<Product[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      category:categories(*)
    `)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getProductById(id: string): Promise<Product | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      category:categories(*)
    `)
    .eq("id", id)
    .single();

  if (error) return null;
  return data;
}

export async function createProduct(formData: FormData) {
  const supabase = await createClient();

  const name        = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price       = parseFloat(formData.get("price") as string);
  const stock       = parseInt(formData.get("stock") as string);
  const image_url   = formData.get("image_url") as string;
  const category_id = (formData.get("category_id") as string) || null;

  const { error } = await supabase.from("products").insert({
    name, description, price, stock, image_url,
    category_id: category_id || null,
  });

  if (error) throw new Error(error.message);
  revalidatePath("/admin/products");
  revalidatePath("/");
}

export async function updateProduct(id: string, formData: FormData) {
  const supabase = await createClient();

  const name        = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price       = parseFloat(formData.get("price") as string);
  const stock       = parseInt(formData.get("stock") as string);
  const image_url   = formData.get("image_url") as string;
  const is_active   = formData.get("is_active") === "true";
  const category_id = (formData.get("category_id") as string) || null;

  const { error } = await supabase
    .from("products")
    .update({
      name, description, price, stock, image_url, is_active,
      category_id: category_id || null,
    })
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/products");
  revalidatePath("/");
  revalidatePath(`/products/${id}`);
}

export async function deleteProduct(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/products");
  revalidatePath("/");
}