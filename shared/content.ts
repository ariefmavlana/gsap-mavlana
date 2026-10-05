import { z } from "zod";
import siteData from "../content/site.json";
import portfolioData from "../content/portfolio.json";

// Only local uploads and HTTPS Unsplash sources can become image attributes.
const image = z
  .string()
  .refine(
    (value) =>
      /^\/uploads\/[\w./-]+$/.test(value) ||
      /^https:\/\/images\.unsplash\.com\/photo-[\w-]+$/.test(value),
    "Use an Unsplash image URL without parameters or /uploads/...",
  );
const httpsUrl = z.union([
  z.literal(""),
  z.url().refine((value) => value.startsWith("https://")),
]);
const projectSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(1),
  category: z.enum(["Wedding", "Portrait", "Commercial", "Film"]),
  label: z.string(),
  image,
  alt: z.string().min(10),
  description: z.string().min(30),
  year: z.string(),
  isStudy: z.boolean().default(true),
  credit: z.string(),
  creditUrl: httpsUrl,
  gallery: z.array(image).min(1),
});
export const site = z
  .object({
    name: z.string().min(1),
    descriptor: z.string(),
    location: z.string(),
    email: z.union([z.literal(""), z.email()]),
    whatsapp: z.string().regex(/^(?:[1-9]\d{7,14})?$/),
    instagram: httpsUrl,
    heroLine1: z.string(),
    heroLine2: z.string(),
    heroAccent: z.string(),
    intro: z.string(),
    about: z.string(),
    heroImage: image,
    heroAlt: z.string(),
    studioImage: image,
    reelUrl: httpsUrl,
    services: z.array(
      z.object({
        title: z.string(),
        tag: z.string(),
        description: z.string(),
        deliverables: z.string(),
      }),
    ),
    faq: z.array(z.object({ question: z.string(), answer: z.string() })),
  })
  .parse(siteData);
export const projects = z
  .array(projectSchema)
  .min(1)
  .parse(portfolioData.projects);
if (new Set(projects.map((project) => project.slug)).size !== projects.length)
  throw new Error("Project slugs must be unique");
export type Project = z.infer<typeof projectSchema>;
export function imageUrl(source: string, width = 1200) {
  return source.startsWith("https://images.unsplash.com/")
    ? `/images/${new URL(source).pathname.slice(1)}-${width}.webp`
    : source;
}
export function isPublicSite(url: string) {
  try {
    const parsed = new URL(url);
    return (
      parsed.protocol === "https:" &&
      !parsed.hostname.endsWith(".vercel.app") &&
      !["localhost", "127.0.0.1", "example.com"].includes(parsed.hostname)
    );
  } catch {
    return false;
  }
}
