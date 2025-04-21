import { NotionAPI } from 'notion-client';

const notion = new NotionAPI();

// Database of posts fetched dynamically
let notionDatabaseId = process.env.NOTION_DATABASE_ID;

export async function getDatabase() {
  const response = await notion.getPage(notionDatabaseId);
  return response; // You can parse this if needed
}

export async function getAllPosts() {
  const db = await getDatabase();
  const collection = Object.values(db.block).filter(
    block => block.value?.type === 'page'
  );

  return collection.map(page => {
    const props = page.value?.properties || {};
    return {
      id: page.value.id,
      slug: props?.Slug?.[0]?.[0] || '',
      title: props?.Title?.[0]?.[0] || 'Untitled'
    };
  });
}

export async function getPostBySlug(slug) {
  const posts = await getAllPosts();
  const matched = posts.find(post => post.slug === slug);
  if (!matched) return null;

  const recordMap = await notion.getPage(matched.id);
  return {
    page: matched,
    recordMap,
  };
}

export async function getPageContent(pageId) {
  return await notion.getPage(pageId);
}
