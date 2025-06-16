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
  const { data: campaign, error: campaignError } = await supabase
    .from('airdrop_campaigns')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (campaignError || !campaign) {
    console.error("❌ No active campaign found.", campaignError?.message);
    return;
  }

  const { data: users, error: userError } = await supabase.from('airdrop_leads').select('*');
  if (userError || !users) {
    console.error("❌ Failed to fetch airdrop leads.", userError?.message);
    return;
  }

  for (const user of users) {
    const { data: txsData, error: txError } = await supabase
      .from('token_transactions')
      .select('description')
      .eq('email', user.email);

    if (txError) {
      console.error(`❌ Failed to fetch transactions for ${user.email}:`, txError.message);
      continue;
    }

    const has = (desc) =>
      txsData && txsData.some((t) => normalize(t.description) === normalize(desc));

    // ✅ 1. Sign-up Bonus
    if (!has('Sign-up Bonus')) {
      console.log(`🪙 Signup Bonus → ${user.email}`);
      const { error } = await supabase.from('token_transactions').insert([{
        email: user.email,
        amount: campaign.signup_bonus,
        type: 'earn',
        description: 'Sign-up Bonus',
      }]);
      if (error) console.error(`❌ Failed signup bonus for ${user.email}:`, error.message);
    }

    // ✅ 2. Referral Bonus for Signup
    if (user.referrer_code && !has(`Referral Bonus: ${user.email}`)) {
      const { data: ref, error: refError } = await supabase
        .from('airdrop_leads')
        .select('*')
        .eq('user_code', user.referrer_code)
        .single();

      if (ref) {
        console.log(`🎁 Referral Signup Bonus → ${ref.email} (ref for ${user.email})`);
        const { error } = await supabase.from('token_transactions').insert([{
          email: ref.email,
          amount: campaign.referrer_bonus,
          type: 'earn',
          description: `Referral Bonus: ${user.email}`,
        }]);
        if (error) console.error(`❌ Failed referral bonus for ${ref.email}:`, error.message);
      } else if (refError) {
        console.error(`❌ Failed to fetch referrer for ${user.email}:`, refError.message);
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
        const { error } = await supabase.from('token_transactions').insert([{
          email: user.email,
          amount: campaign.task_tokens,
          type: 'earn',
          description: taskDesc,
        }]);
        if (error) console.error(`❌ Failed task bonus for ${user.email}:`, error.message);

        // ✅ 4. Referral Bonus for task
        if (user.referrer_code && !has(refDesc)) {
          const { data: ref, error: refError } = await supabase
            .from('airdrop_leads')
            .select('*')
            .eq('user_code', user.referrer_code)
            .single();

          if (ref) {
            console.log(`🎯 Referral Task Bonus → ${ref.email} (ref for ${user.email})`);
            const { error } = await supabase.from('token_transactions').insert([{
              email: ref.email,
              amount: campaign.referee_bonus,
              type: 'earn',
              description: refDesc,
            }]);
            if (error) console.error(`❌ Failed referral task bonus for ${ref.email}:`, error.message);
          } else if (refError) {
            console.error(`❌ Failed to fetch referrer for task of ${user.email}:`, refError.message);
          }
        }
      }
    }
  }

  console.log('✅ Token transaction sync completed.');
}

syncTokenTransactions();
