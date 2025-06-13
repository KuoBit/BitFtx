// pages/index.js
import Head from "next/head";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { useRouter } from 'next/router';

const supabase = createClient(
  "https://onevirzsdrfxposewozx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9uZXZpcnpzZHJmeHBvc2V3b3p4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4MDIzNjksImV4cCI6MjA2MDM3ODM2OX0.IPFY8wqbxadZugoGIRWsGNU27tVqS8BEYJkem8WubAk"
);

const contractAddress = "0x42E6a5e559169b4cc5DEeB748795aE5F1970B221";
const symbol = "BFTX";

const generateUserCode = () => {
  const randomHash = Math.random().toString(36).substring(2, 10); // 8-char base36
  return "BFTX-" + randomHash.toUpperCase();
};

const user_code = generateUserCode();


export default function Home() {
  const router = useRouter(); // ✅ now valid
  const [referrerCode, setReferrerCode] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    wallet: "",
    twitter: "",
    telegram: "",
  });
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (router.isReady) {
      const { ref } = router.query;
      if (ref) setReferrerCode(ref);
    }
  }, [router.isReady, router.query]);

  const addTokenToWallet = () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        window.ethereum.request({
          method: "wallet_watchAsset",
          params: {
            type: "ERC20",
            options: {
              address: contractAddress,
              symbol: symbol,
              decimals: 18,
              image: "/logo.png",
            },
          },
        });
      } catch (error) {
        console.error("Failed to add token", error);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("airdrop_leads").insert([
      {
        name: formData.name,
        email: formData.email,
        wallet: formData.wallet,
        twitter: formData.twitter,
        telegram: formData.telegram,
        user_code,
        referrer_code: referrerCode || null,
      },
    ]);
    if (error) {
      setMessage("❌ Error saving your submission.");
    } else {
          // ✅ Fire GA event
          if (typeof window !== "undefined" && window.gtag) {
            window.gtag("event", "airdrop_submit", {
              event_category: "Airdrop",
              event_label: ref || "organic",
              value: 1,
            });
          }
      setMessage("✅ You're in! Thanks for joining the airdrop.");
      setFormData({ name: "", wallet: "", email: "", twitter: "", telegram: "" });
    }
  };
  return (
    <div className="bg-[#0b0b0c] text-white min-h-screen font-sans">
            <Head>
        <title>BitFtx – Predict Crypto. Earn $BFTX</title>
        <meta name="description" content="BitFtx is a decentralized prediction market where you can forecast crypto, finance, and global events — and earn $BFTX for being right." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* OpenGraph (Discord, Telegram, etc) */}
        <meta property="og:title" content="BitFtx – Predict Crypto. Earn $BFTX" />
        <meta property="og:description" content="Join the decentralized prediction revolution. Powered by smart contracts. Backed by degens." />
        <meta property="og:image" content="/logo.png" />
        <meta property="og:url" content="https://bitftx.com" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BitFtx – Predict Crypto. Earn $BFTX" />
        <meta name="twitter:description" content="Forecast crypto trends, global events, and earn rewards. Launching now." />
        <meta name="twitter:image" content="/logo.png" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#0b0b0c]/80 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between">
  <div className="flex items-center gap-2">
    <Image src="/logo.png" alt="BitFtx Logo" width={36} height={36} />
    <h1 className="text-xl font-bold tracking-wide">
      <a href="/" className="hover:text-purple-400">BitFtx</a>
    </h1>
  </div>
  <nav className="space-x-6 text-sm text-white/80 hidden sm:block">
    <a href="#about" className="hover:text-white">About</a>
    <a href="/tokenomics" className="hover:text-white font-medium text-purple-400">Tokenomics</a>    
    <a href="/whitepaper" className="hover:text-white font-medium text-purple-400">Whitepaper</a>
    <Link href="https://pancakeswap.finance/swap?outputCurrency=0x42E6a5e559169b4cc5DEeB748795aE5F1970B221&use=V2" className="hover:text-white font-medium text-purple-400">Buy on PancakeSwap</Link>
        <Link href="https://dexscreener.com/bsc/0x42E6a5e559169b4cc5DEeB748795aE5F1970B221" className="hover:text-white font-medium text-purple-400">DexScanner</Link>
        <button onClick={addTokenToWallet} className="hover:text-white">Add to Metamask</button>
    <a href="#roadmap" className="hover:text-white">Roadmap</a>
    <a href="#airdrop" className="hover:text-white">Airdrop</a>
    <a href="/blog" className="hover:text-white font-medium text-purple-400">Blog</a>
    <Link href="/login" className="hover:text-white font-medium text-purple-400"><b>Login</b></Link>
  </nav>
