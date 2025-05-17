// pages/whitepaper.js
import Head from "next/head";
import WhitepaperIntro from "@/components/whitepaper/Intro";
import MarketProblem from "@/components/whitepaper/MarketProblem";
import Architecture from "@/components/whitepaper/Architecture";
import TokenUtility from "@/components/whitepaper/WPTokenUtility";
import TokenomicsSection from "@/components/whitepaper/WPTokenomics";
import Roadmap from "@/components/whitepaper/Roadmap";
import Governance from "@/components/whitepaper/Governance";
import Legal from "@/components/whitepaper/Legal";

export default function Whitepaper() {
  return (
    <div className="bg-[#0b0b0c] text-white min-h-screen font-sans">
      <Head>
        <title>BitFtx Whitepaper – Predict Crypto. Earn $BFTX</title>
        <meta name="description" content="$BFTX token utility, architecture, and roadmap for the BitFtx decentralized prediction exchange." />
        <meta property="og:title" content="BitFtx Whitepaper" />
        <meta property="og:image" content="/logo.png" />
      </Head>

      <main className="px-6 py-20 max-w-5xl mx-auto space-y-20">
        <WhitepaperIntro />
        <MarketProblem />
        <Architecture />
        <TokenUtility />
        <TokenomicsSection />
        <Roadmap />
        <Governance />
        <Legal />
      </main>
    </div>
  );
}