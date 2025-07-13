// pages/admin/tracking.js
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, Tbody, Td, Th, Thead, Tr } from "@/components/ui/table";

const supabase = createClient(
  "https://onevirzsdrfxposewozx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9uZXZpcnpzZHJmeHBvc2V3b3p4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4MDIzNjksImV4cCI6MjA2MDM3ODM2OX0.IPFY8wqbxadZugoGIRWsGNU27tVqS8BEYJkem8WubAk"
);

export default function TrackingSummary() {
  const [events, setEvents] = useState([]);
  const [summary, setSummary] = useState([]);
  const [sourceFilter, setSourceFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase
        .from("tracking_events")
        .select("*")
        .order("created_at", { ascending: false });

      setEvents(data);

      // Group and summarize
      const summaryMap = {};
      data.forEach((e) => {
        const key = `${e.source || "unknown"}|${e.country || "unknown"}`;
        if (!summaryMap[key]) {
          summaryMap[key] = {
            source: e.source || "unknown",
            country: e.country || "unknown",
            clicks: 0,
            page_views: 0,
            airdrop_submissions: 0,
          };
        }
        if (e.event === "visit") summaryMap[key].clicks++;
        if (e.event === "page_view") summaryMap[key].page_views++;
        if (e.event === "airdrop_submit") summaryMap[key].airdrop_submissions++;
      });

      setSummary(Object.values(summaryMap));
    };

    fetchData();
  }, []);

  const filtered = summary.filter(
    (row) =>
      (!sourceFilter || row.source.includes(sourceFilter)) &&
      (!countryFilter || row.country.includes(countryFilter))
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📊 Tracking Summary</h1>

      <div className="flex gap-4 mb-4">
        <Input
          placeholder="Filter by Source"
          value={sourceFilter}
          onChange={(e) => setSourceFilter(e.target.value)}
        />
        <Input
          placeholder="Filter by Country"
          value={countryFilter}
          onChange={(e) => setCountryFilter(e.target.value)}
        />
      </div>

      <Card>
        <CardContent>
          <Table>
            <Thead>
              <Tr>
                <Th>Source</Th>
                <Th>Country</Th>
                <Th>Clicks</Th>
                <Th>Page Views</Th>
                <Th>Airdrop Submissions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filtered.map((row, idx) => (
                <Tr key={idx}>
                  <Td>{row.source}</Td>
                  <Td>{row.country}</Td>
                  <Td>{row.clicks}</Td>
                  <Td>{row.page_views}</Td>
                  <Td>{row.airdrop_submissions}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
