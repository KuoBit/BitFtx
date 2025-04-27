import { Client } from '@notionhq/client';
import { NotionAPI } from 'notion-client';

const notionOfficial = new Client({ auth: process.env.NOTION_TOKEN });
const notionRenderer = new NotionAPI();

const databaseId = process.env.NOTION_DATABASE_ID;

// 1️⃣ Fetch posts from database (use Notion SDK, not notion-client)
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

// 2️⃣ Get All Posts
export async function getAllPosts() {
  const pages = await getDatabase();
  return pages.map(page => ({
    id: page.id,
    slug: page.properties.Slug?.rich_text?.[0]?.plain_text || '',
    title: page.properties.Title?.title?.[0]?.plain_text || 'Untitled'
  }));
}

// 3️⃣ Get Post by Slug
export async function getPostBySlug(slug) {
  const posts = await getAllPosts();
  const matched = posts.find(post => post.slug === slug);
  if (!matched) return null;

  const recordMap = await notionRenderer.getPage(matched.id);
  return {
    page: matched,
    recordMap,
  };
}
