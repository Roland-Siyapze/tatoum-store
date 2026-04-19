"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/src/components/ui/button";
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
    <Button
      size="lg"
      disabled={disabled}
      onClick={() => {
        addItem(product);
        toast.success("Added to cart!");
      }}
    >
      <ShoppingCart className="mr-2 h-5 w-5" />
      {disabled ? "Out of Stock" : "Add to Cart"}
    </Button>
  );
}