</header>

      {/* Hero Section */}
      <main
  className="relative bg-cover bg-center min-h-[90vh] pt-48 overflow-hidden"
  style={{ backgroundImage: "url('/hero-bg.png')" }}
>
  {/* Dark overlay */}
  <div className="absolute inset-0 bg-black/80 z-0" />

  {/* Content */}
  <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-24">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Image
        src="/logo.png"
        alt="BitFtx Brain Logo"
        width={100}
        height={100}
        className="mx-auto mb-6 drop-shadow-lg animate-pulse"
      />
      <h2 className="text-4xl sm:text-5xl font-bold leading-tight mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
        Predict Crypto.<br />Earn $BFTX.
      </h2>
      <p className="text-lg text-white/80 max-w-xl mx-auto">
        A decentralized prediction exchange for degens, dreamers, and true believers.
      </p>
    </motion.div>
  </div>
</main>


{/* About BitFtx Section */}
<section id="about" className="py-20 px-6 bg-[#111114] text-white text-center">
  <div className="max-w-4xl mx-auto">
    <h2 className="text-3xl sm:text-4xl font-bold mb-6">
      🧠 What is BitFtx?
    </h2>
    <p className="text-lg text-white/80 leading-relaxed">
      <strong>BitFtx</strong> is a decentralized prediction exchange that lets anyone forecast the future of crypto, 
      finance, and macro events — and earn $BFTX for being right. <br /><br />
      Bet YES/NO on events like “Will Bitcoin hit $100K by December?”, and profit from accurate predictions. 
      Powered by smart contracts. Governed by the community. Built for degens who see ahead.
    </p>
  </div>
</section>

{/* Token Live CTA Section */}
<section className="py-16 px-4 md:px-20 bg-[#101012] text-white text-center">
  <h2 className="text-3xl font-bold mb-6">🚀 $BFTX is Now Live!</h2>
  <p className="text-white/70 mb-6">
    You can now trade, chart, or add $BFTX directly to your wallet.
  </p>
  <div className="flex flex-wrap gap-4 justify-center">
    <a
      href="https://pancakeswap.finance/swap?outputCurrency=0x42E6a5e559169b4cc5DEeB748795aE5F1970B221&use=V2"
      target="_blank"
      rel="noopener noreferrer"
    >
      <button className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded font-semibold">
        Buy on PancakeSwap
      </button>
    </a>
    <a
      href="https://dexscreener.com/bsc/0x42E6a5e559169b4cc5DEeB748795aE5F1970B221"
      target="_blank"
      rel="noopener noreferrer"
    >
      <button className="border border-white/20 px-6 py-2 rounded font-semibold">
        View Chart
      </button>
    </a>
    <button
      onClick={addTokenToWallet}
      className="underline text-sm text-purple-400 hover:text-purple-300"
    >
      + Add $BFTX to MetaMask
    </button>
  </div>
</section>


