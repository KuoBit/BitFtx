import { Client } from '@notionhq/client';
import { NotionAPI } from 'notion-client';

const notion = new Client({ 
  auth: process.env.NOTION_TOKEN,
  timeoutMs: 20000 // Increased timeout
});

const notionRenderer = new NotionAPI({
  authToken: process.env.NOTION_TOKEN_V2,
  apiBaseUrl: 'https://www.notion.so/api/v3',
  userLocale: 'en'
});

const databaseId = process.env.NOTION_DATABASE_ID;

// Utility to extract ID from URL
function extractPageId(url) {
  const matches = url.match(/([a-f0-9]{32})$/);
  return matches ? matches[1] : null;
}

export async function getPostBySlug(slug) {
  try {
    // 1. Get page info from database
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: { property: 'Slug', rich_text: { equals: slug } },
      page_size: 1
    });

    if (!response.results.length) {
      throw new Error(`Post with slug "${slug}" not found`);
    }

    const page = response.results[0];
    const pageId = extractPageId(page.url) || page.id.replace(/-/g, '');

    // 2. Try multiple methods to get content
    try {
      // Method 1: Notion Renderer (preferred)
      const recordMap = await notionRenderer.getPage(pageId);
      return {
        meta: {
          title: page.properties.Title?.title?.[0]?.plain_text || 'Untitled',
          preview: page.properties.Preview?.rich_text?.[0]?.plain_text || '',
          date: page.properties.Publish_Date?.date?.start || page.created_time,
          slug
        },
        recordMap,
        url: page.url
      };
    } catch (renderError) {
      console.warn('Renderer failed, trying official API fallback');
      
      // Method 2: Official API as fallback
      const officialPage = await notion.pages.retrieve({ page_id: pageId });
      return {
        meta: {
          title: officialPage.properties.Title?.title?.[0]?.plain_text || 'Untitled',
          preview: officialPage.properties.Preview?.rich_text?.[0]?.plain_text || '',
          date: officialPage.properties.Publish_Date?.date?.start || officialPage.created_time,
          slug
        },
        fallbackContent: officialPage,
        url: page.url,
        warning: 'Using basic page data as fallback'
      };
    }
  } catch (error) {
    console.error('Complete failure:', error);
    throw new Error(`Failed to load post: ${error.message}`);
  }
}