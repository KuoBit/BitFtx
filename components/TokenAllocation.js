export default function TokenAllocation() {
    const allocation = [
      {
        category: "Community Rewards",
        percent: "30%",
        tokens: "300,000,000",
        vesting: "5% TGE, 12-month vesting",
      },
      {
        category: "Team & Advisors",
        percent: "20%",
        tokens: "200,000,000",
        vesting: "12-month cliff, 24-month vesting",
      },
      {
        category: "Treasury Reserve",
        percent: "15%",
        tokens: "150,000,000",
        vesting: "Unlocked but governed",
      },
      {
        category: "Private Sale",
        percent: "15%",
        tokens: "150,000,000",
        vesting: "10% TGE, linear 6-month vesting",
      },
      {
        category: "Public Sale (IDO)",
        percent: "10%",
        tokens: "100,000,000",
        vesting: "20% TGE, 3-month vesting",
      },
      {
        category: "Liquidity & CEX",
        percent: "10%",
        tokens: "100,000,000",
        vesting: "Unlocked for launch",
      },
    ];
  
    return (
      <section id="token-allocation" className="py-20 px-6 bg-[#0f0f11] text-white text-center">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-10">📊 Token Allocation</h2>
  
          {/* Placeholder chart */}
          <div className="mb-10">
            <div className="bg-[#1a1a1d] text-white/50 py-20 rounded-lg border border-white/10 shadow">
              Allocation chart coming soon...
            </div>
          </div>
  
          <div className="overflow-x-auto">
            <table className="w-full table-auto text-left border border-white/10 rounded-lg overflow-hidden">
              <thead className="bg-[#1a1a1d] text-white/60 text-sm uppercase tracking-wide">
                <tr>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Allocation</th>
                  <th className="py-3 px-4">Tokens</th>
                  <th className="py-3 px-4">Vesting</th>
                </tr>
              </thead>
              <tbody>
                {allocation.map((row, i) => (
                  <tr key={i} className="border-t border-white/10 hover:bg-[#1f1f22] transition">
                    <td className="py-3 px-4 font-medium">{row.category}</td>
                    <td className="py-3 px-4">{row.percent}</td>
                    <td className="py-3 px-4">{row.tokens}</td>
                    <td className="py-3 px-4 text-white/70">{row.vesting}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    );
  }
  