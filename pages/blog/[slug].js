import { getPostBySlug } from "@/lib/notion";
import Head from "next/head";
import { NotionRenderer } from "react-notion-x";
import dynamic from "next/dynamic";

// Dynamic imports for heavy components
const Code = dynamic(() => import("react-notion-x/build/third-party/code"));
const Collection = dynamic(() => import("react-notion-x/build/third-party/collection"));
const Equation = dynamic(() => import("react-notion-x/build/third-party/equation"));
const Modal = dynamic(() => import("react-notion-x/build/third-party/modal"));

export default function BlogPost({ recordMap }) {
  if (!recordMap) return <div className="text-white p-10">Post not found</div>;

  const pageBlock = Object.values(recordMap.block).find(
    block => block.value?.type === 'page'
  );

  const title = pageBlock?.value?.properties?.Title?.[0]?.[0] || "Untitled";

  return (
    <div className="bg-[#0b0b0c] text-white min-h-screen py-10 px-6 font-sans">
      <Head>
        <title>{title} – BitFtx Blog</title>
      </Head>

      <article className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">{title}</h1>
        <NotionRenderer
          recordMap={recordMap}
          components={{ Code, Collection, Equation, Modal }}
          darkMode={true}
        />
      </article>
    </div>
  );
}

// Use SSR to fetch post dynamically
export async function getServerSideProps({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return { notFound: true };
  }

  return {
    props: { post },
  };
}
