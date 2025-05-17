// components/Header.js
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();
  const isHome = router.pathname === "/";

  const contractAddress = "0x42E6a5e559169b4cc5DEeB748795aE5F1970B221";
  const symbol = "BFTX";

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

  const handleScroll = (section) => {
    if (isHome) {
      const el = document.getElementById(section);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(`/#${section}`);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#0b0b0c]/80 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="BitFtx Logo" width={36} height={36} />
          <span className="text-xl font-bold tracking-wide text-white hover:text-purple-400">
            BitFtx
          </span>
        </Link>
      </div>
      <nav className="space-x-6 text-sm text-white/80 hidden sm:block">
        <button onClick={() => handleScroll("about")} className="hover:text-white">About</button>
        <Link href="/tokenomics" className="hover:text-white font-medium text-purple-400">Tokenomics</Link>
        <Link href="/whitepaper" className="hover:text-white font-medium text-purple-400">WhitePaper</Link>
        <Link href="https://pancakeswap.finance/swap?outputCurrency=0x42E6a5e559169b4cc5DEeB748795aE5F1970B221&use=V2" className="hover:text-white font-medium text-purple-400">Buy on PancakeSwap</Link>
        <Link href="https://dexscreener.com/bsc/0x42E6a5e559169b4cc5DEeB748795aE5F1970B221" className="hover:text-white font-medium text-purple-400">DexScanner</Link>
        <button onClick={{addTokenToWallet}} className="hover:text-white">Add to Metamask</button>
        <button onClick={() => handleScroll("roadmap")} className="hover:text-white">Roadmap</button>
        <button onClick={() => handleScroll("airdrop")} className="hover:text-white">Airdrop</button>
        <Link href="/blog" className="hover:text-white font-medium text-purple-400">Blog</Link>
      </nav>
    </header>
  );
}
