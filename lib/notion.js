import { Client } from '@notionhq/client';
import { NotionAPI } from 'notion-client';

const notion = new Client({ 
  auth: process.env.NOTION_TOKEN,
  timeoutMs: 15000
});

const notionRenderer = new NotionAPI({
  authToken: process.env.NOTION_TOKEN_V2,
  activeUser: process.env.NOTION_USER_ID,
  apiBaseUrl: 'https://www.notion.so/api/v3'
});

const databaseId = process.env.NOTION_DATABASE_ID;

// 1. Export getDatabase function (for blog index)
export async function getDatabase() {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: 'Published',
      checkbox: { equals: true },
    },
    sorts: [{
      property: 'Publish_Date',
      direction: 'descending',
    }],
  });

  return response.results.map(page => ({
    id: page.id.replace(/-/g, ''),
    slug: page.properties.Slug?.rich_text?.[0]?.plain_text || '',
    title: page.properties.Title?.title?.[0]?.plain_text || 'Untitled',
    preview: page.properties.Preview?.rich_text?.[0]?.plain_text || '',
    date: page.properties.Publish_Date?.date?.start || page.created_time,
    url: page.url
  }));
}

// 2. Keep existing getPostBySlug and helper functions
export async function getPostBySlug(slug) {
  try {
    const { id, url } = await getBasicPageInfo(slug);
    const recordMap = await getRecordMapWithRetry(id);
    
    return {
      meta: await getPageMeta(id),
      recordMap,
      url
    };
  } catch (error) {
    console.error('Complete failure:', error);
    throw error;
  }
}

// Helper functions (same as before)
async function getBasicPageInfo(slug) {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: { 
      property: 'Slug',
      rich_text: { equals: slug } 
    },
    page_size: 1
  });

  if (!response.results.length) throw new Error('Page not found in database');
  const page = response.results[0];
  return {
    id: page.id.replace(/-/g, ''),
    url: page.url
  };
}

async function getRecordMapWithRetry(pageId, attempt = 1) {
  try {
    return await notionRenderer.getPage(pageId);
  } catch (error) {
    if (attempt >= 3) throw error;
    await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
    return getRecordMapWithRetry(pageId, attempt + 1);
  }
}

async function getPageMeta(pageId) {
  const page = await notion.pages.retrieve({ page_id: pageId });
  return {
    title: page.properties.Title?.title?.[0]?.plain_text || 'Untitled',
    preview: page.properties.Preview?.rich_text?.[0]?.plain_text || '',
    date: page.properties.Publish_Date?.date?.start || page.created_time,
    slug: page.properties.Slug?.rich_text?.[0]?.plain_text || ''
  };
}