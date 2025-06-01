import { useEffect, useState } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createClient } from '@supabase/supabase-js';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useRouter } from 'next/router';

const supabase = createClient(
  "https://onevirzsdrfxposewozx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9uZXZpcnpzZHJmeHBvc2V3b3p4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4MDIzNjksImV4cCI6MjA2MDM3ODM2OX0.IPFY8wqbxadZugoGIRWsGNU27tVqS8BEYJkem8WubAk"
);

export default function Login() {
  const [session, setSession] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) router.push('/referrer'); // redirect to dashboard
    });

    // watch for login changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setSession(session);
        router.push('/referrer'); // redirect after login
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <>
      <Header />
      <div className="bg-[#0b0b0c] text-white min-h-screen py-20 px-6 font-sans flex justify-center items-center h-screen">
        <div className="w-full max-w-md bg-[#1a1a1c] border border-gray-700 rounded-xl p-6">
          <h1 className="text-2xl font-bold mb-6 text-center">Login to BitFtx</h1>

          <Auth
            supabaseClient={supabase}
            providers={[]}
            appearance={{
              theme: ThemeSupa,
              style: {
                input: {
                  backgroundColor: '#0b0b0c',
                  color: '#ffffff',
                  borderColor: '#444',
                  padding: '10px',
                  borderRadius: '6px',
                },
                label: { color: '#ffffff' },
                button: {
                  backgroundColor: '#4f46e5',
                  borderRadius: '6px',
                  padding: '10px',
                },
              },
              variables: {
                default: {
                  colors: {
                    brand: '#4f46e5',
                    brandAccent: '#6366f1',
                    inputText: '#ffffff',
                    inputBackground: '#0b0b0c',
                    inputBorder: '#444',
                    messageText: '#ffffff',
                  },
                },
              },
            }}
            theme="dark"
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
