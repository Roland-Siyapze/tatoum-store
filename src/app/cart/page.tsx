import { redirect } from "next/navigation";

// The cart is a slide-over drawer on the main store page.
// If someone navigates directly to /cart, send them home.
export default function CartPage() {
  redirect("/");
}