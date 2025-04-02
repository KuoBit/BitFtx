
import Head from "next/head";
import Hero from "../components/Hero";
import Tokenomics from "../components/Tokenomics";
import Roadmap from "../components/Roadmap";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>BitFtx | Crypto Prediction Exchange</title>
        <meta name="description" content="BitFtx - Bet on crypto price outcomes. Win tokens. Powered by $BFTX." />
      </Head>
      <main className="bg-black text-white">
        <Hero />
        <Tokenomics />
        <Roadmap />
        <Footer />
      </main>
    </>
  );
}
