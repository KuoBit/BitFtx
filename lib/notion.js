import { Client } from '@notionhq/client';
import { NotionAPI } from 'notion-client';

// Enhanced client configuration
const notion = new Client({ 
  auth: process.env.NOTION_TOKEN,
  timeoutMs: 10000
});

const notionRenderer = new NotionAPI({
  authToken: process.env.NOTION_TOKEN_V2 || process.env.NOTION_TOKEN,
  apiBaseUrl: 'https://www.notion.so/api/v3'
});

const databaseId = process.env.NOTION_DATABASE_ID;

// 1. Connection Test Utility
async function testNotionConnection() {
  try {
    await notion.users.me({});
    return true;
  } catch (error) {
    console.error('Notion connection test failed:', error);
    return false;
  }
}

// 2. Enhanced Database Query
export async function getDatabase() {
  if (!await testNotionConnection()) {
    throw new Error('Notion API connection failed');
  }

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: { property: 'Published', checkbox: { equals: true } },
      sorts: [{ property: 'Publish_Date', direction: 'descending' }]
    });

    return response.results.map(page => ({
      id: page.id.replace(/-/g, ''),
      slug: page.properties.Slug?.rich_text?.[0]?.plain_text || '',
      title: page.properties.Title?.title?.[0]?.plain_text || 'Untitled',
      preview: page.properties.Preview?.rich_text?.[0]?.plain_text || '',
      date: page.properties.Publish_Date?.date?.start || page.created_time,
      url: page.url
    }));
  } catch (error) {
    console.error('Database query failed:', {
      error: error.message,
      databaseId: databaseId,
      status: error.status
    });
    throw error;
  }
}

// 3. Robust Page Fetcher
export async function getPostBySlug(slug) {
  try {
    // First get all posts
    const posts = await getDatabase();
    const matched = posts.find(post => post.slug === slug);
    
    if (!matched) {
      console.error(`Slug not found: ${slug}`);
      return null;
    }

    console.log(`Attempting to fetch: ${matched.url}`);

    // Try Notion Renderer first
    try {
      const recordMap = await notionRenderer.getPage(matched.id);
      return { meta: matched, recordMap };
    } catch (renderError) {
      console.warn('NotionRenderer failed, falling back to official API:', renderError);
      
      // Fallback to official API
      try {
        const page = await notion.pages.retrieve({ page_id: matched.id });
        console.warn('Official API succeeded, but no recordMap available');
        return { 
          meta: matched,
          fallbackContent: page,
          warning: 'Using basic page data as fallback'
        };
      } catch (apiError) {
        console.error('Complete failure:', {
          pageId: matched.id,
          renderError: renderError.message,
          apiError: apiError.message
        });
        throw new Error(`Cannot fetch page content for ${matched.id}`);
      }
    }
  } catch (error) {
    console.error('getPostBySlug complete failure:', error);
    throw error;
  }
}