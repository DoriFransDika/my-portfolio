import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

/**
 * Animate elements with a subtle fade-up effect triggered on scroll.
 */
export const animateFadeUp = (targets, options = {}) => {
  if (!targets) return;
  return gsap.fromTo(
    targets,
    {
      opacity: 0,
      y: options.y || 40,
    },
    {
      opacity: 1,
      y: 0,
      duration: options.duration || 1,
      ease: options.ease || 'power3.out',
      stagger: options.stagger || 0.15,
      scrollTrigger: {
        trigger: options.trigger || targets,
        start: options.start || 'top 85%',
        toggleActions: 'play none none none',
        ...options.scrollTrigger,
      },
      ...options,
    }
  );
};

/**
 * Staggered character/word or line reveal animation.
 */
export const animateStaggerReveal = (elements, trigger, delay = 0) => {
  if (!elements) return;
  return gsap.fromTo(
    elements,
    {
      opacity: 0,
      y: 35,
      filter: 'blur(4px)',
    },
    {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1.1,
      ease: 'power3.out',
      stagger: 0.08,
      delay,
      scrollTrigger: trigger
        ? {
            trigger: trigger,
            start: 'top 80%',
            toggleActions: 'play none none none',
          }
        : undefined,
    }
  );
};

/**
 * Smooth parallax animation for background or featured image.
 */
export const animateParallax = (imageElement, containerElement, intensity = 15) => {
  if (!imageElement || !containerElement) return;
  return gsap.fromTo(
    imageElement,
    {
      yPercent: -intensity,
      scale: 1.08,
    },
    {
      yPercent: intensity,
      scale: 1.08,
      ease: 'none',
      scrollTrigger: {
        trigger: containerElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    }
  );
};

/**
 * Recomputes all ScrollTrigger positions after dynamic content or images load.
 */
export const refreshScrollTrigger = () => {
  ScrollTrigger.refresh();
};
