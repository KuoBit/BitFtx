// scripts/syncTokenTransactions.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  "https://onevirzsdrfxposewozx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9uZXZpcnpzZHJmeHBvc2V3b3p4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4MDIzNjksImV4cCI6MjA2MDM3ODM2OX0.IPFY8wqbxadZugoGIRWsGNU27tVqS8BEYJkem8WubAk"
);

function normalize(str) {
  return (str || '').trim().toLowerCase();
}

async function syncTokenTransactions() {
  const { data: campaign } = await supabase
    .from('airdrop_campaigns')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (!campaign) {
    console.error("❌ No active campaign found.");
    return;
  }

  console.log("📦 Active Campaign:", campaign);

  const { data: users } = await supabase.from('airdrop_leads').select('*');

  for (const user of users) {
    const { data: txsData } = await supabase
      .from('token_transactions')
      .select('description')
      .eq('email', user.email);

    const has = (desc) =>
      txsData && txsData.some((t) => normalize(t.description) === normalize(desc));

    // ✅ 1. Sign-up Bonus
    if (!has('Sign-up Bonus')) {
      console.log(`🪙 Signup Bonus → ${user.email}`);
      await supabase.from('token_transactions').insert({
        email: user.email,
        amount: campaign.signup_tokens,
        type: 'earn',
        description: 'Sign-up Bonus',
      });
    }

    // ✅ 2. Referral Bonus for Signup
    if (user.referrer_code && !has(`Referral Bonus: ${user.email}`)) {
      const { data: ref } = await supabase
        .from('airdrop_leads')
        .select('*')
        .eq('user_code', user.referrer_code)
        .single();

      if (ref) {
        console.log(`🎁 Referral Signup Bonus → ${ref.email} (ref for ${user.email})`);
        await supabase.from('token_transactions').insert({
          email: ref.email,
          amount: campaign.referral_tokens,
          type: 'earn',
          description: `Referral Bonus: ${user.email}`,
        });
      }
    }

    // ✅ 3. Task Completion Bonuses (Twitter, Telegram, Discord)
    for (const task of ['twitter', 'telegram', 'discord']) {
      const field = `joined_${task}`;
      const label = task.charAt(0).toUpperCase() + task.slice(1);
      const taskDesc = `Completed ${label}`;
      const refDesc = `Referee ${user.email} completed ${label}`;

      if (user[field] && !has(taskDesc)) {
        console.log(`✅ Task: ${taskDesc} → ${user.email}`);
        await supabase.from('token_transactions').insert({
          email: user.email,
          amount: campaign.task_tokens,
          type: 'earn',
          description: taskDesc,
        });

        // ✅ 4. Referral Bonus for task
        if (user.referrer_code && !has(`Referral Bonus: ${user.email}`)) {
          const { data: ref } = await supabase
            .from('airdrop_leads')
            .select('*')
            .eq('user_code', user.referrer_code)
            .single();
        
          if (ref) {
            console.log(`🎁 Referral Signup Bonus → ${ref.email} (ref for ${user.email})`);
            await supabase.from('token_transactions').insert({
              email: ref.email,
              amount: campaign.referral_tokens,
              type: 'earn',
              description: `Referral Bonus: ${user.email}`,
            });
          }
        }        
      }
    }
  }

  console.log('✅ Token transaction sync completed.');
}

syncTokenTransactions();
