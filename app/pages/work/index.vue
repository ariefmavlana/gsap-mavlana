<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const categories = [
  "All",
  "Wedding",
  "Portrait",
  "Commercial",
  "Film",
] as const;
const selected = computed(
  () =>
    categories.find(
      (category) => category.toLowerCase() === route.query.category,
    ) || "All",
);
const filtered = computed(() =>
  selected.value === "All"
    ? projects
    : projects.filter((project) => project.category === selected.value),
);
function filter(category: string) {
  router.replace({
    query: category === "All" ? {} : { category: category.toLowerCase() },
  });
}
usePageSeo(
  "Selected Work — Foto & Film",
  "Jelajahi arah visual inPrime. melalui wedding, portrait, commercial, dan film. Temukan pendekatan yang sesuai untuk cerita Anda.",
);
</script>
<template>
  <main id="main" class="collection-page page-gutter">
    <div class="page-heading">
      <p class="eyebrow">THE WAY WE SEE THE WORLD</p>
      <h1>Every frame,<br /><em>a perspective.</em></h1>
      <p>Manusia. Tempat. Cerita. Sebuah koleksi sudut pandang.</p>
    </div>
    <div class="collection-toolbar">
      <div role="group" aria-label="Filter kategori karya">
        <button
          v-for="category in categories"
          :key="category"
          :aria-pressed="selected === category"
          @click="filter(category)"
        >
          {{ category
          }}<sup>{{
            category === "All"
              ? projects.length
              : projects.filter((p) => p.category === category).length
          }}</sup>
        </button>
      </div>
      <span aria-live="polite"
        >{{ String(filtered.length).padStart(2, "0") }} PERSPECTIVES</span
      >
    </div>
    <div class="collection-grid">
      <ProjectCard
        v-for="project in filtered"
        :key="project.slug"
        :project="project"
        :index="projects.indexOf(project)"
      />
    </div>
    <p v-if="filtered.some((p) => p.isStudy)" class="image-disclosure">
      Visual studies · Gambar referensi Unsplash, bukan dokumentasi proyek
      klien. Kredit pada setiap halaman detail.
    </p>
  </main>
</template>
