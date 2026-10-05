<script setup lang="ts">
const root = ref<HTMLElement | null>(null);
useMotion(root);
usePageSeo(
  "The Studio — Tentang Kami",
  "Kenali inPrime., kolaborasi fotografer, videografer, dan editor untuk cerita personal dan brand. Satu visi dari konsep hingga final cut.",
);
</script>
<template>
  <main id="main" ref="root" class="studio-page">
    <div class="page-heading page-gutter">
      <p class="eyebrow">INDEPENDENT EYES. SHARED VISION.</p>
      <h1>Behind the lens.<br /><em>Into the story.</em></h1>
    </div>
    <div class="studio-feature page-gutter">
      <StudioImage
        :src="site.studioImage"
        alt="Perlengkapan fotografi dalam proses kerja kreatif"
        eager
      />
      <div data-reveal>
        <p class="eyebrow">THIS IS INPRIME.</p>
        <h2>A small team.<br />A considered <em>perspective.</em></h2>
        <p>{{ site.about }}</p>
        <p>
          Kami bekerja dekat dengan Anda. Mendengarkan sebelum menyusun konsep,
          mengamati sebelum menekan shutter, dan menyunting dengan perhatian
          pada rasa.
        </p>
        <NuxtLink to="/contact" class="text-link"
          >Tell us your story <ArrowIcon
        /></NuxtLink>
      </div>
    </div>
    <div class="studio-values page-gutter">
      <article
        v-for="(item, index) in [
          {
            title: 'Human, first.',
            text: 'Kenyamanan Anda adalah bagian dari proses. Kami memberi arahan dengan jelas dan membiarkan momen berjalan dengan alami.',
          },
          {
            title: 'Made together.',
            text: 'Fotografer, videografer, dan editor saling berbagi perspektif. Satu cerita yang utuh dari awal sampai akhir.',
          },
          {
            title: 'Every detail matters.',
            text: 'Cahaya, komposisi, ritme, dan warna. Kami memberi perhatian yang sama pada gambaran besar dan detail terkecil.',
          },
        ]"
        :key="item.title"
        data-reveal
      >
        <span class="eyebrow">0{{ index + 1 }} / OUR APPROACH</span>
        <h3>{{ item.title }}</h3>
        <p>{{ item.text }}</p>
      </article>
    </div>
  </main>
</template>
