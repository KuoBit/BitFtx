// Updated admin panel logic with token transaction tracking
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const supabase = createClient(
  'https://onevirzsdrfxposewozx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
);

export default function AirdropLeadsPage() {
  const [leads, setLeads] = useState([]);
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [admins, setAdmins] = useState([]);
  const [campaign, setCampaign] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      fetchAdmins();
      fetchLeads();
      fetchCampaign();
    }
  }, [session]);

  const fetchAdmins = async () => {
    const { data } = await supabase.from('admin_users').select('email');
    if (data) setAdmins(data.map((row) => row.email));
  };

  const fetchLeads = async () => {
    const { data } = await supabase.from('airdrop_leads').select('*').order('created_at', { ascending: false });
    if (data) setLeads(data);
  };

  const fetchCampaign = async () => {
    const { data } = await supabase.from('airdrop_campaigns').select('*').eq('is_active', true).order('created_at', { ascending: false }).limit(1).single();
    setCampaign(data);
  };

  const updateStatus = async (id, field, value) => {
    const { data: user } = await supabase.from('airdrop_leads').select('*').eq('id', id).single();
    if (!user || !campaign) return;

    await supabase.from('airdrop_leads').update({ [field]: value }).eq('id', id);

    const taskMap = {
      joined_twitter: 'Twitter',
      joined_telegram: 'Telegram',
      joined_discord: 'Discord',
    };

    if (taskMap[field]) {
      const amount = campaign.task_tokens;
      await supabase.from('token_transactions').insert({
        email: user.email,
        amount: value ? amount : -amount,
        type: 'earn',
        description: `${value ? 'Completed' : 'Reverted'} ${taskMap[field]}`,
      });

      if (value && user.referrer_code) {
        const { data: referrer } = await supabase.from('airdrop_leads').select('*').eq('user_code', user.referrer_code).single();
        if (referrer) {
          await supabase.from('token_transactions').insert({
            email: referrer.email,
            amount: campaign.referee_bonus,
            type: 'earn',
            description: `Referee ${user.email} completed ${taskMap[field]}`,
          });
        }
      }
    }

    fetchLeads();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert('Invalid login');
  };

  const addAdmin = async (newEmail) => {
    const { error } = await supabase.from('admin_users').insert([{ email: newEmail }]);
    if (!error) fetchAdmins();
    else alert('Failed to add admin.');
  };

  if (!session || !admins.includes(session.user.email)) {
    return (
      <div className="p-8 bg-black min-h-screen text-white flex flex-col items-center justify-center">
        <h1 className="text-xl font-bold mb-4">Admin Login</h1>
        <form onSubmit={handleLogin} className="space-y-4 max-w-sm w-full">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 rounded bg-gray-800 border border-white/10" required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 rounded bg-gray-800 border border-white/10" required />
          <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 p-2 rounded font-bold">Log In</button>
        </form>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="p-8 bg-black min-h-screen text-white">
        <h1 className="text-2xl font-bold mb-6">BitFtx Admin Panel – Airdrop Verification</h1>

        <div className="bg-[#1a1a1d] p-4 rounded-lg border border-white/10 mb-6">
          <h2 className="text-xl font-semibold mb-2">🔐 Admin Section</h2>
          <p className="text-sm text-white/70">Logged in as: {session?.user?.email}</p>
          <form onSubmit={(e) => { e.preventDefault(); const input = prompt('Enter new admin email:'); if (input) addAdmin(input); }} className="mt-3">
            <button type="submit" className="text-sm bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded mr-2">Add New Admin</button>
            <button onClick={async () => { await supabase.auth.signOut(); setSession(null); }} className="text-sm bg-red-600 hover:bg-red-700 px-3 py-1 rounded">Logout</button>
          </form>
        </div>

        <div className="overflow-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-800">
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Wallet</th>
                <th className="p-2 border">Twitter</th>
                <th className="p-2 border">Telegram</th>
                <th className="p-2 border">Discord</th>
                <th className="p-2 border">Referral Code</th>
                <th className="p-2 border">Referred By</th>
                <th className="p-2 border">Verified</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="bg-gray-900">
                  <td className="p-2 border">{lead.name}</td>
                  <td className="p-2 border">{lead.email}</td>
                  <td className="p-2 border">{lead.wallet}</td>
                  <td className="p-2 border">{lead.twitter} {lead.joined_twitter ? '✅' : '❌'}</td>
                  <td className="p-2 border">{lead.telegram} {lead.joined_telegram ? '✅' : '❌'}</td>
                  <td className="p-2 border">{lead.discord} {lead.joined_discord ? '✅' : '❌'}</td>
                  <td className="p-2 border">{lead.user_code || '—'}</td>
                  <td className="p-2 border">{lead.referrer_code || '—'}</td>
                  <td className="p-2 border">{lead.verified ? '✅' : '❌'}</td>
                  <td className="p-2 border space-y-1">
                    {['joined_twitter', 'joined_telegram', 'joined_discord', 'verified'].map((field) => (
                      <button key={field} onClick={() => updateStatus(lead.id, field, !lead[field])} className="bg-purple-600 hover:bg-purple-700 text-xs px-2 py-1 rounded mr-1">
                        Toggle {field.replace('joined_', '').replace('_', ' ')}
                      </button>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
}
