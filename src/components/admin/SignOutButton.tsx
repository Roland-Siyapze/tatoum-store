import { signOut } from "@/src/actions/auth";
import { LogOut } from "lucide-react";

export function SignOutButton() {
  return (
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
  );
}