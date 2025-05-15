export default function FundUsage() {
  const usage = [
    {
      label: "Development",
      percent: "35%",
      description:
        "Smart contract audits, platform engineering, and feature updates.",
    },
    {
      label: "Marketing & Community",
      percent: "25%",
      description:
        "Campaigns, airdrops, content, creator grants, and global outreach.",
    },
    {
      label: "Liquidity Provision",
      percent: "15%",
      description:
        "Initial liquidity for DEX/CEX listings and protocol stability.",
    },
    {
      label: "Operations",
      percent: "15%",
      description:
        "Legal, team expenses, infrastructure, and admin costs.",
    },
    {
      label: "Security & Compliance",
      percent: "10%",
      description:
        "KYC, audits, insurance funds, and ecosystem protection.",
    },
  ];

  return (
    <section
      id="fund-usage"
      className="py-24 px-6 bg-[#111114] text-white text-center"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8">📡 Fund Usage</h2>
        <p className="text-white/80 text-lg mb-12 max-w-2xl mx-auto">
          If funds are raised through token sales, here’s how they’ll be used to grow the BitFtx ecosystem.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 text-left">
          {usage.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#1a1a1d] p-6 rounded-xl border border-white/10 shadow transition hover:shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-2">
                {item.label} – <span className="text-purple-400">{item.percent}</span>
              </h3>
              <p className="text-white/70">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
