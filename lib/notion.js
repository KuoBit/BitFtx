// lib/notion.js

import { Client } from "@notionhq/client";
import { NotionAPI } from "notion-client";

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const notionRenderer = new NotionAPI();

const databaseId = process.env.NOTION_DATABASE_ID;

export async function getDatabase() {
  const response = await notion.databases.query({
    database_id: databaseId,
    sorts: [
      {
        property: "Published",
        direction: "descending",
      },
    ],
  });
  return response.results;
}

function normalizeNotionId(id) {
  if (!id) return '';
  const cleaned = id.replace(/-/g, ''); // remove any existing dashes
  if (cleaned.length !== 32) return id; // already formatted or invalid
  return `${cleaned.substr(0, 8)}-${cleaned.substr(8, 4)}-${cleaned.substr(12, 4)}-${cleaned.substr(16, 4)}-${cleaned.substr(20)}`;
}

export async function getAllPosts() {
  const db = await getDatabase();
  return db.map((page) => {
    const props = page.properties;
    return {
      id: normalizeNotionId(page.id),
      slug: props?.Slug?.rich_text?.[0]?.plain_text || '',
      title: props?.Title?.title?.[0]?.plain_text || 'Untitled',
    };
  });
}

export async function getPostBySlug(slug) {
  const posts = await getAllPosts();
  const matched = posts.find((post) => post.slug === slug);
  if (!matched) return null;

  const recordMap = await notionRenderer.getPage(matched.id);
  return {
    page: matched,
    recordMap,
  };
}
