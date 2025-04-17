// pages/blog/[slug].js
import { getAllPosts, getPostBySlug } from "@/lib/notion";
import Head from "next/head";
import { NotionRenderer } from "react-notion-x";
import dynamic from "next/dynamic";

// Optional: Code & Equation renderers
const Code = dynamic(() => import("react-notion-x/build/third-party/code"));
const Collection = dynamic(() => import("react-notion-x/build/third-party/collection"));
const Equation = dynamic(() => import("react-notion-x/build/third-party/equation"));
const Modal = dynamic(() => import("react-notion-x/build/third-party/modal"));

export default function BlogPost({ post }) {
  if (!post) return <div className="text-white p-10">Post not found</div>;

  return (
    <div className="bg-[#0b0b0c] text-white min-h-screen py-10 px-6 font-sans">
      <Head>
        <title>{post.page.properties.Name.title[0]?.plain_text} – BitFtx Blog</title>
        <meta
          name="description"
          content={post.page.properties.Summary?.rich_text[0]?.plain_text || "BitFtx blog post"}
        />
      </Head>

      <article className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">
          {post.page.properties.Name.title[0]?.plain_text}
        </h1>
        <p className="text-white/70 text-sm mb-8">
          {new Date(post.page.created_time).toLocaleDateString()}
        </p>

        <NotionRenderer
          recordMap={post.recordMap}
          components={{ Code, Collection, Equation, Modal }}
          darkMode={true}
          fullPage={false}
        />
      </article>
    </div>
  );
}

export async function getStaticPaths() {
  const posts = await getAllPosts();
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));
  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const post = await getPostBySlug(params.slug);
  return {
    props: { post },
  //  revalidate: 60,
  };
}
