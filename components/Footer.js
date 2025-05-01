// components/Footer.js
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#0b0b0c] border-t border-white/10 py-10 px-6 text-white text-center mt-20">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-xl font-semibold mb-4">Join the BitFtx Community</h3>
        <div className="flex justify-center gap-6 mb-6">
          <Link href="https://twitter.com/BitFtxOfficial"><a target="_blank" rel="noopener">
            <Image src="/icons/twitter.svg" width={24} height={24} alt="Twitter" />
          </a></Link>
          <Link href="https://t.me/BitFtxOfficial"><a target="_blank" rel="noopener">
            <Image src="/icons/telegram.svg" width={24} height={24} alt="Telegram" />
          </a></Link>
          <Link href="https://discord.gg/BitFtxOfficial"><a target="_blank" rel="noopener">
            <Image src="/icons/discord.svg" width={24} height={24} alt="Discord" />
          </a></Link>
        </div>
        <div className="space-x-4 text-sm">
          <Link href="/terms"><a className="hover:text-purple-400">Terms &amp; Conditions</a></Link>|
          <Link href="/privacy"><a className="hover:text-purple-400">Privacy</a></Link>|
          <Link href="/data-policy"><a className="hover:text-purple-400">Data Policy</a></Link>
        </div>
        <p className="text-sm text-white/50 mt-4">&copy; 2025 BitFtx. All rights reserved.</p>
      </div>
    </footer>
  );
}
