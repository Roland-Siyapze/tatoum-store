"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/src/store/cartStore";
import { CartDrawer } from "@/src/components/cart/CartDrawer";
import { useState } from "react";

export function Navbar() {
  const totalItems = useCartStore((s) => s.totalItems);
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <nav
        className="sticky top-0 z-50"
        style={{
          background: "rgba(253, 239, 244, 0.85)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255, 192, 211, 0.4)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-sm"
              style={{ background: "linear-gradient(135deg, #FF5C8D, #FFC0D3)" }}
            >
              S
            </div>
            <span
              className="text-xl font-bold tracking-tight"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: "#524A4E",
              }}
            >
              Tatoum&apos;Store
            </span>
          </Link>

          {/* Cart button */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 active:scale-95"
            style={{
              background: totalItems() > 0
                ? "linear-gradient(135deg, #FF5C8D, #e0417a)"
                : "rgba(255, 192, 211, 0.3)",
              color: totalItems() > 0 ? "white" : "#524A4E",
              border: "1px solid rgba(255, 92, 141, 0.2)",
            }}
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="text-sm font-medium hidden sm:inline">Cart</span>
            {totalItems() > 0 && (
              <span
                className="flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold"
                style={{
                  background: "rgba(255,255,255,0.25)",
                  color: "white",
                }}
              >
                {totalItems()}
              </span>
            )}
          </button>
        </div>
      </nav>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}