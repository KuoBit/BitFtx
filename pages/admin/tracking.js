import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const supabase = createClient(
  "https://onevirzsdrfxposewozx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9uZXZpcnpzZHJmeHBvc2V3b3p4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4MDIzNjksImV4cCI6MjA2MDM3ODM2OX0.IPFY8wqbxadZugoGIRWsGNU27tVqS8BEYJkem8WubAk"
);

export default function TrackingSummary() {
  const [events, setEvents] = useState([]);
  const [summary, setSummary] = useState([]);
  const [sourceFilter, setSourceFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortField, setSortField] = useState("clicks");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase
        .from("tracking_events")
        .select("*")
        .order("created_at", { ascending: false });

      if (!data) return;

      setEvents(data);

      const summaryMap = {};
      data.forEach((e) => {
        const date = new Date(e.created_at);
        const key = `${e.source || "unknown"}|${e.country || "unknown"}`;

        if (!summaryMap[key]) {
          summaryMap[key] = {
            source: e.source || "unknown",
            country: e.country || "unknown",
            clicks: 0,
            visits: 0,
            airdrops: 0,
            latest: date,
          };
        }

        if (e.event_type === "click") summaryMap[key].clicks++;
        if (e.event_type === "visit") summaryMap[key].visits++;
        if (e.event_type === "submit") summaryMap[key].airdrops++;

        if (date > summaryMap[key].latest) {
          summaryMap[key].latest = date;
        }
      });

      setSummary(Object.values(summaryMap));
    };

    fetchData();
  }, []);

  const filtered = summary
  .filter((row) => {
    const rowDate = new Date(row.latest);

    const afterStart =
      !startDate || rowDate >= new Date(`${startDate}T00:00:00`);
    const beforeEnd =
      !endDate || rowDate <= new Date(`${endDate}T23:59:59`);

    return (
      (!sourceFilter || row.source.includes(sourceFilter)) &&
      (!countryFilter || row.country.includes(countryFilter)) &&
      afterStart &&
      beforeEnd
    );
  })
  .sort((a, b) => {
    const aVal = a[sortField];
    const bVal = b[sortField];
    if (typeof aVal === "string") {
      return sortOrder === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    } else {
      return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
    }
  });


  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  const exportToCSV = () => {
    const headers = ["Source", "Country", "Clicks", "Visits", "Airdrops"];
    const rows = filtered.map((row) => [
      row.source,
      row.country,
      row.clicks,
      row.visits,
      row.airdrops,
    ]);

    const csvContent = [headers, ...rows]
      .map((e) => e.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "tracking_summary.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📊 Tracking Summary</h1>

      <div className="flex flex-wrap gap-4 mb-4 items-center">
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
        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-48"
        />
        <Input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-48"
        />
        <button
          onClick={exportToCSV}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ⬇ Download CSV
        </button>
      </div>

      <Card>
        <CardContent>
          <table className="w-full text-sm text-left">
            <thead>
              <tr>
                <th className="cursor-pointer" onClick={() => handleSort("source")}>Source</th>
                <th className="cursor-pointer" onClick={() => handleSort("country")}>Country</th>
                <th className="cursor-pointer" onClick={() => handleSort("clicks")}>Clicks</th>
                <th className="cursor-pointer" onClick={() => handleSort("visits")}>Visits</th>
                <th className="cursor-pointer" onClick={() => handleSort("airdrops")}>Airdrops</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, i) => (
                <tr key={i}>
                  <td>{row.source}</td>
                  <td>{row.country}</td>
                  <td>{row.clicks}</td>
                  <td>{row.visits}</td>
                  <td>{row.airdrops}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
