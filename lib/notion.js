import { Client } from '@notionhq/client';
import { NotionAPI } from 'notion-client';

// Initialize clients
const notionOfficial = new Client({ auth: process.env.NOTION_TOKEN });  // For database
const notionRenderer = new NotionAPI();                                 // For rendering pages

const databaseId = process.env.NOTION_DATABASE_ID;

// 1️⃣ Fetch posts from database
export async function getDatabase() {
  const response = await notionOfficial.databases.query({
    database_id: databaseId,
    filter: {
      property: 'Published',
      checkbox: { equals: true },
    },
    sorts: [
      {
        property: 'Publish_Date',
        direction: 'descending',
      },
    ],
  });

  return response.results;
}

// Normalize Page ID for Notion Renderer
function normalizePageId(id) {
  return id.replace(/-/g, '').replace(
    /^(.{8})(.{4})(.{4})(.{4})(.{12}).*$/,
    '$1-$2-$3-$4-$5'
  );
}

// 2️⃣ Prepare all posts
export async function getAllPosts() {
  const pages = await getDatabase();
  return pages.map(page => ({
    id: page.id,   // Keep dashes, normalize later
    slug: page.properties.Slug?.rich_text?.[0]?.plain_text || '',
    title: page.properties.Title?.title?.[0]?.plain_text || 'Untitled'
  }));
}

// 3️⃣ Get full post by slug
export async function getPostBySlug(slug) {
  const posts = await getAllPosts();
  const matched = posts.find(post => post.slug === slug);
  if (!matched) {
    console.log(`❌ No post found for slug: ${slug}`);
    return null;
  }

  const normalizedId = normalizePageId(matched.id);
  console.log(`📝 Fetching Notion Page -> Slug: ${slug}, Normalized ID: ${normalizedId}`);

  const recordMap = await notionRenderer.getPage(normalizedId);

  return {
    page: matched,
    recordMap,
  };
}

