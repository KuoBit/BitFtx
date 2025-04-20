// pages/blog/index.js
import Head from "next/head";
import Link from "next/link";
import { getDatabase } from "../../lib/notion";

export async function getStaticProps() {
  const database = await getDatabase();
  return {
    props: {
      posts: database,
    },
  };
}

export const config = {
  unstable_runtimeJS: false, // remove JS for fully static
};

export default function Blog({ posts }) {
  return (
    <div className="bg-[#0b0b0c] text-white min-h-screen py-20 px-6 font-sans">
      <Head>
        <title>BitFtx Blog – Predictions, Insights, and Alpha</title>
      </Head>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 text-center">📰 BitFtx Blog</h1>
        <div className="space-y-8">
          {posts.map((post) => {
            const props = post.properties || {};
            const title = props.Title?.title?.[0]?.plain_text || "Untitled";
            const slug = props.Slug?.rich_text?.[0]?.plain_text || "";
            const preview = props.Preview?.rich_text?.[0]?.plain_text || "No preview available.";
            const date = props.Date?.date?.start || post.created_time;

            return (
              <div key={post.id} className="border border-white/10 p-6 rounded-lg hover:border-purple-400 transition-all">
                <Link href={`/blog/${slug}`}>
                  <h2 className="text-2xl font-semibold hover:text-purple-400 transition">
                    {title}
                  </h2>
                </Link>
                <p className="text-white/70 mt-2">{preview}</p>
                <p className="text-white/40 text-sm mt-2">
                  {new Date(date).toLocaleDateString()}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
