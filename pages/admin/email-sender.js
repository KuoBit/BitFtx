// pages/admin/email-sender.js
import EmailSender from "@/components/EmailSender";

export default function EmailSenderPage() {
  return (
    <AdminLayout title="Send Emails"> {/* Remove if no layout */}
      <EmailSender />
    </AdminLayout>
  );
}
