"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { createClient } from "@/src/lib/supabase/client";
import { Product } from "@/src/types";
import { toast } from "sonner";

interface ProductFormProps {
  product?: Product;
  onSubmit: (formData: FormData) => Promise<void>;
}

export function ProductForm({ product, onSubmit }: ProductFormProps) {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState(product?.image_url ?? "");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const supabase = createClient();
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}.${ext}`;

    const { error } = await supabase.storage
      .from("product-images")
      .upload(path, file);

    if (error) {
      toast.error("Image upload failed");
      setUploading(false);
      return;
    }

    const { data } = supabase.storage
      .from("product-images")
      .getPublicUrl(path);

    setImageUrl(data.publicUrl);
    toast.success("Image uploaded!");
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.set("image_url", imageUrl);
    try {
      await onSubmit(formData);
      toast.success(product ? "Product updated!" : "Product created!");
      router.push("/admin/products");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
      <div className="space-y-2">
        <Label htmlFor="name">Name *</Label>
        <Input id="name" name="name" defaultValue={product?.name} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <textarea
          id="description"
          name="description"
          defaultValue={product?.description ?? ""}
          rows={4}
          className="w-full border rounded-md p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Price (XAF) *</Label>
          <Input
            id="price"
            name="price"
            type="number"
            step="1"
            defaultValue={product?.price}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="stock">Stock *</Label>
          <Input
            id="stock"
            name="stock"
            type="number"
            defaultValue={product?.stock ?? 0}
            required
          />
        </div>
      </div>

      {product && (
        <div className="space-y-2">
          <Label htmlFor="is_active">Status</Label>
          <select
            id="is_active"
            name="is_active"
            defaultValue={product.is_active ? "true" : "false"}
            className="w-full border rounded-md p-2 text-sm"
          >
            <option value="true">Active</option>
            <option value="false">Hidden</option>
          </select>
        </div>
      )}

      <div className="space-y-2">
        <Label>Product Image</Label>
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          disabled={uploading}
        />
        {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
        {imageUrl && (
          <div className="relative w-40 h-40 rounded-lg overflow-hidden border">
            <Image src={imageUrl} alt="Preview" fill className="object-cover" />
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={loading || uploading}>
          {loading ? "Saving..." : product ? "Update Product" : "Create Product"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}