import { Variant } from './types';

// Default (resting) transforms per card index per variant
export const RESTING: Record<Variant, { z: number; scale: number; y: number; brightness: number }[]> = {
  arch5: [
    { z: 1, scale: 0.85, y: 20,  brightness: 0.80 },
    { z: 2, scale: 0.95, y: 0,   brightness: 0.90 },
    { z: 3, scale: 1.05, y: -20, brightness: 1.05 },
    { z: 2, scale: 0.95, y: 0,   brightness: 0.90 },
    { z: 1, scale: 0.85, y: 20,  brightness: 0.80 },
  ],
  arch8: [
    { z: 1, scale: 0.84, y: 25,  brightness: 0.75 },
    { z: 2, scale: 0.91, y: 10,  brightness: 0.85 },
    { z: 3, scale: 0.98, y: -5,  brightness: 0.95 },
    { z: 4, scale: 1.05, y: -20, brightness: 1.05 },
    { z: 4, scale: 1.05, y: -20, brightness: 1.05 },
    { z: 3, scale: 0.98, y: -5,  brightness: 0.95 },
    { z: 2, scale: 0.91, y: 10,  brightness: 0.85 },
    { z: 1, scale: 0.84, y: 25,  brightness: 0.75 },
  ],
  leadership: [
    { z: 1, scale: 0.95, y: 0,   brightness: 0.90 },
    { z: 2, scale: 0.95, y: 0,   brightness: 0.90 },
    { z: 3, scale: 1.05, y: -20, brightness: 1.05 },
    { z: 2, scale: 0.95, y: 0,   brightness: 0.90 },
    { z: 1, scale: 0.95, y: 0,   brightness: 0.90 },
  ],
};

// Hover transforms per card index per variant
export const HOVER: Record<Variant, { scale: number; y: number }[]> = {
  arch5: [
    { scale: 0.90, y: 15  },
    { scale: 1.00, y: -5  },
    { scale: 1.10, y: -25 },
    { scale: 1.00, y: -5  },
    { scale: 0.90, y: 15  },
  ],
  arch8: [
    { scale: 0.89, y: 20  },
    { scale: 0.96, y: 5   },
    { scale: 1.03, y: -10 },
    { scale: 1.10, y: -25 },
    { scale: 1.10, y: -25 },
    { scale: 1.03, y: -10 },
    { scale: 0.96, y: 5   },
    { scale: 0.89, y: 20  },
  ],
  leadership: [
    { scale: 1.00, y: -5  },
    { scale: 1.00, y: -5  },
    { scale: 1.10, y: -25 },
    { scale: 1.00, y: -5  },
    { scale: 1.00, y: -5  },
  ],
};
