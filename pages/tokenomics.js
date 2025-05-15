import TokenomicsHero from "@/components/TokenomicsHero";
import TokenOverview from "@/components/TokenOverview";
import TokenAllocation from "@/components/TokenAllocation";
import TokenVesting from "@/components/TokenVesting";
import TokenUtility from "@/components/TokenUtility";
import FundUsage from "@/components/FundUsage";
import TokenFAQ from "@/components/TokenFAQ";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TokenomicsPage() {
  return (
    <div className="bg-[#0b0b0c] text-white min-h-screen font-sans">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TokenomicsHero />
        <TokenOverview />
        <TokenAllocation />
        <TokenVesting />
        <TokenUtility />
        <FundUsage />
        <TokenFAQ />
      </main>

      <Footer />
    </div>
  );
}