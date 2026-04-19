import { createClient } from "@supabase/supabase-js";

/**
 * Service-role client — bypasses ALL RLS policies.
 * ONLY use in Server Actions / Route Handlers that are already
 * protected by middleware auth checks. Never expose to the client.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars"
    );
  }

  return createClient(url, key, {
    auth: {
      // Service role should never persist sessions
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}