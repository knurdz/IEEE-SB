/* eslint-disable */
'use client';

import { useEffect, useRef, useState } from 'react';

export default function TextSphereAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const hitAreaRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const earthImage = new Image();
    earthImage.src = '/earth_specular_2048.jpg';

    const loadScript = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
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
        await loadScript('/lib/three.min.js');
        await loadScript('/lib/FontUtils.js');
        await loadScript('/lib/TextGeometry.js');

        await Promise.all([
          loadScript('/lib/pnltri.min.js'),
          loadScript('/lib/droid_sans_bold.typeface.js'),
          loadScript('/lib/TweenMax.min.js'),
        ]);

        await loadScript('/lib/bas.js');

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
      const Power3 = (window as any).Power3;
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

        const width = container ? container.clientWidth : window.innerWidth;
        const height = container ? container.clientHeight : window.innerHeight;

        this.camera = new THREE.PerspectiveCamera(
          params.fov,
          width / height,
          params.zNear,
          params.zFar
        );

        this.scene = new THREE.Scene();
        this.onUpdate = null;

        this.resize = () => {
          const w = container ? container.clientWidth : window.innerWidth;
          const h = container ? container.clientHeight : window.innerHeight;
          this.camera.aspect = w / h;
          this.camera.updateProjectionMatrix();
          this.renderer.setSize(w, h);
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

      function TextAnimation(this: any, textGeometry: any, color1: number, color2: number) {
        const bufferGeometry = new THREE.BAS.ModelBufferGeometry(textGeometry);
        const aAnimation = bufferGeometry.createAttribute('aAnimation', 2);
        const aEndPosition = bufferGeometry.createAttribute('aEndPosition', 3);
        const aAxisAngle = bufferGeometry.createAttribute('aAxisAngle', 4);

        // Add color attribute to support two types of particles
        const aColor = bufferGeometry.createAttribute('color', 3);

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

        const c1 = new THREE.Color(color1);
        const c2 = new THREE.Color(color2);

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

          // Randomly pick between the two particle colors
          const pColor = Math.random() > 0.5 ? c1 : c2;
          for (let v = 0; v < 9; v += 3) {
            aColor.array[i3 + v] = pColor.r;
            aColor.array[i3 + v + 1] = pColor.g;
            aColor.array[i3 + v + 2] = pColor.b;
          }
        }

        const material = new THREE.BAS.BasicAnimationMaterial(
          {
            side: THREE.DoubleSide,
            transparent: true,
            depthWrite: false,
            vertexColors: THREE.VertexColors !== undefined ? THREE.VertexColors : true,
            uniforms: {
              uTime: { type: 'f', value: 0 },
              uBaseColor: { type: 'c', value: new THREE.Color(0x0A2540) },
            },
            shaderFunctions: [
              THREE.BAS.ShaderChunk['cubic_bezier'],
              THREE.BAS.ShaderChunk['ease_out_cubic'],
              THREE.BAS.ShaderChunk['quaternion_rotation'],
            ],
            shaderParameters: [
              'uniform float uTime;',
              'uniform vec3 uBaseColor;',
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
              '#ifdef USE_COLOR',
              '  vColor = mix(uBaseColor, color, clamp(tProgress * 15.0, 0.0, 1.0));',
              '#endif'
            ],
          },
          { diffuse: 0xffffff }
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

      function createTextAnimation(color1: number, color2: number) {
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

        ieeeGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 100, 0));

        const branchGeometry = generateTextGeometry('STUDENT BRANCH', {
          size: 30,
          height: 0.1,
          curveSegments: 24,
          bevelSize: 0,
          bevelThickness: 0,
          bevelEnabled: false,
          anchor: { x: 0.5, y: 0.5, z: 0.0 },
        });

        branchGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, -15, 0));

        const uniGeometry = generateTextGeometry('UNIVERSITY OF MORATUWA', {
          size: 30,
          height: 0.1,
          curveSegments: 24,
          bevelSize: 0,
          bevelThickness: 0,
          bevelEnabled: false,
          anchor: { x: 0.5, y: 0.5, z: 0.0 },
        });

        uniGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, -75, 0));

        ieeeGeometry.merge(branchGeometry);
        ieeeGeometry.merge(uniGeometry);
        ieeeGeometry.computeBoundingBox();

        THREE.BAS.Utils.tessellateRepeat(ieeeGeometry, 1.0, 2);
        THREE.BAS.Utils.separateFaces(ieeeGeometry);

        return new (TextAnimation as any)(ieeeGeometry, color1, color2);
      }

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
          depthWrite: false,
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
          alphaTest: 0.05,
          transparent: true,
          side: THREE.FrontSide,
          opacity: 1,
          color: 0xffffff,
        });
        const earth = new THREE.Mesh(geometry, material);

        earth.scale.set(1, 1, 1);
        earth.visible = true;
        earth.renderOrder = -1;

        const depthMaskGeo = new THREE.SphereGeometry(SPHERE_RADIUS * 0.98, 64, 64);
        const depthMaskMat = new THREE.MeshBasicMaterial({
          colorWrite: false,
          depthWrite: true,
          side: THREE.FrontSide,
        });
        const depthMaskSphere = new THREE.Mesh(depthMaskGeo, depthMaskMat);
        earth.add(depthMaskSphere);

        const calcPos = (lat: number, lon: number, radius: number) => {
          const phi = (lon + 180) * (Math.PI / 180);
          const theta = (90 - lat) * (Math.PI / 180);

          const x = -radius * Math.cos(phi) * Math.sin(theta);
          const y = radius * Math.cos(theta);
          const z = radius * Math.sin(phi) * Math.sin(theta);

          return { x, y, z };
        };

        const pinColor = 0x0A2540;
        const pinMaterial = new THREE.MeshBasicMaterial({ color: pinColor, transparent: true, depthWrite: false });

        function create3DPinMesh(colorMat: any) {
          const pinGroup = new THREE.Group();

          const spikeHeight = 8;
          const spikeBaseRadius = 1.8;

          const spikeGeometry = new THREE.CylinderGeometry(0, spikeBaseRadius, spikeHeight, 16);
          const spikeMesh = new THREE.Mesh(spikeGeometry, colorMat);

          spikeMesh.position.y = spikeHeight / 2;
          pinGroup.add(spikeMesh);

          const topSphereRadius = 2.2;
          const topSphereGeometry = new THREE.SphereGeometry(topSphereRadius, 16, 16);
          const topSphereMesh = new THREE.Mesh(topSphereGeometry, colorMat);

          topSphereMesh.position.y = spikeHeight;
          pinGroup.add(topSphereMesh);

          return pinGroup;
        }

        const pinsData = [
          { name: 'Region 1', lat: 42.3601, lon: -71.0589 }, // Boston, USA
          { name: 'Region 2', lat: 41.2033, lon: -77.1945 }, // Pennsylvania, USA
          { name: 'Region 3', lat: 33.7490, lon: -84.3880 }, // Atlanta, USA
          { name: 'Region 4', lat: 41.8781, lon: -87.6298 }, // Chicago, USA
          { name: 'Region 5', lat: 31.9686, lon: -99.9018 }, // Texas, USA
          { name: 'Region 6', lat: 37.7749, lon: -122.4194 }, // San Francisco, USA
          { name: 'Region 7', lat: 43.6532, lon: -79.3832 }, // Toronto, Canada
          { name: 'Region 8', lat: 52.5200, lon: 13.4050 }, // Berlin, Germany
          { name: 'Region 9', lat: -23.5505, lon: -46.6333 }, // São Paulo, Brazil
          { name: 'Region 10', lat: 6.7951, lon: 79.9009 }, // Sri Lanka, University of Moratuwa
        ];

        const extraMaterials: any[] = [];
        const pinObjects: any[] = [];

        pinsData.forEach((pin) => {
          const pinModelGroup = create3DPinMesh(pinMaterial);
          const pos = calcPos(pin.lat, pin.lon, SPHERE_RADIUS * 1.003);
          pinModelGroup.position.set(pos.x, pos.y, pos.z);
          earth.add(pinModelGroup);

          pinModelGroup.quaternion.setFromUnitVectors(
            new THREE.Vector3(0, 1, 0),
            new THREE.Vector3().copy(pos).normalize()
          );

          const pinExtras: any[] = [];

          if (pin.name === 'Region 10') {
            const spikeHeight = 8;
            const topSphereRadius = 2.2;

            const normal = new THREE.Vector3(pos.x, pos.y, pos.z).normalize();
            const pinTopPos = new THREE.Vector3(
              pos.x + normal.x * (spikeHeight + topSphereRadius),
              pos.y + normal.y * (spikeHeight + topSphereRadius),
              pos.z + normal.z * (spikeHeight + topSphereRadius)
            );

            const radialOffset = 25;
            const worldYOffset = 40;

            const labelPos = new THREE.Vector3(
              pinTopPos.x + normal.x * radialOffset,
              pinTopPos.y + normal.y * radialOffset + worldYOffset,
              pinTopPos.z + normal.z * radialOffset
            );

            const lineGeom = new THREE.Geometry();
            lineGeom.vertices.push(pinTopPos.clone());
            lineGeom.vertices.push(labelPos.clone());
            const lineMat = new THREE.LineBasicMaterial({
              color: 0x0A2540,
              transparent: true,
              opacity: 0.8,
              linewidth: 1,
              depthWrite: false,
            });
            const connectorLine = new THREE.Line(lineGeom, lineMat);
            earth.add(connectorLine);
            extraMaterials.push(lineMat);
            pinExtras.push(connectorLine);

            const dotGeom = new THREE.SphereGeometry(1.5, 8, 8);
            const dotMat = new THREE.MeshBasicMaterial({
              color: 0x0A2540,
              transparent: true,
              depthWrite: false,
            });
            const dot = new THREE.Mesh(dotGeom, dotMat);
            dot.position.copy(pinTopPos);
            earth.add(dot);
            extraMaterials.push(dotMat);
            pinExtras.push(dot);

            const { sprite: labelSprite, material: labelMat } =
              createLabelSprite('University of Moratuwa');
            labelSprite.position.copy(labelPos);
            earth.add(labelSprite);
            extraMaterials.push(labelMat);
            pinExtras.push(labelSprite);
          }

          pinObjects.push({ group: pinModelGroup, extras: pinExtras });
        });

        (earth as any).pinMaterials = [pinMaterial, ...extraMaterials];
        (earth as any).pinObjects = pinObjects;

        return earth;
      }

      const canvas = document.createElement('canvas');
      canvas.width = 2048;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d')!;

      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const processEarthTexture = () => {
        const maskCanvas = document.createElement('canvas');
        maskCanvas.width = canvas.width;
        maskCanvas.height = canvas.height;
        const mCtx = maskCanvas.getContext('2d')!;
        mCtx.filter = 'blur(0.09375rem)';
        mCtx.drawImage(earthImage, 0, 0, canvas.width, canvas.height);
        mCtx.filter = 'none';

        const toMapXY = (lat: number, lon: number) => ({
          x: ((lon + 180) / 360) * maskCanvas.width,
          y: ((90 - lat) / 180) * maskCanvas.height,
        });
        const slCentroid = toMapXY(7.87, 80.77);
        const slOutline: [number, number][] = [
          [7.09195, 81.87599], [7.04076, 81.88868], [6.98017, 81.88461], [6.82144, 81.83855], [6.76537, 81.83155], [6.70795, 81.80828], [6.6636, 81.7798], [6.61042, 81.77564], [6.46214, 81.68149], [6.38988, 81.59205], [6.22541, 81.36207], [6.16275, 81.20444], [6.14289, 81.15602], [6.09805, 81.00847], [6.0808, 80.95802], [6.07079, 80.90268], [6.03986, 80.86231], [6.0351, 80.80909], [5.97842, 80.73211], [5.96031, 80.67343], [5.92691, 80.60483], [5.94221, 80.54656], [5.93745, 80.4817], [5.97089, 80.44402], [5.96381, 80.38502], [5.98282, 80.33123], [6.003, 80.27752], [6.02656, 80.22584], [6.12714, 80.10377], [6.26634, 80.03199], [6.36131, 80.01206], [6.44103, 79.98211], [6.53116, 79.97022], [6.58857, 79.94874], [6.8072, 79.86305], [6.88272, 79.84946], [6.96214, 79.84816], [7.01166, 79.86158], [7.18073, 79.81373], [7.13101, 79.84343], [7.18081, 79.85939], [7.22574, 79.8318], [7.58979, 79.78468], [7.64008, 79.79957], [7.69733, 79.78736], [7.85546, 79.76295], [7.94473, 79.73829], [8.09829, 79.69679], [8.20116, 79.70191], [8.2497, 79.72877], [8.30386, 79.74903], [8.35004, 79.77858], [8.28116, 79.74448], [8.23282, 79.76889], [8.17186, 79.74537], [8.11091, 79.72755], [8.06049, 79.747], [7.99014, 79.76385], [8.00308, 79.83383], [8.05565, 79.80641], [8.13654, 79.82716], [8.20409, 79.81381], [8.26667, 79.82447], [8.34052, 79.83863], [8.43818, 79.84816], [8.51765, 79.86801], [8.56208, 79.90349], [8.61152, 79.92807], [8.73981, 79.95053], [8.80191, 79.92644], [8.88349, 79.93019], [8.93854, 79.91554], [9.00056, 80.00514], [9.0506, 80.0547], [9.11042, 80.0735], [9.19286, 80.10564], [9.29194, 80.11598], [9.33259, 80.06617], [9.39155, 80.05299], [9.42276, 80.11166], [9.45922, 80.16285], [9.52057, 80.16131], [9.57803, 80.06788], [9.54857, 80.17596], [9.53425, 80.23341], [9.49331, 80.27809], [9.46467, 80.33627], [9.50019, 80.42661], [9.4833, 80.50424], [9.45523, 80.56715], [9.50316, 80.52329], [9.52806, 80.47145], [9.52749, 80.4157], [9.59125, 80.29754], [9.63789, 80.2046], [9.58641, 80.19361], [9.63573, 80.11549], [9.64484, 80.03932], [9.68268, 79.9782], [9.72736, 79.93702], [9.77904, 79.93133], [9.81513, 79.97071], [9.81611, 80.06666], [9.81892, 80.12233], [9.77338, 80.14698], [9.75873, 80.19964], [9.72427, 80.25034], [9.62922, 80.33855], [9.57689, 80.44174], [9.67276, 80.31983], [9.75507, 80.24781], [9.78799, 80.15382], [9.82754, 80.18539], [9.82587, 80.24675], [9.76984, 80.27898], [9.6175, 80.40992], [9.58137, 80.46827], [9.35969, 80.74439], [9.31241, 80.78517], [9.25056, 80.79363], [9.2204, 80.84417], [9.14517, 80.88217], [9.09667, 80.90162], [9.03343, 80.93531], [9.04149, 80.87534], [8.99226, 80.92286], [8.93163, 80.93067], [8.96357, 80.97169], [8.93671, 81.01466], [8.88215, 81.04672], [8.85163, 81.09278], [8.79999, 81.11427], [8.75117, 81.16245], [8.69888, 81.17652], [8.666, 81.22242], [8.61009, 81.20436], [8.57014, 81.24659], [8.52253, 81.21803], [8.53457, 81.15903], [8.48749, 81.19752], [8.46703, 81.2811], [8.51215, 81.31267], [8.48216, 81.36573], [8.39061, 81.38844], [8.33926, 81.39926], [8.27448, 81.41326], [8.17353, 81.4406], [8.10313, 81.43035], [8.1918, 81.40358], [8.14256, 81.39479], [8.09317, 81.43556], [8.06537, 81.48064], [7.99934, 81.51971], [7.96442, 81.56048], [7.91743, 81.59547], [7.85529, 81.58758], [7.83552, 81.6364], [7.753, 81.69679], [7.75414, 81.64324], [7.72626, 81.59547], [7.7287, 81.6482], [7.68049, 81.69028], [7.63199, 81.7068], [7.61457, 81.75457], [7.56798, 81.77296], [7.51703, 81.76905], [7.46463, 81.76905], [7.4252, 81.80104], [7.47337, 81.8187], [7.41218, 81.85572], [7.32709, 81.88071], [7.09195, 81.87599]
        ];
        const scaleFactor = 1.0;
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

        const imageData = ctx.createImageData(canvas.width, canvas.height);
        for (let p = 0; p < imageData.data.length; p += 4) {
          imageData.data[p] = 143;
          imageData.data[p + 1] = 244;
          imageData.data[p + 2] = 247;
          imageData.data[p + 3] = 0;
        }
        ctx.putImageData(imageData, 0, 0);

        ctx.fillStyle = '#227aa6ff';

        const hexRadius = 2.8;
        const hexWidth = hexRadius * Math.sqrt(3);
        const rowHeight = hexRadius * 1.5;

        for (let row = 0; row < canvas.height / rowHeight; row++) {
          const y = row * rowHeight;
          const xOffset = (row % 2) * (hexWidth / 2);
          for (let col = 0; col < canvas.width / hexWidth + 1; col++) {
            const x = col * hexWidth + xOffset;

            const px = Math.floor(x);
            const py = Math.floor(y);
            if (px < 0 || px >= canvas.width || py < 0 || py >= canvas.height) continue;

            const i = (py * canvas.width + px) * 4;
            const brightness = (maskData.data[i] + maskData.data[i + 1] + maskData.data[i + 2]) / 3;

            if (brightness < 150) {
              ctx.beginPath();
              for (let j = 0; j < 6; j++) {
                const angle = (Math.PI / 3) * j + (Math.PI / 6);
                const hx = x + (hexRadius * 0.90) * Math.cos(angle);
                const hy = y + (hexRadius * 0.90) * Math.sin(angle);
                if (j === 0) ctx.moveTo(hx, hy);
                else ctx.lineTo(hx, hy);
              }
              ctx.closePath();
              ctx.fill();
            }
          }
        }

        const earthTexture = new THREE.Texture(canvas);
        earthTexture.generateMipmaps = true;
        earthTexture.minFilter = THREE.LinearMipmapLinearFilter;
        earthTexture.magFilter = THREE.LinearFilter;
        earthTexture.anisotropy = 16;
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

        // Two rich particle colors for the transition
        const textAnimation = createTextAnimation(0x0a2540, 0x257ca7);
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
        const clock = new THREE.Clock();

        const _pinWorldPos = new THREE.Vector3();

        root.onUpdate = () => {
          const delta = clock.getDelta();
          const timeScale = Math.min(delta * 60, 3.0);

          earthSphere.rotation.y += idleSpeed.value * timeScale;

          // Responsive scale for sphereGroup
          const container = document.getElementById('three-container');
          const width = container ? container.clientWidth : window.innerWidth;
          const height = container ? container.clientHeight : window.innerHeight;
          const K = Math.min(0.756, (width * 0.75) / height);
          const targetScale = 2.5 * (K / Math.sqrt(3 + K * K));
          sphereGroup.scale.set(targetScale, targetScale, targetScale);

          textAnimation.visible = textAnimation.material.opacity > 0.01;

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
        const sideLabelGlobe = document.getElementById('side-label-globe');

        tl.fromTo(
          sphereGroup.rotation,
          8,
          { y: Math.PI * 3 },
          { y: 0, ease: Power3.easeInOut },
          0
        );

        tl.fromTo(
          earthSphere.scale,
          5,
          { x: 1, y: 1, z: 1 },
          { x: 0.001, y: 0.001, z: 0.001, ease: Power3.easeInOut },
          1.5
        );

        const fadeTargets = [earthSphere.material, ...(earthSphere as any).pinMaterials];

        tl.to(fadeTargets, 5, { opacity: 0, ease: Power3.easeInOut }, 1.5);

        tl.fromTo(
          textAnimation.material,
          5,
          { opacity: 0 },
          { opacity: 1, ease: Power3.easeInOut },
          1.5
        );

        tl.fromTo(
          textAnimation,
          6,
          { animationProgress: 0.6 },
          { animationProgress: 0.0, ease: Power3.easeInOut },
          1.5
        );

        if (bgGlobe) {
          tl.fromTo(bgGlobe, 5, { scale: 1, opacity: 1 }, { scale: 0.001, opacity: 0, ease: Power3.easeInOut }, 1.5);
        }
        if (bgText) {
          tl.fromTo(bgText, 5, { opacity: 0 }, { opacity: 1, ease: Power3.easeInOut }, 1.5);
        }

        if (subText) {
          tl.fromTo(subText, 3, { opacity: 0 }, { opacity: 1, ease: Power3.easeInOut }, 5.0);
        }
        if (sideLabel) {
          tl.fromTo(sideLabel, 3, { opacity: 0 }, { opacity: 1, ease: Power3.easeInOut }, 5.0);
        }
        if (sideLabelGlobe) {
          tl.fromTo(sideLabelGlobe, 5, { opacity: 1 }, { opacity: 0, ease: Power3.easeInOut }, 1.5);
        }

        tl.eventCallback('onReverseComplete', () => {
          earthSphere.material.opacity = 1;
          (earthSphere as any).pinMaterials.forEach((mat: any) => (mat.opacity = 1));
          textAnimation.material.opacity = 0;
          earthSphere.scale.set(1, 1, 1);
          if (bgGlobe) {
            bgGlobe.style.opacity = '1';
            TweenMax.set(bgGlobe, { scale: 1 });
          }
          if (bgText) bgText.style.opacity = '0';
          if (subText) subText.style.opacity = '0';
          if (sideLabel) sideLabel.style.opacity = '0';
          if (sideLabelGlobe) sideLabelGlobe.style.opacity = '1';
        });

        if (hitAreaRef.current) {
          hitAreaRef.current.addEventListener('click', () => {
            if (tl.reversed()) {
              tl.reversed(false);
              TweenMax.to(idleSpeed, 2.5, { value: 0, ease: Power3.easeOut });
              if (subText) {
                TweenMax.to(subText.querySelectorAll('p'), 0.3, { opacity: 1, ease: Power3.easeOut });
              }
              if (sideLabel) {
                TweenMax.to(sideLabel.children, 0.3, { opacity: 1, ease: Power3.easeOut });
              }
            } else {
              if (subText) {
                TweenMax.to(subText.querySelectorAll('p'), 0.3, { opacity: 0, ease: Power3.easeOut });
              }
              if (sideLabel) {
                TweenMax.to(sideLabel.children, 0.3, { opacity: 0, ease: Power3.easeOut });
              }
              tl.reversed(true);
              if (tl.time() > 6.5) {
                tl.time(6.5);
              }
              const durationLeft = Math.max(tl.time(), 0.5);
              TweenMax.to(idleSpeed, durationLeft, { value: 0.003, ease: Power3.easeInOut });
            }
          });
        }
      }
    };

    loadAllScripts();
  }, []);

  return (
    <div className="relative w-full h-[65vh] md:h-screen bg-white overflow-hidden">
      {/* Loading Indicator */}
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white">
          <div className="text-center">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 border-4 border-blue-700/20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-transparent border-t-blue-700 rounded-full animate-spin"></div>
            </div>
            <p className="text-blue-700/80 text-sm font-jetbrains tracking-[0.3em] animate-pulse">
              LOADING
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
          font-family: var(--font-inter), system-ui, -apple-system, sans-serif;
          font-weight: 600;
          font-size: 0.6875rem;
          letter-spacing: 0.25em;
          color: #008be6;
          margin-top: 3rem;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          text-shadow: 0 0.25rem 0.75rem rgba(0, 139, 230, 0.15);
        }

        .hero-tagline-2 {
          font-family: var(--font-inter), system-ui, -apple-system, sans-serif;
          font-weight: 700;
          font-size: 1.25rem;
          line-height: 1.2;
          letter-spacing: -0.02em;
          background: linear-gradient(90deg, #00579d 0%, #008be6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 0.25rem 0.75rem rgba(23, 53, 153, 0.1);
        }

        @media (min-width: 48rem) {
           .hero-tagline-1 {
              font-size: 0.8125rem;
           }
           .hero-tagline-2 {
              font-size: 1.5rem;
           }
        }
      `}</style>

      {/* --- BACKGROUND HEXAGON GRID --- */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <svg viewBox="0 0 1920 1080" className="absolute inset-0 w-full h-full opacity-80 md:opacity-100" preserveAspectRatio="xMidYMid slice" fill="none">
          <defs>
            <polygon id="hex" points="0,-80 69.28,-40 69.28,40 0,80 -69.28,40 -69.28,-40" />
            <linearGradient id="beamGradientLeft" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(120,190,255,0)" />
              <stop offset="35%" stopColor="rgba(120,190,255,0)" />
              <stop offset="50%" stopColor="rgba(120,190,255,0.38)" />
              <stop offset="65%" stopColor="rgba(120,190,255,0)" />
              <stop offset="100%" stopColor="rgba(120,190,255,0)" />
            </linearGradient>
            <linearGradient id="beamGradientRight" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(140,200,255,0)" />
              <stop offset="35%" stopColor="rgba(140,200,255,0)" />
              <stop offset="50%" stopColor="rgba(140,200,255,0.38)" />
              <stop offset="65%" stopColor="rgba(140,200,255,0)" />
              <stop offset="100%" stopColor="rgba(140,200,255,0)" />
            </linearGradient>
            <g id="hexBlock">
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
            <g id="hexStrokesLeft">
              <use href="#hex" x="0.0" y="0.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="138.6" y="0.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="554.2" y="0.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="692.8" y="0.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="831.4" y="0.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="969.9" y="0.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="-69.3" y="120.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="69.3" y="120.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="207.8" y="120.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="346.4" y="120.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="485.0" y="120.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="762.1" y="120.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="0.0" y="240.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="138.6" y="240.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="415.7" y="240.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="346.4" y="360.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="485.0" y="360.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="346.4" y="600.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="-69.3" y="840.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="69.3" y="840.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="207.8" y="840.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="346.4" y="840.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="485.0" y="840.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="0.0" y="960.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="138.6" y="960.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="415.7" y="960.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="-69.3" y="1080.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="69.3" y="1080.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="346.4" y="1080.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="485.0" y="1080.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="623.5" y="1080.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="762.1" y="1080.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="900.6" y="1080.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="0.0" y="1200.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="138.6" y="1200.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="277.1" y="1200.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="415.7" y="1200.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="554.2" y="1200.0" fill="black" stroke="white" strokeWidth="3" />
            </g>
            <g id="hexStrokesRight">
              <use href="#hex" x="1247.0" y="0.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1385.6" y="0.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1524.2" y="0.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1662.7" y="0.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1801.3" y="0.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1939.8" y="0.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1177.8" y="120.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1316.3" y="120.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1454.9" y="120.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1593.4" y="120.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1732.0" y="120.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1870.6" y="120.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1524.2" y="240.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1662.7" y="240.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1801.3" y="240.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1939.8" y="240.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1593.4" y="360.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1801.3" y="480.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1939.8" y="480.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1732.0" y="600.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1870.6" y="600.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1662.7" y="720.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1939.8" y="720.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1593.4" y="840.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1732.0" y="840.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1870.6" y="840.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1247.0" y="960.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1385.6" y="960.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1662.7" y="960.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1801.3" y="960.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1939.8" y="960.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1177.8" y="1080.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1316.3" y="1080.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1454.9" y="1080.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1593.4" y="1080.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1732.0" y="1080.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1870.6" y="1080.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1247.0" y="1200.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1385.6" y="1200.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1524.2" y="1200.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1662.7" y="1200.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1801.3" y="1200.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1939.8" y="1200.0" fill="black" stroke="white" strokeWidth="3" />
            </g>
            <mask id="hexMaskLeft">
              <rect width="1920" height="1080" fill="black" />
              <use href="#hexStrokesLeft" />
            </mask>
            <mask id="hexMaskRight">
              <rect width="1920" height="1080" fill="black" />
              <use href="#hexStrokesRight" />
            </mask>
          </defs>
          <g>
            <use href="#hexBlock" />
            <rect y="0" width="750" height="1080" fill="url(#beamGradientLeft)" mask="url(#hexMaskLeft)">
              <animate attributeName="x" values="-750; 750" dur="10s" repeatCount="indefinite" />
            </rect>
            <rect y="0" width="850" height="1080" fill="url(#beamGradientRight)" mask="url(#hexMaskRight)">
              <animate attributeName="x" values="750; 2700" dur="13s" begin="-5s" repeatCount="indefinite" />
            </rect>
          </g>
        </svg>
      </div>

      {/* --- GLOBE EDGE GLOW --- */}
      <div
        id="bg-globe"
        className="absolute inset-0 m-auto rounded-full pointer-events-none"
        style={{
          width: 'min(75.6vh, 75vw)',
          height: 'min(75.6vh, 75vw)',
          zIndex: 5,
          border: '0.0625rem solid rgba(0, 82, 255, 0.12)',
          boxShadow: '0 0 1.25rem rgba(0, 82, 255, 0.08), 0 0 2.5rem rgba(0, 82, 255, 0.04)'
        }}
      />

      {/* --- INTERACTIVE HIT AREA --- */}
      <div
        id="globe-hit-area"
        ref={hitAreaRef}
        className="absolute inset-0 m-auto rounded-full z-30 cursor-pointer"
        style={{
          width: 'min(75.6vh, 75vw)',
          height: 'min(75.6vh, 75vw)',
        }}
      />

      {/* 3D Animation Container */}
      <div id="three-container" ref={containerRef} className="relative w-full h-full z-10" />

      {/* --- TEXT CONTAINER --- */}
      <div
        id="sub-text"
        className="absolute top-[67%] left-1/2 -translate-x-1/2 text-center z-20 w-full opacity-0 pointer-events-none"
      >
        <p className="hero-tagline-1">
          INSPIRED BY PASSION
        </p>
        <p className="hero-tagline-2">
          TO TRANSFORM BEYOND EXCELLENCE.
        </p>
      </div>

      {/* --- LEFT VERTICAL LABEL FOR GLOBE STATE --- */}
      <div id="side-label-globe" className="absolute left-[0.25rem] md:left-[1.125rem] top-1/2 -translate-y-1/2 z-40 flex flex-col items-center opacity-100 pointer-events-none">
        <div className="w-[0.0625rem] h-24 md:h-36 bg-gradient-to-b from-transparent to-[#173599]/60 mb-6" />
        <p
          className="text-[#173599] text-[0.5625rem] md:text-[0.8125rem] uppercase font-bold tracking-[0.2em] md:tracking-[0.4em]"
          style={{
            fontFamily: "'Inter', sans-serif",
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)'
          }}
        >
          IEEE Student Branch
        </p>
        <div className="w-[0.0625rem] h-24 md:h-36 bg-gradient-to-t from-transparent to-[#173599]/60 mt-6" />
      </div>

      {/* --- LEFT VERTICAL LABEL FOR TEXT STATE --- */}
      <div id="side-label" className="absolute left-[0.25rem] md:left-[1.125rem] top-1/2 -translate-y-1/2 z-40 flex flex-col items-center opacity-0 pointer-events-none">
        <div className="w-[0.0625rem] h-24 md:h-36 bg-gradient-to-b from-transparent to-[#173599]/60 mb-6" />
        <p
          className="text-[#173599] text-[0.5625rem] md:text-[0.8125rem] uppercase font-bold tracking-[0.2em] md:tracking-[0.4em]"
          style={{
            fontFamily: "'Inter', sans-serif",
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)'
          }}
        >
          Since 2008
        </p>
        <div className="w-[0.0625rem] h-24 md:h-36 bg-gradient-to-t from-transparent to-[#173599]/60 mt-6" />
      </div>
    </div>
  );
}
