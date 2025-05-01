// lib/notion.js
import { Client } from "@notionhq/client";
import { NotionAPI } from "notion-client";

export const notionClient = new Client({ auth: process.env.NOTION_TOKEN });
export const notionRenderer = new NotionAPI();

const databaseId = process.env.NOTION_DATABASE_ID;

export async function getDatabase() {
  const res = await notionClient.databases.query({
    database_id: databaseId,
    filter: {
      property: "Published",            // adjust to your actual checkbox field name
      checkbox: { equals: true },
    },
    sorts: [
      { property: "Publish_Date", direction: "descending" },  // adjust if your date field is called differently
    ],
  });

  return res.results.map((page) => {
    const props = page.properties || {};
    return {
      id: page.id,
      slug: props.Slug?.rich_text?.[0]?.plain_text?.trim()     || "",
      title: props.Title?.title?.[0]?.plain_text               || "Untitled",
      preview: props.Preview?.rich_text?.[0]?.plain_text       || "",
      date: props.Publish_Date?.date?.start                    || page.created_time,
      url: page.url,
    };
  });
}

export async function getPostBySlug(slug) {
  const all = await getDatabase();
  const meta = all.find((p) => p.slug === slug);
  if (!meta) return null;

  const recordMap = await notionRenderer.getPage(meta.id);
  return { meta, recordMap, url: meta.url };
}
