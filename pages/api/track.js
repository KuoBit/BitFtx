// pages/api/track.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    "https://onevirzsdrfxposewozx.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9uZXZpcnpzZHJmeHBvc2V3b3p4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4MDIzNjksImV4cCI6MjA2MDM3ODM2OX0.IPFY8wqbxadZugoGIRWsGNU27tVqS8BEYJkem8WubAk"
  );

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { session_id, source, event_type, path, user_agent, country, device_type } = req.body;

  const { error } = await supabase.from('tracking_events').insert({
    session_id, source, event_type, path, user_agent, country, device_type
  });

  if (error) {
    console.error("Tracking insert failed", error);
    return res.status(500).json({ error: 'Insert failed' });
  }

  return res.status(200).json({ success: true });
}
