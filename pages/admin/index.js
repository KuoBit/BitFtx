// pages/admin/index.js
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function AdminHome() {
  return (
    <>
      <Header />
      <div className="bg-[#0b0b0c] text-white min-h-screen py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
          <div className="space-y-4">
            <Link href="/admin/airdrop-leads" className="block bg-[#1a1a1c] p-4 rounded border border-gray-700 hover:bg-[#222]">
              📋 View Airdrop Leads
            </Link>
            <Link href="/admin/airdrop-campaign" className="block bg-[#1a1a1c] p-4 rounded border border-gray-700 hover:bg-[#222]">
              🎯 Manage Airdrop Campaigns
            </Link>
            <Link href="/admin/withdrawals" className="block bg-[#1a1a1c] p-4 rounded border border-gray-700 hover:bg-[#222]">
              Withdrawals Request
            </Link>
            {/* Add more admin links here as needed */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
