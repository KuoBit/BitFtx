// components/whitepaper/Governance.js

export default function Governance() {
    return (
      <section className="space-y-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-center">🗳️ Governance</h2>
        <p className="text-white/80 text-lg max-w-4xl mx-auto text-center">
          BitFtx evolves into a decentralized autonomous organization (DAO), governed by
          $BFTX holders through transparent on-chain voting and proposal systems.
        </p>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <div className="bg-[#1a1a1d] p-5 rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold mb-2">🗳 Proposal Voting</h3>
            <p className="text-white/70">
              $BFTX holders can vote on upgrades, new features, treasury allocation,
              and dispute resolutions.
            </p>
          </div>
  
          <div className="bg-[#1a1a1d] p-5 rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold mb-2">🛡 Dispute Resolution</h3>
            <p className="text-white/70">
              Conflicting market outcomes will be handled via token-based appeals
              and quorum-based resolution votes.
            </p>
          </div>
  
          <div className="bg-[#1a1a1d] p-5 rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold mb-2">💼 Treasury Management</h3>
            <p className="text-white/70">
              A portion of ecosystem fees and reserves will be governed by the DAO,
              funding development, audits, and liquidity growth.
            </p>
          </div>
  
          <div className="bg-[#1a1a1d] p-5 rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold mb-2">🔒 Security & Transparency</h3>
            <p className="text-white/70">
              All governance contracts and votes will be open-source, auditable,
              and viewable in real time by the community.
            </p>
          </div>
        </div>
      </section>
    );
  }