<template>
  <footer class="site-footer">
    <div class="footer-top">
      <p class="eyebrow">GOOD STORIES START WITH A CONVERSATION.</p>
      <NuxtLink to="/contact" class="footer-invite"
        >Let’s make<br /><em>something matter.</em><ArrowIcon
      /></NuxtLink>
    </div>
    <div class="footer-bottom">
      <NuxtLink to="/" class="footer-brand"
        ><StudioMark />{{ site.name }}<span>STUDIO</span></NuxtLink
      >
      <p>
        Independent eyes. Shared vision.<br />{{ site.location }} · Available
        for travel
      </p>
      <div>
        <a
          v-if="site.instagram"
          :href="site.instagram"
          target="_blank"
          rel="noopener noreferrer"
          >Instagram ↗</a
        ><NuxtLink to="/privacy">Privacy & image credits</NuxtLink
        ><span>© {{ new Date().getFullYear() }} {{ site.name }} Studio</span>
      </div>
    </div>
  </footer>
</template>
