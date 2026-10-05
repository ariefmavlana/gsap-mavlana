import { projects } from "../../shared/content";
export default defineEventHandler((event) => {
  setHeader(event, "Content-Type", "application/xml; charset=utf-8");
  const base = useRuntimeConfig(event).public.siteUrl.replace(/\/$/, "");
  const escape = (value: string) =>
    value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
  const routes = [
    "/",
    "/work",
    "/studio",
    "/contact",
    "/privacy",
    ...projects.map((project) => `/work/${project.slug}`),
  ];
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map((path) => `<url><loc>${escape(base + path)}</loc></url>`).join("")}</urlset>`;
});
