// components/Header.js
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
      <header className="fixed top-0 left-0 w-full z-50 bg-[#0b0b0c]/80 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between">
  <div className="flex items-center gap-2">
    <Image src="/logo.png" alt="BitFtx Logo" width={36} height={36} />
    <h1 className="text-xl font-bold tracking-wide">
      <a href="/" className="hover:text-purple-400">BitFtx</a>
    </h1>
  </div>
  <nav className="space-x-6 text-sm text-white/80 hidden sm:block">
    <a href="#about" className="hover:text-white">About</a>
    <a href="#tokenomics" className="hover:text-white">Tokenomics</a>
    <a href="#roadmap" className="hover:text-white">Roadmap</a>
    <a href="#airdrop" className="hover:text-white">Airdrop</a>
    <a href="/blog" className="hover:text-white font-medium text-purple-400">Blog</a>
  </nav>
</header>
  );
}
