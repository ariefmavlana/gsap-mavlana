import { isPublicSite } from "../../shared/content";
export default defineEventHandler((event) => {
  setHeader(event, "Content-Type", "text/plain; charset=utf-8");
  const base = useRuntimeConfig(event).public.siteUrl.replace(/\/$/, "");
  return isPublicSite(base)
    ? `User-agent: *\nAllow: /\nDisallow: /admin/\nSitemap: ${base}/sitemap.xml\n`
    : "User-agent: *\nDisallow: /\n";
});
