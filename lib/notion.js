// lib/notion.js
import { NotionAPI } from 'notion-client';
import { Client }    from '@notionhq/client';

export const notionPublic   = new NotionAPI();
export const notionOfficial = new Client({ auth: process.env.NOTION_TOKEN });

const databaseId = process.env.NOTION_DATABASE_ID;

export async function getDatabase() {
  const resp = await notionOfficial.databases.query({
    database_id: databaseId,
    filter:    { property: 'Published', checkbox: { equals: true } },
    sorts:     [{ property: 'Publish_Date', direction: 'descending' }],
  });

  return resp.results.map(p => {
    const pr = p.properties || {};
    return {
      id:      p.id,
      slug:    pr.Slug?.rich_text?.[0]?.plain_text.trim()   || '',
      title:   pr.Title?.title?.[0]?.plain_text              || 'Untitled',
      date:    pr.Publish_Date?.date?.start                  || p.created_time,
      author:  pr['Published By']?.people?.[0]?.name         || 'Unknown',
      preview: pr.Preview?.rich_text?.[0]?.plain_text        || '',
    };
  });
}

export async function getPostBySlug(slug) {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    filter: { property: 'Slug', rich_text: { equals: slug } },
    page_size: 1
  });

  if (!response.results.length) throw new Error('Post not found');

  const page = response.results[0];
  const recordMap = await notionRenderer.getPage(page.id);

  return {
    meta: {
      title: page.properties.Title?.title?.[0]?.plain_text || 'Untitled',
      preview: page.properties.Preview?.rich_text?.[0]?.plain_text || '',
      date: page.properties.Publish_Date?.date?.start || page.created_time,
      slug,
      author: page.properties.Author?.people?.[0]?.name || '' // ✅ Add this line
    },
    recordMap
  };
}

