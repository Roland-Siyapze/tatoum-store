"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { useCartStore } from "@/src/store/cartStore";
import { CartItem as CartItemType } from "@/src/types";
import { formatPrice } from "@/src/lib/whatsapp";

export function CartItem({ item }: { item: CartItemType }) {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="flex gap-3 items-center">
      <div className="relative w-16 h-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
        {item.product.image_url ? (
          <Image
            src={item.product.image_url}
            alt={item.product.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">📦</div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm truncate">{item.product.name}</p>
        <p className="text-sm text-green-600 font-semibold">
          {formatPrice(item.product.price)}
        </p>

        <div className="flex items-center gap-2 mt-1">
          <Button
            size="icon"
            variant="outline"
            className="h-6 w-6"
            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="text-sm w-6 text-center">{item.quantity}</span>
          <Button
            size="icon"
            variant="outline"
            className="h-6 w-6"
            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </div>

      <Button
        size="icon"
        variant="ghost"
        className="text-red-400 hover:text-red-600"
        onClick={() => removeItem(item.product.id)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}