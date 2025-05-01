export default function BlogPost({ post, error }) {
  // ... existing imports and initial code ...

  if (!post?.recordMap && !post?.fallbackContent) {
    return (
      <div className="bg-[#0b0b0c] text-white min-h-screen p-10">
        <Head>
          <title>Error - BitFtx Blog</title>
        </Head>
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Content Unavailable</h1>
          <p className="mb-6">We couldn't load this post's content.</p>
          
          {post?.url && (
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
            >
              View in Notion
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0b0b0c] text-white min-h-screen py-10 px-6 font-sans">
      <Head>
        <title>{post.meta.title} - BitFtx Blog</title>
      </Head>

      <article className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{post.meta.title}</h1>
        
        {post.warning && (
          <div className="bg-yellow-900/30 p-4 rounded-lg mb-6">
            {post.warning}
          </div>
        )}

        {post.recordMap ? (
          <NotionRenderer
            recordMap={post.recordMap}
            fullPage={false}
            darkMode={true}
            components={{
              Code,
              Collection,
              Equation,
              Modal
            }}
          />
        ) : (
          <div className="prose prose-invert">
            <p>{post.meta.preview}</p>
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
            >
              Read Full Post on Notion
            </a>
          </div>
        )}
      </article>
    </div>
  );
}