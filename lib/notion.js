// lib/notion.js
import { Client } from '@notionhq/client';
import { NotionAPI } from 'notion-client';

const notionOfficial = new Client({ auth: process.env.NOTION_TOKEN });
const notionRenderer = new NotionAPI();

const databaseId = process.env.NOTION_DATABASE_ID;

// 1️⃣ Fetch & parse the database
export async function getDatabase() {
  const { results } = await notionOfficial.databases.query({
    database_id: databaseId,
    // only published posts
    filter: { property: 'Published', checkbox: { equals: true } },
    sorts: [{ property: 'Publish_Date', direction: 'descending' }],
  });

  return results.map((page) => {
    const props = page.properties;
    return {
      id: page.id,
      slug:     props.Slug?.rich_text[0]?.plain_text     || '',
      title:    props.Title?.title[0]?.plain_text        || 'Untitled',
      preview:  props.Preview?.rich_text[0]?.plain_text  || '',
      date:     props.Publish_Date?.date?.start          || page.created_time,
      url:      page.url,
    };
  });
}

// 2️⃣ getPostBySlug – your existing function:
export async function getPostBySlug(slug) {
  // find the matching page
  const all = await getDatabase();
  const meta = all.find((p) => p.slug === slug);
  if (!meta) return null;

  // fetch the full recordmap
  const recordMap = await notionRenderer.getPage(meta.id.replace(/-/g, ''));
  return { meta, recordMap };
}
