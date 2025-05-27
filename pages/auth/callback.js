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
    const restoreSession = async () => {
      const email = localStorage.getItem("bftx-login-email");
      if (!email) {
        console.error("No stored email found for session restore.");
        setLoading(false);
        return;
      }

      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { shouldCreateUser: false }
      });

      if (error) {
        console.error("Failed to restore session:", error.message);
      } else {
        console.log("Session restored, redirecting...");
        router.replace("/referrer");
      }
      setLoading(false);
    };

    restoreSession();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-white text-lg">
        {loading ? "Restoring session, please wait..." : "Session could not be restored."}
      </p>
    </div>
  );
}

export async function getServerSideProps() {
  return { props: {} };
}
