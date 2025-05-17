// components/whitepaper/Architecture.js

export default function Architecture() {
  return (
    <section className="space-y-6">
      <h2 className="text-3xl sm:text-4xl font-bold text-center">🧱 Platform Architecture</h2>
      <p className="text-white/80 text-lg max-w-4xl mx-auto text-center">
        BitFtx combines the transparency of on-chain smart contracts with the scalability of
        off-chain logic to enable fast, fair, and secure prediction markets.
      </p>

      <div className="bg-[#1a1a1d] p-6 rounded-lg border border-white/10 max-w-5xl mx-auto">
        <ul className="space-y-4 text-white/70 list-disc list-inside">
          <li>
            <strong>Smart Contracts:</strong> Deployed on Binance Smart Chain, the contracts handle token
            staking, market resolution, reward distribution, and governance logic.
          </li>
          <li>
            <strong>Market Engine:</strong> Markets are created with YES/NO outcomes tied to verifiable events
            (e.g. BTC price targets, macro events). Winnings are distributed based on outcome and stake size.
          </li>
          <li>
            <strong>Oracles:</strong> Initially semi-centralized for beta launch, with plans to transition to
            a decentralized oracle network (e.g. Chainlink or UMA) for trustless resolution.
          </li>
          <li>
            <strong>Frontend & API:</strong> Built using React, Next.js, and Supabase — ensuring real-time data,
            seamless UX, and decentralized publishing of prediction feeds.
          </li>
        </ul>
      </div>
    </section>
  );
}
