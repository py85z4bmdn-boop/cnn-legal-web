import { services } from "../data/services";
import { site } from "../data/site";
import { articles } from "../data/articles";

const pages = [
  "/",
  "/luat-su-phu-trach/",
  "/dich-vu/",
  ...services.map((service) => `/dich-vu/${service.slug}/`),
  "/bai-viet/",
  ...articles.map((article) => `/bai-viet/${article.slug}/`),
  "/quy-trinh/",
  "/kinh-nghiem/",
  "/lien-he/",
] as const;

export function GET() {
  const urls = pages
    .map((path) => `  <url><loc>${new URL(path, site.canonicalBaseUrl).toString()}</loc></url>`)
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
