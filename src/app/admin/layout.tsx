import { AdminSidebar } from "@/src/components/layout/AdminSidebar";
import { SignOutButton } from "@/src/components/admin/SignOutButton";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <AdminSidebar signOutSlot={<SignOutButton />} />
      <main
        className="flex-1 p-8 overflow-y-auto"
        style={{ background: "#f9f2f5" }}
      >
        {children}
      </main>
    </div>
  );
}