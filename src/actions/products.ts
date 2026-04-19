"use server";

import { createClient } from "@/src/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { Product } from "@/src/types";

export async function getProducts(): Promise<Product[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getAllProductsAdmin(): Promise<Product[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getProductById(id: string): Promise<Product | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data;
}

export async function createProduct(formData: FormData) {
  const supabase = await createClient();

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const stock = parseInt(formData.get("stock") as string);
  const image_url = formData.get("image_url") as string;

  const { error } = await supabase.from("products").insert({
    name, description, price, stock, image_url,
  });

  if (error) throw new Error(error.message);
  revalidatePath("/admin/products");
  revalidatePath("/");
}

export async function updateProduct(id: string, formData: FormData) {
  const supabase = await createClient();

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const stock = parseInt(formData.get("stock") as string);
  const image_url = formData.get("image_url") as string;
  const is_active = formData.get("is_active") === "true";

  const { error } = await supabase
    .from("products")
    .update({ name, description, price, stock, image_url, is_active })
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