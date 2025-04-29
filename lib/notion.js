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

export async function getPostBySlug(slug) {
  try {
    // First get basic page info
    const { id, url } = await getBasicPageInfo(slug);
    
    // Try to get full recordMap
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

async function getBasicPageInfo(slug) {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    filter: { 
      property: 'Slug',
      rich_text: { equals: slug } 
    },
    page_size: 1
  });

  if (!response.results.length) {
    throw new Error('Page not found in database');
  }

  const page = response.results[0];
  return {
    id: page.id.replace(/-/g, ''),
    url: page.url
  };
}

async function getRecordMapWithRetry(pageId, attempt = 1) {
  try {
    console.log(`Attempt ${attempt} to fetch recordMap for ${pageId}`);
    return await notionRenderer.getPage(pageId);
  } catch (error) {
    if (attempt >= 3) throw error;
    
    // Exponential backoff
    await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
    return getRecordMapWithRetry(pageId, attempt + 1);
  }
}

async function getPageMeta(pageId) {
  const page = await notion.pages.retrieve({ page_id: pageId });
  const properties = page.properties;
  
  return {
    title: properties.Title?.title?.[0]?.plain_text || 'Untitled',
    preview: properties.Preview?.rich_text?.[0]?.plain_text || '',
    date: properties.Publish_Date?.date?.start || page.created_time,
    slug: properties.Slug?.rich_text?.[0]?.plain_text || ''
  };
}