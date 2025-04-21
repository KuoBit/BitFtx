import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const databaseId = process.env.NOTION_DATABASE_ID;

// ✅ 1. Export this first
export async function getDatabase() {
  const response = await notion.databases.query({
    database_id: databaseId,
    sorts: [
      {
        property: 'Published',
        direction: 'descending',
      },
    ],
  });

  return response.results;
}

// ✅ 2. Then define getAllPosts using getDatabase
export async function getAllPosts() {
  const pages = await getDatabase();
  const results = pages.map(page => ({
    id: page.id,
    slug: page.properties.Slug?.rich_text?.[0]?.plain_text || '',
  }));
  console.log("🔍 getAllPosts results:", results);
  return results;
}


// ✅ 3. For rendering page content
export async function getPageContent(pageId) {
  const response = await notion.blocks.children.list({
    block_id: pageId,
  });

  return response.results;
}

export async function getPostBySlug(slug) {
  const posts = await getDatabase();
  const matched = posts.find(
    (page) => page.properties?.Slug?.rich_text?.[0]?.plain_text === slug
  );

  if (!matched) return null;

  const pageId = matched.id;
  const recordMap = await notion.blocks.children.list({
    block_id: pageId,
  });

  return {
    page: matched,
    recordMap,
  };
}
