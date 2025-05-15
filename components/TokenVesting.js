export default function TokenVesting() {
  const vestingPhases = [
    {
      title: "Community Rewards",
      unlock: "5% at TGE, rest over 12 months",
    },
    {
      title: "Team & Advisors",
      unlock: "12-month cliff, then linear for 24 months",
    },
    {
      title: "Treasury Reserve",
      unlock: "Fully unlocked, governed by multisig",
    },
    {
      title: "Private Sale",
      unlock: "10% at TGE, rest over 6 months",
    },
    {
      title: "Public Sale (IDO)",
      unlock: "20% at TGE, rest over 3 months",
    },
    {
      title: "Liquidity & CEX",
      unlock: "Fully unlocked at TGE for launch",
    },
  ];

  return (
    <section id="vesting" className="py-24 px-6 bg-[#111114] text-white text-center">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8">⏳ Vesting Schedule</h2>
        <p className="text-white/80 mb-12 max-w-2xl mx-auto">
          We’ve designed a fair release schedule to ensure long-term sustainability, investor trust, and ecosystem growth.
        </p>

        <div className="space-y-8 text-left relative border-l border-white/10 pl-6 sm:pl-8">
          {vestingPhases.map((item, idx) => (
            <div key={idx} className="relative pl-2">
              <div className="absolute -left-3.5 top-1 w-4 h-4 bg-purple-500 border-2 border-white rounded-full"></div>
              <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
              <p className="text-white/70">{item.unlock}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
