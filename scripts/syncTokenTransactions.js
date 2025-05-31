// scripts/syncTokenTransactions.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://onevirzsdrfxposewozx.supabase.co',
  'YOUR_SERVICE_ROLE_KEY' // Use with caution: only for trusted backoffice scripts
);

async function syncTokenTransactions() {
  const { data: campaign } = await supabase
    .from('airdrop_campaigns')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  const { data: users } = await supabase.from('airdrop_leads').select('*');

  for (const user of users) {
    const txs = await supabase
      .from('token_transactions')
      .select('*')
      .eq('email', user.email);

    const has = (desc) => txs.data.some((t) => t.description === desc);

    // Sign-up bonus
    if (!has('Sign-up Bonus')) {
      await supabase.from('token_transactions').insert({
        email: user.email,
        amount: campaign.signup_bonus,
        type: 'earn',
        description: 'Sign-up Bonus',
      });
    }

    // Referrer reward for signup
    if (user.referrer_code && !txs.data.some(t => t.description === `Referral Bonus: ${user.email}`)) {
      const { data: ref } = await supabase
        .from('airdrop_leads')
        .select('*')
        .eq('user_code', user.referrer_code)
        .single();

      if (ref) {
        await supabase.from('token_transactions').insert({
          email: ref.email,
          amount: campaign.referrer_bonus,
          type: 'earn',
          description: `Referral Bonus: ${user.email}`,
        });
      }
    }

    // Task completion
    for (const task of ['twitter', 'telegram', 'discord']) {
      const field = `joined_${task}`;
      const label = task.charAt(0).toUpperCase() + task.slice(1);
      if (user[field] && !has(`Completed ${label}`)) {
        await supabase.from('token_transactions').insert({
          email: user.email,
          amount: campaign.task_tokens,
          type: 'earn',
          description: `Completed ${label}`,
        });

        // Referrer reward for task
        if (user.referrer_code && !txs.data.some(t => t.description === `Referee ${user.email} completed ${label}`)) {
          const { data: ref } = await supabase
            .from('airdrop_leads')
            .select('*')
            .eq('user_code', user.referrer_code)
            .single();

          if (ref) {
            await supabase.from('token_transactions').insert({
              email: ref.email,
              amount: campaign.referee_bonus,
              type: 'earn',
              description: `Referee ${user.email} completed ${label}`,
            });
          }
        }
      }
    }
  }

  console.log('✅ Token transaction sync completed.');
}

syncTokenTransactions();
