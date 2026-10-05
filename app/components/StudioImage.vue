<script setup lang="ts">
const props = withDefaults(
  defineProps<{ src: string; alt: string; eager?: boolean; sizes?: string }>(),
  { eager: false, sizes: "(max-width: 700px) 100vw, 50vw" },
);
const srcset = computed(() =>
  props.src.startsWith("https://images.unsplash.com/")
    ? [480, 800, 1200, 1800]
        .map((width) => `${imageUrl(props.src, width)} ${width}w`)
        .join(", ")
    : undefined,
);
</script>
<template>
  <img
    :src="imageUrl(src)"
    :srcset="srcset"
    :sizes="sizes"
    :alt="alt"
    :loading="eager ? 'eager' : 'lazy'"
    :fetchpriority="eager ? 'high' : 'auto'"
    decoding="async"
    width="1200"
    height="1500"
  />
</template>
