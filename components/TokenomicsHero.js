import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function TokenomicsHero() {
  return (
    <section className="relative bg-[#0b0b0c] text-white pt-32 pb-24 px-6 text-center overflow-hidden">
      {/* Optional Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black z-0 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
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
      </div>
    </section>
  );
}
