import EmailSender from "@/components/EmailSender";
import Header from "@/components/Header";
import Footer from "@/components/Footer";


export default function EmailSenderPage() {
    return (
        <>
              <Header />
        
        
      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">📧 Send Promotional Emails</h1>
        <EmailSender />
      </div>
  <Footer />
      </>
    );
  }
