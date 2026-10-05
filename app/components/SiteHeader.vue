<script setup lang="ts">
const open = ref(false);
const route = useRoute();
const menuButton = ref<HTMLButtonElement | null>(null);
watch(
  () => route.fullPath,
  () => {
    open.value = false;
  },
);
function closeMenu() {
  open.value = false;
  menuButton.value?.focus();
}
</script>
<template>
  <header class="site-header" @keydown.esc="closeMenu">
    <NuxtLink to="/" class="brand" :aria-label="`${site.name} Studio — beranda`"
      ><StudioMark /><span
        >{{ site.name }}<small>{{ site.descriptor }}</small></span
      ></NuxtLink
    >
    <nav class="desktop-nav" aria-label="Navigasi utama">
      <NuxtLink to="/work"
        >Selected work
        <span>{{ String(projects.length).padStart(2, "0") }}</span></NuxtLink
      ><NuxtLink to="/studio">The studio</NuxtLink
      ><NuxtLink to="/#services" exact-active-class="">What we do</NuxtLink>
    </nav>
    <NuxtLink to="/contact" class="header-contact"
      >LET’S TALK <ArrowIcon
    /></NuxtLink>
    <button
      ref="menuButton"
      class="menu-toggle"
      :aria-expanded="open"
      aria-controls="mobile-menu"
      @click="open = !open"
    >
      {{ open ? "Close −" : "Menu +" }}
    </button>
    <nav
      v-if="open"
      id="mobile-menu"
      class="mobile-nav"
      aria-label="Navigasi seluler"
    >
      <NuxtLink to="/work">Selected work</NuxtLink
      ><NuxtLink to="/studio">The studio</NuxtLink
      ><NuxtLink to="/#services">What we do</NuxtLink
      ><NuxtLink to="/contact">Let’s talk ↗</NuxtLink>
    </nav>
  </header>
</template>
