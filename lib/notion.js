import { Client } from '@notionhq/client';
import { NotionAPI } from 'notion-client';

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const notionRenderer = new NotionAPI();

const databaseId = process.env.NOTION_DATABASE_ID;

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

  return response.results.map(page => {
    // Ensure ID is in correct format (without hyphens)
    const pageId = page.id.replace(/-/g, '');
    
    return {
      id: pageId,
      slug: page.properties.Slug?.rich_text?.[0]?.plain_text || '',
      title: page.properties.Title?.title?.[0]?.plain_text || 'Untitled',
      preview: page.properties.Preview?.rich_text?.[0]?.plain_text || '',
      date: page.properties.Publish_Date?.date?.start || page.created_time
    };
  });
}

// ✅ 2. Get Post Content by Slug
export async function getPostBySlug(slug) {
  try {
    const posts = await getDatabase();
    const matched = posts.find(post => post.slug === slug);
    
    if (!matched) {
      console.error(`No post found for slug: ${slug}`);
      return null;
    }

    console.log(`👉 Fetching Notion Page with ID: ${matched.id}`);
    
    const recordMap = await notionRenderer.getPage(matched.id);

    return {
      meta: matched,
      recordMap
    };
  } catch (error) {
    console.error('Error in getPostBySlug:', error);
    throw error;
  }
}