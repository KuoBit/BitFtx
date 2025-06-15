import Link from "next/link";

export default function AdminHeader() {
  return (
    <nav className="mt-4 space-x-6 text-sm text-white/80 block py-4 text-center">
      <Link href="/admin/airdrop-leads" className="hover:text-white font-medium text-purple-400">Airdrop Leads</Link>
      <Link href="/admin/airdrop-campaign" className="hover:text-white font-medium text-purple-400">Airdrop Campaign</Link>
      <Link href="/admin/withdrawals" className="hover:text-white font-medium text-purple-400">Withdrawal Requests</Link>
      <Link href="/admin/email-sender" className="hover:text-white font-medium text-purple-400">Email Sender</Link>
    </nav>
  );
}
