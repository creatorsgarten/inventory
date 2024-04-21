import { createClient } from "@supabase/supabase-js";

import { backendMode } from "./backendMode";
import { Database } from "./supabaseTypes";

export const singletonSupabase =
  backendMode === "prod"
    ? createClient<Database>(
        "https://gfakhdrrqdphymgcbtfs.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmYWtoZHJycWRwaHltZ2NidGZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI1NzQyNTQsImV4cCI6MjAyODE1MDI1NH0.W1bmYyKNF4VmQPix6hjE9GAhBbcET-jRKAXRrSupfKU"
      )
    : createClient<Database>(
        "http://localhost:54321",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0"
      );

if (typeof window !== "undefined") {
  Object.assign(window, { supabase: singletonSupabase });
}
