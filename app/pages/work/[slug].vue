<script setup lang="ts">
definePageMeta({ key: (route) => route.path });
const route = useRoute();
const project = projects.find((item) => item.slug === route.params.slug);
if (!project)
  throw createError({ statusCode: 404, statusMessage: "Project not found" });
const next = projects[(projects.indexOf(project) + 1) % projects.length]!;
usePageSeo(project.title, project.description, project.image);
const config = useRuntimeConfig();
useHead({
  script: [
    {
      type: "application/ld+json",
      textContent: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: config.public.siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Work",
            item: `${config.public.siteUrl}/work`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: project.title,
            item: `${config.public.siteUrl}/work/${project.slug}`,
          },
        ],
      }).replace(/</g, "\\u003c"),
    },
  ],
});
</script>
<template>
  <main id="main" class="detail-page">
    <div class="page-gutter">
      <NuxtLink to="/work" class="back-link">← ALL PERSPECTIVES</NuxtLink>
      <div class="detail-heading">
        <h1>{{ project!.title }}</h1>
        <span class="eyebrow"
          >{{ project!.label }}<br />{{ project!.year }}</span
        >
      </div>
    </div>
    <div class="detail-cover">
      <StudioImage
        :src="project!.image"
        :alt="project!.alt"
        eager
        sizes="100vw"
      />
    </div>
    <div class="detail-description page-gutter">
      <span class="eyebrow">{{
        project!.isStudy ? "ABOUT THE STUDY" : "ABOUT THE PROJECT"
      }}</span>
      <div>
        <p>{{ project!.description }}</p>
        <small v-if="project!.isStudy"
          >Visual study dengan fotografi referensi dari
          <a
            :href="project!.creditUrl"
            target="_blank"
            rel="noopener noreferrer"
            >{{ project!.credit }} ↗</a
          >. Bukan proyek klien inPrime.</small
        >
      </div>
    </div>
    <div class="detail-gallery page-gutter">
      <StudioImage
        v-for="(photo, i) in project!.gallery"
        :key="photo"
        :src="photo"
        :alt="`${project!.title} — referensi visual ${i + 1}`"
      />
    </div>
    <div class="detail-next page-gutter">
      <span class="eyebrow">NEXT PERSPECTIVE</span
      ><NuxtLink :to="`/work/${next.slug}`"
        >{{ next.title }}<ArrowIcon
      /></NuxtLink>
    </div>
  </main>
</template>
