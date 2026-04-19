"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/src/components/ui/sheet";
import { useCartStore } from "@/src/store/cartStore";
import { CartItem } from "./CartItem";
import { WhatsAppButton } from "./WhatsAppButton";
import { formatPrice } from "@/src/lib/whatsapp";
import { ShoppingBag, Trash2 } from "lucide-react";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, totalPrice, clearCart } = useCartStore();

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent
        className="flex flex-col w-full sm:max-w-md p-0 gap-0"
        style={{ background: "#FDEFF4", border: "none" }}
      >
        {/* Header */}
        <SheetHeader
          className="p-5 pb-4"
          style={{ borderBottom: "1px solid rgba(255,192,211,0.4)" }}
        >
          <SheetTitle
            className="flex items-center gap-2 text-lg"
            style={{
              color: "#524A4E",
              fontFamily: "'Playfair Display', Georgia, serif",
            }}
          >
            <ShoppingBag className="h-5 w-5" style={{ color: "#FF5C8D" }} />
            Your Cart
            {items.length > 0 && (
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full ml-1"
                style={{ background: "#FF5C8D", color: "white" }}
              >
                {items.length}
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          /* Empty state */
          <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center"
              style={{ background: "rgba(255,192,211,0.3)" }}
            >
              <ShoppingBag className="h-10 w-10" style={{ color: "#FFC0D3" }} />
            </div>
            <div className="text-center">
              <p
                className="text-lg font-semibold mb-1"
                style={{
                  color: "#524A4E",
                  fontFamily: "'Playfair Display', Georgia, serif",
                }}
              >
                Your cart is empty
              </p>
              <p className="text-sm" style={{ color: "#8a7a80" }}>
                Add some beautiful items to get started
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Items list */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {items.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>

            {/* Footer */}
            <div
              className="p-5 space-y-4"
              style={{
                borderTop: "1px solid rgba(255,192,211,0.4)",
                background: "rgba(255,255,255,0.6)",
                backdropFilter: "blur(8px)",
              }}
            >
              {/* Total */}
              <div className="flex justify-between items-center">
                <span
                  className="text-base font-medium"
                  style={{ color: "#8a7a80" }}
                >
                  Total
                </span>
                <span
                  className="text-2xl font-bold"
                  style={{
                    color: "#FF5C8D",
                    fontFamily: "'Playfair Display', Georgia, serif",
                  }}
                >
                  {formatPrice(totalPrice())}
                </span>
              </div>

              {/* WhatsApp CTA */}
              <WhatsAppButton />

              {/* Clear cart */}
              <button
                onClick={clearCart}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:opacity-70"
                style={{ color: "#8a7a80" }}
              >
                <Trash2 className="h-3.5 w-3.5" />
                Clear cart
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}