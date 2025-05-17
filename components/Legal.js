// components/whitepaper/Legal.js

export default function Legal() {
    return (
      <section className="space-y-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-center">⚖️ Legal & Disclaimers</h2>
        <p className="text-white/80 text-lg max-w-4xl mx-auto text-center">
          The BitFtx whitepaper is provided for informational purposes only. It does not constitute
          legal, financial, or investment advice.
        </p>
  
        <div className="bg-[#1a1a1d] p-6 rounded-lg border border-white/10 max-w-4xl mx-auto space-y-4 text-white/70 text-sm">
          <p>
            Participation in BitFtx prediction markets or acquisition of $BFTX tokens involves risk.
            Users should conduct their own due diligence and consult with appropriate legal and financial
            advisors before making any decisions.
          </p>
  
          <p>
            $BFTX tokens do not represent equity, shares, or ownership of any legal entity. They are solely
            utility tokens designed to operate within the BitFtx ecosystem.
          </p>
  
          <p>
            This document may be subject to updates. BitFtx does not guarantee the realization of any
            forward-looking statements contained herein.
          </p>
  
          <p>
            By participating in the platform, users acknowledge and accept the decentralized and
            experimental nature of the technology.
          </p>
        </div>
      </section>
    );
  }
  