{/* Token Utility Section */}
<section id="utility" className="py-20 px-6 bg-[#0f0f11] text-white text-center">
  <div className="max-w-4xl mx-auto">
    <h2 className="text-3xl sm:text-4xl font-bold mb-6">💰 $BFTX Utility</h2>
    <p className="text-white/80 text-lg mb-8">
      $BFTX isn’t just a token — it’s the fuel that powers the prediction ecosystem.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
      <div className="bg-[#1a1a1d] p-6 rounded-lg border border-white/10 shadow">
        <h3 className="text-xl font-semibold mb-2">🎯 Predict Outcomes</h3>
        <p className="text-white/70">
          Use $BFTX to make YES/NO predictions on crypto, DeFi, macro markets and more.
        </p>
      </div>

      <div className="bg-[#1a1a1d] p-6 rounded-lg border border-white/10 shadow">
        <h3 className="text-xl font-semibold mb-2">📈 Earn on Accuracy</h3>
        <p className="text-white/70">
          Predict correctly and earn real $BFTX rewards — accuracy pays.
        </p>
      </div>

      <div className="bg-[#1a1a1d] p-6 rounded-lg border border-white/10 shadow">
        <h3 className="text-xl font-semibold mb-2">🗳 Community Governance</h3>
        <p className="text-white/70">
          Stake $BFTX to vote on markets, resolutions, upgrades, and proposals.
        </p>
      </div>

      <div className="bg-[#1a1a1d] p-6 rounded-lg border border-white/10 shadow">
        <h3 className="text-xl font-semibold mb-2">🚀 Early Access & Airdrops</h3>
        <p className="text-white/70">
          Holding $BFTX gives you priority access to exclusive markets, badges, and airdrops.
        </p>
      </div>
    </div>
  </div>
</section>

{/* Tokenomics Section */}
<section id="tokenomics" className="py-20 px-6 bg-[#111114] text-white text-center">
  <div className="max-w-4xl mx-auto">
    <h2 className="text-3xl sm:text-4xl font-bold mb-6">📊 Tokenomics</h2>
    <p className="text-white/80 text-lg mb-10">
      A fair and forward-looking distribution designed to fuel growth, reward believers, and power the ecosystem.
    </p>

    <p className="text-sm text-purple-400 mt-2">
  🔗 <a href="https://bscscan.com/token/0x42E6a5e559169b4cc5DEeB748795aE5F1970B221" target="_blank" rel="noopener noreferrer">View Contract</a> &nbsp;|&nbsp;
  <a href="https://pancakeswap.finance/swap?outputCurrency=0x42E6a5e559169b4cc5DEeB748795aE5F1970B221&use=V2" target="_blank" rel="noopener noreferrer">Trade on PancakeSwap</a> &nbsp;|&nbsp;
  <a href="https://dexscreener.com/bsc/0x42E6a5e559169b4cc5DEeB748795aE5F1970B221" target="_blank" rel="noopener noreferrer">Live Chart</a>
</p>

<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
  <div className="bg-[#1a1a1d] p-5 rounded-lg border border-white/10">
    <h3 className="text-xl font-semibold">🧑‍🤝‍🧑 Community Rewards</h3>
    <p className="text-white/70 mt-1">30% – Prediction rewards, staking, contributor incentives</p>
  </div>

  <div className="bg-[#1a1a1d] p-5 rounded-lg border border-white/10">
    <h3 className="text-xl font-semibold">👨‍💼 Team & Advisors</h3>
    <p className="text-white/70 mt-1">20% – Core contributors, advisor allocation (with vesting)</p>
  </div>

  <div className="bg-[#1a1a1d] p-5 rounded-lg border border-white/10">
    <h3 className="text-xl font-semibold">🏦 Treasury Reserve</h3>
    <p className="text-white/70 mt-1">15% – Ecosystem growth, grants, insurance</p>
  </div>

  <div className="bg-[#1a1a1d] p-5 rounded-lg border border-white/10">
    <h3 className="text-xl font-semibold">🔒 Private Sale</h3>
    <p className="text-white/70 mt-1">15% – Strategic early backers, vesting enforced</p>
  </div>

  <div className="bg-[#1a1a1d] p-5 rounded-lg border border-white/10">
    <h3 className="text-xl font-semibold">🌍 Public Sale (IDO)</h3>
    <p className="text-white/70 mt-1">10% – Launchpad offerings, DEX liquidity</p>
  </div>

  <div className="bg-[#1a1a1d] p-5 rounded-lg border border-white/10">
    <h3 className="text-xl font-semibold">💧 Liquidity & CEX</h3>
    <p className="text-white/70 mt-1">10% – PancakeSwap, future CEX listings</p>
  </div>
