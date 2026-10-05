import { isPublicSite } from "#shared/content";

export function usePageSeo(
  title: string,
  description: string,
  image = site.heroImage,
) {
  const config = useRuntimeConfig();
  const route = useRoute();
  const base = config.public.siteUrl.replace(/\/$/, "");
  const canonical = `${base}${route.path === "/" ? "/" : route.path.replace(/\/$/, "")}`;
  const socialImage = new URL(imageUrl(image, 1200), base).href;
  useSeoMeta({
    title: `${title} — ${site.name} Studio`,
    description,
    ogTitle: `${title} — ${site.name} Studio`,
    ogDescription: description,
    ogType: "website",
    ogLocale: "id_ID",
    ogSiteName: `${site.name} Studio`,
    ogUrl: canonical,
    ogImage: socialImage,
    ogImageAlt: title,
    twitterCard: "summary_large_image",
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: socialImage,
    robots: isPublicSite(base)
      ? "index, follow, max-image-preview:large"
      : "noindex, nofollow",
  });
  useHead({ link: [{ rel: "canonical", href: canonical }] });
}
