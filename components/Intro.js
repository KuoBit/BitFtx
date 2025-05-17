// components/whitepaper/Intro.js

export default function WhitepaperIntro() {
    return (
      <section className="text-center space-y-6">
        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
          BitFtx Whitepaper
        </h1>
        <p className="text-white/80 max-w-3xl mx-auto text-lg">
          BitFtx is a decentralized crypto prediction exchange where users forecast crypto prices,
          global events, and financial outcomes to earn $BFTX tokens for being right. Built with a
          transparent, community-first approach and powered by smart contracts, BitFtx aims to be
          the go-to platform for collective intelligence and market foresight.
        </p>
        <p className="text-white/60 max-w-2xl mx-auto text-sm italic">
          This document outlines the motivation, design, tokenomics, and long-term vision for the
          BitFtx platform and $BFTX utility token.
        </p>
      </section>
    );
  }
  