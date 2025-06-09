// pages/_app.js

import 'react-notion-x/src/styles.css';
import 'prismjs/themes/prism.css';
import "../styles/globals.css";
import AirdropModal from "@/components/AirdropModal";
import { createClient } from "@supabase/supabase-js";
import Script from "next/script";
import { useEffect } from "react";

const supabase = createClient(
  "https://onevirzsdrfxposewozx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9uZXZpcnpzZHJmeHBvc2V3b3p4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4MDIzNjksImV4cCI6MjA2MDM3ODM2OX0.IPFY8wqbxadZugoGIRWsGNU27tVqS8BEYJkem8WubAk"
);

export default function App({ Component, pageProps }) {
  // Google Analytics
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      gtag("js", new Date());
      gtag("config", "G-GZ4N5DCXE1");
    }
  }, []);

  // Supabase Magic Link Session Restore
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        console.log("User signed in via magic link", session);
      }

      if (event === "PASSWORDLESS_EMAIL_SENT") {
        const emailInput = document.querySelector("input[type='email']");
        if (emailInput && emailInput.value) {
          localStorage.setItem("bftx-login-email", emailInput.value);
          console.log("📥 Stored email for session restore:", emailInput.value);
        }
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Inject Tawk.to Live Chat
  useEffect(() => {
    if (typeof window !== "undefined") {
      var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
      const s1 = document.createElement("script");
      s1.async = true;
      s1.src = 'https://embed.tawk.to/684702bf104aab190fb4492b/1itam5f8b';
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      document.body.appendChild(s1);
    }
  }, []);

  const submitAirdrop = async (formData) => {
    return await supabase.from("airdrop_leads").insert([formData]);
  };

  return (
    <>
      {/* Google Analytics Script */}
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-GZ4N5DCXE1"
      />

      {/* Airdrop Modal */}
      <AirdropModal onSubmit={submitAirdrop} />

      {/* Main App Page */}
      <Component {...pageProps} />
    </>
  );
}
