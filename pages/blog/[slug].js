// pages/blog/[slug].js
import Head from 'next/head';
import { NotionRenderer } from 'react-notion-x';
import dynamic from 'next/dynamic';
import { getPostBySlug } from '@/lib/notion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Code       = dynamic(() => import('react-notion-x/build/third-party/code').then(m => m.Code));
const Collection = dynamic(() => import('react-notion-x/build/third-party/collection').then(m => m.Collection));
const Equation   = dynamic(() => import('react-notion-x/build/third-party/equation').then(m => m.Equation));
const Modal      = dynamic(() => import('react-notion-x/build/third-party/modal').then(m => m.Modal));

export default function BlogPost({ post, error }) {
  if (error) return <p className="p-10 text-red-400">Error: {error}</p>;
  if (!post)  return <p className="p-10">Not found</p>;

  const { meta, recordMap } = post;

  return (
    <>
      <Header />
      <main className="bg-[#0b0b0c] text-white min-h-screen pt-24 px-6 pb-20 font-sans">
        <Head>
          <title>{meta.title} — BitFtx Blog</title>
          <meta name="description" content={meta.preview} />
        </Head>

        <article className="max-w-3xl mx-auto prose prose-invert">
          <h1 className="text-4xl font-bold mb-2">{meta.title}</h1>
          <div className="text-white/70 text-sm mb-8">
            {new Date(meta.date).toLocaleDateString()} · {meta.author}
          </div>

          <NotionRenderer
            recordMap={recordMap}
            fullPage={false}
            darkMode={true}
            components={{ Code, Collection, Equation, Modal }}
          />
        </article>
      </main>
      <Footer />
    </>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const post = await getPostBySlug(params.slug);
    if (!post) return { notFound: true };
    return { props: { post } };
  } catch (err) {
    return { props: { error: err.message } };
  }
}
