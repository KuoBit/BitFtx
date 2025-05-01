// pages/blog/index.js
import Head from 'next/head';
import Link from 'next/link';
import { getDatabase } from '../../lib/notion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export async function getServerSideProps() {
  const posts = await getDatabase();
  return { props: { posts } };
}

export default function Blog({ posts }) {
  return (
    <>
      <Header />
      <main className="bg-[#0b0b0c] text-white min-h-screen pt-24 pb-20 px-6 font-sans">
        <Head><title>BitFtx Blog</title></Head>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-10 text-center">📰 BitFtx Blog</h1>
          <div className="space-y-8">
            {posts.map(p => (
              <article key={p.id} className="border border-white/10 p-6 rounded-lg hover:border-purple-400 transition-all">
                <Link href={`/blog/${p.slug}`}>
                  <a className="text-2xl font-semibold hover:text-purple-400 transition">{p.title}</a>
                </Link>
                <div className="text-white/70 text-sm mt-2">
                  {new Date(p.date).toLocaleDateString()} · {p.author}
                </div>
                <p className="text-white/80 mt-4">{p.preview}</p>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