</div>
<div className="mt-10">
  <a
    href="/tokenomics"
    className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition"
  >
    📖 View Full Tokenomics
  </a>
</div>
  </div>
</section>

{/* Roadmap Section */}
<section id="roadmap" className="py-20 px-6 bg-[#0f0f11] text-white text-center">
  <div className="max-w-4xl mx-auto">
    <h2 className="text-3xl sm:text-4xl font-bold mb-6">🗺️ Roadmap</h2>
    <p className="text-white/80 text-lg mb-10">
      Here’s how we’re building BitFtx into the #1 crypto prediction platform.
    </p>

    <div className="grid grid-cols-1 gap-6 text-left">
      <div className="bg-[#1a1a1d] p-6 rounded-lg border-l-4 border-purple-500 shadow-md">
        <h3 className="text-xl font-semibold mb-1">✅ Q1 2025 – Launch Phase</h3>
        <ul className="text-white/70 list-disc ml-5">
          <li>ERC-20 Token ($BFTX) Launch</li>
          <li>Website + Socials Live</li>
          <li>Community Building & Whitelist</li>
        </ul>
      </div>

      <div className="bg-[#1a1a1d] p-6 rounded-lg border-l-4 border-purple-500 shadow-md">
        <h3 className="text-xl font-semibold mb-1">🚧 Q2 2025 – Exchange Listings + Beta</h3>
        <ul className="text-white/70 list-disc ml-5">
          <li>DEX Listings (Uniswap / Sushi)</li>
          <li>Closed Beta for Prediction Markets</li>
          <li>Airdrop Campaign Begins</li>
        </ul>
      </div>

      <div className="bg-[#1a1a1d] p-6 rounded-lg border-l-4 border-purple-500 shadow-md">
        <h3 className="text-xl font-semibold mb-1">🔮 Q3 2025 – Product & Partnerships</h3>
        <ul className="text-white/70 list-disc ml-5">
          <li>Public Market Launch</li>
          <li>Cross-chain Predictions</li>
          <li>Partnership Announcements</li>
        </ul>
      </div>

      <div className="bg-[#1a1a1d] p-6 rounded-lg border-l-4 border-purple-500 shadow-md">
        <h3 className="text-xl font-semibold mb-1">🌎 Q4 2025 – Growth & Governance</h3>
        <ul className="text-white/70 list-disc ml-5">
          <li>DAO Launch & Governance Voting</li>
          <li>Leaderboard & Staking</li>
          <li>Global Marketing Push</li>
        </ul>
      </div>
    </div>
  </div>
</section>

{/* Airdrop Section */}
<section id="airdrop" className="py-20 px-6 bg-[#111114] text-white text-center">
  <div className="max-w-2xl mx-auto">
    <h2 className="text-3xl sm:text-4xl font-bold mb-6">🎁 Join the $BFTX Airdrop</h2>
    <p className="text-white/80 mb-8">
      Fill in the details below to qualify for the upcoming airdrop.
    </p>
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-4 text-left"
    >
      <input
  type="text"
  name="name"
  value={formData.name}
  onChange={handleChange}
  placeholder="Full Name"
  className="p-3 rounded bg-[#1a1a1d] border border-white/10"
  required
/>
      <input
        type="text"
        name="wallet"
        value={formData.wallet}
        onChange={handleChange}
        placeholder="Wallet Address"
        className="p-3 rounded bg-[#1a1a1d] border border-white/10"
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className="p-3 rounded bg-[#1a1a1d] border border-white/10"
        required
      />
      <input
        type="text"
        name="twitter"
        value={formData.twitter}
        onChange={handleChange}
        placeholder="Twitter Handle"
        className="p-3 rounded bg-[#1a1a1d] border border-white/10"
        required
      />
      <input
        type="text"
        name="telegram"
        value={formData.telegram}
        onChange={handleChange}
        placeholder="Telegram Username"
        className="p-3 rounded bg-[#1a1a1d] border border-white/10"
        required
      />
      <button
        type="submit"
        className="bg-purple-600 hover:bg-purple-700 transition p-3 rounded font-bold"
      >
        Submit
      </button>
    </form>
    {message && <p className="mt-4 text-sm text-white/70">{message}</p>}
  </div>
