// pages/auth/callback.js
import { useEffect } from "react";
import { useRouter } from "next/router";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    "https://onevirzsdrfxposewozx.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9uZXZpcnpzZHJmeHBvc2V3b3p4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4MDIzNjksImV4cCI6MjA2MDM3ODM2OX0.IPFY8wqbxadZugoGIRWsGNU27tVqS8BEYJkem8WubAk"
  );

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleLogin = async () => {
      const { error } = await supabase.auth.exchangeCodeForSession();
      if (error) {
        console.error("Login error:", error);
      } else {
        router.replace("/referrer");
      }
    };

    handleLogin();
  }, []);

  return <p className="p-10 text-center">Redirecting...</p>;
}
