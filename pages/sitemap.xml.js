// pages/sitemap.xml.js
import { getPublishedBlogSlugs } from "../lib/notion";

export async function getServerSideProps({ res }) {
  const baseUrl = "https://www.bitftx.com";

  const staticRoutes = ["/", "/tokenomics", "/airdrop", "/blog", "/whitepaper", "/terms", "/privacy", "/data-policy"];

  const blogSlugs = await getPublishedBlogSlugs();
  const blogRoutes = blogSlugs.map((slug) => `/blog/${slug}`);

  const allRoutes = [...staticRoutes, ...blogRoutes];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (route) => `
  <url>
    <loc>${baseUrl}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join("")}
</urlset>`;

  res.setHeader("Content-Type", "application/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default function Sitemap() {
  return null;
}
