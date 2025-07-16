// scripts/syncTokenTransactions.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  "https://onevirzsdrfxposewozx.supabase.co",
  "YOUR_SUPABASE_ANON_KEY"
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

    // ✅ 2. Referral Bonus for Signup (only once)
    if (user.referrer_code) {
      const refDesc = `Referral Bonus: ${user.email}`;
      const { data: exists } = await supabase
        .from('token_transactions')
        .select('id')
        .eq('description', refDesc)
        .maybeSingle();

      if (!exists) {
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
            description: refDesc,
          });
        }
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
        if (user.referrer_code) {
          const { data: existing } = await supabase
            .from('token_transactions')
            .select('id')
            .eq('description', refDesc)
            .maybeSingle();

          if (!existing) {
            const { data: ref } = await supabase
              .from('airdrop_leads')
              .select('*')
              .eq('user_code', user.referrer_code)
              .single();

            if (ref) {
              console.log(`🎯 Referral Task Bonus → ${ref.email} (ref for ${user.email})`);
              await supabase.from('token_transactions').insert({
                email: ref.email,
                amount: campaign.referee_bonus,
                type: 'earn',
                description: refDesc,
              });
            }
          }
        }
      }
    }
  }

  console.log('✅ Token transaction sync completed.');
}

syncTokenTransactions();
