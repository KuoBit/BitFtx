import { getPostBySlug } from "@/lib/notion";
import Head from "next/head";
import { NotionRenderer } from "react-notion-x";
import dynamic from "next/dynamic";
import { useRouter } from 'next/router';


const Code = dynamic(() => import("react-notion-x/build/third-party/code"));
const Collection = dynamic(() => import("react-notion-x/build/third-party/collection"));
const Equation = dynamic(() => import("react-notion-x/build/third-party/equation"));
const Modal = dynamic(() => import("react-notion-x/build/third-party/modal"));

export default function BlogPost({ post, error }) {
  const router = useRouter();

  if (error) {
    return (
      <div className="bg-[#0b0b0c] text-white min-h-screen p-10">
        <h1 className="text-2xl font-bold mb-4">Error Loading Post</h1>
        <p className="mb-4">{error}</p>
        <button 
          onClick={() => router.reload()}
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!post?.recordMap) {
    return (
      <div className="bg-[#0b0b0c] text-white min-h-screen p-10">
        <Head>
          <title>{post?.meta?.title || 'Post'} – BitFtx Blog</title>
        </Head>

        <article className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">{post?.meta?.title || 'Untitled Post'}</h1>
          
          <div className="bg-yellow-900/30 p-6 rounded-lg border border-yellow-700/50 mb-8">
            <h2 className="text-xl font-semibold mb-2">Content Loading Issue</h2>
            <p className="mb-4">We couldn't load the full post content, but here's what we have:</p>
            
            {post?.meta?.preview && (
              <div className="prose prose-invert max-w-none">
                <h3>Preview:</h3>
                <p>{post.meta.preview}</p>
              </div>
            )}

            <a 
              href={post?.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
            >
              View Original in Notion
            </a>
          </div>
        </article>
      </div>
    );
  }
}

export async function getServerSideProps({ params }) {
  try {
    const post = await getPostBySlug(params.slug);
    if (!post) return { notFound: true };
    
    return { 
      props: { 
        post,
        // Optional: Add revalidation for ISR
        // revalidate: 60 
      } 
    };
  } catch (error) {
    return {
      props: {
        error: error.message,
        post: null
      }
    };
  }
}