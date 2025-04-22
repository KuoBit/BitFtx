import { NotionAPI } from 'notion-client';

// 👉 NotionAPI from notion-client gives you getPage()
const notion = new NotionAPI();

function toDashUUID(id) {
  return `${id.substr(0,8)}-${id.substr(8,4)}-${id.substr(12,4)}-${id.substr(16,4)}-${id.substr(20)}`;
}

// Fetch full database as recordMap
export async function getDatabase() {
  const response = await notion.getPage(process.env.NOTION_DATABASE_ID);
  return response;
}

export async function getAllPosts() {
  const db = await getDatabase();
  const collection = Object.values(db.block).filter(
    block => block.value?.type === 'page'
  );

  return collection.map(page => {
    const props = page.value?.properties || {};
    return {
      id: page.value?.id,
      slug: props?.Slug?.[0]?.[0] || '',
      title: props?.Title?.[0]?.[0] || 'Untitled'
    };
  });
}

export async function getPostBySlug(slug) {
  const posts = await getAllPosts();
  const matched = posts.find(post => post.slug === slug);
  if (!matched) return null;

  const recordMap = await notion.getPage(toDashUUID(matched.id));
  return {
    page: matched,
    recordMap,
  };
}
