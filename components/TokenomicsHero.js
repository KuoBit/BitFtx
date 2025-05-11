import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function TokenomicsHero() {
  return (
    <section className="relative bg-[#0b0b0c] text-white pt-48 pb-32 px-6 text-center overflow-hidden min-h-screen">
      {/* Optional Background Pattern or Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black z-0 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <Image
          src="/logo.png"
          alt="BitFtx Logo"
          width={80}
          height={80}
          className="mx-auto mb-6 drop-shadow"
        />
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
          $BFTX Tokenomics
        </h1>
        <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
          The fuel that powers BitFtx’s decentralized prediction ecosystem.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
        <Link href="/airdrop" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-2xl text-base font-semibold shadow transition">
  Join Airdrop
</Link>
          <Link href="#token-overview">
            <a className="border border-white/20 hover:border-white text-white/80 hover:text-white px-6 py-3 rounded-2xl text-base font-semibold transition">
              Learn More
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
}
