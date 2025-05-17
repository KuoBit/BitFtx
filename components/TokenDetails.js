// components/TokenActions.js
import { useEffect, useState } from "react";

export default function TokenActions() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const addTokenToWallet = () => {
    if (typeof window !== "undefined" && window.ethereum) {
      window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: "0x42E6a5e559169b4cc5DEeB748795aE5F1970B221",
            symbol: "BFTX",
            decimals: 18,
            image: "/logo.png",
          },
        },
      });
    }
  };

  return (
    <section className="py-10 text-center bg-[#101012] text-white">
      <h2 className="text-2xl font-bold mb-4">🚀 Trade $BFTX Now</h2>
      <p className="text-white/70 mb-6">
        Live on PancakeSwap • View chart • Add to MetaMask
      </p>

      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <a
          href="https://pancakeswap.finance/swap?outputCurrency=0x42E6a5e559169b4cc5DEeB748795aE5F1970B221&use=V2"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold transition"
        >
          Buy on PancakeSwap
        </a>
        <a
          href="https://dexscreener.com/bsc/0x42E6a5e559169b4cc5DEeB748795aE5F1970B221"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#1f1f22] hover:bg-[#2a2a2d] border border-white/10 px-6 py-3 rounded-lg font-semibold transition"
        >
          View Live Chart
        </a>
        <button
          onClick={addTokenToWallet}
          className="underline text-purple-400 hover:text-purple-300 text-sm self-center"
        >
          + Add $BFTX to MetaMask
        </button>
      </div>

      {isClient && (
        <iframe
          src="https://dexscreener.com/bsc/0x42E6a5e559169b4cc5DEeB748795aE5F1970B221?embed=1&theme=dark"
          height="400"
          width="100%"
          frameBorder="0"
          className="rounded-lg border border-white/10"
          allowTransparency="true"
        ></iframe>
      )}
    </section>
  );
}
