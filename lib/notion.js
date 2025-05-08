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
      author: pr.Author?.people?.[0]?.name || pr.Author?.rich_text?.[0]?.plain_text || 'Unknown',
      preview: pr.Preview?.rich_text?.[0]?.plain_text        || '',
    };
  });
}

export async function getPostBySlug(slug) {
  const all = await getDatabase();
  const meta = all.find(x => x.slug === slug);
  if (!meta) return null;

  console.log('👉 Fetching content for:', slug);
  console.log('Notion Page ID:', meta.id);
  console.log('🔎 meta:', meta);
  console.log('📦 block count:', Object.keys(recordMap.block || {}).length);

  const recordMap = await notionPublic.getPage(meta.id);
  const blockCount = Object.keys(recordMap.block || {}).length;
  
  return { meta, recordMap };
}

