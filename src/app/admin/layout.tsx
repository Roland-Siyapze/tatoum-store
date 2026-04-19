import { AdminSidebar } from "@/src/components/layout/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <AdminSidebar />
      <main
        className="flex-1 p-8 overflow-y-auto"
        style={{ background: "#f9f2f5" }}
      >
        {children}
      </main>
    </div>
  );
}