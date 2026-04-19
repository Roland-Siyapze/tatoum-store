"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/src/components/ui/sheet";
import { Button } from "@/src/components/ui/button";
import { useCartStore } from "@/src/store/cartStore";
import { CartItem } from "./CartItem";
import { WhatsAppButton } from "./WhatsAppButton";
import { formatPrice } from "@/src/lib/whatsapp";
import { ShoppingBag } from "lucide-react";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, totalPrice, clearCart } = useCartStore();

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="flex flex-col w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Your Cart ({items.length} items)</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 gap-3">
            <ShoppingBag className="h-16 w-16" />
            <p className="text-lg">Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {items.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>

            <div className="border-t pt-4 space-y-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-green-600">{formatPrice(totalPrice())}</span>
              </div>
              <WhatsAppButton />
              <Button
                variant="outline"
                className="w-full"
                onClick={clearCart}
              >
                Clear Cart
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}