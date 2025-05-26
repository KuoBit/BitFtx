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
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const completeSignIn = async () => {
        const { error } = await supabase.auth.getSessionFromUrl(); // ✅ For magic links
        if (error) {
          console.error("Error restoring session:", error.message);
        } else {
          console.log("Session restored");
          router.replace("/referrer"); // ✅ Go to dashboard
        }
        setLoading(false);
      };
  
      completeSignIn();
    }, []);
  
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg">{loading ? "Redirecting..." : "Failed to sign in"}</p>
      </div>
    );
  }
