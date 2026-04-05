'use client';

import { useEffect, useRef, useState } from 'react';

export default function TextSphereAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Preload earth texture image from local assets
    const earthImage = new Image();
    earthImage.src = '/earth_specular_2048.jpg';

    const loadScript = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        // Check if script is already loaded
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve();
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const loadAllScripts = async () => {
      try {
        // Load THREE.js first (required by other scripts)
        await loadScript('/lib/three.min.js');

        // Then load scripts that depend on THREE in parallel
        await Promise.all([
          loadScript('/lib/TextGeometry.js'),
          loadScript('/lib/FontUtils.js'),
          loadScript('/lib/pnltri.min.js'),
          loadScript('/lib/droid_sans_bold.typeface.js'),
          loadScript('/lib/TweenMax.min.js'),
        ]);

        // Finally load bas.js which depends on THREE and other libraries
        await loadScript('/lib/bas.js');

        // Wait for earth image to load
        await new Promise((resolve) => {
          if (earthImage.complete) {
            resolve(null);
          } else {
            earthImage.onload = () => resolve(null);
          }
        });
        setIsLoading(false);
        initAnimation();
      } catch (error) {
        console.error('Failed to load resources:', error);
        setIsLoading(false);
      }
    };

    const initAnimation = () => {
      const THREE = (window as any).THREE;
      const TweenMax = (window as any).TweenMax;
      const TimelineMax = (window as any).TimelineMax;
      const Power1 = (window as any).Power1;
      const PNLTRI = (window as any).PNLTRI;

      THREE.ShapeUtils.triangulateShape = (function () {
        const pnlTriangulator = new PNLTRI.Triangulator();
        return function triangulateShape(contour: any, holes: any) {
          return pnlTriangulator.triangulate_polygon([contour].concat(holes));
        };
      })();

      const utils = {
        extend: function (dst: any, src: any) {
          for (const key in src) {
            dst[key] = src[key];
          }
          return dst;
        },
        fibSpherePoint: (function () {
          const v = { x: 0, y: 0, z: 0 };
          const G = Math.PI * (3 - Math.sqrt(5));
          return function (i: number, n: number, radius: number) {
            const step = 2.0 / n;
            v.y = i * step - 1 + step * 0.5;
            const r = Math.sqrt(1 - v.y * v.y);
            const phi = i * G;
            v.x = Math.cos(phi) * r;
            v.z = Math.sin(phi) * r;
            radius = radius || 1;
            v.x *= radius;
            v.y *= radius;
            v.z *= radius;
            return v;
          };
        })(),
      };

      function THREERoot(this: any, params: any) {
        params = utils.extend(
          { fov: 60, zNear: 10, zFar: 100000, createCameraControls: true },
          params
        );

        this.renderer = new THREE.WebGLRenderer({ antialias: params.antialias, alpha: true });
        this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));

        const container = document.getElementById('three-container');
        if (container) {
          container.appendChild(this.renderer.domElement);
        }

        this.camera = new THREE.PerspectiveCamera(
          params.fov,
          window.innerWidth / window.innerHeight,
          params.zNear,
          params.zFar
        );

        this.scene = new THREE.Scene();
        this.onUpdate = null;

        this.resize = () => {
          this.camera.aspect = window.innerWidth / window.innerHeight;
          this.camera.updateProjectionMatrix();
          this.renderer.setSize(window.innerWidth, window.innerHeight);
        };

        this.tick = () => {
          if (this.onUpdate) this.onUpdate();
          this.renderer.render(this.scene, this.camera);
          requestAnimationFrame(this.tick);
        };

        this.resize();
        this.tick();
        window.addEventListener('resize', this.resize, false);
      }

      const SPHERE_RADIUS = 240;

      function TextAnimation(this: any, textGeometry: any) {
        const bufferGeometry = new THREE.BAS.ModelBufferGeometry(textGeometry);
        const aAnimation = bufferGeometry.createAttribute('aAnimation', 2);
        const aEndPosition = bufferGeometry.createAttribute('aEndPosition', 3);
        const aAxisAngle = bufferGeometry.createAttribute('aAxisAngle', 4);

        const faceCount = bufferGeometry.faceCount;
        const maxDelay = 0.0;
        const minDuration = 1.0;
        const maxDuration = 1.0;
        const stretch = 0.05;
        const lengthFactor = 0.001;
        const maxLength = textGeometry.boundingBox.max.length();

        this.animationDuration = maxDuration + maxDelay + stretch + lengthFactor * maxLength;
        this._animationProgress = 0;

        const axis = new THREE.Vector3();

        for (let i = 0, i2 = 0, i3 = 0, i4 = 0; i < faceCount; i++, i2 += 6, i3 += 9, i4 += 12) {
          const face = textGeometry.faces[i];
          const centroid = THREE.BAS.Utils.computeCentroid(textGeometry, face);
          const centroidN = new THREE.Vector3().copy(centroid).normalize();

          const delay = (maxLength - centroid.length()) * lengthFactor;
          const duration = THREE.Math.randFloat(minDuration, maxDuration);

          for (let v = 0; v < 6; v += 2) {
            aAnimation.array[i2 + v] = delay + stretch * Math.random();
            aAnimation.array[i2 + v + 1] = duration;
          }

          const point = utils.fibSpherePoint(i, faceCount, SPHERE_RADIUS);
          for (let v = 0; v < 9; v += 3) {
            aEndPosition.array[i3 + v] = point.x;
            aEndPosition.array[i3 + v + 1] = point.y;
            aEndPosition.array[i3 + v + 2] = point.z;
          }

          axis.x = centroidN.x;
          axis.y = -centroidN.y;
          axis.z = -centroidN.z;
          axis.normalize();

          const angle = Math.PI * THREE.Math.randFloat(0.5, 2.0);
          for (let v = 0; v < 12; v += 4) {
            aAxisAngle.array[i4 + v] = axis.x;
            aAxisAngle.array[i4 + v + 1] = axis.y;
            aAxisAngle.array[i4 + v + 2] = axis.z;
            aAxisAngle.array[i4 + v + 3] = angle;
          }
        }

        // Use BasicAnimationMaterial (lights: false) so the text colour is
        // always the flat diffuse #0052FF regardless of lighting angle or
        // how much the sphere group has rotated. PhongAnimationMaterial was
        // recomputing Phong shading every frame, making faces look near-black
        // when the directional light hit them at a glancing angle — that is
        // what caused the continuous black-to-blue flicker.
        const material = new THREE.BAS.BasicAnimationMaterial(
          {
            side: THREE.DoubleSide,
            transparent: true,
            uniforms: {
              uTime: { type: 'f', value: 0 },
            },
            shaderFunctions: [
              THREE.BAS.ShaderChunk['cubic_bezier'],
              THREE.BAS.ShaderChunk['ease_out_cubic'],
              THREE.BAS.ShaderChunk['quaternion_rotation'],
            ],
            shaderParameters: [
              'uniform float uTime;',
              'attribute vec2 aAnimation;',
              'attribute vec3 aEndPosition;',
              'attribute vec4 aAxisAngle;',
            ],
            shaderVertexInit: [
              'float tDelay = aAnimation.x;',
              'float tDuration = aAnimation.y;',
              'float tTime = clamp(uTime - tDelay, 0.0, tDuration);',
              'float tProgress = ease(tTime, 0.0, 1.0, tDuration);',
            ],
            shaderTransformPosition: [
              'transformed = mix(transformed, aEndPosition, tProgress);',
              'float angle = aAxisAngle.w * tProgress;',
              'vec4 tQuat = quatFromAxisAngle(aAxisAngle.xyz, angle);',
              'transformed = rotateVector(tQuat, transformed);',
            ],
          },
          { diffuse: 0x0A2540 }
        );

        THREE.Mesh.call(this, bufferGeometry, material);
        this.frustumCulled = false;
      }

      TextAnimation.prototype = Object.create(THREE.Mesh.prototype);
      TextAnimation.prototype.constructor = TextAnimation;

      Object.defineProperty(TextAnimation.prototype, 'animationProgress', {
        get: function () { return this._animationProgress; },
        set: function (v: number) {
          this._animationProgress = v;
          this.material.uniforms['uTime'].value = this.animationDuration * v;
        },
      });

      function generateTextGeometry(text: string, params: any) {
        const geometry = new THREE.TextGeometry(text, {
          size: params.size,
          height: params.height,
          curveSegments: params.curveSegments,
          bevelSize: params.bevelSize,
          bevelThickness: params.bevelThickness,
          bevelEnabled: params.bevelEnabled,
          font: 'droid sans',
          weight: 'bold',
          style: 'normal',
        });
        geometry.computeBoundingBox();

        const size = geometry.boundingBox.size();
        const anchorX = size.x * -params.anchor.x;
        const anchorY = size.y * -params.anchor.y;
        const anchorZ = size.z * -params.anchor.z;
        const matrix = new THREE.Matrix4().makeTranslation(anchorX, anchorY, anchorZ);
        geometry.applyMatrix(matrix);
        return geometry;
      }

      function createTextAnimation() {
        const THREE = (window as any).THREE;

        const ieeeGeometry = generateTextGeometry('IEEE', {
          size: 140,
          height: 0.1,
          curveSegments: 24,
          bevelSize: 0,
          bevelThickness: 0,
          bevelEnabled: false,
          anchor: { x: 0.5, y: 0.5, z: 0.0 },
        });

        ieeeGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 70, 0));

        const uniGeometry = generateTextGeometry('UNIVERSITY OF MORATUWA', {
          size: 30,
          height: 0.1,
          curveSegments: 24,
          bevelSize: 0,
          bevelThickness: 0,
          bevelEnabled: false,
          anchor: { x: 0.5, y: 0.5, z: 0.0 },
        });

        uniGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, -60, 0));

        ieeeGeometry.merge(uniGeometry);
        ieeeGeometry.computeBoundingBox();

        THREE.BAS.Utils.tessellateRepeat(ieeeGeometry, 1.0, 2);
        THREE.BAS.Utils.separateFaces(ieeeGeometry);

        return new (TextAnimation as any)(ieeeGeometry);
      }

      // --- Helper: Create a text label sprite ---
      function createLabelSprite(text: string) {
        const labelCanvas = document.createElement('canvas');
        const labelCtx = labelCanvas.getContext('2d')!;

        const fontSize = 48;
        const paddingX = 28;
        const paddingY = 18;
        const font = `bold ${fontSize}px Arial, sans-serif`;

        labelCtx.font = font;
        const textWidth = labelCtx.measureText(text).width;

        labelCanvas.width = textWidth + paddingX * 2;
        labelCanvas.height = fontSize + paddingY * 2;

        const cornerRadius = 14;
        const w = labelCanvas.width;
        const h = labelCanvas.height;

        labelCtx.fillStyle = 'rgba(6, 14, 26, 0.8)';
        labelCtx.strokeStyle = 'rgba(96, 165, 250, 0.7)';
        labelCtx.lineWidth = 3;

        labelCtx.beginPath();
        labelCtx.moveTo(cornerRadius, 0);
        labelCtx.lineTo(w - cornerRadius, 0);
        labelCtx.quadraticCurveTo(w, 0, w, cornerRadius);
        labelCtx.lineTo(w, h - cornerRadius);
        labelCtx.quadraticCurveTo(w, h, w - cornerRadius, h);
        labelCtx.lineTo(cornerRadius, h);
        labelCtx.quadraticCurveTo(0, h, 0, h - cornerRadius);
        labelCtx.lineTo(0, cornerRadius);
        labelCtx.quadraticCurveTo(0, 0, cornerRadius, 0);
        labelCtx.closePath();
        labelCtx.fill();
        labelCtx.stroke();

        labelCtx.font = font;
        labelCtx.fillStyle = '#ffffff';
        labelCtx.textAlign = 'center';
        labelCtx.textBaseline = 'middle';
        labelCtx.fillText(text, w / 2, h / 2);

        const texture = new THREE.Texture(labelCanvas);
        texture.needsUpdate = true;
        texture.minFilter = (THREE as any).LinearFilter;
        texture.generateMipmaps = false;

        const spriteMaterial = new THREE.SpriteMaterial({
          map: texture,
          transparent: true,
        });

        const sprite = new THREE.Sprite(spriteMaterial);

        const scaleFactor = 0.14;
        sprite.scale.set(w * scaleFactor, h * scaleFactor, 1);

        return { sprite, material: spriteMaterial };
      }

      function createEarthSphere(earthTexture: any) {
        const THREE = (window as any).THREE;
        const geometry = new THREE.SphereGeometry(SPHERE_RADIUS * 0.99, 64, 64);
        const material = new THREE.MeshBasicMaterial({
          map: earthTexture,
          transparent: true,
          opacity: 0,
          color: 0xffffff,
        });
        const earth = new THREE.Mesh(geometry, material);

        earth.scale.set(1, 1, 1);
        earth.visible = true;
        earth.renderOrder = -1;

        const calcPos = (lat: number, lon: number, radius: number) => {
          const phi = (lon + 180) * (Math.PI / 180);
          const theta = (90 - lat) * (Math.PI / 180);

          const x = -radius * Math.cos(phi) * Math.sin(theta);
          const y = radius * Math.cos(theta);
          const z = radius * Math.sin(phi) * Math.sin(theta);

          return { x, y, z };
        };

        const pinColor = 0x0A2463;
        const pinMaterial = new THREE.MeshBasicMaterial({ color: pinColor, transparent: true });

        function create3DPinMesh(colorMat: any) {
          const pinGroup = new THREE.Group();

          const spikeHeight = 15;
          const spikeBaseRadius = 2.5;

          const spikeGeometry = new THREE.CylinderGeometry(0, spikeBaseRadius, spikeHeight, 16);
          const spikeMesh = new THREE.Mesh(spikeGeometry, colorMat);

          spikeMesh.position.y = spikeHeight / 2;
          pinGroup.add(spikeMesh);

          const topSphereRadius = 3.5;
          const topSphereGeometry = new THREE.SphereGeometry(topSphereRadius, 16, 16);
          const topSphereMesh = new THREE.Mesh(topSphereGeometry, colorMat);

          topSphereMesh.position.y = spikeHeight;
          pinGroup.add(topSphereMesh);

          return pinGroup;
        }

        const pinsData = [
          { name: 'USA', lat: 37.0, lon: -95.0 },
          { name: 'Canada', lat: 56.1, lon: -106.3 },
          { name: 'UK', lat: 51.5, lon: -0.1 },
          { name: 'Africa', lat: 9.0, lon: 8.0 },
          { name: 'Sri Lanka', lat: 7.9, lon: 80.0 },
          { name: 'Japan', lat: 36.2, lon: 138.2 },
          { name: 'India', lat: 20.6, lon: 78.9 },
        ];

        const extraMaterials: any[] = [];

        pinsData.forEach((pin) => {
          const pinModelGroup = create3DPinMesh(pinMaterial);
          const pos = calcPos(pin.lat, pin.lon, SPHERE_RADIUS * 1.01);
          pinModelGroup.position.set(pos.x, pos.y, pos.z);
          earth.add(pinModelGroup);

          pinModelGroup.quaternion.setFromUnitVectors(
            new THREE.Vector3(0, 1, 0),
            new THREE.Vector3().copy(pos).normalize()
          );

          // --- Label above Sri Lanka pin (in earth's coordinate space) ---
          if (pin.name === 'Sri Lanka') {
            const spikeHeight = 15;
            const topSphereRadius = 3.5;

            // Pin top position in earth's local space
            const normal = new THREE.Vector3(pos.x, pos.y, pos.z).normalize();
            const pinTopPos = new THREE.Vector3(
              pos.x + normal.x * (spikeHeight + topSphereRadius),
              pos.y + normal.y * (spikeHeight + topSphereRadius),
              pos.z + normal.z * (spikeHeight + topSphereRadius)
            );

            // Label position: offset outward (radial) + upward (world Y)
            const radialOffset = 25;
            const worldYOffset = 40;

            const labelPos = new THREE.Vector3(
              pinTopPos.x + normal.x * radialOffset,
              pinTopPos.y + normal.y * radialOffset + worldYOffset,
              pinTopPos.z + normal.z * radialOffset
            );

            // Connector line from pin top to label
            const lineGeom = new THREE.Geometry();
            lineGeom.vertices.push(pinTopPos.clone());
            lineGeom.vertices.push(labelPos.clone());
            const lineMat = new THREE.LineBasicMaterial({
              color: 0x0056B3,
              transparent: true,
              opacity: 0.8,
              linewidth: 1,
            });
            const connectorLine = new THREE.Line(lineGeom, lineMat);
            earth.add(connectorLine);
            extraMaterials.push(lineMat);

            // Small dot at the bend / connection point on pin top
            const dotGeom = new THREE.SphereGeometry(1.5, 8, 8);
            const dotMat = new THREE.MeshBasicMaterial({
              color: 0x0056B3,
              transparent: true,
            });
            const dot = new THREE.Mesh(dotGeom, dotMat);
            dot.position.copy(pinTopPos);
            earth.add(dot);
            extraMaterials.push(dotMat);

            // Label sprite
            const { sprite: labelSprite, material: labelMat } =
              createLabelSprite('UoM Student Branch');
            labelSprite.position.copy(labelPos);
            earth.add(labelSprite);
            extraMaterials.push(labelMat);
          }
        });

        (earth as any).pinMaterials = [pinMaterial, ...extraMaterials];

        return earth;
      }

      const canvas = document.createElement('canvas');
      canvas.width = 2048;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d')!;

      ctx.fillStyle = '#F8F9FA';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Use the preloaded earth image
      const processEarthTexture = () => {
        ctx.drawImage(earthImage, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        // Clear to fully transparent — only the Electric Blue dots will be drawn
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#0052FF';

        const dotSize = 1.2;
        const dotSpacing = 4;

        for (let y = 0; y < canvas.height; y += dotSpacing) {
          for (let x = 0; x < canvas.width; x += dotSpacing) {
            const i = (y * canvas.width + x) * 4;
            const brightness =
              (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;

            if (brightness < 80) {
              ctx.beginPath();
              ctx.arc(x, y, dotSize, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }

        const earthTexture = new THREE.Texture(canvas);
        earthTexture.needsUpdate = true;
        initScene(earthTexture);
      };

      processEarthTexture();

      function initScene(earthTexture: any) {
        const root = new (THREERoot as any)({
          createCameraControls: false,
          antialias: window.devicePixelRatio === 1,
          fov: 60,
        });

        root.renderer.setClearColor(0x000000, 0);
        root.renderer.setPixelRatio(window.devicePixelRatio || 1);
        root.camera.position.set(0, 0, 600);

        const sphereGroup = new THREE.Object3D();
        root.scene.add(sphereGroup);

        const earthSphere = createEarthSphere(earthTexture);
        sphereGroup.add(earthSphere);

        const textAnimation = createTextAnimation();
        textAnimation.material.opacity = 0;
        sphereGroup.add(textAnimation);

        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(0, 0, 1);
        root.scene.add(light);

        const backLight = new THREE.DirectionalLight(0xffffff, 0.3);
        backLight.position.set(0, 0, -1);
        root.scene.add(backLight);

        const ambientLight = new THREE.AmbientLight(0x333333);
        root.scene.add(ambientLight);

        let idleSpeed = { value: 0 };

        root.onUpdate = () => {
          earthSphere.rotation.y -= idleSpeed.value;
        };

        const tl = new TimelineMax();

        const bgGlobe = document.getElementById('bg-globe');
        const bgText = document.getElementById('bg-text');
        const subText = document.getElementById('sub-text');

        tl.fromTo(
          sphereGroup.rotation,
          5.5,
          { y: -Math.PI * 3 },
          { y: 0, ease: Power1.easeInOut },
          0
        );

        tl.fromTo(
          earthSphere.scale,
          3,
          { x: 1, y: 1, z: 1 },
          { x: 0.001, y: 0.001, z: 0.001, ease: Power1.easeInOut },
          1.5
        );

        const fadeTargets = [earthSphere.material, ...(earthSphere as any).pinMaterials];

        tl.fromTo(fadeTargets, 3, { opacity: 1.0 }, { opacity: 0, ease: Power1.easeInOut }, 1.5);

        tl.fromTo(
          textAnimation.material,
          3,
          { opacity: 0 },
          { opacity: 1, ease: Power1.easeInOut },
          1.5
        );

        tl.fromTo(
          textAnimation,
          4,
          { animationProgress: 0.6 },
          { animationProgress: 0.0, ease: Power1.easeInOut },
          1.5
        );

        if (bgGlobe && bgText) {
          tl.fromTo(bgGlobe, 3, { opacity: 1 }, { opacity: 0, ease: Power1.easeInOut }, 1.5);
          tl.fromTo(bgText, 3, { opacity: 0 }, { opacity: 1, ease: Power1.easeInOut }, 1.5);
        }

        if (subText) {
          tl.fromTo(subText, 2, { opacity: 0 }, { opacity: 1, ease: Power1.easeInOut }, 4.5);
        }

        tl.eventCallback('onReverseComplete', () => {
          earthSphere.material.opacity = 1;
          (earthSphere as any).pinMaterials.forEach((mat: any) => (mat.opacity = 1));
          textAnimation.material.opacity = 0;
          earthSphere.scale.set(1, 1, 1);
          if (bgGlobe) bgGlobe.style.opacity = '1';
          if (bgText) bgText.style.opacity = '0';
          if (subText) subText.style.opacity = '0';
        });

        document.body.style.cursor = 'pointer';
        window.addEventListener('click', () => {
          if (tl.reversed()) {
            tl.reversed(false);
            TweenMax.to(idleSpeed, 1.5, { value: 0, ease: Power1.easeOut });
          } else {
            // Immediately fade out subText
            if (subText) {
              TweenMax.to(subText, 0.3, { opacity: 0, ease: Power1.easeOut });
            }
            // 400ms delay, then start the main reverse
            setTimeout(() => {
              tl.time(4.5);
              tl.reversed(true);
              const durationLeft = Math.max(tl.time(), 0.1);
              TweenMax.to(idleSpeed, durationLeft, { value: 0.003, ease: Power1.easeIn });
            }, 300);
          }
        });
      }
    };

    loadAllScripts();
  }, []);


  return (
    <div className="relative w-full h-screen bg-[#F8F9FA] overflow-hidden">
      {/* Loading Indicator */}
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#F8F9FA]">
          <div className="text-center">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 border-4 border-blue-700/20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-transparent border-t-blue-700 rounded-full animate-spin"></div>
            </div>
            <p className="text-blue-700/80 text-sm font-jetbrains tracking-[0.3em] animate-pulse">
              LOADING GLOBE
            </p>
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@300;400;700;800&display=swap');
        
        @keyframes circuit-pulse {
          0% { stroke-dashoffset: 120; opacity: 0; }
          1% { opacity: 1; }
          20% { stroke-dashoffset: -20; opacity: 1; } 
          21% { opacity: 0; }
          100% { stroke-dashoffset: -20; opacity: 0; }
        }
        
        .animate-path {
          stroke-dasharray: 20 100;
          animation: circuit-pulse 40s linear infinite both;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .font-jetbrains {
          font-family: 'JetBrains Mono', monospace;
        }

        /* ── Static typography overrides (animations untouched) ── */
        .hero-tagline-1 {
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: #2563EB;
          text-shadow: none !important;
          -webkit-text-stroke: 0 !important;
          background: none !important;
          -webkit-background-clip: unset !important;
          -webkit-text-fill-color: #2563EB !important;
          background-clip: unset !important;
          fill: solid !important;
        }

        .hero-tagline-2 {
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          font-weight: 500;
          letter-spacing: 0.15em;
          color: #475569;
          text-shadow: none !important;
          -webkit-text-stroke: 0 !important;
          background: none !important;
          -webkit-background-clip: unset !important;
          -webkit-text-fill-color: #475569 !important;
          background-clip: unset !important;
          fill: solid !important;
        }
      `}</style>

      {/* --- SLIDESHOW BACKGROUND --- */}
      <div id="bg-slideshow" className="absolute inset-0 z-0 opacity-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#000408]/50 z-10" />
        <img src="/1.jpeg" alt="Slide 1" className="slideshow-img slide-1" />
        <img src="/2.jpeg" alt="Slide 2" className="slideshow-img slide-2" />
        <img src="/3.jpeg" alt="Slide 3" className="slideshow-img slide-3" />
        <img src="/4.jpeg" alt="Slide 4" className="slideshow-img slide-4" />
      </div>

      {/* --- GLOBE BACKGROUND --- */}
      <div id="bg-globe" className="absolute inset-0 pointer-events-none opacity-100 z-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at center, rgba(10, 36, 99, 0.06) 0%, rgba(0, 86, 179, 0.02) 45%, transparent 70%)',
          }}
        />
      </div>

      {/* 3D Animation Container */}
      <div id="three-container" ref={containerRef} className="relative w-full h-full z-10" />

      {/* --- TEXT CONTAINER --- */}
      <div
        id="sub-text"
        className="absolute top-[67%] left-1/2 -translate-x-1/2 text-center z-20 w-full opacity-0 pointer-events-none"
      >
        <p className="hero-tagline-1 text-xl sm:text-2xl mt-6 mb-2">
          INSPIRED BY PASSION
        </p>
        <p className="hero-tagline-2 text-xl sm:text-2xl">
          TO TRANSFORM BEYOND EXCELLENCE.
        </p>
      </div>

      {/* --- LEFT VERTICAL LABEL --- */}
      <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-6 opacity-0 animate-[fadeIn_2s_ease-out_3s_forwards]">
        <div className="w-px h-16 md:h-32 bg-gradient-to-b from-transparent to-[#94A3B8]" />
        <p
          className="text-[#94A3B8] text-xs font-jetbrains uppercase font-semibold"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', letterSpacing: '0.15em' }}
        >
          Since 2008
        </p>
        <div className="w-px h-16 md:h-32 bg-gradient-to-t from-transparent to-[#94A3B8]" />
      </div>

      {/* Global Vignette - subtle on light bg */}
      <div
        className="absolute inset-0 pointer-events-none z-30"
        style={{
          background:
            'radial-gradient(circle at center, transparent 40%, rgba(248, 249, 250, 0.7) 100%)',
        }}
      />
    </div>
  );
}