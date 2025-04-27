import { getPostBySlug } from "@/lib/notion";
import Head from "next/head";
import { NotionRenderer } from "react-notion-x";
import dynamic from "next/dynamic";

const Code = dynamic(() => import("react-notion-x/build/third-party/code"));
const Collection = dynamic(() => import("react-notion-x/build/third-party/collection"));
const Equation = dynamic(() => import("react-notion-x/build/third-party/equation"));
const Modal = dynamic(() => import("react-notion-x/build/third-party/modal"));

export default function BlogPost({ post }) {
  if (!post) return <div className="text-white p-10">Post not found</div>;

  const { meta, recordMap } = post;

  return (
    <div className="bg-[#0b0b0c] text-white min-h-screen py-10 px-6 font-sans">
      <Head>
        <title>{meta.title} – BitFtx Blog</title>
        <meta name="description" content={meta.preview} />
      </Head>

      <article className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{meta.title}</h1>
        <p className="text-white/70 text-sm mb-8">
          {new Date(meta.date).toLocaleDateString()}
        </p>

        <NotionRenderer recordMap={post.recordMap} fullPage={false} darkMode={true} />

      </article>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return { notFound: true };
  }
  return {
    props: { post },
  };
}
