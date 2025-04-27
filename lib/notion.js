import { Client } from '@notionhq/client';
import { NotionAPI } from 'notion-client';

const notionOfficial = new Client({ auth: process.env.NOTION_TOKEN });
const notionRenderer = new NotionAPI();

const databaseId = process.env.NOTION_DATABASE_ID;

// ✅ 1. Fetch All Posts Metadata
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

  return response.results.map(page => ({
    id: page.id,  // Keep this in UUID format
    slug: page.properties.Slug?.rich_text?.[0]?.plain_text || '',
    title: page.properties.Title?.title?.[0]?.plain_text || 'Untitled'
  }));
}

// ✅ 2. Get Post by Slug
export async function getPostBySlug(slug) {
  const posts = await getDatabase();
  const matched = posts.find(post => post.slug === slug);
  if (!matched) return null;

  const recordMap = await notionRenderer.getPage(matched.id);
  return {
    page: matched,
    recordMap
  };
}
