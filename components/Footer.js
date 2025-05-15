// components/Footer.js
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
      <footer className="bg-[#0b0b0c] border-t border-white/10 py-10 px-6 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold mb-4">Join the BitFtx Community</h3>
          <div className="flex justify-center gap-6 mb-6">
            <a href="https://twitter.com/BitFtxOfficial" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition">
              <span className="sr-only">Twitter</span>
              <Image src="/icons/twitter.svg" width={24} height={24} alt="Twitter" />
            </a>
            <a href="https://t.me/BitFtxOfficial" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition">
              <span className="sr-only">Telegram</span>
              <Image src="/icons/telegram.svg" width={24} height={24} alt="Telegram" />
            </a>
            <a href="https://discord.gg/BitFtxOfficial" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition">
              <span className="sr-only">Discord</span>
              <Image src="/icons/discord.svg" width={24} height={24} alt="Discord" />
            </a>
          </div>

          <div className="text-sm text-white/50 flex flex-col sm:flex-row justify-center gap-4 mb-4">
            <a href="/terms" className="hover:text-purple-400">Terms & Conditions</a>
            <a href="/privacy" className="hover:text-purple-400">Privacy Policy</a>
            <a href="/data-policy" className="hover:text-purple-400">Data Policy</a>
            <a href="/sitemap.xml" className="hover:text-purple-400">Data Policy</a>
            <a href="blog" className="hover:text-purple-400">Blog</a>
          </div>

          <p className="text-sm text-white/50">&copy; 2025 BitFtx. All rights reserved.</p>
        </div>
      </footer>
  );
}
