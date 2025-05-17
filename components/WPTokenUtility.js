// components/whitepaper/TokenUtility.js

export default function TokenUtility() {
    return (
      <section className="space-y-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-center">💰 $BFTX Token Utility</h2>
        <p className="text-white/80 text-lg max-w-4xl mx-auto text-center">
          $BFTX isn't just a token — it's the fuel that powers prediction, governance, and engagement
          across the BitFtx ecosystem.
        </p>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <div className="bg-[#1a1a1d] p-5 rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold mb-2">🎯 Make Predictions</h3>
            <p className="text-white/70">
              Stake $BFTX to participate in YES/NO markets. The more accurate you are, the more you earn.
            </p>
          </div>
  
          <div className="bg-[#1a1a1d] p-5 rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold mb-2">📈 Earn Rewards</h3>
            <p className="text-white/70">
              Users who forecast correctly receive $BFTX from the reward pool, creating a prediction-to-earn economy.
            </p>
          </div>
  
          <div className="bg-[#1a1a1d] p-5 rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold mb-2">🗳 Governance Voting</h3>
            <p className="text-white/70">
              Holders can vote on market disputes, feature proposals, and DAO treasury allocation.
            </p>
          </div>
  
          <div className="bg-[#1a1a1d] p-5 rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold mb-2">🚀 Premium Access</h3>
            <p className="text-white/70">
              $BFTX holders get early access to trending markets, leaderboard bonuses, and exclusive airdrops.
            </p>
          </div>
        </div>
      </section>
    );
  }
  