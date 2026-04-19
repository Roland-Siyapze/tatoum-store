"use client";

import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import { useCartStore } from "@/src/store/cartStore";
import { CartItem as CartItemType } from "@/src/types";
import { formatPrice } from "@/src/lib/whatsapp";

export function CartItem({ item }: { item: CartItemType }) {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div
      className="flex gap-3 items-center p-3 rounded-2xl"
      style={{
        background: "rgba(255,255,255,0.8)",
        border: "1px solid rgba(255,192,211,0.35)",
        backdropFilter: "blur(4px)",
      }}
    >
      {/* Image */}
      <div
        className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0"
        style={{ background: "#FDEFF4" }}
      >
        {item.product.image_url ? (
          <Image
            src={item.product.image_url}
            alt={item.product.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-2xl">
            🛍️
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p
          className="font-semibold text-sm truncate leading-snug"
          style={{ color: "#524A4E" }}
        >
          {item.product.name}
        </p>
        <p
          className="text-sm font-bold mt-0.5"
          style={{ color: "#FF5C8D" }}
        >
          {formatPrice(item.product.price)}
        </p>

        {/* Quantity controls */}
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
            className="w-6 h-6 rounded-full flex items-center justify-center transition-all active:scale-90"
            style={{
              background: "rgba(255,192,211,0.4)",
              color: "#524A4E",
              border: "1px solid rgba(255,92,141,0.2)",
            }}
          >
            <Minus className="h-3 w-3" />
          </button>
          <span
            className="text-sm font-semibold w-6 text-center"
            style={{ color: "#524A4E" }}
          >
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
            className="w-6 h-6 rounded-full flex items-center justify-center transition-all active:scale-90"
            style={{
              background: "linear-gradient(135deg, #FF5C8D, #e0417a)",
              color: "white",
            }}
          >
            <Plus className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Subtotal + remove */}
      <div className="flex flex-col items-end gap-2">
        <button
          onClick={() => removeItem(item.product.id)}
          className="w-6 h-6 rounded-full flex items-center justify-center transition-all hover:opacity-70 active:scale-90"
          style={{ background: "rgba(255,92,141,0.1)", color: "#FF5C8D" }}
        >
          <X className="h-3 w-3" />
        </button>
        <p
          className="text-xs font-semibold"
          style={{ color: "#8a7a80" }}
        >
          {formatPrice(item.product.price * item.quantity)}
        </p>
      </div>
    </div>
  );
}