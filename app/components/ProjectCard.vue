<script setup lang="ts">
import type { Project } from "#shared/content";
defineProps<{ project: Project; index: number }>();
</script>
<template>
  <NuxtLink :to="`/work/${project.slug}`" class="project-card"
    ><div class="project-image">
      <StudioImage :src="project.image" :alt="project.alt" /><span
        class="project-number"
        >{{ String(index + 1).padStart(2, "0") }} /</span
      ><span class="project-open"><ArrowIcon /></span>
    </div>
    <div class="project-info">
      <h3>{{ project.title }}</h3>
      <span>{{ project.label }}</span>
    </div></NuxtLink
  >
</template>
