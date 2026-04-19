// FILE → src/app/admin/layout.tsx

import Link from "next/link";
import { signOut } from "@/src/actions/auth";
import { Button } from "@/src/components/ui/button";
import { LayoutDashboard, Package, Tag, LogOut } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside
        className="w-60 flex flex-col"
        style={{ background: "#524A4E", color: "white" }}
      >
        {/* Logo */}
        <div
          className="p-5 flex items-center gap-2"
          style={{ borderBottom: "1px solid rgba(255,192,211,0.15)" }}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
            style={{ background: "linear-gradient(135deg, #FF5C8D, #FFC0D3)" }}
          >
            S
          </div>
          <span
            className="text-base font-bold"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            MyStore Admin
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {[
            { href: "/admin",            label: "Dashboard",  Icon: LayoutDashboard },
            { href: "/admin/products",   label: "Products",   Icon: Package },
            { href: "/admin/categories", label: "Categories", Icon: Tag },
          ].map(({ href, label, Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
              style={{
                color: "rgba(255,239,244,0.85)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,192,211,0.15)";
                (e.currentTarget as HTMLElement).style.color = "white";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.color = "rgba(255,239,244,0.85)";
              }}
            >
              <Icon className="h-4 w-4" style={{ color: "#FFC0D3" }} />
              {label}
            </Link>
          ))}
        </nav>

        {/* Sign out */}
        <div className="p-4" style={{ borderTop: "1px solid rgba(255,192,211,0.15)" }}>
          <form action={signOut}>
            <button
              type="submit"
              className="flex items-center gap-2 w-full px-3 py-2 rounded-xl text-sm font-medium transition-all"
              style={{ color: "rgba(255,239,244,0.6)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#FF5C8D";
                (e.currentTarget as HTMLElement).style.background = "rgba(255,92,141,0.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "rgba(255,239,244,0.6)";
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <main
        className="flex-1 p-8 overflow-y-auto"
        style={{ background: "#f9f2f5" }}
      >
        {children}
      </main>
    </div>
  );
}