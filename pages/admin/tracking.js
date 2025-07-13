import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import dynamic from "next/dynamic";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const supabase = createClient(
  "https://onevirzsdrfxposewozx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9uZXZpcnpzZHJmeHBvc2V3b3p4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4MDIzNjksImV4cCI6MjA2MDM3ODM2OX0.IPFY8wqbxadZugoGIRWsGNU27tVqS8BEYJkem8WubAk"
);

const TrackingDashboard = () => {
  const [data, setData] = useState([]);
  const [sourceFilter, setSourceFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [sourceFilter, countryFilter]);

  const fetchData = async () => {
    setLoading(true);
    let query = supabase.from("tracking_events").select("*").order("created_at", { ascending: false });

    if (sourceFilter) query = query.eq("source", sourceFilter);
    if (countryFilter) query = query.eq("country", countryFilter);

    const { data, error } = await query;
    if (error) console.error("Fetch Error:", error);
    else setData(data);

    setLoading(false);
  };

  const uniqueSources = [...new Set(data.map((d) => d.source))];
  const uniqueCountries = [...new Set(data.map((d) => d.country))];

  return (
    <>
      <Header />
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📊 Tracking Dashboard</h1>

      <div className="flex gap-4 mb-6">
        <select
          value={sourceFilter}
          onChange={(e) => setSourceFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Sources</option>
          {uniqueSources.map((src, i) => (
            <option key={i} value={src}>
              {src || "(none)"}
            </option>
          ))}
        </select>

        <select
          value={countryFilter}
          onChange={(e) => setCountryFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Countries</option>
          {uniqueCountries.map((c, i) => (
            <option key={i} value={c}>
              {c || "(unknown)"}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p>Loading data...</p>
      ) : (
        <table className="w-full text-left border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Event</th>
              <th className="p-2 border">Source</th>
              <th className="p-2 border">Country</th>
              <th className="p-2 border">Device</th>
              <th className="p-2 border">IP</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="border-b">
                <td className="p-2 border">{new Date(row.created_at).toLocaleString()}</td>
                <td className="p-2 border">{row.event}</td>
                <td className="p-2 border">{row.source || "-"}</td>
                <td className="p-2 border">{row.country || "-"}</td>
                <td className="p-2 border">{row.device || "-"}</td>
                <td className="p-2 border text-xs">{row.ip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
          <Footer />
        </>
  );
};

export default dynamic(() => Promise.resolve(TrackingDashboard), { ssr: false });
