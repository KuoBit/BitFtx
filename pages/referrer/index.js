// pages/referrer/index.js
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const supabase = createClient(
    "https://onevirzsdrfxposewozx.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9uZXZpcnpzZHJmeHBvc2V3b3p4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4MDIzNjksImV4cCI6MjA2MDM3ODM2OX0.IPFY8wqbxadZugoGIRWsGNU27tVqS8BEYJkem8WubAk"
  );

export default function ReferrerDashboard() {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [userData, setUserData] = useState(null);
  const [referrals, setReferrals] = useState([]);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        // Wait briefly and retry (some redirects need time)
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
    };

    fetchData();
  }, [session]);

  if (!userData) return <div className="p-10 text-center">Loading...</div>;

  return (
      <>
          <Header />
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Referral Dashboard</h1>

      <Card className="mb-8">
        <CardContent className="p-6 space-y-3">
          <p><strong>Your Code:</strong> {userData.user_code}</p>
          <p>
            <strong>Your Referral Link:</strong> <br />
            <span className="break-all text-blue-600">https://bitftx.com/?ref={userData.user_code}</span>
          </p>
          <Button
            onClick={() => {
              navigator.clipboard.writeText(`https://bitftx.com/?ref=${userData.user_code}`);
              alert('Referral link copied!');
            }}
          >Copy Link</Button>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardContent className="p-6 space-y-3">
          <h2 className="text-xl font-semibold mb-4">Your Progress</h2>
          <ul className="list-disc list-inside">
            <li>Telegram: {userData.joined_telegram ? '✅ Joined' : '❌ Not Joined'}</li>
            <li>Discord: {userData.joined_discord ? '✅ Joined' : '❌ Not Joined'}</li>
            <li>X (Twitter): {userData.joined_twitter ? '✅ Joined' : '❌ Not Joined'}</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Your Referrals</h2>
          <table className="w-full table-auto text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2">Telegram</th>
                <th className="px-4 py-2">Discord</th>
                <th className="px-4 py-2">X</th>
                <th className="px-4 py-2">Tokens</th>
              </tr>
            </thead>
            <tbody>
              {referrals.map((r, idx) => (
                <tr key={idx} className="border-t">
                  <td className="px-4 py-2">{r.name}</td>
                  <td className="text-center">{r.joined_telegram ? '✅' : '❌'}</td>
                  <td className="text-center">{r.joined_discord ? '✅' : '❌'}</td>
                  <td className="text-center">{r.joined_twitter ? '✅' : '❌'}</td>
                  <td className="text-center">{r.tokens_earned || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
     <Footer />
        </>
  );
}
