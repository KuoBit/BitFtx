// pages/admin/airdrop-campaign.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { createClient } from "@supabase/supabase-js";
import Header from "@/components/Header";
import Header from "@/components/Admin-Header";
import Footer from "@/components/Footer";

const supabase = createClient(
    "https://onevirzsdrfxposewozx.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9uZXZpcnpzZHJmeHBvc2V3b3p4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4MDIzNjksImV4cCI6MjA2MDM3ODM2OX0.IPFY8wqbxadZugoGIRWsGNU27tVqS8BEYJkem8WubAk"
);

export default function AirdropCampaignAdmin() {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    signup_tokens: 0,
    task_tokens: 0,
    referral_tokens: 0,
    referee_bonus: 0,
    is_active: true
  });

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session || session.user.email !== "nitin@kuobit.com") {
        router.push("/");
      } else {
        setSession(session);
      }
    };
    checkSession();
  }, []);

  useEffect(() => {
    if (!session) return;

    const fetchCampaign = async () => {
      const { data } = await supabase
        .from("airdrop_campaigns")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (data) {
        setCampaign(data);
        setForm(data);
      }
      setLoading(false);
    };

    fetchCampaign();
  }, [session]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : type === "number" ? parseInt(value) : value,
    });
  };
  

  const handleSubmit = async () => {
    const payload = { ...form };
    if (campaign) {
      await supabase.from("airdrop_campaigns").update(payload).eq("id", campaign.id);
    } else {
      await supabase.from("airdrop_campaigns").insert([payload]);
    }
    alert("Campaign saved!");
  };

  return (
    <>
      <Header />
      <Admin-Header />
      <div className="bg-[#0b0b0c] text-white min-h-screen py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Airdrop Campaign Settings</h1>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block mb-1">Campaign Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-[#1a1a1c] border border-gray-700"
                />
              </div>
              <div>
                <label className="block mb-1">Signup Tokens</label>
                <input
                  type="number"
                  name="signup_tokens"
                  value={form.signup_tokens}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-[#1a1a1c] border border-gray-700"
                />
              </div>
              <div>
                <label className="block mb-1">Task Tokens (Twitter/Telegram/Discord)</label>
                <input
                  type="number"
                  name="task_tokens"
                  value={form.task_tokens}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-[#1a1a1c] border border-gray-700"
                />
              </div>
              <div>
                <label className="block mb-1">Referral Tokens</label>
                <input
                  type="number"
                  name="referral_tokens"
                  value={form.referral_tokens}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-[#1a1a1c] border border-gray-700"
                />
              </div>
              <div>
                <label className="block mb-1">Bonus When Referral Completes Tasks</label>
                <input
                  type="number"
                  name="referee_bonus"
                  value={form.referee_bonus}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-[#1a1a1c] border border-gray-700"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="is_active"
                  checked={form.is_active}
                  onChange={handleChange}
                />
                <label>Active</label>
              </div>
              <button
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
              >
                Save Campaign
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
