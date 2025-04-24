import { Client } from '@notionhq/client';
import { NotionAPI } from 'notion-client';

const notionOfficial = new Client({ auth: process.env.NOTION_TOKEN });
const notionClient = new NotionAPI();

const databaseId = process.env.NOTION_DATABASE_ID;

// Helper: Properly format Notion Page ID
function formatNotionId(id) {
  if (!id.includes('-')) {
    return id.replace(
      /^(.{8})(.{4})(.{4})(.{4})(.{12})$/,
      '$1-$2-$3-$4-$5'
    );
  }
  return id;
}

// 1️⃣ Fetch posts from Notion DB
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

// 2️⃣ Get all posts (slug + id)
export async function getAllPosts() {
  const pages = await getDatabase();
  return pages.map(page => ({
    id: page.id.replace(/-/g, ''),   // Store as plain ID
    slug: page.properties.Slug?.rich_text?.[0]?.plain_text || '',
    title: page.properties.Title?.title?.[0]?.plain_text || 'Untitled'
  }));
}

// 3️⃣ Get Post by Slug
export async function getPostBySlug(slug) {
  const posts = await getAllPosts();
  const matched = posts.find(post => post.slug === slug);
  if (!matched) return null;

  const formattedId = formatNotionId(matched.id);
  const recordMap = await notionClient.getPage(formattedId);

  return {
    page: matched,
    recordMap,
  };
}
