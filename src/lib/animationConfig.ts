import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

let lenisInstance: Lenis | null = null;

/**
 * Initializes Lenis smooth scrolling and synchronizes it with GSAP ScrollTrigger.
 */
export function initSmoothScroll(): Lenis {
  if (typeof window === 'undefined') {
    return null as unknown as Lenis;
  }

  if (lenisInstance) {
    return lenisInstance;
  }

  // Register GSAP ScrollTrigger
  if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.5,
  });

  // Synchronize ScrollTrigger with Lenis
  lenisInstance.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time: number) => {
    lenisInstance?.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  return lenisInstance;
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}

export function scrollToTarget(target: string | HTMLElement, options?: { offset?: number; duration?: number }) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, {
      offset: options?.offset ?? -30,
      duration: options?.duration ?? 1.4,
    });
  } else if (typeof document !== 'undefined') {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    el?.scrollIntoView({ behavior: 'smooth' });
  }
}

export { gsap, ScrollTrigger };
