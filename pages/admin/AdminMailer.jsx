import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Select from "react-select";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const supabase = createClient(
    "https://onevirzsdrfxposewozx.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9uZXZpcnpzZHJmeHBvc2V3b3p4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4MDIzNjksImV4cCI6MjA2MDM3ODM2OX0.IPFY8wqbxadZugoGIRWsGNU27tVqS8BEYJkem8WubAk"
  );


export default function AdminMailer() {
  const [users, setUsers] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [subject, setSubject] = useState("");
  const [html, setHtml] = useState("");
  const [isRawHtml, setIsRawHtml] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await supabase
        .from("email_queue")
        .select("email")
        .order("created_at", { ascending: false });

      setUsers(data || []);
    };
    fetchUsers();
  }, []);

const sendEmails = async () => {
  if (!subject || !html || selectedEmails.length === 0) {
    alert("Please fill in all fields and select recipients.");
    return;
  }

  // ✅ Remove duplicates
  const uniqueEmails = [...new Set(selectedEmails)];

  setLoading(true);

  try {
    const res = await fetch(
      "https://onevirzsdrfxposewozx.supabase.co/functions/v1/send-email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9uZXZpcnpzZHJmeHBvc2V3b3p4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4MDIzNjksImV4cCI6MjA2MDM3ODM2OX0.IPFY8wqbxadZugoGIRWsGNU27tVqS8BEYJkem8WubAk`, // Or hardcode your anon key if safe
        },
        body: JSON.stringify({
          to: uniqueEmails, // ✅ Use unique emails here
          subject: subject.trim(),
          html,
        }),
      }
    );

    const result = await res.json();

    if (res.ok) {
      alert("✅ Emails sent successfully!");
      await supabase.from("sent_emails").insert({
        subject,
        html,
        recipients: uniqueEmails,
      });
    } else {
      console.error(result.error || "Unknown error");
      alert("❌ Failed to send emails: " + (result.error || "Check console"));
    }
  } catch (err) {
    console.error("❌ Error sending emails:", err);
    alert("❌ Something went wrong. Check console.");
  } finally {
    setLoading(false);
  }
};


  const sendTestEmail = async () => {
    const testEmail = prompt("Enter a test email address:");
    if (!testEmail) return;

    try {
      const res = await fetch(
        "https://onevirzsdrfxposewozx.supabase.co/functions/v1/send-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9uZXZpcnpzZHJmeHBvc2V3b3p4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4MDIzNjksImV4cCI6MjA2MDM3ODM2OX0.IPFY8wqbxadZugoGIRWsGNU27tVqS8BEYJkem8WubAk`, // Or hardcode your anon key if safe
          },
          body: JSON.stringify({
            to: [testEmail],
            subject: subject.trim() || "(Test Email)",
            html: html || "<p>Test Email</p>",
          }),
        }
      );

      const result = await res.json();
      if (res.ok) {
        alert(`✅ Test email sent to ${testEmail}`);
      } else {
        alert("❌ Failed: " + (result.error || "Check console"));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📧 Admin Email Sender</h2>

      <Input
        className="mb-3"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />

      <div className="mb-4">
        <button
          onClick={() => setIsRawHtml(!isRawHtml)}
          className="mb-2 px-4 py-2 bg-gray-200 rounded"
        >
          {isRawHtml ? "Switch to Editor" : "Switch to Raw HTML"}
        </button>

        {isRawHtml ? (
          <textarea
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            rows="12"
            className="w-full border p-3 rounded"
            placeholder="Paste full HTML template here"
          />
        ) : (
          <ReactQuill theme="snow" value={html} onChange={setHtml} />
        )}
      </div>

      <h3 className="text-lg font-semibold mb-2">Recipients:</h3>
      <Select
        isMulti
        options={[
          { value: "ALL", label: "Select All" },
          ...users.map((u) => ({ value: u.email, label: u.email })),
        ]}
        onChange={(selected) => {
          if (selected.some((s) => s.value === "ALL")) {
            setSelectedEmails(users.map((u) => u.email));
          } else {
            setSelectedEmails(selected.map((s) => s.value));
          }
        }}
        placeholder="Select emails or choose ALL..."
        className="mb-4"
      />

      <div className="flex gap-4">
        <Button
          className="bg-blue-600 text-white"
          onClick={() => setShowPreview(true)}
        >
          👀 Preview
        </Button>

        <Button
          className="bg-green-600 text-white"
          onClick={sendEmails}
          disabled={loading}
        >
          {loading ? "Sending..." : "🚀 Send Email"}
        </Button>

        <Button className="bg-purple-600 text-white" onClick={sendTestEmail}>
          🧪 Send Test Email
        </Button>
      </div>

      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded p-6 w-full max-w-3xl overflow-auto">
            <h3 className="text-xl font-bold mb-4">Email Preview</h3>
            <h4 className="mb-2">{subject}</h4>
            <div
              className="border p-4"
              dangerouslySetInnerHTML={{ __html: html }}
            />
            <div className="mt-4 flex justify-end gap-4">
              <Button onClick={() => setShowPreview(false)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
