<script setup lang="ts">
const form = reactive({
  name: "",
  email: "",
  service: "",
  date: "",
  location: "",
  budget: "",
  message: "",
});
const ready = ref(false);
const copied = ref(false);
const brief = computed(
  () =>
    `PROJECT BRIEF — ${site.name}\n\nNama: ${form.name}\nEmail: ${form.email}\nLayanan: ${form.service}\nTanggal: ${form.date || "Fleksibel"}\nLokasi: ${form.location}\nBudget: ${form.budget || "Diskusi bersama"}\n\nCerita proyek:\n${form.message}`,
);
const emailUrl = computed(
  () =>
    `mailto:${site.email}?subject=${encodeURIComponent(`Project inquiry — ${form.name}`)}&body=${encodeURIComponent(brief.value)}`,
);
const whatsappUrl = computed(
  () =>
    `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(brief.value)}`,
);
const result = ref<HTMLElement | null>(null);
async function prepare() {
  ready.value = true;
  await nextTick();
  result.value?.focus();
}
watch(form, () => {
  ready.value = false;
  copied.value = false;
});
function download() {
  const url = URL.createObjectURL(
    new Blob([brief.value], { type: "text/plain;charset=utf-8" }),
  );
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "inprime-project-brief.txt";
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
async function copy() {
  try {
    await navigator.clipboard.writeText(brief.value);
    copied.value = true;
  } catch {
    download();
  }
}
usePageSeo(
  "Let’s Talk — Mulai Proyek",
  "Rencanakan sesi foto atau produksi video bersama inPrime. Ceritakan kebutuhan, lokasi, dan tanggal proyek Anda dalam brief singkat.",
);
</script>
<template>
  <main id="main" class="contact-page page-gutter">
    <div class="contact-intro">
      <p class="eyebrow">YOUR NEXT CHAPTER STARTS HERE.</p>
      <h1>Tell us<br />your <em>story.</em></h1>
      <p>
        Ide yang masih samar atau rencana yang sudah matang. Kami ingin
        mendengarnya.
      </p>
      <div class="contact-info">
        <span class="eyebrow">BASED IN</span>
        <p>{{ site.location }} · Open to travel</p>
        <a v-if="site.email" :href="`mailto:${site.email}`"
          >{{ site.email }} ↗</a
        ><a
          v-if="site.whatsapp"
          :href="`https://wa.me/${site.whatsapp}`"
          target="_blank"
          rel="noopener noreferrer"
          >Chat on WhatsApp ↗</a
        >
      </div>
      <StudioMark class="contact-mark" />
    </div>
    <form class="inquiry-form" @submit.prevent="prepare">
      <p class="eyebrow">A LITTLE ABOUT YOUR PROJECT</p>
      <div class="form-row">
        <label
          >Nama Anda <span>*</span
          ><input
            v-model.trim="form.name"
            name="name"
            autocomplete="name"
            required
            maxlength="100"
            placeholder="Nama lengkap" /></label
        ><label
          >Email <span>*</span
          ><input
            v-model.trim="form.email"
            type="email"
            name="email"
            autocomplete="email"
            required
            maxlength="150"
            placeholder="nama@email.com"
        /></label>
      </div>
      <label
        >Apa yang ingin Anda buat? <span>*</span
        ><select v-model="form.service" name="service" required>
          <option disabled value="">Pilih layanan</option>
          <option v-for="service in site.services" :key="service.title">
            {{ service.title }}
          </option>
          <option>Kolaborasi lainnya</option>
        </select></label
      >
      <div class="form-row">
        <label
          >Perkiraan tanggal<input
            v-model="form.date"
            name="date"
            type="date" /></label
        ><label
          >Lokasi <span>*</span
          ><input
            v-model.trim="form.location"
            name="location"
            required
            maxlength="150"
            placeholder="Kota / venue"
        /></label>
      </div>
      <label
        >Budget yang direncanakan<select v-model="form.budget" name="budget">
          <option value="">Mari diskusikan</option>
          <option>Di bawah Rp5 juta</option>
          <option>Rp5–15 juta</option>
          <option>Rp15–30 juta</option>
          <option>Di atas Rp30 juta</option>
        </select></label
      ><label
        >Ceritakan sedikit tentang proyek Anda <span>*</span
        ><textarea
          v-model.trim="form.message"
          name="message"
          required
          minlength="20"
          maxlength="2000"
          rows="4"
          placeholder="Tentang momennya, suasananya, dan apa yang ingin Anda abadikan…"
        />
      </label>
      <p class="form-note">
        Brief diproses di perangkat Anda. Tidak ada data yang dikirim otomatis.
        <NuxtLink to="/privacy">Privasi Anda</NuxtLink>.
      </p>
      <button class="solid-button" type="submit">
        Prepare my brief <ArrowIcon />
      </button>
      <section
        v-if="ready"
        ref="result"
        class="brief-result"
        tabindex="-1"
        aria-live="polite"
      >
        <h2>Your story, ready to share.</h2>
        <p v-if="site.email || site.whatsapp">
          Brief siap. Pilih kanal di bawah untuk mengirim melalui aplikasi Anda.
        </p>
        <p v-else>
          Brief Anda siap disimpan. Kanal kontak studio sedang disiapkan; unduh
          atau salin brief untuk dibagikan kepada tim inPrime.
        </p>
        <div>
          <a v-if="site.email" :href="emailUrl" class="text-link"
            >Kirim via email ↗</a
          ><a
            v-if="site.whatsapp"
            :href="whatsappUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="text-link"
            >Kirim via WhatsApp ↗</a
          ><button type="button" @click="download">Download brief ↓</button
          ><button type="button" @click="copy">
            {{ copied ? "Tersalin ✓" : "Salin brief" }}
          </button>
        </div>
      </section>
    </form>
  </main>
</template>
