import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

export function useMotion(
  root: Ref<HTMLElement | null>,
  options: { home?: boolean } = {},
) {
  let media: gsap.MatchMedia | undefined;
  let disposed = false;
  onMounted(async () => {
    await document.fonts.ready;
    if (disposed || !root.value) return;
    gsap.registerPlugin(ScrollTrigger, SplitText);
    media = gsap.matchMedia();
    media.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        const scope = root.value!;
        const title = scope.querySelector(".hero-title");
        let split: SplitText | undefined;
        if (title) {
          split = SplitText.create(title, {
            type: "words",
            mask: "words",
            aria: "none",
          });
          gsap.from(split.words, {
            yPercent: 110,
            rotate: 3,
            duration: 1.1,
            stagger: 0.075,
            ease: "power3.out",
            clearProps: "transform",
          });
        }
        gsap.from(scope.querySelectorAll("[data-enter]"), {
          y: 24,
          opacity: 0,
          duration: 1,
          stagger: 0.13,
          delay: 0.2,
          clearProps: "all",
        });
        scope.querySelectorAll("[data-reveal]").forEach((element) => {
          gsap.from(element, {
            y: 40,
            opacity: 0,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: { trigger: element, start: "top 93%", once: true },
            clearProps: "all",
          });
        });
        if (options.home) {
          gsap.to(scope.querySelector(".hero-photo img"), {
            yPercent: 8,
            scale: 1.07,
            ease: "none",
            scrollTrigger: {
              trigger: ".hero",
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
          gsap.fromTo(
            scope.querySelector(".film-image"),
            { clipPath: "inset(12% 12% 12% 12%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              ease: "none",
              scrollTrigger: {
                trigger: ".film-section",
                start: "top 85%",
                end: "center center",
                scrub: 1,
              },
            },
          );
        }
        return () => split?.revert();
      },
      root.value,
    );
    if (options.home)
      media.add(
        "(min-width: 1100px) and (prefers-reduced-motion: no-preference) and (pointer: fine)",
        () => {
          const strip = root.value!.querySelector<HTMLElement>(".story-strip");
          const section =
            root.value!.querySelector<HTMLElement>(".story-section");
          if (!strip || !section) return;
          gsap.set(section, { overflow: "hidden" });
          const distance = () =>
            Math.max(0, strip.scrollWidth - section.clientWidth + 48);
          gsap.to(strip, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${distance()}`,
              scrub: 0.7,
              pin: true,
              invalidateOnRefresh: true,
            },
          });
        },
        root.value,
      );
    ScrollTrigger.refresh();
  });
  onBeforeUnmount(() => {
    disposed = true;
    media?.revert();
  });
}
