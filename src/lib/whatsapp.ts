import { CartItem } from "@/src/types";

export function buildWhatsAppMessage(items: CartItem[], total: number): string {
  const lines = items.map(
    (item) =>
      `• ${item.product.name} x${item.quantity} — ${formatPrice(item.product.price * item.quantity)}`
  );

  const message = [
    "🛒 *New Order*",
    "",
    ...lines,
    "",
    `*Total: ${formatPrice(total)}*`,
    "",
    "Please confirm my order. Thank you!",
  ].join("\n");

  return message;
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("fr-CM", {
    style: "currency",
    currency: "XAF",
    minimumFractionDigits: 0,
  }).format(amount);
}

export function getWhatsAppURL(items: CartItem[], total: number): string {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const message = buildWhatsAppMessage(items, total);
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encoded}`;
}