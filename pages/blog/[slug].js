// pages/blog/[slug].js
import Head from "next/head";
import { NotionRenderer } from "react-notion-x";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { getPostBySlug } from "@/lib/notion";

// dynamic imports for code, collection, etc.
const Code = dynamic(() => import("react-notion-x/build/third-party/code").then(mod => mod.Code));
const Collection = dynamic(() => import("react-notion-x/build/third-party/collection").then(mod => mod.Collection));
const Equation = dynamic(() => import("react-notion-x/build/third-party/equation").then(mod => mod.Equation));
const Modal = dynamic(() => import("react-notion-x/build/third-party/modal").then(mod => mod.Modal));

export default function BlogPost({ post, error }) {
  const router = useRouter();

  if (error) {
    return (
      <div className="bg-[#0b0b0c] text-white min-h-screen p-10">
        <Head><title>Error – BitFtx Blog</title></Head>
        <h1 className="text-2xl font-bold mb-4">Error Loading Post</h1>
        <p className="mb-4">{error}</p>
        <button onClick={() => router.reload()} className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">
          Retry
        </button>
      </div>
    );
  }

  if (!post || !post.meta) {
    return (
      <div className="bg-[#0b0b0c] text-white min-h-screen p-10">
        <Head><title>Not Found – BitFtx Blog</title></Head>
        <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
      </div>
    );
  }

  return (
    <div className="bg-[#0b0b0c] text-white min-h-screen py-10 px-6 font-sans">
      <Head>
        <title>{post.meta.title} – BitFtx Blog</title>
        <meta name="description" content={post.meta.preview} />
      </Head>

      <article className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{post.meta.title}</h1>
        <p className="text-white/70 text-sm mb-8">
          {new Date(post.meta.date).toLocaleDateString()}
        </p>

        <article className="max-w-3xl mx-auto prose prose-invert">
  <NotionRenderer
    recordMap={post.recordMap}
    fullPage={false}
    darkMode
    components={{ Code, Collection, Equation, Modal }}
  />
</article>
      </article>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const post = await getPostBySlug(params.slug);
    if (!post) return { notFound: true };
    return { props: { post } };
  } catch (err) {
    return { props: { post: null, error: err.message } };
  }
}
