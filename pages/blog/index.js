import Head from "next/head";
import Link from "next/link";
import { getDatabase } from "../../lib/notion";

export default function Blog({ posts, error }) {
  if (error) {
    return (
      <div className="bg-[#0b0b0c] text-white min-h-screen p-10">
        <h1 className="text-2xl font-bold mb-4">Error Loading Blog</h1>
        <p className="mb-4">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-[#0b0b0c] text-white min-h-screen py-20 px-6 font-sans">
      <Head>
        <title>BitFtx Blog</title>
      </Head>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 text-center">📰 BitFtx Blog</h1>
        <div className="space-y-8">
          {posts.map((post) => (
            <div key={post.id} className="border border-white/10 p-6 rounded-lg hover:border-purple-400 transition-all">
              <Link href={`/blog/${post.slug}`}>
                <a>
                  <h2 className="text-2xl font-semibold hover:text-purple-400 transition">
                    {post.title}
                  </h2>
                </a>
              </Link>
              <p className="text-white/70 mt-2">{post.preview}</p>
              <p className="text-white/40 text-sm mt-2">
                {new Date(post.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const posts = await getDatabase();
    return {
      props: { posts },
    };
  } catch (error) {
    return {
      props: { 
        posts: [],
        error: error.message 
      },
    };
  }
}