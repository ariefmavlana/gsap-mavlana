<script setup lang="ts">
const config = useRuntimeConfig();
useHead({
  script: [
    {
      type: "application/ld+json",
      textContent: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: `${site.name} Studio`,
        url: config.public.siteUrl,
        description: site.intro,
        ...(site.email ? { email: site.email } : {}),
        ...(site.instagram ? { sameAs: [site.instagram] } : {}),
      }).replace(/</g, "\\u003c"),
    },
  ],
});
</script>
<template>
  <NuxtLoadingIndicator color="#bd432c" /><a href="#main" class="skip-link"
    >Langsung ke konten</a
  ><SiteHeader /><NuxtPage /><SiteFooter />
</template>
