<script setup lang="ts">
import { gsap } from "gsap";
const dialog = ref<HTMLDialogElement | null>(null);
const playing = ref(false);
const reducedMotion = ref(false);
let frameIndex = 0;
let timeline: gsap.core.Timeline | undefined;
let opener: HTMLElement | null = null;
function open() {
  opener =
    document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
  dialog.value?.showModal();
  document.body.style.overflow = "hidden";
  reducedMotion.value = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  frameIndex = 0;
  gsap.set(dialog.value!.querySelectorAll(".reel-slide"), {
    clearProps: "all",
  });
  if (
    !site.reelUrl &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    timeline = gsap.timeline({ repeat: -1 });
    const slides = dialog.value!.querySelectorAll(".reel-slide");
    slides.forEach((slide) => {
      timeline!
        .set(slides, { opacity: 0 })
        .set(slide, { opacity: 1 })
        .fromTo(
          slide,
          { scale: 1 },
          { scale: 1.08, duration: 3.5, ease: "none" },
        )
        .to(slide, { opacity: 0, duration: 0.5 });
    });
    playing.value = true;
  }
}
function toggle() {
  if (reducedMotion.value && dialog.value) {
    const slides = dialog.value.querySelectorAll(".reel-slide");
    frameIndex = (frameIndex + 1) % slides.length;
    gsap.set(slides, { opacity: 0 });
    gsap.set(slides[frameIndex]!, { opacity: 1 });
    return;
  }
  if (!timeline) return;
  playing.value = !playing.value;
  timeline.paused(!playing.value);
}
function close() {
  timeline?.kill();
  timeline = undefined;
  playing.value = false;
  dialog.value?.querySelector("video")?.pause();
  dialog.value?.close();
  document.body.style.overflow = "";
  opener?.focus();
}
onBeforeUnmount(() => {
  timeline?.kill();
  document.body.style.overflow = "";
});
defineExpose({ open });
</script>
<template>
  <dialog
    ref="dialog"
    class="reel-dialog"
    aria-labelledby="reel-title"
    @cancel.prevent="close"
    @click="$event.target === dialog && close()"
  >
    <div class="reel-inner">
      <div class="reel-heading">
        <h2 id="reel-title">
          {{ site.reelUrl ? "Studio showreel" : "A feeling in four frames" }}
        </h2>
        <button autofocus aria-label="Tutup visual study" @click="close">
          CLOSE ×
        </button>
      </div>
      <video
        v-if="site.reelUrl"
        :src="site.reelUrl"
        controls
        playsinline
        preload="metadata"
      />
      <div v-else class="reel-stage">
        <StudioImage
          v-for="(project, i) in projects"
          :key="project.slug"
          :src="project.image"
          :alt="project.alt"
          :class="['reel-slide', { first: i === 0 }]"
          sizes="90vw"
        />
      </div>
      <div class="reel-caption">
        <p>
          {{
            site.reelUrl
              ? "Photography & film by our studio."
              : "Motion study · Fotografi referensi dari Unsplash, bukan karya klien."
          }}
        </p>
        <button v-if="!site.reelUrl" @click="toggle">
          {{ reducedMotion ? "Next frame →" : playing ? "Pause Ⅱ" : "Play ▷" }}
        </button>
      </div>
    </div>
  </dialog>
</template>
