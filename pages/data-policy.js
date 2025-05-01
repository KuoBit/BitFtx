// pages/data-policy.js
import Head from "next/head";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function DataPolicy() {
  return (
    
    <div className="bg-[#0b0b0c] text-white min-h-screen py-20 px-6 font-sans">
      <Head>
        <title>Data Policy – BitFtx</title>
      </Head>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Data Policy</h1>
        <p className="text-white/80 mb-4">
          BitFtx, operated by Kuobit Labs Pvt Ltd, maintains strict policies for collecting, storing, and using data in a transparent and secure manner.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">1. What Data We Collect</h2>
        <p className="text-white/70 mb-4">
          We collect minimal personal information such as wallet address, email, and social handles as part of platform participation.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">2. How Data is Stored</h2>
        <p className="text-white/70 mb-4">
          Data is stored on secure databases like Supabase with encryption and access control policies in place.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">3. Your Rights</h2>
        <p className="text-white/70 mb-4">
          You may request to view, update, or delete your information by contacting us. We respect your privacy and your rights under applicable laws.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">4. Third Party Sharing</h2>
        <p className="text-white/70 mb-4">
          We do not share your personal data with any third party unless required for compliance or legal obligations.
        </p>
      </div>
    </div>
  );
}