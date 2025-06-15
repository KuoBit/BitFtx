// components/EmailSender.js
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://onevirzsdrfxposewozx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9uZXZpcnpzZHJmeHBvc2V3b3p4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4MDIzNjksImV4cCI6MjA2MDM3ODM2OX0.IPFY8wqbxadZugoGIRWsGNU27tVqS8BEYJkem8WubAk"
);

export default function EmailSender() {
  const [source, setSource] = useState("airdrop_leads");
  const [subject, setSubject] = useState("");
  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const sendEmails = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const { data, error } = await supabase
      .from(source)
      .select("email")
      .neq("email", "");

    if (error || !data) {
      setLoading(false);
      return setResult("❌ Error fetching emails.");
    }

    const emails = data.map((row) => row.email);

    const { error: sendError } = await supabase.functions.invoke("sendBulkEmail", {
      body: { subject, html, emails },
    });

    setLoading(false);
    if (sendError) {
      setResult("❌ Failed to send emails.");
    } else {
      setResult(`✅ Sent to ${emails.length} recipients.`);
    }
  };

  return (
    <form onSubmit={sendEmails} className="space-y-4 max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold text-black">📧 Send Bulk Email</h2>

      <div>
        <label className="block font-semibold mb-1 text-black">Source Table</label>
        <select
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="p-2 border rounded w-full bg-white !text-black"
        >
          <option value="airdrop_leads">airdrop_leads</option>
          <option value="email_queue">email_queue</option>
        </select>
      </div>

      <div>
        <label className="block font-semibold mb-1 text-black">Email Subject</label>
        <input
          type="text"
          className="w-full p-2 border rounded bg-white !text-black"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1 text-black">Email HTML Body</label>
        <textarea
          rows={10}
          className="w-full p-2 border rounded font-mono text-sm bg-white !text-black"
          value={html}
          onChange={(e) => setHtml(e.target.value)}
          placeholder="<h1>Hello!</h1><p>Thanks for joining.</p>"
          required
        ></textarea>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Sending..." : "Send Emails"}
      </button>

      {result && <p className="text-sm text-center mt-2 text-black">{result}</p>}
    </form>
  );
}
