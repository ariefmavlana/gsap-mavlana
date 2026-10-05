<script setup lang="ts">
import type { NuxtError } from "#app";
defineProps<{ error: NuxtError }>();
useSeoMeta({
  title: "Halaman tidak ditemukan — inPrime. Studio",
  robots: "noindex",
});
</script>
<template>
  <main class="error-page">
    <p class="eyebrow">{{ error.statusCode }} / OUT OF FRAME</p>
    <h1>Let’s find<br /><em>our way back.</em></h1>
    <p>
      Halaman ini tidak tersedia. Koleksi foto dan cerita kami masih menunggu
      Anda.
    </p>
    <button class="solid-button" @click="clearError({ redirect: '/' })">
      Kembali ke beranda ↗
    </button>
  </main>
</template>
