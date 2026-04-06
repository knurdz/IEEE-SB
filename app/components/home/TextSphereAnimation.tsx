'use client';

import { useEffect, useRef, useState } from 'react';

export default function TextSphereAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // [SCENARIO A FIX: SOLID CONTINENTS]
    // To remove the "holes" caused by inland lakes, you must replace the image below.
    // The current 'earth_specular_2048.jpg' contains detailed rivers/lakes that are read as empty space.
    // Replace it with a solid landmass equirectangular map (e.g., download a basic 2048x1024 
    // black/white vector world map without lakes, save it to /public, and update the URL below).
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

      function TextAnimation(this: any, textGeometry: any, color: number) {
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
            depthWrite: false, // Prevent scattered invisible text triangles from occluding the background
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
          { diffuse: color || 0x0A2540 }
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

      function createTextAnimation(color: number) {
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

        return new (TextAnimation as any)(ieeeGeometry, color);
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
          depthWrite: false, // Prevent transparent label bounding box from punching depth holes
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
          // alphaTest: binary dot cutout — texels below 50% alpha are discarded,
          // eliminating the semi-transparent fringe pixels that made dots look
          // lighter at poles and grazing angles (the root cause of the inconsistency).
          alphaTest: 0.5,
          // transparent: true is kept so GSAP can still animate the opacity for fade-out.
          transparent: true,
          side: THREE.FrontSide,
          opacity: 1,
          color: 0xffffff,
        });
        const earth = new THREE.Mesh(geometry, material);

        earth.scale.set(1, 1, 1);
        earth.visible = true;
        earth.renderOrder = -1;

        // ── Depth-mask sphere ──────────────────────────────────────────────────
        // The dot-texture globe uses alphaTest:0.5, which means ocean fragments
        // are DISCARDED and never write to the depth buffer. That leaves a gap
        // through which back-hemisphere pins can bleed through the globe body.
        // This invisible opaque sphere is the same shape as the globe but renders
        // in the OPAQUE pass (transparent:false), so it always writes a solid
        // depth shield across the entire globe silhouette before any transparent
        // objects (pins, dot texture) are drawn. Back-side pins are then occluded
        // by the depth test regardless of whether they're behind ocean or land.
        const depthMaskGeo = new THREE.SphereGeometry(SPHERE_RADIUS * 0.98, 64, 64);
        const depthMaskMat = new THREE.MeshBasicMaterial({
          colorWrite: false, // completely invisible
          depthWrite: true,  // but writes to depth buffer
          side: THREE.FrontSide,
        });
        const depthMaskSphere = new THREE.Mesh(depthMaskGeo, depthMaskMat);
        // Being opaque (transparent:false by default) it will be sorted into the
        // opaque render pass which runs before any transparent draw-calls, so the
        // depth values are guaranteed to be in place when pins are tested.
        earth.add(depthMaskSphere);

        const calcPos = (lat: number, lon: number, radius: number) => {
          const phi = (lon + 180) * (Math.PI / 180);
          const theta = (90 - lat) * (Math.PI / 180);

          const x = -radius * Math.cos(phi) * Math.sin(theta);
          const y = radius * Math.cos(theta);
          const z = radius * Math.sin(phi) * Math.sin(theta);

          return { x, y, z };
        };

        const pinColor = 0x2563EB; // blue-600 — matches hero tagline and globe accent
        const pinMaterial = new THREE.MeshBasicMaterial({ color: pinColor, transparent: true, depthWrite: false });

        function create3DPinMesh(colorMat: any) {
          const pinGroup = new THREE.Group();

          const spikeHeight = 8;        // reduced from 15 — keeps pins anchored near surface
          const spikeBaseRadius = 1.8;  // slimmer base to match shorter height

          const spikeGeometry = new THREE.CylinderGeometry(0, spikeBaseRadius, spikeHeight, 16);
          const spikeMesh = new THREE.Mesh(spikeGeometry, colorMat);

          spikeMesh.position.y = spikeHeight / 2;
          pinGroup.add(spikeMesh);

          const topSphereRadius = 2.2;  // reduced from 3.5 — proportional to shorter spike
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
        // pinObjects: used for per-frame back-hemisphere culling (see root.onUpdate)
        const pinObjects: any[] = [];

        pinsData.forEach((pin) => {
          const pinModelGroup = create3DPinMesh(pinMaterial);
          const pos = calcPos(pin.lat, pin.lon, SPHERE_RADIUS * 1.003); // sit close to globe surface
          pinModelGroup.position.set(pos.x, pos.y, pos.z);
          earth.add(pinModelGroup);

          pinModelGroup.quaternion.setFromUnitVectors(
            new THREE.Vector3(0, 1, 0),
            new THREE.Vector3().copy(pos).normalize()
          );

          // Collect connected label elements so they hide/show in sync with this pin
          const pinExtras: any[] = [];

          // --- Label above Sri Lanka pin (in earth's coordinate space) ---
          if (pin.name === 'Sri Lanka') {
            // Keep these in sync with create3DPinMesh above
            const spikeHeight = 8;
            const topSphereRadius = 2.2;

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
              color: 0x2563EB,
              transparent: true,
              opacity: 0.8,
              linewidth: 1,
              depthWrite: false,
            });
            const connectorLine = new THREE.Line(lineGeom, lineMat);
            earth.add(connectorLine);
            extraMaterials.push(lineMat);
            pinExtras.push(connectorLine);

            // Small dot at the bend / connection point on pin top
            const dotGeom = new THREE.SphereGeometry(1.5, 8, 8);
            const dotMat = new THREE.MeshBasicMaterial({
              color: 0x2563EB,
              transparent: true,
              depthWrite: false,
            });
            const dot = new THREE.Mesh(dotGeom, dotMat);
            dot.position.copy(pinTopPos);
            earth.add(dot);
            extraMaterials.push(dotMat);
            pinExtras.push(dot);

            // Label sprite
            const { sprite: labelSprite, material: labelMat } =
              createLabelSprite('UoM Student Branch');
            labelSprite.position.copy(labelPos);
            earth.add(labelSprite);
            extraMaterials.push(labelMat);
            pinExtras.push(labelSprite);
          }

          pinObjects.push({ group: pinModelGroup, extras: pinExtras });
        });

        (earth as any).pinMaterials = [pinMaterial, ...extraMaterials];
        // Expose pin objects for per-frame back-hemisphere culling
        (earth as any).pinObjects = pinObjects;

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
        // ── Offscreen mask: very gentle blur to suppress inland lake holes ──
        // CRITICAL: blur must be small enough not to wash out small islands.
        // At 2048×1024px, Sri Lanka is only ~20px wide — a 3px blur averages
        // its pixels with surrounding bright ocean and erases it entirely.
        // 1.5px blur is sufficient to close river/lake pixels (1–3px bright spots)
        // without smearing small-island interiors into the ocean brightness range.
        const maskCanvas = document.createElement('canvas');
        maskCanvas.width = canvas.width;
        maskCanvas.height = canvas.height;
        const mCtx = maskCanvas.getContext('2d')!;
        mCtx.filter = 'blur(1.5px)';
        mCtx.drawImage(earthImage, 0, 0, canvas.width, canvas.height);
        mCtx.filter = 'none';

        // ── Explicitly stamp Sri Lanka onto the mask ──
        // At 2048×1024 Sri Lanka is only ~12×23px, easily washed out by blur.
        // We paint a black polygon at its equirectangular position, enlarged ~35%
        // around its centroid so the dot sampler always covers the island fully.
        const toMapXY = (lat: number, lon: number) => ({
          x: ((lon + 180) / 360) * maskCanvas.width,
          y: ((90 - lat) / 180) * maskCanvas.height,
        });
        const slCentroid = toMapXY(7.85, 80.77);
        // Accurately plotted high-resolution Sri Lanka coastline control points (lat, lon)
        const slOutline: [number, number][] = [
          [9.83, 80.23], // Point Pedro (North tip)
          [9.50, 80.45], // Chundikkulam
          [9.27, 80.81], // Mullaitivu
          [8.85, 81.00], // Kuchchaveli
          [8.58, 81.23], // Trincomalee
          [8.23, 81.43], // Kathiraveli
          [7.91, 81.55], // Valaichchenai
          [7.72, 81.70], // Batticaloa
          [7.42, 81.83], // Kalmunai
          [7.02, 81.87], // Sangamankanda Point (East tip)
          [6.87, 81.83], // Pottuvil
          [6.37, 81.52], // Yala
          [6.12, 81.12], // Hambantota
          [5.92, 80.59], // Dondra Head (South tip)
          [6.03, 80.22], // Galle
          [6.42, 79.99], // Bentota
          [6.93, 79.84], // Colombo
          [7.21, 79.83], // Negombo
          [7.58, 79.79], // Chilaw
          [8.03, 79.70], // Kalpitiya
          [8.35, 79.80], // Wilpattu
          [8.78, 79.92], // Silavathurai
          [8.98, 79.90], // Mannar coast
          [9.30, 80.02], // Illuppaikkadavai
          [9.60, 80.03], // Pooneryn
          [9.74, 79.88], // Karainagar
          [9.81, 80.04], // Kankesanthurai
        ];
        const scaleFactor = 1.6; // 60% enlargement — gives enough internal area to render multiple dot layers
        const slPts = slOutline.map(([lat, lon]) => {
          const p = toMapXY(lat, lon);
          return {
            x: slCentroid.x + (p.x - slCentroid.x) * scaleFactor,
            y: slCentroid.y + (p.y - slCentroid.y) * scaleFactor,
          };
        });
        mCtx.fillStyle = '#000000';
        mCtx.beginPath();
        mCtx.moveTo(slPts[0].x, slPts[0].y);
        for (let k = 1; k < slPts.length; k++) mCtx.lineTo(slPts[k].x, slPts[k].y);
        mCtx.closePath();
        mCtx.fill();

        const maskData = mCtx.getImageData(0, 0, canvas.width, canvas.height);

        // ── Main canvas ──
        // Step 1: Pre-fill the ENTIRE canvas with the land colour at alpha=0.
        // This is the "pre-multiplied hue" trick: when LinearFilter blends a
        // fully-opaque dot pixel with an adjacent transparent gap pixel, it
        // computes the average of (10,37,64,255) and (10,37,64,0) which gives
        // (10,37,64,127) — the SAME hue at half opacity. Without this step the
        // gap pixels are (0,0,0,0) and the blend gives (5,18,32,127), a darker
        // and differently-toned in-between value that makes dots look lighter
        // at poles and grazing angles.
        const imageData = ctx.createImageData(canvas.width, canvas.height);
        for (let p = 0; p < imageData.data.length; p += 4) {
          imageData.data[p] = 10;  // R
          imageData.data[p + 1] = 37;  // G
          imageData.data[p + 2] = 64;  // B
          imageData.data[p + 3] = 0;   // A = fully transparent
        }
        ctx.putImageData(imageData, 0, 0);

        // Step 2: Draw fully-opaque dots over the land pixels.
        ctx.fillStyle = 'rgba(10,37,64,1)';

        const dotSize = 1.8;
        const dotSpacing = 3.0;

        for (let y = 0; y < canvas.height; y += dotSpacing) {
          for (let x = 0; x < canvas.width; x += dotSpacing) {
            const i = (Math.floor(y) * canvas.width + Math.floor(x)) * 4;
            const brightness =
              (maskData.data[i] + maskData.data[i + 1] + maskData.data[i + 2]) / 3;

            if (brightness < 180) {
              ctx.beginPath();
              ctx.arc(x, y, dotSize, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }

        const earthTexture = new THREE.Texture(canvas);
        earthTexture.generateMipmaps = false;
        // LinearFilter gives smooth dot edges at globe scale.
        // The pre-multiplied-hue pre-fill above ensures that LinearFilter
        // never blends toward a different hue, only toward different opacity
        // of the same #0A2540 colour, so all land reads as uniformly dark.
        earthTexture.minFilter = THREE.LinearFilter;
        earthTexture.magFilter = THREE.LinearFilter;
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

        const textAnimation = createTextAnimation(0x0A2540);
        textAnimation.material.opacity = 0;
        sphereGroup.add(textAnimation);

        // ── Particle halo ──────────────────────────────────────────────────
        // A second copy of the text geometry, fully scattered (progress = 1.0),
        // provides the richer two-colour particle cloud during the globe phase.
        // It uses a lighter blue-300 accent that contrasts the dark globe dots,
        // recreating the original denser / two-tone first-animation appearance.
        // It never forms into text — it fades to zero before the primary text
        // becomes readable, so the final globe state is completely unaffected.
        const particleHalo = createTextAnimation(0x93C5FD); // blue-300 accent
        particleHalo.material.opacity = 0.4;
        particleHalo.animationProgress = 1.0;          // fully scattered — stays scattered
        sphereGroup.add(particleHalo);

        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(0, 0, 1);
        root.scene.add(light);

        const backLight = new THREE.DirectionalLight(0xffffff, 0.3);
        backLight.position.set(0, 0, -1);
        root.scene.add(backLight);

        const ambientLight = new THREE.AmbientLight(0x333333);
        root.scene.add(ambientLight);

        let idleSpeed = { value: 0 };

        // Reusable vector to avoid per-frame allocation inside onUpdate
        const _pinWorldPos = new THREE.Vector3();

        root.onUpdate = () => {
          earthSphere.rotation.y -= idleSpeed.value;
          // Hide text completely from WebGL pipeline when invisible to prevent artifact strays
          textAnimation.visible = textAnimation.material.opacity > 0.01;
          // Same guard for the halo layer
          particleHalo.visible = particleHalo.material.opacity > 0.01;

          // ── Per-frame back-hemisphere culling ──────────────────────────────
          // Belt-and-suspenders on top of the depth-mask sphere: explicitly hide
          // any pin whose world-space Z is ≤ 0 (back side, away from camera at
          // z=600). getWorldPosition() accounts for all parent rotations so this
          // stays correct as the globe spins. The threshold of -2 softens the
          // hard pop exactly at the equator.
          const pinData: any[] = (earthSphere as any).pinObjects || [];
          pinData.forEach((p: any) => {
            p.group.getWorldPosition(_pinWorldPos);
            const onFront = _pinWorldPos.z > -2;
            p.group.visible = onFront;
            p.extras.forEach((extra: any) => { extra.visible = onFront; });
          });
        };

        const tl = new TimelineMax();

        const bgGlobe = document.getElementById('bg-globe');
        const bgText = document.getElementById('bg-text');
        const subText = document.getElementById('sub-text');
        const sideLabel = document.getElementById('side-label');

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

        // Simple to() — material already starts at opacity:1, so no explicit from needed.
        tl.to(fadeTargets, 3, { opacity: 0, ease: Power1.easeInOut }, 1.5);

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

        // Halo fades out as the globe transitions, in the same window as the
        // globe shrink/fade (t=1.5 → t=4.5). Its progress stays at 1.0 throughout
        // so scattered particles dissolve away without ever forming into text.
        tl.fromTo(
          particleHalo.material,
          3,
          { opacity: 0.4 },
          { opacity: 0, ease: Power1.easeInOut },
          1.5
        );

        if (bgGlobe) {
          // Shrink the CSS edge glow perfectly in sync with the 3D sphere
          tl.fromTo(bgGlobe, 3, { scale: 1, opacity: 1 }, { scale: 0.001, opacity: 0, ease: Power1.easeInOut }, 1.5);
        }
        if (bgText) {
          tl.fromTo(bgText, 3, { opacity: 0 }, { opacity: 1, ease: Power1.easeInOut }, 1.5);
        }

        if (subText) {
          tl.fromTo(subText, 2, { opacity: 0 }, { opacity: 1, ease: Power1.easeInOut }, 4.5);
        }
        if (sideLabel) {
          tl.fromTo(sideLabel, 2, { opacity: 0 }, { opacity: 1, ease: Power1.easeInOut }, 4.5);
        }

        tl.eventCallback('onReverseComplete', () => {
          earthSphere.material.opacity = 1;
          (earthSphere as any).pinMaterials.forEach((mat: any) => (mat.opacity = 1));
          textAnimation.material.opacity = 0;
          // Restore halo so it’s visible again when the globe reappears
          particleHalo.material.opacity = 0.4;
          particleHalo.visible = true;
          earthSphere.scale.set(1, 1, 1);
          if (bgGlobe) {
            bgGlobe.style.opacity = '1';
            TweenMax.set(bgGlobe, { scale: 1 });
          }
          if (bgText) bgText.style.opacity = '0';
          if (subText) subText.style.opacity = '0';
          if (sideLabel) sideLabel.style.opacity = '0';
        });

        document.body.style.cursor = 'pointer';
        let pendingReverse: ReturnType<typeof setTimeout> | null = null;

        window.addEventListener('click', () => {
          // Cancel any pending delayed reverse (prevents stale callbacks
          // from firing if the user clicks again before 300ms is up)
          if (pendingReverse !== null) {
            clearTimeout(pendingReverse);
            pendingReverse = null;
          }

          if (tl.reversed()) {
            // Reverse is complete or in progress — play forward from current position
            tl.reversed(false);
            TweenMax.to(idleSpeed, 1.5, { value: 0, ease: Power1.easeOut });

            // Restore visibility of inner children so the timeline parent tween can reveal them properly
            if (subText) {
              TweenMax.to(subText.querySelectorAll('p'), 0.3, { opacity: 1, ease: Power1.easeOut });
            }
            if (sideLabel) {
              TweenMax.to(sideLabel.children, 0.3, { opacity: 1, ease: Power1.easeOut });
            }
          } else {
            // Immediately fade out subText children instead of the parent container
            // This prevents GSAP from permanently killing the main timeline's tween!
            if (subText) {
              TweenMax.to(subText.querySelectorAll('p'), 0.3, { opacity: 0, ease: Power1.easeOut });
            }
            if (sideLabel) {
              TweenMax.to(sideLabel.children, 0.3, { opacity: 0, ease: Power1.easeOut });
            }
            // Short delay to let subText flex, then reverse from CURRENT position
            // (no tl.time() call — GSAP reverses from wherever the playhead is)
            pendingReverse = setTimeout(() => {
              pendingReverse = null;
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

        /* ── Soft Glow for WebGL Globe Outline ── */
        #three-container canvas {
          filter: none !important;
        }

        /* ── Static typography overrides (animations untouched) ── */
        .hero-tagline-1 {
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          font-weight: 800;
          font-size: 13px;
          letter-spacing: 0.2em;
          color: #2563EB;
          margin-bottom: 0.5rem;
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
          font-weight: 300;
          font-size: 18px;
          letter-spacing: 0.05em;
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

      {/* --- BACKGROUND HEXAGON GRID --- */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Full screen hexagon composition */}
        <svg viewBox="0 0 1920 1080" className="absolute inset-0 w-full h-full opacity-80 md:opacity-100" preserveAspectRatio="xMidYMid slice" fill="none">
          <defs>
            <polygon id="hex" points="0,-80 69.28,-40 69.28,40 0,80 -69.28,40 -69.28,-40" />
          </defs>
          <g>
            <use href="#hex" x="0.0" y="0.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
            <use href="#hex" x="138.6" y="0.0" fill="none" stroke="rgba(59,130,246,0.25)" strokeWidth="1.5" />
            <use href="#hex" transform="translate(277.1, 0.0) scale(0.6)" fill="rgba(37,99,235,0.06)" stroke="none" />
            <use href="#hex" transform="translate(415.7, 0.0) scale(0.6)" fill="rgba(37,99,235,0.06)" stroke="none" />
            <use href="#hex" x="554.2" y="0.0" fill="rgba(37,99,235,0.03)" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex" x="692.8" y="0.0" fill="rgba(37,99,235,0.03)" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex" x="831.4" y="0.0" fill="rgba(37,99,235,0.03)" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex" x="969.9" y="0.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
            <use href="#hex" x="1247.0" y="0.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
            <use href="#hex" x="1385.6" y="0.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
            <use href="#hex" x="1524.2" y="0.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
            <use href="#hex" x="1662.7" y="0.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
            <use href="#hex" x="1801.3" y="0.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
            <use href="#hex" x="1939.8" y="0.0" fill="none" stroke="rgba(59,130,246,0.25)" strokeWidth="1.5" />
            <use href="#hex" x="-69.3" y="120.0" fill="rgba(37,99,235,0.03)" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex" x="69.3" y="120.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
            <use href="#hex" x="207.8" y="120.0" fill="rgba(37,99,235,0.03)" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex" x="346.4" y="120.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
            <use href="#hex" x="485.0" y="120.0" fill="rgba(37,99,235,0.03)" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex" x="762.1" y="120.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
            <use href="#hex" transform="translate(900.6, 120.0) scale(0.6)" fill="rgba(37,99,235,0.06)" stroke="none" />
            <use href="#hex" x="1177.8" y="120.0" fill="rgba(37,99,235,0.03)" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex" x="1316.3" y="120.0" fill="none" stroke="rgba(59,130,246,0.25)" strokeWidth="1.5" />
            <use href="#hex" x="1454.9" y="120.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
            <use href="#hex" x="1593.4" y="120.0" fill="rgba(37,99,235,0.03)" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex" x="1732.0" y="120.0" fill="none" stroke="rgba(59,130,246,0.25)" strokeWidth="1.5" />
            <use href="#hex" x="1870.6" y="120.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
            <use href="#hex" x="0.0" y="240.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
            <use href="#hex" x="138.6" y="240.0" fill="rgba(37,99,235,0.03)" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex" transform="translate(277.1, 240.0) scale(0.6)" fill="rgba(37,99,235,0.06)" stroke="none" />
            <use href="#hex" x="415.7" y="240.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
            <use href="#hex" x="1524.2" y="240.0" fill="none" stroke="rgba(59,130,246,0.25)" strokeWidth="1.5" />
            <use href="#hex" x="1662.7" y="240.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
            <use href="#hex" x="1801.3" y="240.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
            <use href="#hex" x="1939.8" y="240.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
            <use href="#hex" x="346.4" y="360.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
            <use href="#hex" x="485.0" y="360.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
            <use href="#hex" x="1593.4" y="360.0" fill="rgba(37,99,235,0.03)" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex" transform="translate(1732.0, 360.0) scale(0.6)" fill="rgba(37,99,235,0.06)" stroke="none" />
            <use href="#hex" transform="translate(1870.6, 360.0) scale(0.6)" fill="rgba(37,99,235,0.06)" stroke="none" />
            <use href="#hex" x="415.7" y="480.0" fill="rgba(37,99,235,0.03)" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex" x="1524.2" y="480.0" fill="rgba(37,99,235,0.03)" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex" transform="translate(1662.7, 480.0) scale(0.6)" fill="rgba(37,99,235,0.06)" stroke="none" />
            <use href="#hex" x="1801.3" y="480.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
            <use href="#hex" x="1939.8" y="480.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
            <use href="#hex" x="346.4" y="600.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
            <use href="#hex" transform="translate(1454.9, 600.0) scale(0.6)" fill="rgba(37,99,235,0.06)" stroke="none" />
            <use href="#hex" transform="translate(1593.4, 600.0) scale(0.6)" fill="rgba(37,99,235,0.06)" stroke="none" />
            <use href="#hex" x="1732.0" y="600.0" fill="rgba(37,99,235,0.03)" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex" x="1870.6" y="600.0" fill="rgba(37,99,235,0.03)" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex" x="1662.7" y="720.0" fill="rgba(37,99,235,0.03)" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex" transform="translate(1801.3, 720.0) scale(0.6)" fill="rgba(37,99,235,0.06)" stroke="none" />
            <use href="#hex" x="1939.8" y="720.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
            <use href="#hex" x="-69.3" y="840.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
            <use href="#hex" x="69.3" y="840.0" fill="rgba(37,99,235,0.03)" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex" x="207.8" y="840.0" fill="rgba(37,99,235,0.03)" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex" x="346.4" y="840.0" fill="none" stroke="rgba(59,130,246,0.25)" strokeWidth="1.5" />
            <use href="#hex" x="485.0" y="840.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
            <use href="#hex" x="1593.4" y="840.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
            <use href="#hex" x="1732.0" y="840.0" fill="rgba(37,99,235,0.03)" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex" x="1870.6" y="840.0" fill="rgba(37,99,235,0.03)" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex" x="0.0" y="960.0" fill="rgba(37,99,235,0.03)" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex" x="138.6" y="960.0" fill="rgba(37,99,235,0.03)" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex" transform="translate(277.1, 960.0) scale(0.6)" fill="rgba(37,99,235,0.06)" stroke="none" />
            <use href="#hex" x="415.7" y="960.0" fill="none" stroke="rgba(59,130,246,0.25)" strokeWidth="1.5" />
            <use href="#hex" x="1247.0" y="960.0" fill="rgba(37,99,235,0.03)" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex" x="1385.6" y="960.0" fill="rgba(37,99,235,0.03)" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex" transform="translate(1524.2, 960.0) scale(0.6)" fill="rgba(37,99,235,0.06)" stroke="none" />
            <use href="#hex" x="1662.7" y="960.0" fill="none" stroke="rgba(59,130,246,0.25)" strokeWidth="1.5" />
            <use href="#hex" x="1801.3" y="960.0" fill="none" stroke="rgba(59,130,246,0.25)" strokeWidth="1.5" />
            <use href="#hex" x="1939.8" y="960.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
            <use href="#hex" x="-69.3" y="1080.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
            <use href="#hex" x="69.3" y="1080.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
            <use href="#hex" transform="translate(207.8, 1080.0) scale(0.6)" fill="rgba(37,99,235,0.06)" stroke="none" />
            <use href="#hex" x="346.4" y="1080.0" fill="rgba(37,99,235,0.03)" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex" x="485.0" y="1080.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
            <use href="#hex" x="623.5" y="1080.0" fill="none" stroke="rgba(59,130,246,0.25)" strokeWidth="1.5" />
            <use href="#hex" x="762.1" y="1080.0" fill="rgba(37,99,235,0.03)" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex" x="900.6" y="1080.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
            <use href="#hex" transform="translate(1039.2, 1080.0) scale(0.6)" fill="rgba(37,99,235,0.06)" stroke="none" />
            <use href="#hex" x="1177.8" y="1080.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
            <use href="#hex" x="1316.3" y="1080.0" fill="none" stroke="rgba(59,130,246,0.25)" strokeWidth="1.5" />
            <use href="#hex" x="1454.9" y="1080.0" fill="rgba(37,99,235,0.03)" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex" x="1593.4" y="1080.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
            <use href="#hex" x="1732.0" y="1080.0" fill="rgba(37,99,235,0.03)" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex" x="1870.6" y="1080.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
            <use href="#hex" x="0.0" y="1200.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
            <use href="#hex" x="138.6" y="1200.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
            <use href="#hex" x="277.1" y="1200.0" fill="rgba(37,99,235,0.03)" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex" x="415.7" y="1200.0" fill="rgba(37,99,235,0.03)" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex" x="554.2" y="1200.0" fill="rgba(37,99,235,0.03)" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex" transform="translate(692.8, 1200.0) scale(0.6)" fill="rgba(37,99,235,0.06)" stroke="none" />
            <use href="#hex" transform="translate(831.4, 1200.0) scale(0.6)" fill="rgba(37,99,235,0.06)" stroke="none" />
            <use href="#hex" transform="translate(969.9, 1200.0) scale(0.6)" fill="rgba(37,99,235,0.06)" stroke="none" />
            <use href="#hex" transform="translate(1108.5, 1200.0) scale(0.6)" fill="rgba(37,99,235,0.06)" stroke="none" />
            <use href="#hex" x="1247.0" y="1200.0" fill="rgba(37,99,235,0.03)" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex" x="1385.6" y="1200.0" fill="rgba(37,99,235,0.03)" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex" x="1524.2" y="1200.0" fill="rgba(37,99,235,0.03)" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex" x="1662.7" y="1200.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
            <use href="#hex" x="1801.3" y="1200.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
            <use href="#hex" x="1939.8" y="1200.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
          </g>
        </svg>
      </div>

      {/* --- GLOBE EDGE GLOW --- */}
      <div
        id="bg-globe"
        className="absolute inset-0 m-auto rounded-full pointer-events-none"
        style={{
          width: '75.6vh', // Mathematical screen projection of r=240 from exactly 600 z-units in fov 60
          height: '75.6vh',
          zIndex: 5,
          border: '1px solid rgba(0, 82, 255, 0.12)',
          boxShadow: '0 0 20px rgba(0, 82, 255, 0.08), 0 0 40px rgba(0, 82, 255, 0.04)'
        }}
      />

      {/* 3D Animation Container */}
      <div id="three-container" ref={containerRef} className="relative w-full h-full z-10" />

      {/* --- TEXT CONTAINER --- */}
      <div
        id="sub-text"
        className="absolute top-[67%] left-1/2 -translate-x-1/2 text-center z-20 w-full opacity-0 pointer-events-none"
      >
        <p className="hero-tagline-1 mt-6">
          INSPIRED BY PASSION
        </p>
        <p className="hero-tagline-2">
          TO TRANSFORM BEYOND EXCELLENCE.
        </p>
      </div>

      {/* --- LEFT VERTICAL LABEL --- */}
      <div id="side-label" className="absolute left-[5px] md:left-[10px] top-1/2 -translate-y-1/2 z-40 flex flex-col items-center opacity-0 pointer-events-none">
        <div className="w-[1px] h-24 md:h-36 bg-gradient-to-b from-transparent to-[#0A2540]/60 mb-6" />
        <p
          className="text-[#0A2540] text-[13px] uppercase font-bold tracking-[0.4em]"
          style={{
            fontFamily: "'Inter', sans-serif",
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)'
          }}
        >
          Since 2008
        </p>
        <div className="w-[1px] h-24 md:h-36 bg-gradient-to-t from-transparent to-[#0A2540]/60 mt-6" />
      </div>

      {/* Global Vignette Removed - It was artificially casting a white semi-transparent fade over the outer continents causing shade inconsistency */}
    </div>
  );
}