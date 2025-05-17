// components/whitepaper/Roadmap.js

export default function Roadmap() {
    return (
      <section className="space-y-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-center">🗺️ Roadmap</h2>
        <p className="text-white/80 text-lg max-w-4xl mx-auto text-center">
          BitFtx is built for long-term impact. Here’s a phased plan for development, launch,
          and ecosystem expansion.
        </p>
  
        <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
          <div className="bg-[#1a1a1d] p-6 rounded-lg border-l-4 border-purple-500 shadow">
            <h3 className="text-xl font-semibold mb-1">✅ Q1 2025 – Launch Phase</h3>
            <ul className="list-disc list-inside text-white/70">
              <li>$BFTX Token Creation</li>
              <li>Website, Brand, and Community Setup</li>
              <li>Smart Contract MVP for Predictions</li>
              <li>Airdrop Campaign Launch</li>
            </ul>
          </div>
  
          <div className="bg-[#1a1a1d] p-6 rounded-lg border-l-4 border-purple-500 shadow">
            <h3 className="text-xl font-semibold mb-1">🚧 Q2 2025 – Exchange + Closed Beta</h3>
            <ul className="list-disc list-inside text-white/70">
              <li>DEX Launch on PancakeSwap</li>
              <li>Prediction Engine (Testnet)</li>
              <li>Governance Basics Live</li>
              <li>Community-Driven Market Creation</li>
            </ul>
          </div>
  
          <div className="bg-[#1a1a1d] p-6 rounded-lg border-l-4 border-purple-500 shadow">
            <h3 className="text-xl font-semibold mb-1">🔮 Q3 2025 – Product & Partnerships</h3>
            <ul className="list-disc list-inside text-white/70">
              <li>Public Prediction Market Launch</li>
              <li>Cross-chain Expansion (Polygon, Base)</li>
              <li>Onboarding Partners and Projects</li>
              <li>Social Leaderboard & Rewards</li>
            </ul>
          </div>
  
          <div className="bg-[#1a1a1d] p-6 rounded-lg border-l-4 border-purple-500 shadow">
            <h3 className="text-xl font-semibold mb-1">🌍 Q4 2025 – DAO + Scale</h3>
            <ul className="list-disc list-inside text-white/70">
              <li>Full DAO Governance Rollout</li>
              <li>Staking, Dispute Resolution</li>
              <li>Prediction-as-a-Service API</li>
              <li>Global User Acquisition</li>
            </ul>
          </div>
        </div>
      </section>
    );
  }
  