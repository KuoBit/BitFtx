import { useState } from "react";

export default function TokenFAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is $BFTX used for?",
      answer:
        "$BFTX is used for making predictions, staking, governance voting, earning rewards, and accessing premium features on the BitFtx platform.",
    },
    {
      question: "Is there a total cap on $BFTX?",
      answer:
        "Yes, $BFTX has a fixed supply of 1,000,000,000 tokens. There will be no inflation or minting after launch.",
    },
    {
      question: "Will there be a token burn mechanism?",
      answer:
        "Yes, a percentage of protocol fees may be used to buy and burn $BFTX to create long-term deflationary pressure.",
    },
    {
      question: "When will $BFTX be listed on exchanges?",
      answer:
        "DEX listings (e.g. Uniswap) are planned in Q2 2025. CEX listings will follow based on community votes and strategic partnerships.",
    },
    {
      question: "How do I qualify for airdrops?",
      answer:
        "Users who join early, participate in markets, or contribute to the community may be eligible for airdrops based on activity snapshots.",
    },
    {
      question: "Can I stake $BFTX?",
      answer:
        "Yes. Staking will be launched soon to let holders earn rewards, boost yield, and gain voting power.",
    },
  ];

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 px-6 bg-[#0f0f11] text-white text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-10">❓ Frequently Asked Questions</h2>

        <div className="space-y-4 text-left">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-white/10 rounded-lg p-4 bg-[#1a1a1d] cursor-pointer transition hover:border-white/20"
              onClick={() => toggle(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">{faq.question}</h3>
                <span className="text-purple-400">{openIndex === index ? "−" : "+"}</span>
              </div>
              {openIndex === index && (
                <p className="mt-2 text-white/70">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
