<script setup lang="ts">
const root = ref<HTMLElement | null>(null);
const reel = ref<{ open: () => void } | null>(null);
usePageSeo(
  "Photography & Film",
  "inPrime. — studio fotografi dan videografi independen di Indonesia. Wedding, portrait, brand photography, dan film dengan pendekatan personal.",
);
useMotion(root, { home: true });
</script>
<template>
  <main id="main" ref="root">
    <section class="hero page-gutter">
      <div class="hero-topline" data-enter>
        <span>INDEPENDENT CREATIVE STUDIO</span
        ><span><i class="status-dot" /> OPEN FOR COLLABORATIONS</span>
      </div>
      <div class="hero-layout">
        <div class="hero-copy">
          <h1
            class="hero-title"
            :aria-label="`${site.heroLine1} ${site.heroLine2} ${site.heroAccent}`"
          >
            <span>{{ site.heroLine1 }}</span
            ><span>{{ site.heroLine2 }}</span
            ><em>{{ site.heroAccent }}</em>
          </h1>
          <div class="hero-description" data-enter>
            <span class="crosshair">+</span>
            <div>
              <p>{{ site.intro }}</p>
              <NuxtLink to="/work" class="text-link"
                >Explore our perspective <ArrowIcon
              /></NuxtLink>
            </div>
          </div>
        </div>
        <div class="hero-visual" data-enter>
          <div class="hero-photo">
            <StudioImage
              :src="site.heroImage"
              :alt="site.heroAlt"
              eager
              sizes="(max-width: 700px) 100vw, 50vw"
            />
            <div class="photo-corner top-left" />
            <div class="photo-corner bottom-right" />
            <span class="image-label"
              >FEEL SOMETHING. REMEMBER EVERYTHING.</span
            >
          </div>
          <button class="hero-reel" @click="reel?.open()">
            <span class="play-circle">▶</span
            ><span
              >{{ site.reelUrl ? "PLAY SHOWREEL" : "PLAY VISUAL STUDY"
              }}<small>STILLS, WITH A LITTLE MOTION.</small></span
            ><ArrowIcon /></button
          ><span class="hero-side-label">01 — A STUDY IN HUMAN CONNECTION</span>
        </div>
      </div>
      <div class="hero-bottom" data-enter>
        <a href="#selected">SCROLL TO DISCOVER <span>↓</span></a>
        <p>PHOTOGRAPHY <b>×</b> VIDEOGRAPHY <b>×</b> HUMAN CONNECTION</p>
        <span>{{ site.location.toUpperCase() }} / EVERYWHERE</span>
      </div>
    </section>
    <section class="intro-section page-gutter" data-reveal>
      <p class="eyebrow"><span class="tiny-square" /> THE WAY WE SEE IT</p>
      <h2>Some moments deserve<br />more than a <em>memory.</em></h2>
      <div class="intro-bottom">
        <p>
          Kami percaya gambar terbaik bukan hanya tentang bagaimana sesuatu
          terlihat. Tapi bagaimana rasanya ketika Anda ada di sana.
        </p>
        <NuxtLink to="/studio" class="text-link"
          >Meet the studio <ArrowIcon
        /></NuxtLink>
      </div>
    </section>
    <section id="selected" class="work-section page-gutter">
      <div class="section-heading" data-reveal>
        <div>
          <p class="eyebrow">01 / THROUGH OUR LENS</p>
          <h2>
            Selected <em>perspectives.</em
            ><sup>({{ String(projects.length).padStart(2, "0") }})</sup>
          </h2>
        </div>
        <NuxtLink to="/work" class="text-link"
          >View all work <ArrowIcon
        /></NuxtLink>
      </div>
      <div class="home-projects">
        <div
          v-for="(project, index) in projects"
          :key="project.slug"
          :class="['home-project', `project-${index}`]"
          data-reveal
        >
          <ProjectCard :project="project" :index="index" />
        </div>
      </div>
      <p v-if="projects.some((p) => p.isStudy)" class="image-disclosure">
        A visual direction for what’s to come. Koleksi referensi dari Unsplash;
        karya asli studio akan hadir di sini.
      </p>
    </section>
    <section class="film-section">
      <div class="film-image">
        <StudioImage
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1"
          alt="Lanskap danau dan pegunungan dalam cahaya senja"
          sizes="100vw"
        />
      </div>
      <div class="film-content">
        <p class="eyebrow">A DIFFERENT WAY TO FEEL.</p>
        <h2>Life moves.<br /><em>So do we.</em></h2>
        <button class="film-play" @click="reel?.open()">
          <span class="play-circle">▶</span
          >{{ site.reelUrl ? "WATCH THE FILM" : "WATCH THE VISUAL STUDY" }}
        </button>
        <p>
          Suara, gerak, dan jeda.<br />Cerita Anda, dalam dimensi yang berbeda.
        </p>
      </div>
      <span class="film-footer">STORIES IN MOTION — INPRIME.</span>
    </section>
    <section id="services" class="services-section page-gutter">
      <div class="service-intro" data-reveal>
        <p class="eyebrow">02 / WHAT WE DO</p>
        <h2>Your story.<br />Our <em>craft.</em></h2>
        <p>
          Dari momen personal sampai cerita sebuah brand. Satu tim, perhatian
          yang sama pada setiap detail.
        </p>
        <NuxtLink to="/contact" class="text-link"
          >Let’s find your frame <ArrowIcon
        /></NuxtLink>
      </div>
      <div class="service-list">
        <details
          v-for="(service, i) in site.services"
          :key="service.title"
          :open="i === 0"
          data-reveal
        >
          <summary>
            <span>{{ service.tag }}</span>
            <h3>{{ service.title }}</h3>
            <b class="accordion-icon">+</b>
          </summary>
          <div class="service-detail">
            <p>{{ service.description }}</p>
            <small>{{ service.deliverables }}</small>
          </div>
        </details>
      </div>
    </section>
    <section
      class="story-section"
      tabindex="0"
      aria-label="Studio dan proses kreatif"
    >
      <div class="story-strip">
        <div class="story-intro">
          <p class="eyebrow">03 / THE PEOPLE BEHIND THE FRAME</p>
          <h2>Different eyes.<br /><em>One vision.</em></h2>
          <p>{{ site.about }}</p>
          <NuxtLink to="/studio" class="text-link"
            >A little about us <ArrowIcon /></NuxtLink
          ><span class="strip-hint">OUR PROCESS →</span>
        </div>
        <div class="story-image">
          <StudioImage
            :src="site.studioImage"
            alt="Kamera dan perlengkapan fotografi untuk proses kreatif"
          />
        </div>
        <div class="process-frame">
          <span>01 / BEFORE THE FRAME</span>
          <h3>We listen.</h3>
          <p>
            Kami mulai dengan cerita Anda. Referensi, tujuan, dan detail kecil
            yang berarti.
          </p>
        </div>
        <div class="process-frame">
          <span>02 / IN THE MOMENT</span>
          <h3>We create.</h3>
          <p>
            Produksi yang terarah, dengan ruang untuk hal-hal spontan yang tidak
            bisa direncanakan.
          </p>
        </div>
        <div class="process-frame">
          <span>03 / THE FINAL CUT</span>
          <h3>We refine.</h3>
          <p>
            Seleksi, editing, warna, dan suara. Setiap keputusan untuk
            memperkuat cerita.
          </p>
        </div>
      </div>
    </section>
    <section class="faq-section page-gutter">
      <div>
        <p class="eyebrow">A FEW THINGS YOU MIGHT WONDER</p>
        <h2>Before we <em>begin.</em></h2>
      </div>
      <div>
        <details v-for="item in site.faq" :key="item.question">
          <summary>{{ item.question }}<span>+</span></summary>
          <p>{{ item.answer }}</p>
        </details>
      </div>
    </section>
    <ReelDialog ref="reel" />
  </main>
</template>
