// pages/privacy.js
import Head from "next/head";

export default function Privacy() {
  return (
    <div className="bg-[#0b0b0c] text-white min-h-screen py-20 px-6 font-sans">
      <Head>
        <title>Privacy Policy – BitFtx</title>
      </Head>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-white/80 mb-4">
          At BitFtx.com, operated by Kuobit Labs Pvt Ltd, we are committed to protecting your privacy. This policy outlines how we handle your personal information.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">1. Data Collection</h2>
        <p className="text-white/70 mb-4">
          We collect information you voluntarily submit, such as wallet address, email, and social handles when participating in our platform.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">2. Use of Data</h2>
        <p className="text-white/70 mb-4">
          Your data is used to manage your account, participate in airdrops, and improve our services. We never sell your information to third parties.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">3. Cookies & Analytics</h2>
        <p className="text-white/70 mb-4">
          We may use cookies and analytics tools to improve user experience. You can control these via your browser settings.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">4. Security</h2>
        <p className="text-white/70 mb-4">
          We implement best practices to safeguard your data but cannot guarantee 100% security due to the nature of the internet.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">5. Policy Updates</h2>
        <p className="text-white/70 mb-4">
          We may update this policy occasionally. Changes will be posted on this page.
        </p>
      </div>
            {/* Footer */}
            <footer className="bg-[#0b0b0c] border-t border-white/10 py-10 px-6 text-white text-center">
              <div className="max-w-4xl mx-auto">
                <h3 className="text-xl font-semibold mb-4">Join the BitFtx Community</h3>
                <div className="flex justify-center gap-6 mb-6">
                  <a href="https://twitter.com/BitFtxOfficial" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition">
                    <span className="sr-only">Twitter</span>
                    <Image src="/icons/twitter.svg" width={24} height={24} alt="Twitter" />
                  </a>
                  <a href="https://t.me/BitFtxOfficial" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition">
                    <span className="sr-only">Telegram</span>
                    <Image src="/icons/telegram.svg" width={24} height={24} alt="Telegram" />
                  </a>
                  <a href="https://discord.gg/BitFtxOfficial" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition">
                    <span className="sr-only">Discord</span>
                    <Image src="/icons/discord.svg" width={24} height={24} alt="Discord" />
                  </a>
                </div>
      
                <div className="text-sm text-white/50 flex flex-col sm:flex-row justify-center gap-4 mb-4">
                  <a href="/terms.html" className="hover:text-purple-400">Terms & Conditions</a>
                  <a href="/privacy.html" className="hover:text-purple-400">Privacy Policy</a>
                  <a href="/data-policy.html" className="hover:text-purple-400">Data Policy</a>
                </div>
      
                <p className="text-sm text-white/50">&copy; 2025 BitFtx. All rights reserved.</p>
              </div>
            </footer>
    </div>
  );
}