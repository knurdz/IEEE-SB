export const inViewOnce = {
  once: true,
  margin: "-80px",
} as const;

export const easing = [0.22, 1, 0.36, 1] as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
} as const;

export function fadeUpTransition(delay = 0, duration = 0.6) {
  return {
    delay,
    duration,
    ease: easing,
  } as const;
}
