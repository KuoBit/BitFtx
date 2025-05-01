// pages/blog/index.js
import Head from 'next/head'
import Link from 'next/link'
import { getDatabase } from '../../lib/notion'

export default function Blog({ posts, error }) {
  if (error) return <p className="p-10 text-red-400">Error loading blog: {error}</p>

  return (
    <div className="min-h-screen bg-[#0b0b0c] text-white py-20 px-6">
      <Head><title>BitFtx Blog</title></Head>
      <h1 className="text-4xl font-bold mb-10 text-center">📰 BitFtx Blog</h1>
      <div className="space-y-8 max-w-4xl mx-auto">
        {posts.map((post) => (
          <div key={post.id} className="border p-6 rounded-lg hover:border-purple-400">
            <Link href={`/blog/${post.slug}`}>
              <a className="text-2xl font-semibold hover:text-purple-400">{post.title}</a>
            </Link>
            <p className="text-white/70 mt-2">{post.preview}</p>
            <p className="text-white/40 text-sm mt-2">
              {new Date(post.date).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  try {
    const posts = await getDatabase()
    return { props: { posts } }
  } catch (err) {
    return { props: { posts: [], error: err.message } }
  }
}
