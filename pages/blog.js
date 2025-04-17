// pages/blog.js
import Head from "next/head";
import Link from "next/link";
import { getAllPublishedPosts } from "../lib/notion";

export async function getStaticProps() {
  const posts = await getAllPublishedPosts();
  return {
    props: { posts },
    revalidate: 60, // regenerate every 60 seconds
  };
}

export default function Blog({ posts }) {
  return (
    <div className="bg-[#0b0b0c] text-white min-h-screen py-20 px-6 font-sans">
      <Head>
        <title>Blog – BitFtx</title>
        <meta name="description" content="Official blog of BitFtx. Explore articles, predictions, insights, and updates on the crypto prediction space." />
      </Head>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">📰 BitFtx Blog</h1>

        <ul className="space-y-8">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="block hover:text-purple-400">
                <h2 className="text-2xl font-semibold mb-1">{post.title}</h2>
                <p className="text-white/60 text-sm">{post.date}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
