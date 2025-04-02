import Image from 'next/image';
import Link from 'next/link';

const Hero = () => (
  <section className="bg-gradient-to-b from-[#0f0f0f] to-[#1f1f1f] py-24 text-center text-white px-4">
    <div className="max-w-4xl mx-auto">
      <Image src="/logo.svg" alt="BitFtx Logo" width={80} height={80} className="mx-auto mb-4" />
      <h1 className="text-5xl font-extrabold mb-6">Predict the Future of Crypto</h1>
      <p className="text-xl text-zinc-400 mb-8">
        BitFtx is a global prediction market exchange powered by $BFTX token. Bet on crypto outcomes. Earn. Repeat.
      </p>
      <div className="flex justify-center gap-4">
        <Link href="#tokenomics" className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-full font-semibold">Tokenomics</Link>
        <Link href="#roadmap" className="bg-zinc-800 hover:bg-zinc-700 px-6 py-3 rounded-full font-semibold">Roadmap</Link>
      </div>
    </div>
  </section>
);
export default Hero;