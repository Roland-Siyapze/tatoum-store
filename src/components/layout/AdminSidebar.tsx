"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, Tag, LogOut } from "lucide-react";
import { signOut } from "@/src/actions/auth";

const navItems = [
  { href: "/admin",            label: "Dashboard",  Icon: LayoutDashboard },
  { href: "/admin/products",   label: "Products",   Icon: Package },
  { href: "/admin/categories", label: "Categories", Icon: Tag },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="w-60 flex flex-col flex-shrink-0"
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
        {navItems.map(({ href, label, Icon }) => {
          const isActive =
            href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors"
              style={{
                background: isActive ? "rgba(255,192,211,0.15)" : "transparent",
                color: isActive ? "white" : "rgba(255,239,244,0.75)",
              }}
            >
              <Icon
                className="h-4 w-4 flex-shrink-0"
                style={{ color: isActive ? "#FFC0D3" : "rgba(255,192,211,0.6)" }}
              />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Sign out */}
      <div className="p-4" style={{ borderTop: "1px solid rgba(255,192,211,0.15)" }}>
        <form action={signOut}>
          <button
            type="submit"
            className="flex items-center gap-2 w-full px-3 py-2 rounded-xl text-sm font-medium transition-colors hover:text-rose-300 hover:bg-rose-500/10"
            style={{ color: "rgba(255,239,244,0.5)" }}
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </form>
      </div>
    </aside>
  );
}