import { useEffect, useState } from "react";

export default function AirdropModal({ onSubmit }) {
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    wallet: "",
    twitter: "",
    telegram: "",
  });
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const seen = sessionStorage.getItem("airdrop_shown");
    if (!seen) {
      setTimeout(() => setVisible(true), 1000); // 1s delay
      sessionStorage.setItem("airdrop_shown", "true");
    }
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await onSubmit(formData);
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
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
      <div className="bg-[#111114] p-8 rounded-lg text-white max-w-md w-full relative">
        <button
          onClick={() => setVisible(false)}
          className="absolute top-3 right-4 text-white text-xl hover:text-purple-400"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-4">🎁 Join the $BFTX Airdrop</h2>
        <p className="text-white/70 mb-4">
          Fill in the details below to qualify for the upcoming airdrop.
        </p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full p-3 rounded bg-[#1a1a1d] border border-white/10"
            required
          />
          <input
            type="text"
            name="wallet"
            value={formData.wallet}
            onChange={handleChange}
            placeholder="Wallet Address"
            className="w-full p-3 rounded bg-[#1a1a1d] border border-white/10"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-3 rounded bg-[#1a1a1d] border border-white/10"
            required
          />
          <input
            type="text"
            name="twitter"
            value={formData.twitter}
            onChange={handleChange}
            placeholder="Twitter Handle"
            className="w-full p-3 rounded bg-[#1a1a1d] border border-white/10"
            required
          />
          <input
            type="text"
            name="telegram"
            value={formData.telegram}
            onChange={handleChange}
            placeholder="Telegram Username"
            className="w-full p-3 rounded bg-[#1a1a1d] border border-white/10"
            required
          />
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 transition p-3 rounded font-bold"
          >
            Submit
          </button>
          {message && (
            <p className="mt-2 text-sm text-white/70 text-center">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
}
