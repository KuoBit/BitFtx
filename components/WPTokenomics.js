// components/whitepaper/Tokenomics.js

export default function TokenomicsSection() {
    return (
      <section className="space-y-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-center">📊 Tokenomics</h2>
        <p className="text-white/80 text-lg max-w-4xl mx-auto text-center">
          $BFTX has a fixed supply of 1,000,000,000 tokens designed for fair distribution, ecosystem growth,
          and long-term sustainability.
        </p>
  
        <div className="overflow-x-auto max-w-4xl mx-auto">
          <table className="min-w-full text-sm text-white/80 border border-white/10 rounded-lg overflow-hidden">
            <thead className="bg-[#1a1a1d] text-white">
              <tr>
                <th className="py-3 px-4 text-left">Category</th>
                <th className="py-3 px-4 text-left">Allocation</th>
                <th className="py-3 px-4 text-left">Vesting</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-white/10">
                <td className="py-3 px-4">Community Rewards</td>
                <td className="py-3 px-4">30%</td>
                <td className="py-3 px-4">5% at TGE, rest over 12 months</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="py-3 px-4">Team & Advisors</td>
                <td className="py-3 px-4">20%</td>
                <td className="py-3 px-4">12-month cliff, then 24-month linear vesting</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="py-3 px-4">Treasury Reserve</td>
                <td className="py-3 px-4">15%</td>
                <td className="py-3 px-4">Unlocked, governed by DAO multisig</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="py-3 px-4">Private Sale</td>
                <td className="py-3 px-4">15%</td>
                <td className="py-3 px-4">10% at TGE, rest over 6 months</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="py-3 px-4">Public Sale (IDO)</td>
                <td className="py-3 px-4">10%</td>
                <td className="py-3 px-4">20% at TGE, rest over 3 months</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="py-3 px-4">Liquidity & CEX</td>
                <td className="py-3 px-4">10%</td>
                <td className="py-3 px-4">Fully unlocked</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    );
  }
  