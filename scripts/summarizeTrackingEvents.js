import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    "https://onevirzsdrfxposewozx.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9uZXZpcnpzZHJmeHBvc2V3b3p4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4MDIzNjksImV4cCI6MjA2MDM3ODM2OX0.IPFY8wqbxadZugoGIRWsGNU27tVqS8BEYJkem8WubAk"
  );

function formatDateUTC(date) {
  return date.toISOString().split("T")[0]; // YYYY-MM-DD
}

async function summarizeTrackingEvents() {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0); // Start of today in UTC

  console.log("📦 Fetching events before:", today.toISOString());

const { data: events, error } = await supabase
  .from("tracking_events")
  .select("*")
  .lt("created_at", today.toISOString())
  .range(0, 9999); // Fetch first 10,000 rows

  if (error) {
    console.error("❌ Error fetching tracking events:", error);
    return;
  }

  if (!events || events.length === 0) {
    console.log("✅ No old events to summarize.");
    return;
  }

  console.log(`🔍 Found ${events.length} events to summarize.`);

  const summaryMap = {};

  for (const e of events) {
    const date = new Date(e.created_at);
    date.setUTCHours(0, 0, 0, 0); // Normalize to date only

    const key = `${e.source || "unknown"}|${e.country || "unknown"}|${formatDateUTC(date)}`;

    if (!summaryMap[key]) {
      summaryMap[key] = {
        source: e.source || "unknown",
        country: e.country || "unknown",
        event_date: formatDateUTC(date),
        clicks: 0,
        visits: 0,
        airdrops: 0,
      };
    }

    if (e.event_type === "click") summaryMap[key].clicks++;
    if (e.event_type === "visit") summaryMap[key].visits++;
    if (e.event_type === "submit") summaryMap[key].airdrops++;
  }

  const summaries = Object.values(summaryMap);

  for (const row of summaries) {
    const { source, country, event_date, clicks, visits, airdrops } = row;

    const { data: existing, error: fetchError } = await supabase
      .from("tracking_summary")
      .select("clicks", "visits", "airdrops")
      .eq("source", source)
      .eq("country", country)
      .eq("event_date", event_date)
      .maybeSingle();

    if (fetchError) {
      console.error(`❌ Error checking existing summary for ${source}, ${country}, ${event_date}:`, fetchError);
      continue;
    }

    if (existing) {
      // Update existing
      const updated = {
        clicks: existing.clicks + clicks,
        visits: existing.visits + visits,
        airdrops: existing.airdrops + airdrops,
      };

      const { error: updateError } = await supabase
        .from("tracking_summary")
        .update(updated)
        .eq("source", source)
        .eq("country", country)
        .eq("event_date", event_date);

      if (updateError) {
        console.error(`❌ Error updating summary for ${source}, ${country}, ${event_date}:`, updateError);
      } else {
        console.log(`🔁 Updated summary: ${source} | ${country} | ${event_date}`);
      }
    } else {
      // Insert new
      const { error: insertError } = await supabase
        .from("tracking_summary")
        .insert([{ source, country, event_date, clicks, visits, airdrops }]);

      if (insertError) {
        console.error(`❌ Error inserting summary for ${source}, ${country}, ${event_date}:`, insertError);
      } else {
        console.log(`➕ Inserted summary: ${source} | ${country} | ${event_date}`);
      }
    }
  }

  console.log("✅ Summarization completed (no deletions done).");
}

summarizeTrackingEvents();
