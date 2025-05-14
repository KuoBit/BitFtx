// pages/sitemap.xml.js

export async function getServerSideProps({ res }) {
    const baseUrl = "https://www.bitftx.com";
  
    // Optional: Fetch blog posts from Notion or wherever needed
    const blogSlugs = ["/blog/launch", "/blog/tokenomics", "/blog/airdrop"]; // Dynamically generate later
  
    const staticRoutes = ["/", "/tokenomics", "/airdrop", "/blog"];
  
    const allRoutes = [...staticRoutes, ...blogSlugs];
  
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${allRoutes
      .map(
        (route) => `
      <url>
        <loc>${baseUrl}${route}</loc>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>
    `
      )
      .join("")}
  </urlset>`;
  
    res.setHeader("Content-Type", "text/xml");
    res.write(sitemap);
    res.end();
  
    return {
      props: {},
    };
  }
  
  export default function Sitemap() {
    return null;
  }
  