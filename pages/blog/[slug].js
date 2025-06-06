import { getPostBySlug } from "@/lib/notion";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { NotionRenderer } from "react-notion-x";

// Dynamically load Notion components
const Code = dynamic(() => import("react-notion-x/build/third-party/code").then((m) => m.Code));
const Collection = dynamic(() => import("react-notion-x/build/third-party/collection").then((m) => m.Collection));
const Equation = dynamic(() => import("react-notion-x/build/third-party/equation").then((m) => m.Equation));
const Modal = dynamic(() => import("react-notion-x/build/third-party/modal").then((m) => m.Modal));

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

  if (!post?.recordMap) {
    return (
      <div className="bg-[#0b0b0c] text-white min-h-screen p-10">
        <Head><title>Not Found – BitFtx Blog</title></Head>
        <h1 className="text-2xl font-bold">Post Not Found</h1>
      </div>
    );
  }

  const { meta, recordMap } = post;

  // ❌ Strip out all Notion auto-rendered metadata blocks
  const filteredBlocks = Object.fromEntries(
    Object.entries(recordMap.block || {}).filter(([key, blk]) => {
      const type = blk.value?.type || "";
      return !(
        type.startsWith("property_") ||
        type === "collection_view_page" ||
        (type === "page" && blk.value?.parent_table === "collection")
      );
    })
  );

  const cleanedRecordMap = {
    ...recordMap,
    block: filteredBlocks,
    collection: {},
    collection_query: {},
    collection_view: {},
    schema: {},
  };

  return (
    <>
      <Header />
      <main className="bg-[#0b0b0c] text-white min-h-screen pt-24 px-6 pb-20 font-sans">
        <Head>
          <title>{meta.title} – BitFtx Blog</title>
          <meta name="description" content={meta.preview} />
        </Head>

        <article className="max-w-3xl mx-auto prose prose-invert">
          <h1 className="text-4xl font-bold mb-2">{meta.title}</h1>
          <div className="text-white/70 text-sm mb-8">
            {new Date(meta.date).toLocaleDateString()} {meta.author && `· ${meta.author}`}
          </div>

          <NotionRenderer
            recordMap={cleanedRecordMap}
            fullPage={false}
            darkMode={true}
            disableHeader={true}
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
    console.error("Error in getServerSideProps:", err);
    return { props: { error: err.message } };
  }
}
