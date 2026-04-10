'use client';

import { useEffect, useRef } from 'react';

const GLOBE_CENTER = {
  lat: 7.2,
  lon: 80.3,
};

const UNIVERSITY_LOCATION = {
  lat: 6.7964,
  lon: 79.9008,
};

const VIEWBOX_SIZE = 900;
const GLOBE_CENTER_X = VIEWBOX_SIZE * 0.72;
const GLOBE_CENTER_Y = VIEWBOX_SIZE * 0.54;
const GLOBE_RADIUS = VIEWBOX_SIZE * 0.41;
type GeoPoint = readonly [number, number];

const LAND_POLYGONS: readonly GeoPoint[][] = [
  [
    [32.1, 30.5], [34.5, 29.6], [36.2, 28.7], [38.8, 26.4], [41.4, 22.3], [43.2, 18.4],
    [45.1, 13.1], [47.8, 11.6], [49.5, 11.8], [50.6, 13.4], [51.6, 16.1], [52.2, 18.7],
    [51.6, 22.1], [50.2, 24.4], [47.6, 26.2], [44.5, 27.4], [40.1, 29.2], [36.3, 30.2],
  ],
  [
    [60.8, 25.2], [62.4, 27.6], [65.1, 29.3], [67.9, 31.1], [70.1, 33.7], [72.7, 35.4],
    [75.5, 36.5], [77.8, 35.1], [76.4, 32.1], [73.8, 29.5], [71.1, 26.6], [68.1, 24.2],
    [64.7, 24.0], [61.8, 24.4],
  ],
  [
    [67.9, 23.8], [68.6, 22.7], [69.3, 21.6], [70.0, 20.3], [70.6, 19.1], [71.4, 18.0],
    [72.0, 17.2], [72.7, 16.5], [73.4, 15.6], [73.9, 14.5], [74.3, 13.4], [74.8, 12.2],
    [75.5, 11.1], [76.3, 10.1], [77.1, 9.0], [78.3, 8.3], [79.6, 8.7], [80.4, 9.7],
    [81.0, 11.0], [81.3, 12.5], [81.5, 14.2], [81.8, 16.0], [82.4, 17.8], [83.0, 19.4],
    [83.7, 20.8], [84.8, 22.1], [86.2, 22.8], [87.6, 21.9], [88.8, 21.1], [89.9, 21.8],
    [91.0, 23.4], [92.1, 24.8], [92.6, 26.5], [91.6, 27.9], [89.8, 27.9], [87.3, 27.5],
    [84.6, 27.8], [82.1, 28.8], [79.7, 30.2], [77.5, 31.8], [75.2, 33.0], [72.6, 34.9],
    [70.2, 34.8], [68.8, 32.8], [68.2, 30.4], [67.8, 27.8],
  ],
  [
    [88.0, 20.7], [89.0, 21.5], [90.2, 21.4], [91.2, 22.0], [92.0, 23.5], [92.4, 25.2],
    [91.2, 26.1], [89.8, 26.1], [88.7, 25.2], [88.0, 23.8], [87.9, 22.1],
  ],
  [
    [92.0, 10.0], [93.6, 11.9], [95.1, 14.1], [96.7, 16.8], [97.9, 19.5], [98.8, 22.3],
    [99.0, 24.7], [98.1, 26.6], [96.3, 27.8], [94.4, 27.6], [93.0, 25.3], [92.3, 22.2],
    [92.0, 18.2], [91.8, 14.1],
  ],
  [
    [79.6, 9.9], [80.2, 9.5], [80.7, 8.8], [81.0, 7.8], [80.9, 6.8], [80.7, 5.9],
    [80.2, 5.7], [79.8, 6.1], [79.6, 6.9], [79.5, 8.0], [79.5, 9.0],
  ],
];

function toRadians(value: number) {
  return (value * Math.PI) / 180;
}

function normalizeLongitude(value: number) {
  return ((((value + 180) % 360) + 360) % 360) - 180;
}

