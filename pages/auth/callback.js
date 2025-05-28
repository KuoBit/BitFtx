// pages/auth/callback.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://onevirzsdrfxposewozx.supabase.co", // your actual URL
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9uZXZpcnpzZHJmeHBvc2V3b3p4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4MDIzNjksImV4cCI6MjA2MDM3ODM2OX0.IPFY8wqbxadZugoGIRWsGNU27tVqS8BEYJkem8WubAk" // your actual anon key
);

export default function AuthCallback() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (session) {
        console.log("✅ Session found. Redirecting to /referrer...");
        router.replace("/referrer");
      } else {
        console.warn("❌ No session found. Stuck at auth callback.");
      }

      setLoading(false);
    };

    checkSession();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-white text-lg">
        {loading ? "Redirecting to your dashboard..." : "Unable to sign you in."}
      </p>
    </div>
  );
}

export async function getServerSideProps() {
  return { props: {} };
}