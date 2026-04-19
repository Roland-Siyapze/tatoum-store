"use client";

import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/src/store/cartStore";
import { Product } from "@/src/types";
import { toast } from "sonner";

export function AddToCartButton({
  product,
  disabled,
}: {
  product: Product;
  disabled?: boolean;
}) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <button
      disabled={disabled}
      onClick={() => {
        addItem(product);
        toast.success("Added to cart!");
      }}
      className="flex items-center justify-center gap-2.5 w-full py-4 rounded-2xl font-semibold text-base transition-all duration-200 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
      style={{
        background: disabled
          ? "#e0d0d5"
          : "linear-gradient(135deg, #FF5C8D 0%, #e0417a 100%)",
        color: disabled ? "#8a7a80" : "white",
        boxShadow: disabled ? "none" : "0 8px 24px rgba(255, 92, 141, 0.35)",
      }}
    >
      <ShoppingBag className="h-5 w-5" />
      {disabled ? "Out of Stock" : "Add to Cart"}
    </button>
  );
}