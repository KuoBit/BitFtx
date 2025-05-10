// components/TokenomicsHero.js
import React from "react";
import Link from "next/link";

export default function TokenomicsHero() {
  return (
<section className="min-h-screen w-full bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white ...">
<div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          $BFTX Tokenomics
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8">
          The fuel that powers BitFtx’s decentralized prediction ecosystem
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/airdrop">
            <a className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-2xl text-lg font-semibold shadow-lg transition">
              Join Airdrop
            </a>
          </Link>
          <Link href="#token-overview">
            <a className="border border-gray-500 hover:border-white text-gray-300 hover:text-white px-6 py-3 rounded-2xl text-lg font-semibold transition">
              Learn More
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
}
