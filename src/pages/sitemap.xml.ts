import { services } from "../data/services";
import { site } from "../data/site";
import { articles } from "../data/articles";

interface SitemapEntry {
  path: string;
  changefreq: "daily" | "weekly" | "monthly";
  priority: number;
}

const today = new Date().toISOString().split("T")[0];

const pages: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: 1.0 },
  { path: "/dich-vu/", changefreq: "weekly", priority: 0.9 },
  ...services.map((s) => ({
    path: `/dich-vu/${s.slug}/`,
    changefreq: "monthly" as const,
    priority: 0.8,
  })),
  { path: "/bai-viet/", changefreq: "weekly", priority: 0.9 },
  ...articles.map((a) => ({
    path: `/bai-viet/${a.slug}/`,
    changefreq: "monthly" as const,
    priority: 0.7,
  })),
  { path: "/luat-su-phu-trach/", changefreq: "monthly", priority: 0.8 },
  { path: "/lien-he/", changefreq: "monthly", priority: 0.7 },
];

export function GET() {
  const urls = pages
    .map(
      (p) =>
        `  <url>\n    <loc>${new URL(p.path, site.canonicalBaseUrl).toString()}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${p.changefreq}</changefreq>\n    <priority>${p.priority.toFixed(1)}</priority>\n  </url>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