function isLand(lat: number, lon: number) {
  const x = normalizeLongitude(lon);
  const y = lat;

  return LAND_POLYGONS.some((polygon) => {
    let inside = false;

    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i, i += 1) {
      const [xi, yi] = polygon[i];
      const [xj, yj] = polygon[j];
      const intersects =
        yi > y !== yj > y &&
        x < ((xj - xi) * (y - yi)) / ((yj - yi) || Number.EPSILON) + xi;

      if (intersects) {
        inside = !inside;
      }
    }

    return inside;
  });
}

function projectPoint(
  latitude: number,
  longitude: number,
  radius: number,
  centerLat: number,
  centerLon: number,
) {
  const lat = toRadians(latitude);
  const lon = toRadians(longitude - centerLon);
  const tilt = toRadians(-centerLat);

  const x = radius * Math.cos(lat) * Math.sin(lon);
  const y = radius * Math.sin(lat);
  const z = radius * Math.cos(lat) * Math.cos(lon);

  const rotatedY = y * Math.cos(tilt) - z * Math.sin(tilt);
  const rotatedZ = y * Math.sin(tilt) + z * Math.cos(tilt);

  return {
    x,
    y: rotatedY,
    z: rotatedZ,
  };
}

export default function FooterGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const markerPoint = projectPoint(
    UNIVERSITY_LOCATION.lat,
    UNIVERSITY_LOCATION.lon,
    GLOBE_RADIUS,
    GLOBE_CENTER.lat,
    GLOBE_CENTER.lon,
  );
  const markerStyle = {
    left: `${((GLOBE_CENTER_X + markerPoint.x) / VIEWBOX_SIZE) * 100}%`,
    top: `${((GLOBE_CENTER_Y - markerPoint.y) / VIEWBOX_SIZE) * 100}%`,
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const size = VIEWBOX_SIZE;
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      ctx.clearRect(0, 0, size, size);

      const cx = GLOBE_CENTER_X;
      const cy = GLOBE_CENTER_Y;
      const radius = GLOBE_RADIUS;

      const halo = ctx.createRadialGradient(cx, cy, radius * 0.74, cx, cy, radius * 1.34);
      halo.addColorStop(0, 'rgba(8, 15, 26, 0)');
      halo.addColorStop(0.66, 'rgba(12, 18, 31, 0.08)');
      halo.addColorStop(1, 'rgba(0, 139, 230, 0.1)');

      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.3, 0, Math.PI * 2);
      ctx.fillStyle = halo;
      ctx.fill();

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.clip();

      const sphereFill = ctx.createRadialGradient(
        cx - radius * 0.34,
        cy - radius * 0.42,
        radius * 0.14,
        cx,
        cy,
        radius * 1.06,
      );
      sphereFill.addColorStop(0, 'rgba(66, 74, 88, 0.22)');
      sphereFill.addColorStop(0.18, 'rgba(15, 18, 27, 0.95)');
      sphereFill.addColorStop(0.72, 'rgba(4, 6, 12, 0.99)');
      sphereFill.addColorStop(1, 'rgba(0, 0, 0, 1)');

      ctx.fillStyle = sphereFill;
      ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);

      for (let lat = -10; lat <= 42; lat += 1.65) {
        for (let lon = 28; lon <= 102; lon += 1.7) {
          if (!isLand(lat, lon)) {
            continue;
          }

          const point = projectPoint(lat, lon, radius, GLOBE_CENTER.lat, GLOBE_CENTER.lon);
          if (point.z <= radius * 0.04) {
            continue;
          }

          const depth = point.z / radius;
          const x2d = cx + point.x;
          const y2d = cy - point.y;
          const shimmer = Math.sin(toRadians(lat * 9 + lon * 4)) * 0.16 + 0.84;
          const dotSize = 0.95 + depth * 1.35;
          const alpha = 0.24 + depth * 0.55;
          const tone = 214 + Math.round(depth * 28);

          ctx.beginPath();
          ctx.arc(x2d, y2d, dotSize * shimmer, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${tone}, ${tone}, ${tone}, ${alpha})`;
          ctx.fill();
        }
      }

      for (let lat = -36; lat <= 54; lat += 12) {
        ctx.beginPath();
        let started = false;

        for (let lon = -180; lon <= 180; lon += 2) {
          const point = projectPoint(lat, lon, radius, GLOBE_CENTER.lat, GLOBE_CENTER.lon);
          if (point.z <= 0) {
            started = false;
            continue;
          }

          const x2d = cx + point.x;
          const y2d = cy - point.y;

          if (!started) {
            ctx.moveTo(x2d, y2d);
            started = true;
          } else {
            ctx.lineTo(x2d, y2d);
          }
        }

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.026)';
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      for (let lon = -180; lon <= 180; lon += 20) {
        ctx.beginPath();
        let started = false;

        for (let lat = -85; lat <= 85; lat += 2) {
          const point = projectPoint(lat, lon, radius, GLOBE_CENTER.lat, GLOBE_CENTER.lon);
          if (point.z <= 0) {
            started = false;
            continue;
          }

          const x2d = cx + point.x;
          const y2d = cy - point.y;

          if (!started) {
            ctx.moveTo(x2d, y2d);
            started = true;
          } else {
            ctx.lineTo(x2d, y2d);
          }
        }

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      for (let index = 0; index < 64; index += 1) {
        const lat = -6 + ((index * 11) % 38);
        const lon = 40 + ((index * 17) % 52);
        const point = projectPoint(lat, lon, radius, GLOBE_CENTER.lat, GLOBE_CENTER.lon);
        if (point.z <= radius * 0.08) {
          continue;
        }

        const x2d = cx + point.x;
        const y2d = cy - point.y;
        const depth = point.z / radius;

        ctx.beginPath();
        ctx.arc(x2d, y2d, 0.45 + depth * 0.7, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.04 + depth * 0.06})`;
        ctx.fill();
      }

      ctx.restore();

      const shadowGradient = ctx.createRadialGradient(
        cx - radius * 0.4,
        cy - radius * 0.4,
        radius * 0.2,
        cx,
        cy,
        radius * 1.1,
      );
      shadowGradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
      shadowGradient.addColorStop(0.7, 'rgba(0, 0, 0, 0.05)');
      shadowGradient.addColorStop(1, 'rgba(0, 0, 0, 0.42)');

      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = shadowGradient;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(214, 231, 255, 0.16)';
      ctx.lineWidth = 1.3;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.02, 0.9 * Math.PI, 1.73 * Math.PI);
      ctx.strokeStyle = 'rgba(157, 235, 211, 0.9)';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.02, 1.72 * Math.PI, 0.26 * Math.PI);
      ctx.strokeStyle = 'rgba(252, 218, 104, 0.78)';
      ctx.lineWidth = 3;
      ctx.stroke();

      const sriLankaPoint = projectPoint(
        UNIVERSITY_LOCATION.lat,
        UNIVERSITY_LOCATION.lon,
        radius,
        GLOBE_CENTER.lat,
        GLOBE_CENTER.lon,
      );

      const mapPinX = cx + sriLankaPoint.x;
      const mapPinY = cy - sriLankaPoint.y;

      ctx.beginPath();
      ctx.arc(mapPinX, mapPinY, 5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.98)';
      ctx.shadowBlur = 26;
      ctx.shadowColor = 'rgba(0, 139, 230, 0.8)';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(mapPinX, mapPinY, 12, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(140, 192, 255, 0.28)';
      ctx.lineWidth = 1.3;
      ctx.stroke();

      ctx.shadowBlur = 0;
    };

    draw();

    const handleResize = () => draw();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="footer-globe-scene" aria-hidden="true">
      <canvas
        ref={canvasRef}
        className="footer-globe-canvas"
        aria-hidden="true"
      />
      <div className="footer-globe-callout" style={markerStyle}>
        <span className="footer-globe-label">IEEE SB of UOM</span>
        <span className="footer-globe-marker" />
      </div>
    </div>
  );
}
