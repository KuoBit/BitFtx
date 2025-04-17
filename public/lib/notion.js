// lib/notion.js
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const databaseId = process.env.NOTION_DATABASE_ID;

export async function getPublishedPosts() {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "Published",
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: "Published At",
        direction: "descending",
      },
    ],
  });

  return response.results.map((page) => {
    return {
      id: page.id,
      title: page.properties.Title.title[0].plain_text,
      slug: page.properties.Slug.rich_text[0]?.plain_text || "",
      publishedAt: page.properties["Published At"].date.start,
    };
  });
}

export async function getPostBySlug(slug) {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "Slug",
      rich_text: {
        equals: slug,
      },
    },
  });

  const page = response.results[0];
  if (!page) return null;

  const blocks = await notion.blocks.children.list({ block_id: page.id });

  return {
    id: page.id,
    title: page.properties.Title.title[0].plain_text,
    content: blocks.results,
    publishedAt: page.properties["Published At"].date.start,
  };
}
