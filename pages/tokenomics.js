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
    <>
    <Header />
      <TokenomicsHero />
      <TokenOverview />
      <TokenAllocation />
      <TokenVesting />
      <TokenUtility />
      <FundUsage />
      <TokenFAQ />
    <Footer />
    </>
  );
}
