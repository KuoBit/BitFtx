// pages/admin/withdrawals.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const supabase = createClient(
  "https://onevirzsdrfxposewozx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9uZXZpcnpzZHJmeHBvc2V3b3p4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4MDIzNjksImV4cCI6MjA2MDM3ODM2OX0.IPFY8wqbxadZugoGIRWsGNU27tVqS8BEYJkem8WubAk"
);

export default function WithdrawalRequests() {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session || session.user.email !== 'nitin@kuobit.com') {
        router.push('/');
      } else {
        setSession(session);
      }
    };
    checkSession();
  }, []);

  useEffect(() => {
    if (!session) return;

    const fetchWithdrawals = async () => {
      const { data } = await supabase
        .from('withdrawal_requests')
        .select('*')
        .order('created_at', { ascending: false });
      setWithdrawals(data || []);
      setLoading(false);
    };

    fetchWithdrawals();
  }, [session]);

  const handleApprove = async (req) => {
    await supabase
      .from('withdrawal_requests')
      .update({ status: 'approved', processed_at: new Date().toISOString() })
      .eq('id', req.id);

    await supabase.from('token_transactions').insert([
      {
        email: req.email,
        amount: -req.tokens,
        type: 'withdrawal',
        metadata: `Manually approved` // optionally include tx hash or method
      }
    ]);

    alert('Marked as approved.');
    location.reload();
  };

  return (
    <>
      <Header />
      <div className="bg-[#0b0b0c] text-white min-h-screen py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Withdrawal Requests</h1>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full table-auto text-sm">
                <thead>
                  <tr className="bg-[#1a1a1c]">
                    <th className="px-4 py-2 text-left">Email</th>
                    <th className="px-4 py-2">Tokens</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">Created</th>
                    <th className="px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {withdrawals.map((w, idx) => (
                    <tr key={idx} className="border-t border-gray-700">
                      <td className="px-4 py-2">{w.email}</td>
                      <td className="text-center">{w.tokens}</td>
                      <td className="text-center">{w.status}</td>
                      <td className="text-center">{new Date(w.created_at).toLocaleString()}</td>
                      <td className="text-center">
                        {w.status === 'pending' && (
                          <Button
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleApprove(w)}
                          >
                            Approve
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
