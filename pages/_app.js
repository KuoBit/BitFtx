// pages/_app.js

import 'react-notion-x/src/styles.css';
import 'prismjs/themes/prism.css';        // code highlighting
import "../styles/globals.css";

import Script from "next/script";
import { useEffect } from "react";

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
