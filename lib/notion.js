import { NotionAPI } from 'notion-client';

const notion = new NotionAPI();

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

// 1️⃣ Get All Posts (directly from table view)
export async function getAllPosts() {
  const page = await notion.getPage(process.env.NOTION_DATABASE_ID);

  const collection = Object.values(page.block).filter(
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

// 2️⃣ Get Post by Slug
export async function getPostBySlug(slug) {
  const posts = await getAllPosts();
  const matched = posts.find(post => post.slug === slug);
  if (!matched) return null;

  return await notion.getPage(matched.id);
}
