// lib/notion.js
import { Client } from "@notionhq/client";
import { NotionAPI } from "notion-client";

export const notionClient = new Client({ auth: process.env.NOTION_TOKEN });
export const notionRenderer = new NotionAPI();

const databaseId = process.env.NOTION_DATABASE_ID;

// 1️⃣ fetch & shape your database rows
export async function getDatabase() {
  const res = await notionClient.databases.query({
    database_id: databaseId,
    filter: {
      property: "Published",
      checkbox: { equals: true },
    },
    sorts: [
      { property: "Publish_Date", direction: "descending" },
    ],
  });

  return res.results.map((page) => ({
    id: page.id,
    slug: page.properties.Slug.rich_text[0]?.plain_text || "",
    title: page.properties.Title.title[0]?.plain_text || "Untitled",
    preview: page.properties.Preview.rich_text[0]?.plain_text || "",
    date: page.properties.Publish_Date.date.start || page.created_time,
    url: page.url,
  }));
}

// 2️⃣ fetch one post by its slug
export async function getPostBySlug(slug) {
  const all = await getDatabase();
  const meta = all.find((p) => p.slug === slug);
  if (!meta) return null;

  // page.id already includes the correct dashes
  const recordMap = await notionRenderer.getPage(meta.id);
  return { meta, recordMap, url: meta.url };
}
