'use client';

import { useEffect, useRef } from 'react';
import { EARTH_MASK_DATA_URL } from '@/lib/earth-mask-image';

const GLOBE_CENTER = {
  lat: -8.5,
  lon: 95.3,
};

const UNIVERSITY_LOCATION = {
  lat: 6.7964,
  lon: 79.9008,
};

const VIEWBOX_SIZE = 900;
const GLOBE_CENTER_X = VIEWBOX_SIZE * 0.67;
const GLOBE_CENTER_Y = VIEWBOX_SIZE * 0.57;
const GLOBE_RADIUS = VIEWBOX_SIZE * 0.41;
type EarthMask = {
  data: Uint8ClampedArray;
  width: number;
  height: number;
};

function toRadians(value: number) {
  return (value * Math.PI) / 180;
}

function normalizeLongitude(value: number) {
  return ((((value + 180) % 360) + 360) % 360) - 180;
}

function sampleEarthBrightness(mask: EarthMask, lat: number, lon: number) {
  const x = Math.max(
    0,
    Math.min(
      mask.width - 1,
      Math.round(((normalizeLongitude(lon) + 180) / 360) * (mask.width - 1)),
    ),
  );
  const y = Math.max(
    0,
    Math.min(
      mask.height - 1,
      Math.round(((90 - lat) / 180) * (mask.height - 1)),
    ),
  );

  const index = (y * mask.width + x) * 4;
  return (mask.data[index] + mask.data[index + 1] + mask.data[index + 2]) / 3;
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
    const earthImage = new Image();
    let earthMask: EarthMask | null = null;
    let disposed = false;

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
      halo.addColorStop(0, 'rgba(255, 255, 255, 0)');
      halo.addColorStop(0.66, 'rgba(255, 255, 255, 0.08)');
      halo.addColorStop(1, 'rgba(255, 255, 255, 0.15)');

      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.3, 0, Math.PI * 2);
      ctx.fillStyle = halo;
      ctx.fill();

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.clip();

      const sphereFill = ctx.createRadialGradient(
        cx,
        cy,
        radius * 0.1,
        cx,
        cy,
        radius * 1.05,
      );
      sphereFill.addColorStop(0, 'rgba(0, 60, 140, 0.95)');
      sphereFill.addColorStop(1, 'rgba(0, 20, 60, 1)');

      ctx.fillStyle = sphereFill;
      ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);

      if (earthMask) {
        for (let lat = -75; lat <= 82; lat += 1.4) {
          for (let lon = -180; lon <= 180; lon += 1.4) {
            const brightness = sampleEarthBrightness(earthMask, lat, lon);
            if (brightness > 148) {
              continue;
            }

            const point = projectPoint(lat, lon, radius, GLOBE_CENTER.lat, GLOBE_CENTER.lon);
            if (point.z <= radius * 0.035) {
              continue;
            }

            const depth = point.z / radius;
            const x2d = cx + point.x;
            const y2d = cy - point.y;
            const shimmer = Math.sin(toRadians(lat * 7 + lon * 3)) * 0.14 + 0.86;
            const dotSize = 0.82 + depth * 1.18;
            const alpha = 0.22 + depth * 0.58;
            const tone = 214 + Math.round(depth * 26);

            ctx.beginPath();
            ctx.arc(x2d, y2d, dotSize * shimmer, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${tone}, ${tone}, ${tone}, ${alpha})`;
            ctx.fill();
          }
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

      for (let index = 0; index < 72; index += 1) {
        const lat = -55 + ((index * 17) % 110);
        const lon = -170 + ((index * 29) % 340);
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

      // Removed globe shadow gradient for a cleaner look


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
      ctx.shadowColor = 'rgba(255, 255, 255, 0.9)';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(mapPinX, mapPinY, 12, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(140, 192, 255, 0.28)';
      ctx.lineWidth = 1.3;
      ctx.stroke();

      ctx.shadowBlur = 0;
    };

    const buildEarthMask = () => {
      if (disposed) return;

      const maskCanvas = document.createElement('canvas');
      maskCanvas.width = earthImage.naturalWidth || 2048;
      maskCanvas.height = earthImage.naturalHeight || 1024;

      const maskContext = maskCanvas.getContext('2d');
      if (!maskContext) {
        draw();
        return;
      }

      maskContext.filter = 'blur(0.09375rem)';
      maskContext.drawImage(earthImage, 0, 0, maskCanvas.width, maskCanvas.height);
      maskContext.filter = 'none';

      const imageData = maskContext.getImageData(0, 0, maskCanvas.width, maskCanvas.height);
      earthMask = {
        data: imageData.data,
        width: maskCanvas.width,
        height: maskCanvas.height,
      };

      draw();
    };

    earthImage.src = EARTH_MASK_DATA_URL;
    if (earthImage.complete) {
      buildEarthMask();
    } else {
      earthImage.onload = buildEarthMask;
      earthImage.onerror = () => draw();
      draw();
    }

    const handleResize = () => draw();
    window.addEventListener('resize', handleResize);

    return () => {
      disposed = true;
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="footer-globe-scene" aria-hidden="true">
      <canvas
        ref={canvasRef}
        className="footer-globe-canvas"
        aria-hidden="true"
      />
      <div className="footer-globe-callout" style={markerStyle}>
        <span className="footer-globe-label">University of Moratuwa</span>
        <span className="footer-globe-marker" />
      </div>
    </div>
  );
}
