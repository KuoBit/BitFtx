// pages/privacy.js
import Head from "next/head";

export default function Privacy() {
  return (
    <div className="bg-[#0b0b0c] text-white min-h-screen py-20 px-6 font-sans">
      <Head>
        <title>Privacy Policy – BitFtx</title>
      </Head>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-white/80 mb-4">
          At BitFtx.com, operated by Kuobit Labs Pvt Ltd, we are committed to protecting your privacy. This policy outlines how we handle your personal information.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">1. Data Collection</h2>
        <p className="text-white/70 mb-4">
          We collect information you voluntarily submit, such as wallet address, email, and social handles when participating in our platform.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">2. Use of Data</h2>
        <p className="text-white/70 mb-4">
          Your data is used to manage your account, participate in airdrops, and improve our services. We never sell your information to third parties.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">3. Cookies & Analytics</h2>
        <p className="text-white/70 mb-4">
          We may use cookies and analytics tools to improve user experience. You can control these via your browser settings.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">4. Security</h2>
        <p className="text-white/70 mb-4">
          We implement best practices to safeguard your data but cannot guarantee 100% security due to the nature of the internet.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">5. Policy Updates</h2>
        <p className="text-white/70 mb-4">
          We may update this policy occasionally. Changes will be posted on this page.
        </p>
        <p className="text-white/50 text-sm mt-10">
          © 2025 BitFtx (Kuobit Labs Pvt Ltd). All rights reserved.
        </p>
      </div>
    </div>
  );
}