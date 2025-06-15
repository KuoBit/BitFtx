// pages/admin/email-sender.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { createClient } from "@supabase/supabase-js";
import Header from "@/components/Header";
import AdminHeader from "@/components/AdminHeader";
import Footer from "@/components/Footer";
import EmailSender from "@/components/EmailSender";

const supabase = createClient(
  "https://onevirzsdrfxposewozx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9uZXZpcnpzZHJmeHBvc2V3b3p4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4MDIzNjksImV4cCI6MjA2MDM3ODM2OX0.IPFY8wqbxadZugoGIRWsGNU27tVqS8BEYJkem8WubAk"
);

export default function EmailSenderPage() {
  const router = useRouter();
  const [session, setSession] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session || session.user.email !== "nitin@kuobit.com") {
        router.push("/");
      } else {
        setSession(session);
      }
    };
    checkSession();
  }, []);

  return (
    <>
      <Header />
      <AdminHeader />
      <div className="bg-[#0b0b0c] text-white min-h-screen py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">📧 Send Promotional Emails</h1>
          <EmailSender />
        </div>
      </div>
      <Footer />
    </>
  );
}
