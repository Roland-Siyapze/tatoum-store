"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { useCartStore } from "@/src/store/cartStore";
import { CartDrawer } from "@/src/components/cart/CartDrawer";
import { useState } from "react";

export function Navbar() {
  const totalItems = useCartStore((s) => s.totalItems);
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          🛍️ MyStore
        </Link>
        <Button
          variant="outline"
          size="icon"
          className="relative"
          onClick={() => setCartOpen(true)}
        >
          <ShoppingCart className="h-5 w-5" />
          {totalItems() > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {totalItems()}
            </span>
          )}
        </Button>
      </div>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </nav>
  );
}