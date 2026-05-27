import type { Article } from "../data/articles";
import { articleSourceName, articleOriginalLinkLabel } from "../data/articles";

const WP_API_URL = import.meta.env.WORDPRESS_API_URL || "";

interface WPPost {
  slug: string;
  title: { rendered: string };
  date: string;
  excerpt: { rendered: string };
  content: { rendered: string };
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text: string;
    }>;
    "wp:term"?: Array<Array<{ name: string }>>;
  };
  link: string;
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, "\u201C")
    .replace(/&#8221;/g, "\u201D")
    .trim();
}

function formatDate(isoDate: string): string {
  const d = new Date(isoDate);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

function htmlToParagraphs(html: string): string[] {
  const blocks = html.split(/<\/p>|<br\s*\/?>/gi);
  return blocks
    .map(stripHtml)
    .filter((p) => p.length > 0);
}

function wpPostToArticle(post: WPPost): Article {
  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  const categories = post._embedded?.["wp:term"]?.[0];
  const category = categories?.[0]?.name || "Pháp luật";

  return {
    slug: post.slug,
    title: stripHtml(post.title.rendered),
    publishedAt: formatDate(post.date),
    sourceName: articleSourceName,
    sourceUrl: post.link,
    category,
    imageUrl: media?.source_url || "",
    imageAlt: media?.alt_text || "Ảnh minh họa.",
    excerpt: stripHtml(post.excerpt.rendered).slice(0, 200),
    bodyParagraphs: htmlToParagraphs(post.content.rendered),
    attribution: articleSourceName,
    originalLinkLabel: articleOriginalLinkLabel,
  };
}

export async function fetchWordPressArticles(): Promise<Article[]> {
  if (!WP_API_URL) return [];

  try {
    const url = `${WP_API_URL}/posts?_embed&per_page=50&orderby=date&order=desc`;
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      console.warn(`[wordpress] API returned ${res.status}`);
      return [];
    }

    const posts: WPPost[] = await res.json();
    return posts.map(wpPostToArticle);
  } catch (err) {
    console.warn("[wordpress] Failed to fetch:", (err as Error).message);
    return [];
  }
}
