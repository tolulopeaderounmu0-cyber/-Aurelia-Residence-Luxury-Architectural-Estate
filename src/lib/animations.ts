import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Checks if user prefers reduced motion for accessibility compliance.
 */
function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export interface SectionRevealOptions {
  headerSelector?: string;
  contentSelector?: string;
  triggerOffset?: string;
  stagger?: number;
  delay?: number;
}

/**
 * Orchestrates cinematic reveal animations for section headers and content blocks using GSAP ScrollTrigger.
 *
 * @param container - Root DOM element of the section.
 * @param options - Configuration options for selectors, stagger, and trigger threshold.
 * @returns GSAP Context for seamless React lifecycle cleanup.
 */
export function orchestrateSectionReveals(
  container: HTMLElement,
  options?: SectionRevealOptions
): gsap.Context {
  const ctx = gsap.context(() => {
    if (prefersReducedMotion()) {
      gsap.set(container.querySelectorAll(options?.headerSelector ?? '.reveal-header, .reveal-item'), {
        opacity: 1,
        y: 0,
      });
      return;
    }

    const headerSelector = options?.headerSelector ?? '.reveal-header';
    const contentSelector = options?.contentSelector ?? '.reveal-item';
    const triggerOffset = options?.triggerOffset ?? 'top 82%';

    const headers = container.querySelectorAll(headerSelector);
    const contentItems = container.querySelectorAll(contentSelector);

    // Master ScrollTrigger timeline for deliberate section orchestration
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: triggerOffset,
        once: true,
      },
    });

    // 1. Reveal Section Header with editorial elevation
    if (headers.length > 0) {
      tl.fromTo(
        headers,
        {
          opacity: 0,
          y: 28,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          stagger: 0.14,
          ease: 'power3.out',
          clearProps: 'transform',
        }
      );
    }

    // 2. Reveal Content Items with staggered timing
    if (contentItems.length > 0) {
      tl.fromTo(
        contentItems,
        {
          opacity: 0,
          y: 32,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: options?.stagger ?? 0.08,
          ease: 'power3.out',
          clearProps: 'transform',
        },
        headers.length > 0 ? '-=0.55' : 0
      );
    }
  }, container);

  return ctx;
}

/**
 * Cinematic Hero Entrance Animation (Initial Page Load).
 * Deliberate, smooth hierarchy: Background -> Kicker -> Headline -> Narrative -> CTAs -> Bottom Bar.
 */
export function animateHeroEntrance(heroElement: HTMLElement): gsap.Context {
  const ctx = gsap.context(() => {
    if (prefersReducedMotion()) {
      gsap.set(heroElement.querySelectorAll('.hero-anim'), { opacity: 1, y: 0 });
      return;
    }

    const bgImage = heroElement.querySelector('.hero-bg-image');
    const kicker = heroElement.querySelector('.hero-kicker');
    const headline = heroElement.querySelector('.hero-headline');
    const desc = heroElement.querySelector('.hero-desc');
    const ctas = heroElement.querySelectorAll('.hero-cta');
    const bottomBar = heroElement.querySelector('.hero-bottom-bar');

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      delay: 0.15,
    });

    if (bgImage) {
      tl.fromTo(
        bgImage,
        { scale: 1.12, opacity: 0.7 },
        { scale: 1.0, opacity: 1, duration: 1.8, ease: 'power2.out' },
        0
      );
    }

    if (kicker) {
      tl.fromTo(
        kicker,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.3
      );
    }

    if (headline) {
      tl.fromTo(
        headline,
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 1.1 },
        0.45
      );
    }

    if (desc) {
      tl.fromTo(
        desc,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.9 },
        0.65
      );
    }

    if (ctas.length > 0) {
      tl.fromTo(
        ctas,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 },
        0.8
      );
    }

    if (bottomBar) {
      tl.fromTo(
        bottomBar,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.95
      );
    }
  }, heroElement);

  return ctx;
}

/**
 * Subtle architectural image reveal with scroll-tied parallax.
 */
export function animateImageParallax(
  imageElement: HTMLElement,
  container: HTMLElement,
  speed: number = 6
): gsap.Context {
  const ctx = gsap.context(() => {
    if (prefersReducedMotion()) return;

    gsap.fromTo(
      imageElement,
      { yPercent: -speed },
      {
        yPercent: speed,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      }
    );
  }, container);

  return ctx;
}

export { gsap, ScrollTrigger };