</section>


{/* FAQ Section */}
<section id="faq" className="py-20 px-6 bg-[#111114] text-white text-center">
  <div className="max-w-4xl mx-auto">
    <h2 className="text-3xl sm:text-4xl font-bold mb-10">❓ Frequently Asked Questions</h2>

    <div className="space-y-4 text-left">

      {/* Question 1 */}
      <div className="group border border-white/10 rounded-lg overflow-hidden">
        <button className="w-full px-6 py-4 flex justify-between items-center text-left focus:outline-none group">
          <span className="text-white font-medium">What is BitFtx?</span>
          <span className="text-purple-400 group-hover:rotate-180 transition-transform">▼</span>
        </button>
        <div className="px-6 pb-4 text-white/70 hidden group-focus-within:block">
          BitFtx is a decentralized crypto prediction exchange where users forecast real-world events and earn rewards in $BFTX for accurate predictions.
        </div>
      </div>

      {/* Question 2 */}
      <div className="group border border-white/10 rounded-lg overflow-hidden">
        <button className="w-full px-6 py-4 flex justify-between items-center text-left focus:outline-none group">
          <span className="text-white font-medium">How do I earn $BFTX?</span>
          <span className="text-purple-400 group-hover:rotate-180 transition-transform">▼</span>
        </button>
        <div className="px-6 pb-4 text-white/70 hidden group-focus-within:block">
          You earn $BFTX by participating in prediction markets, voting on resolutions, staking, and qualifying for community airdrops.
        </div>
      </div>

      {/* Question 3 */}
      <div className="group border border-white/10 rounded-lg overflow-hidden">
        <button className="w-full px-6 py-4 flex justify-between items-center text-left focus:outline-none group">
          <span className="text-white font-medium">Is $BFTX available on exchanges?</span>
          <span className="text-purple-400 group-hover:rotate-180 transition-transform">▼</span>
        </button>
        <div className="px-6 pb-4 text-white/70 hidden group-focus-within:block">
  Yes! $BFTX is live and tradable on PancakeSwap (V2). You can also view the price chart on Dexscreener and verify the contract on BscScan.
</div>
      </div>

      {/* Question 4 */}
      <div className="group border border-white/10 rounded-lg overflow-hidden">
        <button className="w-full px-6 py-4 flex justify-between items-center text-left focus:outline-none group">
          <span className="text-white font-medium">What chains does BitFtx support?</span>
          <span className="text-purple-400 group-hover:rotate-180 transition-transform">▼</span>
        </button>
        <div className="px-6 pb-4 text-white/70 hidden group-focus-within:block">
          BitFtx will launch on Ethereum (Sepolia → Mainnet), with plans to expand to other EVM chains like Polygon and Base.
        </div>
      </div>

    </div>
  </div>
</section>
      {/* Footer */}
      <footer className="bg-[#0b0b0c] border-t border-white/10 py-10 px-6 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold mb-4">Join the BitFtx Community</h3>
          <div className="flex justify-center gap-6 mb-6">
            <a href="https://twitter.com/BitFtxOfficial" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition">
              <span className="sr-only">Twitter</span>
              <Image src="/icons/twitter.svg" width={24} height={24} alt="Twitter" />
            </a>
            <a href="https://t.me/BitFtx" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition">
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
            <a href="/sitemap.xml" className="hover:text-purple-400">Sitemap</a>
            <a href="blog" className="hover:text-purple-400">Blog</a>
          </div>

          <p className="text-sm text-white/50">&copy; 2025 BitFtx. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
