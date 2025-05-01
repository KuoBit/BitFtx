// components/Header.js
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#0b0b0c]/80 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Link href="/">
          <a className="flex items-center gap-2">
            <Image src="/logo.png" width={36} height={36} alt="BitFtx Logo" />
            <span className="text-xl font-bold tracking-wide">BitFtx</span>
          </a>
        </Link>
      </div>
      <nav className="space-x-6 text-sm text-white/80 hidden sm:block">
        <Link href="/#about"><a className="hover:text-white">About</a></Link>
        <Link href="/#tokenomics"><a className="hover:text-white">Tokenomics</a></Link>
        <Link href="/#roadmap"><a className="hover:text-white">Roadmap</a></Link>
        <Link href="/#airdrop"><a className="hover:text-white">Airdrop</a></Link>
        <Link href="/blog"><a className="hover:text-white">Blog</a></Link>
      </nav>
    </header>
  );
}
