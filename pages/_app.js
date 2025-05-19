// pages/_app.js

import 'react-notion-x/src/styles.css';
import 'prismjs/themes/prism.css';        // code highlighting
import "../styles/globals.css";
import AirdropModal from "@/components/AirdropModal";
import { createClient } from "@supabase/supabase-js";
import Script from "next/script";
import { useEffect } from "react";

const supabase = createClient(
  "https://onevirzsdrfxposewozx.supabase.co", // your actual URL
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9uZXZpcnpzZHJmeHBvc2V3b3p4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4MDIzNjksImV4cCI6MjA2MDM3ODM2OX0.IPFY8wqbxadZugoGIRWsGNU27tVqS8BEYJkem8WubAk" // your actual anon key
);

export default function Home() {
  const submitAirdrop = async (formData) => {
    return await supabase.from("airdrop_leads").insert([formData]);
  };

  return (
    <>
      {/* Your current page */}
      <AirdropModal onSubmit={submitAirdrop} />
      {/* Rest of your site */}
    </>
  );
}

export default function App({ Component, pageProps }) {
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

  return (
    <>
      {/* Google Analytics Script */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-GZ4N5DCXE1`}
      />
      <Component {...pageProps} />
    </>
  );
}
