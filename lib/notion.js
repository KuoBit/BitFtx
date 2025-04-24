import { Client } from '@notionhq/client';
import { NotionAPI } from 'notion-client';

const notionOfficial = new Client({ auth: process.env.NOTION_TOKEN });
const notionRenderer = new NotionAPI();
const databaseId = process.env.NOTION_DATABASE_ID;

// ✅ 1. Fetch all posts from Notion
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

// ✅ 2. Prepare all posts
export async function getAllPosts() {
  const pages = await getDatabase();
  return pages.map(page => ({
    id: page.id, // 🟢 KEEP the full UUID with dashes
    slug: page.properties.Slug?.rich_text?.[0]?.plain_text || '',
    title: page.properties.Title?.title?.[0]?.plain_text || 'Untitled',
  }));
}

function normalizePageId(id) {
  return `${id.substr(0,8)}-${id.substr(8,4)}-${id.substr(12,4)}-${id.substr(16,4)}-${id.substr(20)}`;
}


// ✅ 3. Get a specific post by slug
export async function getPostBySlug(slug) {
  const posts = await getAllPosts();
  const matched = posts.find(post => post.slug === slug);
  if (!matched) return null;

  const normalizedId = normalizePageId(matched.id);
  const recordMap = await notionRenderer.getPage(normalizedId);

  return {
    page: matched,
    recordMap,
  };
}

