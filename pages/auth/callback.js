// pages/auth/callback.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
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
