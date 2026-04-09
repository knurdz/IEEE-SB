'use client';

import { useEffect, useRef } from 'react';

/**
 * FooterGlobe – A static, dotted-wireframe globe rendered via canvas.
 * Designed to sit partially visible at the top-right of the footer,
 * mirroring the hero section's globe aesthetic without animation.
 */
export default function FooterGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const draw = () => {
      const size = 600;
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
      ctx.scale(dpr, dpr);

      ctx.clearRect(0, 0, size, size);

      const cx = size / 2;
      const cy = size / 2;
      const radius = size * 0.42;

      // Draw latitude dots
      const latCount = 18;
      const lonCount = 36;
      const dotRadius = 1.2;

      // Rotation angle to show Sri Lanka (approx 80° East) facing forward
      const rotY = (-80.7 * Math.PI) / 180;
      const rotX = (0 * Math.PI) / 180; // Tilt if needed

      // Sri Lanka coordinates: Lat ~7.9° N, Lon ~80.8° E
      // theta (from top): 90 - latitude
      const slLat = 7.87;
      const slLon = 80.77;
      const slTheta = ((90 - slLat) * Math.PI) / 180;
      const slPhi = (slLon * Math.PI) / 180 + rotY;

      for (let lat = 0; lat <= latCount; lat++) {
        const theta = (lat / latCount) * Math.PI;
        const sinTheta = Math.sin(theta);
        const cosTheta = Math.cos(theta);

        for (let lon = 0; lon < lonCount; lon++) {
          const phi = (lon / lonCount) * Math.PI * 2 + rotY;
          const sinPhi = Math.sin(phi);
          const cosPhi = Math.cos(phi);

          const x3d = radius * sinTheta * cosPhi;
          const y3d = radius * cosTheta;
          const z3d = radius * sinTheta * sinPhi;

          if (z3d < -20) continue;

          const x2d = cx + x3d;
          const y2d = cy - y3d;
          const depthFactor = (z3d / radius) * 0.6 + 0.4;

          ctx.beginPath();
          ctx.arc(x2d, y2d, dotRadius * depthFactor + 0.3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 139, 230, ${0.2 + depthFactor * 0.4})`;
          ctx.fill();
        }
      }

      // Draw Location Marker for Sri Lanka (IEEE SB UoM)
      const xSL = radius * Math.sin(slTheta) * Math.cos(slPhi);
      const ySL = radius * Math.cos(slTheta);
      const zSL = radius * Math.sin(slTheta) * Math.sin(slPhi);

      if (zSL >= 0) {
        const x2dSL = cx + xSL;
        const y2dSL = cy - ySL;

        // Glowing outer rings
        for (let r = 1; r <= 3; r++) {
          ctx.beginPath();
          ctx.arc(x2dSL, y2dSL, r * 4, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0, 255, 255, ${0.4 / r})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        // Core point
        ctx.beginPath();
        ctx.arc(x2dSL, y2dSL, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#00ffff';
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#00ffff';
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow
      }

      // Draw meridian lines... (rest of the code stays mostly the same)
      const meridianCount = 12;
      for (let m = 0; m < meridianCount; m++) {
        const phi = (m / meridianCount) * Math.PI * 2 + rotY;
        const cosPhi = Math.cos(phi);
        const sinPhi = Math.sin(phi);

        ctx.beginPath();
        let started = false;

        for (let i = 0; i <= 100; i++) {
          const theta = (i / 100) * Math.PI;
          const sinTheta = Math.sin(theta);
          const cosTheta = Math.cos(theta);

          const x3d = radius * sinTheta * cosPhi;
          const y3d = radius * cosTheta;
          const z3d = radius * sinTheta * sinPhi;

          if (z3d < -10) {
            started = false;
            continue;
          }

          const x2d = cx + x3d;
          const y2d = cy - y3d;

          if (!started) {
            ctx.moveTo(x2d, y2d);
            started = true;
          } else {
            ctx.lineTo(x2d, y2d);
          }
        }

        ctx.strokeStyle = 'rgba(0, 87, 157, 0.12)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw parallel lines...
      const parallelCount = 9;
      for (let p = 1; p < parallelCount; p++) {
        const theta = (p / parallelCount) * Math.PI;
        const sinTheta = Math.sin(theta);
        const cosTheta = Math.cos(theta);
        const parallelRadius = radius * sinTheta;

        ctx.beginPath();
        let started = false;

        for (let i = 0; i <= 100; i++) {
          const phi = (i / 100) * Math.PI * 2 + rotY;
          const x3d = parallelRadius * Math.cos(phi);
          const z3d = parallelRadius * Math.sin(phi);

          if (z3d < -10) {
            started = false;
            continue;
          }

          const x2d = cx + x3d;
          const y2d = cy - radius * cosTheta;

          if (!started) {
            ctx.moveTo(x2d, y2d);
            started = true;
          } else {
            ctx.lineTo(x2d, y2d);
          }
        }

        ctx.strokeStyle = 'rgba(0, 87, 157, 0.1)';
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // Draw the outer circle (limb)
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 87, 157, 0.18)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Add a subtle glow ring
      const gradient = ctx.createRadialGradient(cx, cy, radius * 0.95, cx, cy, radius * 1.15);
      gradient.addColorStop(0, 'rgba(0, 139, 230, 0.08)');
      gradient.addColorStop(0.5, 'rgba(0, 87, 157, 0.04)');
      gradient.addColorStop(1, 'rgba(0, 87, 157, 0)');

      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.15, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    };

    draw();

    const handleResize = () => draw();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="footer-globe-canvas"
      aria-hidden="true"
    />
  );
}
