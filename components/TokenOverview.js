export default function TokenOverview() {
    const tokenData = [
      { label: "Token Name", value: "BitFtx Token" },
      { label: "Symbol", value: "$BFTX" },
      { label: "Total Supply", value: "1,000,000,000" },
      { label: "Token Type", value: "ERC-20" },
      { label: "Network", value: "Ethereum / Base / Polygon" }, // update final one later
      { label: "Decimals", value: "18" },
      { label: "Contract Address", value: "To be announced" },
    ];
  
    return (
      <section id="token-overview" className="py-20 px-6 bg-[#111114] text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">🔍 Token Overview</h2>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
            {tokenData.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#1a1a1d] p-5 rounded-lg border border-white/10 shadow"
              >
                <h3 className="text-sm text-white/50 uppercase tracking-wide mb-1">
                  {item.label}
                </h3>
                <p className="text-lg font-medium text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  