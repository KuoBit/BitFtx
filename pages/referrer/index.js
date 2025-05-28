// pages/referrer/index.js
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const supabase = createClient(
  "https://onevirzsdrfxposewozx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9uZXZpcnpzZHJmeHBvc2V3b3p4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4MDIzNjksImV4cCI6MjA2MDM3ODM2OX0.IPFY8wqbxadZugoGIRWsGNU27tVqS8BEYJkem8WubAk"
);

export default function ReferrerDashboard() {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [userData, setUserData] = useState(null);
  const [referrals, setReferrals] = useState([]);
  const [campaign, setCampaign] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setTimeout(checkSession, 500);
      } else {
        setSession(session);
      }
    };
    checkSession();
  }, []);

  useEffect(() => {
    if (!session) return;

    const fetchData = async () => {
      const { data: userRow } = await supabase
        .from('airdrop_leads')
        .select('*')
        .eq('email', session.user.email)
        .single();
      setUserData(userRow);

      const { data: referralsList } = await supabase
        .from('airdrop_leads')
        .select('*')
        .eq('referrer_code', userRow.user_code);
      setReferrals(referralsList || []);

      const { data: campaignData } = await supabase
        .from('airdrop_campaigns')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      setCampaign(campaignData);
    };

    fetchData();
  }, [session]);

  if (!userData) return <div className="p-10 text-center text-white">Loading...</div>;

  return (
    <>
      <Header />
      <div className="bg-[#0b0b0c] text-white min-h-screen py-20 px-6 font-sans">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Referral Dashboard</h1>

          {campaign && (
            <div className="bg-[#1a1a1c] border border-gray-800 rounded-xl p-6 mb-8">
              <h2 className="text-xl font-semibold mb-2">🎁 Airdrop Campaign: {campaign.name}</h2>
              <ul className="list-disc list-inside mb-4 space-y-1">
                <li><strong>{campaign.signup_tokens}</strong> tokens for signing up</li>
                <li><strong>{campaign.task_tokens}</strong> tokens each for joining Twitter, Telegram, and Discord</li>
                <li><strong>{campaign.referral_tokens}</strong> tokens for each successful referral</li>
                <li><strong>{campaign.referee_bonus}</strong> bonus tokens when your referral completes all tasks</li>
              </ul>
              <div className="space-x-3">
                <a href="https://twitter.com/BitFtxOfficial" target="_blank" rel="noopener noreferrer">
                  <Button>Join Twitter</Button>
                </a>
                <a href="https://t.me/BitFtxOfficial" target="_blank" rel="noopener noreferrer">
                  <Button>Join Telegram</Button>
                </a>
                <a href="https://discord.gg/bitftx" target="_blank" rel="noopener noreferrer">
                  <Button>Join Discord</Button>
                </a>
              </div>
            </div>
          )}

          <div className="bg-[#1a1a1c] border border-gray-800 rounded-xl p-6 mb-8">
            <p><strong>Your Code:</strong> {userData.user_code}</p>
            <p>
              <strong>Your Referral Link:</strong><br />
              <span className="break-all text-blue-400 underline cursor-pointer" onClick={() => window.open(`https://bitftx.com/?ref=${userData.user_code}`, '_blank')}>
                https://bitftx.com/?ref={userData.user_code}
              </span>
            </p>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(`https://bitftx.com/?ref=${userData.user_code}`);
                alert('Referral link copied!');
              }}
              className="mt-4"
            >Copy Link</Button>
          </div>

          <div className="bg-[#1a1a1c] border border-gray-800 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Your Progress</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Telegram: {userData.joined_telegram ? '✅ Joined' : '❌ Not Joined'}</li>
              <li>Discord: {userData.joined_discord ? '✅ Joined' : '❌ Not Joined'}</li>
              <li>X (Twitter): {userData.joined_twitter ? '✅ Joined' : '❌ Not Joined'}</li>
            </ul>
          </div>

          <div className="bg-[#1a1a1c] border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Your Referrals</h2>
            <div className="overflow-x-auto">
              <table className="w-full table-auto text-sm">
                <thead>
                  <tr className="bg-[#2a2a2c] text-white">
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2">Telegram</th>
                    <th className="px-4 py-2">Discord</th>
                    <th className="px-4 py-2">X</th>
                    <th className="px-4 py-2">Tokens</th>
                  </tr>
                </thead>
                <tbody>
                  {referrals.map((r, idx) => (
                    <tr key={idx} className="border-t border-gray-700">
                      <td className="px-4 py-2">{r.name}</td>
                      <td className="text-center">{r.joined_telegram ? '✅' : '❌'}</td>
                      <td className="text-center">{r.joined_discord ? '✅' : '❌'}</td>
                      <td className="text-center">{r.joined_twitter ? '✅' : '❌'}</td>
                      <td className="text-center">{r.tokens_earned || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
