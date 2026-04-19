import Link from "next/link";
import { signOut } from "@/src/actions/auth";
import { Button } from "@/src/components/ui/button";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-60 bg-gray-900 text-white flex flex-col">
        <div className="p-6 text-xl font-bold border-b border-gray-700">
          🛍️ Admin Panel
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link
            href="/admin"
            className="block px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/products"
            className="block px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
          >
            Products
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <form action={signOut}>
            <Button variant="ghost" className="w-full text-white hover:text-red-300">
              Sign Out
            </Button>
          </form>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8 bg-gray-50 overflow-y-auto">{children}</main>
    </div>
  );
}