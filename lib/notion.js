import { Client } from '@notionhq/client';
import { NotionAPI } from 'notion-client';

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const notionRenderer = new NotionAPI();

const databaseId = process.env.NOTION_DATABASE_ID;

function normalizePageId(id) {
  return id.replace(
    /^(.{8})(.{4})(.{4})(.{4})(.{12})$/,
    '$1-$2-$3-$4-$5'
  );
}

// ✅ 1. Get All Posts for Blog Listing
export async function getDatabase() {
  const response = await notion.databases.query({
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
    id: page.id,
    slug: page.properties.Slug?.rich_text?.[0]?.plain_text || '',
    title: page.properties.Title?.title?.[0]?.plain_text || 'Untitled',
    preview: page.properties.Preview?.rich_text?.[0]?.plain_text || '',
    date: page.properties.Publish_Date?.date?.start || page.created_time
  }));
}

// ✅ 2. Get Post Content by Slug
export async function getPostBySlug(slug) {
  const posts = await getDatabase();   // Always fetch fresh, correct IDs
  const matched = posts.find(post => post.slug === slug);
  if (!matched) return null;

  const normalizedId = normalizePageId(matched.id);

  console.log(`👉 Fetching Notion Page with ID: ${normalizedId}`);

  const recordMap = await notionRenderer.getPage(normalizedId);  // Must use normalized ID

  return {
    meta: matched,
    recordMap
  };
}



