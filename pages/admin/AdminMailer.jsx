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

const SENDGRID_API = "https://api.sendgrid.com/v3/mail/send";
const SENDGRID_KEY = "N3Q31HWTGZYHYGZUQAJC2UKS";

export default function AdminMailer() {
  const [users, setUsers] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [subject, setSubject] = useState("");
  const [html, setHtml] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await supabase
        .from("airdrop_leads")
        .select("email")
        .order("created_at", { ascending: false });

      setUsers(data || []);
    };
    fetchUsers();
  }, []);

  const toggleEmail = (email) => {
    setSelectedEmails((prev) =>
      prev.includes(email)
        ? prev.filter((e) => e !== email)
        : [...prev, email]
    );
  };

  const sendEmails = async () => {
    if (!subject || !html || selectedEmails.length === 0) {
      alert("Please fill in all fields and select recipients.");
      return;
    }

    const payload = {
      personalizations: [
        {
          to: selectedEmails.map((email) => ({ email })),
          subject,
        },
      ],
      from: {
        email: "no-reply@bitftx.com",
        name: "BitFtx",
      },
      content: [
        {
          type: "text/html",
          value: html,
        },
      ],
    };

    const res = await fetch(SENDGRID_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SENDGRID_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      alert("✅ Emails sent!");
      // Optionally log to Supabase
      await supabase.from("sent_emails").insert({
        subject,
        html,
        recipients: selectedEmails,
      });
    } else {
      alert("❌ Failed to send emails.");
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
        <ReactQuill theme="snow" value={html} onChange={setHtml} />
      </div>

      <h3 className="text-lg font-semibold mb-2">Recipients:</h3>
<Select
  isMulti
  options={users.map((u) => ({ value: u.email, label: u.email }))}
  onChange={(selected) => setSelectedEmails(selected.map((s) => s.value))}
  placeholder="Select emails..."
  className="mb-4"
/>

      <Button className="mt-4" onClick={sendEmails}>
        🚀 Send Email
      </Button>
    </div>
  );
}
