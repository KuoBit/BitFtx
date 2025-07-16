import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    "https://onevirzsdrfxposewozx.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9uZXZpcnpzZHJmeHBvc2V3b3p4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4MDIzNjksImV4cCI6MjA2MDM3ODM2OX0.IPFY8wqbxadZugoGIRWsGNU27tVqS8BEYJkem8WubAk"
  );

function formatDateUTC(date) {
  return date.toISOString().split("T")[0];
}

async function fetchAllOldEvents(todayISO) {
  const pageSize = 1000;
  let allEvents = [];
  let from = 0;
  let to = pageSize - 1;

  while (true) {
    const { data: events, error } = await supabase
      .from("tracking_events")
      .select("*")
      .lt("created_at", todayISO)
      .range(from, to);

    if (error) {
      console.error("❌ Error fetching tracking events:", error);
      break;
    }

    if (!events || events.length === 0) break;

    allEvents.push(...events);
    console.log(`📄 Fetched ${events.length} rows [${from}-${to}]`);

    if (events.length < pageSize) break;

    from += pageSize;
    to += pageSize;
  }

  return allEvents;
}

async function summarizeTrackingEvents() {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const todayISO = today.toISOString();

  console.log("📦 Fetching events before:", todayISO);
  const events = await fetchAllOldEvents(todayISO);

  if (!events || events.length === 0) {
    console.log("✅ No old events to summarize.");
    return;
  }

  console.log(`🔍 Total events to summarize: ${events.length}`);

  const summaryMap = {};

  for (const e of events) {
    const date = new Date(e.created_at);
    date.setUTCHours(0, 0, 0, 0);
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
      console.error(`❌ Error checking summary for ${source}, ${country}, ${event_date}:`, fetchError);
      continue;
    }

    if (existing) {
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

  // ✅ DELETE events that were summarized
  console.log("🧹 Deleting old events from tracking_events...");
  const { error: deleteError } = await supabase
    .from("tracking_events")
    .delete()
    .lt("created_at", todayISO);

  if (deleteError) {
    console.error("❌ Error deleting old tracking events:", deleteError);
  } else {
    console.log("🗑️ Old tracking events deleted.");
  }

  console.log("✅ Summarization + Cleanup completed.");
}

summarizeTrackingEvents();
