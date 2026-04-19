import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Plain client with no cookies — safe for generateStaticParams / build time
export function createStaticClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}