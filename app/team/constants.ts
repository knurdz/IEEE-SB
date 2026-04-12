/**
 * Dynamic arch-transform generator.
 * Produces a gentle arch so the layout still feels like the current page,
 * without creating oversized "hero" cards.
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

export function generateArchTransforms(count: number, isTopRow: boolean = true) {
  const resting: RestingTransform[] = [];
  const hover: HoverTransform[] = [];

  for (let i = 0; i < count; i += 1) {
    resting.push({
      z: isTopRow ? 2 : 1,
      scale: 1,
      y: 0,
      brightness: 1,
    });
    hover.push({
      scale: 1.02,
      y: -10,
    });
  }

  return { resting, hover };
}
