import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const generateUserCode = () => {
  const randomHash = Math.random().toString(36).substring(2, 10); // 8-char base36
  return "BFTX-" + randomHash.toUpperCase();
};

const AirdropModal = ({ onSubmit }) => {
  const [visible, setVisible] = useState(false);
  const [referrerCode, setReferrerCode] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    wallet: "",
    twitter: "",
    telegram: "",
  });
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const urlParams = new URLSearchParams(window.location.search);
    const ref = urlParams.get("ref");
    if (ref) setReferrerCode(ref);

    const seen = sessionStorage.getItem("airdrop_shown");
    if (!seen) {
      setTimeout(() => setVisible(true), 1000);
      sessionStorage.setItem("airdrop_shown", "true");
    }
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await onSubmit({ ...formData, user_code, referrer_code: referrerCode });
    if (error) {
      setMessage("❌ Error saving your submission.");
    } else {
      setMessage("✅ You're in! Thanks for joining the airdrop.");
      setFormData({
        name: "",
        email: "",
        wallet: "",
        twitter: "",
        telegram: "",
      });
      setTimeout(() => setVisible(false), 2000);
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-[#111114] p-6 sm:p-8 rounded-lg text-white w-full max-w-lg relative shadow-2xl">
        <button
          onClick={() => setVisible(false)}
          className="absolute top-3 right-4 text-white text-2xl hover:text-purple-400"
        >
          &times;
        </button>
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center">🎁 Join the $BFTX Airdrop</h2>
        <p className="text-white/70 mb-4 text-center">
          Fill in the details below to qualify for the upcoming airdrop.
        </p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="w-full p-3 rounded bg-[#1a1a1d] border border-white/10" required />
          <input type="text" name="wallet" value={formData.wallet} onChange={handleChange} placeholder="Wallet Address" className="w-full p-3 rounded bg-[#1a1a1d] border border-white/10" required />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full p-3 rounded bg-[#1a1a1d] border border-white/10" required />
          <input type="text" name="twitter" value={formData.twitter} onChange={handleChange} placeholder="Twitter Handle" className="w-full p-3 rounded bg-[#1a1a1d] border border-white/10" required />
          <input type="text" name="telegram" value={formData.telegram} onChange={handleChange} placeholder="Telegram Username" className="w-full p-3 rounded bg-[#1a1a1d] border border-white/10" required />
          <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 transition p-3 rounded font-bold">
            Submit
          </button>
          {message && <p className="mt-2 text-sm text-white/70 text-center">{message}</p>}
        </form>
      </div>
    </div>
  );
};

// Export with no SSR
export default dynamic(() => Promise.resolve(AirdropModal), { ssr: false });
