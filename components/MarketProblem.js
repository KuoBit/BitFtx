// components/whitepaper/MarketProblem.js

export default function MarketProblem() {
  return (
    <section className="space-y-6">
      <h2 className="text-3xl sm:text-4xl font-bold text-center">🌍 The Problem & Opportunity</h2>
      <p className="text-white/80 text-lg max-w-4xl mx-auto text-center">
        Traditional prediction platforms are centralized, restricted by geography, lack transparency,
        and offer no ownership or upside to users. Crypto-native forecasting is broken or gated.
        BitFtx changes that.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
        <div className="bg-[#1a1a1d] p-5 rounded-lg border border-white/10">
          <h3 className="text-xl font-semibold mb-2">🚫 Broken Incentives</h3>
          <p className="text-white/70">
            Users of traditional prediction platforms are just participants — not stakeholders.
            There's no token, no upside, and often high fees or platform bias.
          </p>
        </div>

        <div className="bg-[#1a1a1d] p-5 rounded-lg border border-white/10">
          <h3 className="text-xl font-semibold mb-2">🌐 Limited Access</h3>
          <p className="text-white/70">
            Most prediction apps are geo-blocked, fiat-gated, or suffer from KYC-heavy onboarding,
            making them inaccessible to global crypto users.
          </p>
        </div>

        <div className="bg-[#1a1a1d] p-5 rounded-lg border border-white/10">
          <h3 className="text-xl font-semibold mb-2">📉 Lack of Transparency</h3>
          <p className="text-white/70">
            Outcomes are often resolved privately, controlled by the platform. This leads to disputes,
            manipulation, and loss of trust.
          </p>
        </div>

        <div className="bg-[#1a1a1d] p-5 rounded-lg border border-white/10">
          <h3 className="text-xl font-semibold mb-2">💡 A Global Opportunity</h3>
          <p className="text-white/70">
            With crypto adoption rising globally, there is massive demand for borderless, trustless
            ways to express market opinions and earn real value from accurate forecasting.
          </p>
        </div>
      </div>
    </section>
  );
}
