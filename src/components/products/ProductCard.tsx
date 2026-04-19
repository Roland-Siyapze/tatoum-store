"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardFooter } from "@/src/components/ui/card";
import { useCartStore } from "@/src/store/cartStore";
import { Product } from "@/src/types";
import { formatPrice } from "@/src/lib/whatsapp";
import { toast } from "sonner";

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);

  const handleAdd = () => {
    addItem(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl">
              📦
            </div>
          )}
        </div>
      </Link>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg truncate">{product.name}</h3>
        <p className="text-sm text-gray-500 line-clamp-2 mt-1">
          {product.description}
        </p>
        <p className="text-xl font-bold mt-2 text-green-600">
          {formatPrice(product.price)}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button onClick={handleAdd} className="w-full" size="sm">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}