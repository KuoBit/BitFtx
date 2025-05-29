// pages/referrer/profile.js
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const supabase = createClient(
  "https://onevirzsdrfxposewozx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9uZXZpcnpzZHJmeHBvc2V3b3p4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4MDIzNjksImV4cCI6MjA2MDM3ODM2OX0.IPFY8wqbxadZugoGIRWsGNU27tVqS8BEYJkem8WubAk"
);

export default function Profile() {
  const [session, setSession] = useState(null);
  const [userData, setUserData] = useState(null);
  const [form, setForm] = useState({
    wallet: '',
    telegram: '',
    discord: '',
    twitter: ''
  });

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) setSession(session);
    };
    fetchSession();
  }, []);

  useEffect(() => {
    if (!session) return;
    const fetchUser = async () => {
      const { data } = await supabase
        .from('airdrop_leads')
        .select('*')
        .eq('email', session.user.email)
        .single();

      setUserData(data);
      setForm({
        wallet: data.wallet || '',
        telegram: data.telegram || '',
        discord: data.discord || '',
        twitter: data.twitter || ''
      });
    };
    fetchUser();
  }, [session]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    await supabase.from('airdrop_leads').update(form).eq('email', session.user.email);
    alert('Profile updated successfully!');
  };

  const requestWithdrawal = async () => {
    await supabase.from('withdrawal_requests').insert([{ email: session.user.email }]);
    alert('Withdrawal request submitted!');
  };

  return (
    <>
      <Header />
      <div className="bg-[#0b0b0c] text-white min-h-screen py-20 px-6 font-sans">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

          <div className="space-y-4 bg-[#1a1a1c] border border-gray-800 p-6 rounded-xl">
            <div>
              <label className="block mb-1">Wallet Address</label>
              <input
                type="text"
                name="wallet"
                value={form.wallet}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-[#2a2a2c] border border-gray-700"
              />
            </div>
            <div>
              <label className="block mb-1">Telegram</label>
              <input
                type="text"
                name="telegram"
                value={form.telegram}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-[#2a2a2c] border border-gray-700"
              />
            </div>
            <div>
              <label className="block mb-1">Discord</label>
              <input
                type="text"
                name="discord"
                value={form.discord}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-[#2a2a2c] border border-gray-700"
              />
            </div>
            <div>
              <label className="block mb-1">Twitter</label>
              <input
                type="text"
                name="twitter"
                value={form.twitter}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-[#2a2a2c] border border-gray-700"
              />
            </div>
            <Button onClick={handleUpdate} className="mt-4">Update Profile</Button>
          </div>

          {userData && (
            <div className="mt-8 bg-[#1a1a1c] border border-gray-800 p-6 rounded-xl">
              <h2 className="text-xl font-semibold mb-4">Your Token Balance</h2>
              <p className="text-2xl font-bold">{userData.tokens_earned || 0} BFTX</p>
              <Button onClick={requestWithdrawal} className="mt-4 bg-green-600 hover:bg-green-700">Request Withdrawal</Button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
