<script setup lang="ts">
usePageSeo(
  "Privasi & Kredit Gambar",
  "Informasi privasi, pengelolaan brief proyek, serta kredit fotografi referensi yang digunakan dalam website inPrime.",
);
</script>
<template>
  <main id="main" class="legal-page page-gutter">
    <p class="eyebrow">A NOTE ON TRUST</p>
    <h1>Privacy &<br /><em>image credits.</em></h1>
    <section>
      <h2>Brief proyek Anda</h2>
      <p>
        Formulir kontak menyusun brief di browser Anda. Isian tidak disimpan di
        server, cookie, atau local storage. Tombol unduh menyimpan file di
        perangkat Anda. Tombol email atau WhatsApp, jika tersedia, membuka
        aplikasi terkait; Anda memutuskan kapan pesan dikirim.
      </p>
      <h2>Layanan pihak ketiga</h2>
      <p>
        Gambar referensi Unsplash dioptimalkan dan disajikan dari website ini.
        Penyedia hosting dapat memproses informasi teknis seperti alamat IP
        dalam log akses. Tautan Instagram, email, dan WhatsApp mengikuti
        kebijakan layanan masing-masing. Website ini tidak memasang alat pelacak
        analytics atau iklan.
      </p>
      <h2>Fotografi & studi visual</h2>
      <p>
        Koleksi bertanda “Visual study” menggunakan foto referensi dari Unsplash
        untuk menunjukkan arah visual website. Foto dalam koleksi tersebut bukan
        karya studio atau dokumentasi klien inPrime. Nama studi bersifat
        editorial dan tidak menyatakan hubungan dengan model, fotografer, maupun
        lokasi di dalam gambar.
      </p>
      <ul>
        <li v-for="project in projects" :key="project.slug">
          <NuxtLink :to="`/work/${project.slug}`">{{ project.title }}</NuxtLink>
          —
          <a :href="project.creditUrl" target="_blank" rel="noopener noreferrer"
            >{{ project.credit }} ↗</a
          >
        </li>
      </ul>
      <p>
        Lihat
        <a
          href="https://unsplash.com/license"
          target="_blank"
          rel="noopener noreferrer"
          >lisensi Unsplash ↗</a
        >. Materi asli studio dapat menggantikan seluruh referensi melalui CMS.
      </p>
      <h2>Pertanyaan</h2>
      <p>
        Hubungi tim melalui
        <NuxtLink to="/contact">halaman kontak</NuxtLink> untuk pertanyaan
        mengenai brief dan penggunaan gambar.
      </p>
    </section>
  </main>
</template>
