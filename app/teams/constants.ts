/**
 * Dynamic arch-transform generator.
 * Produces resting & hover transforms for any member count in a row,
 * creating a smooth arch curve where the center card is most elevated.
 */

export interface RestingTransform {
  z: number;
  scale: number;
  y: number;
  brightness: number;
}

export interface HoverTransform {
  scale: number;
  y: number;
}

/**
 * Generate arch transforms for a row of `count` cards.
 * The center card(s) will be largest/highest, tapering to the edges.
 */
export function generateArchTransforms(count: number, isTopRow: boolean = true) {
  const resting: RestingTransform[] = [];
  const hover: HoverTransform[] = [];

  const mid = (count - 1) / 2;

  for (let i = 0; i < count; i++) {
    // normalizedDist: 0 at center, 1 at the edges
    const dist = Math.abs(i - mid) / (mid || 1);

    if (isTopRow) {
      resting.push({
        z: Math.round((1 - dist) * 3) + 1,
        scale: 1.05 - dist * 0.18,
        y: -20 + dist * 40,
        brightness: 1.05 - dist * 0.2,
      });
      hover.push({
        scale: 1.10 - dist * 0.18,
        y: -25 + dist * 40,
      });
    } else {
      // Bottom row: flatter arch, slightly smaller
      resting.push({
        z: Math.round((1 - dist) * 2) + 1,
        scale: 0.95 - dist * 0.08,
        y: dist * 15,
        brightness: 1.0 - dist * 0.12,
      });
      hover.push({
        scale: 1.0 - dist * 0.08,
        y: -5 + dist * 15,
      });
    }
  }

  return { resting, hover };
}
