export default function TokenUtility() {
    const utilities = [
      {
        icon: "🎯",
        title: "Prediction Participation",
        description: "Use $BFTX to create and vote on YES/NO markets across crypto, macro, and finance.",
      },
      {
        icon: "📈",
        title: "Staking & Yield",
        description: "Stake $BFTX to earn yield, get fee discounts, and unlock bonus rewards from prediction pools.",
      },
      {
        icon: "🗳️",
        title: "Governance Voting",
        description: "Vote on market creation, dispute resolution, protocol upgrades, and treasury usage.",
      },
      {
        icon: "🎟️",
        title: "Access Premium Markets",
        description: "Hold $BFTX to unlock exclusive markets, VIP access tiers, and early tournament invites.",
      },
      {
        icon: "🚀",
        title: "Launchpad Priority",
        description: "Get whitelisted for partner projects and early-stage prediction markets via launchpad.",
      },
      {
        icon: "🎁",
        title: "Airdrops & Badges",
        description: "Top predictors and community members earn bonus tokens, collectibles, and airdrop rights.",
      },
    ];
  
    return (
      <section id="utility" className="py-20 px-6 bg-[#0f0f11] text-white text-center">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-10">💰 $BFTX Utility</h2>
          <p className="text-white/80 text-lg mb-12 max-w-2xl mx-auto">
            $BFTX isn’t just a token — it’s the lifeblood of the BitFtx prediction economy.
          </p>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
            {utilities.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#1a1a1d] p-6 rounded-lg border border-white/10 shadow"
              >
                <h3 className="text-xl font-semibold mb-2">
                  {item.icon} {item.title}
                </h3>
                <p className="text-white/70">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  