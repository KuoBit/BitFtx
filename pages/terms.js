// pages/terms.js
import Head from "next/head";

export default function Terms() {
  return (
    <div className="bg-[#0b0b0c] text-white min-h-screen py-20 px-6 font-sans">
      <Head>
        <title>Terms & Conditions – BitFtx</title>
      </Head>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>
        <p className="text-white/80 mb-4">
          Welcome to BitFtx.com, operated by Kuobit Labs Pvt Ltd. By accessing or using this website, you agree to be bound by these terms and all applicable laws.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">1. Use of Site</h2>
        <p className="text-white/70 mb-4">
          BitFtx provides a decentralized prediction market platform. You agree not to misuse the platform or engage in any illegal activity.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">2. Intellectual Property</h2>
        <p className="text-white/70 mb-4">
          All content, branding, and logos are owned by Kuobit Labs Pvt Ltd. You may not reproduce or use them without permission.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">3. Limitation of Liability</h2>
        <p className="text-white/70 mb-4">
          BitFtx is provided "as is." We do not guarantee uptime, token value, or financial returns from participation.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">4. Amendments</h2>
        <p className="text-white/70 mb-4">
          We reserve the right to update these terms at any time. Changes will be effective upon posting.
        </p>
        <p className="text-white/50 text-sm mt-10">
          © 2025 BitFtx (Kuobit Labs Pvt Ltd). All rights reserved.
        </p>
      </div>
    </div>
  );
}
