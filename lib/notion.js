// lib/notion.js
import { Client } from '@notionhq/client'
import { NotionAPI } from 'notion-client'

// initialize both clients
const notionClient   = new Client({ auth: process.env.NOTION_TOKEN })
const notionRenderer = new NotionAPI()

const databaseId = process.env.NOTION_DATABASE_ID

/** 
 * Fetch the list of published posts from your Notion database
 */
export async function getDatabase() {
  const res = await notionClient.databases.query({
    database_id: databaseId,
    filter: {
      property: 'Published',
      checkbox: { equals: true },
    },
    sorts: [
      { property: 'Publish_Date', direction: 'descending' },
    ],
  })

  return res.results.map(page => ({
    id:      page.id,   // keep the dashes
    slug:    page.properties.Slug.rich_text[0]?.plain_text || '',
    title:   page.properties.Title.title[0]?.plain_text   || 'Untitled',
    preview: page.properties.Preview.rich_text[0]?.plain_text || '',
    date:    page.properties.Publish_Date.date.start     || page.created_time,
    url:     page.url,
  }))
}

/**
 * Given a slug, look up that one page in Notion *and* pull its full recordMap
 */
export async function getPostBySlug(slug) {
  // filter the database for this slug
  const res = await notionClient.databases.query({
    database_id: databaseId,
    filter: {
      property: 'Slug',
      rich_text: { equals: slug },
    },
    page_size: 1,
  })
  if (!res.results.length) return null

  const page = res.results[0]
  // page.id is already in dashed format → feed it directly to NotionAPI
  const recordMap = await notionRenderer.getPage(page.id)

  return {
    meta: {
      title:   page.properties.Title.title[0]?.plain_text   || 'Untitled',
      preview: page.properties.Preview.rich_text[0]?.plain_text || '',
      date:    page.properties.Publish_Date.date.start     || page.created_time,
      slug,
      url:     page.url,
    },
    recordMap,
  }
}
