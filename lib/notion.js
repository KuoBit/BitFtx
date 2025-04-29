import { Client } from '@notionhq/client';
import { NotionAPI } from 'notion-client';

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const notionRenderer = new NotionAPI({
  authToken: process.env.NOTION_TOKEN // Important addition
});

const databaseId = process.env.NOTION_DATABASE_ID;

// 1. Get All Published Posts
export async function getDatabase() {
  try {
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
      // Get the page ID from url if available (more reliable)
      const pageId = page.url.split('/').pop().split('-').pop();
      
      return {
        id: pageId,
        slug: page.properties.Slug?.rich_text?.[0]?.plain_text || '',
        title: page.properties.Title?.title?.[0]?.plain_text || 'Untitled',
        preview: page.properties.Preview?.rich_text?.[0]?.plain_text || '',
        date: page.properties.Publish_Date?.date?.start || page.created_time,
        url: page.url // For debugging
      };
    });
  } catch (error) {
    console.error('Error in getDatabase:', error);
    throw error;
  }
}

// 2. Get Post Content by Slug
export async function getPostBySlug(slug) {
  try {
    const posts = await getDatabase();
    const matched = posts.find(post => post.slug === slug);
    
    if (!matched) {
      console.error(`No post found for slug: ${slug}`);
      return null;
    }

    console.log(`👉 Fetching Notion Page with ID: ${matched.id}`);
    console.log(`👉 Page URL: ${matched.url}`); // Debugging
    
    // Try both with and without hyphens as fallback
    let recordMap;
    try {
      recordMap = await notionRenderer.getPage(matched.id);
    } catch (firstError) {
      console.log('First attempt failed, trying alternative ID format...');
      try {
        // Try with hyphens if first attempt failed
        const hyphenatedId = matched.id.replace(
          /^(.{8})(.{4})(.{4})(.{4})(.{12})$/,
          '$1-$2-$3-$4-$5'
        );
        recordMap = await notionRenderer.getPage(hyphenatedId);
      } catch (secondError) {
        console.error('Both ID formats failed:', {
          originalId: matched.id,
          error1: firstError.message,
          error2: secondError.message
        });
        throw new Error(`Failed to fetch page with ID ${matched.id}`);
      }
    }

    return {
      meta: matched,
      recordMap
    };
  } catch (error) {
    console.error('Error in getPostBySlug:', error);
    throw error;
  }
}