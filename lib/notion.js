// lib/notion.js
import { NotionAPI } from 'notion-client';
import { Client }    from '@notionhq/client';

export const notionPublic  = new NotionAPI();
export const notionOfficial = new Client({ auth: process.env.NOTION_TOKEN });

const databaseId = process.env.NOTION_DATABASE_ID;

export async function getDatabase() {
  const resp = await notionOfficial.databases.query({
    database_id: databaseId,
    filter:    { property: 'Published', checkbox: { equals: true } },
    sorts:     [{ property: 'Publish_Date', direction: 'descending' }],
  });
  return resp.results.map(p => {
    const props = p.properties||{};
    return {
      id:     p.id,
      slug:   props.Slug?.rich_text?.[0]?.plain_text?.trim() || '',
      title:  props.Title?.title?.[0]?.plain_text       || 'Untitled',
      date:   props.Publish_Date?.date?.start           || p.created_time,
      preview:props.Preview?.rich_text?.[0]?.plain_text || '',
    };
  });
}

export async function getPostBySlug(slug) {
  // 1) find the metadata
  const all = await getDatabase();
  const meta = all.find(x => x.slug === slug);
  if (!meta) return null;

  // 2) Fetch *full* RecordMap via the public client (works against publicly-shared pages)
  const recordMap = await notionPublic.getPage(meta.id);

  return { meta, recordMap };
}
