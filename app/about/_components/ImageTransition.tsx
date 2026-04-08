"use client";

import React, { useEffect, useRef, useState } from 'react';

// Declare globals so TypeScript doesn't complain about injected legacy libraries
declare global {
  interface Window {
    THREE: any;
    TweenMax: any;
    TimelineMax: any;
    Power0: any;
  }
}

const loadScript = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.crossOrigin = 'anonymous';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.head.appendChild(script);
  });
};

const ThreeImageTransition: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let animationFrameId: number;
    let rootInstance: any;

    const initSequence = async () => {
      try {
        // Load dependencies sequentially to maintain order
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r75/three.min.js');
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.0/TweenMax.min.js');
        await loadScript('https://s3-us-west-2.amazonaws.com/s.cdpn.io/175711/bas.js');
        await loadScript('https://s3-us-west-2.amazonaws.com/s.cdpn.io/175711/OrbitControls-2.js');
        
        // dependencies loaded smoothly
        initializeScene();
      } catch (error) {
        console.error("Failed to load Three.js dependencies", error);
      }
    };

    const initializeScene = () => {
      if (!containerRef.current || !window.THREE) return;

      const THREE = window.THREE;
      const TweenMax = window.TweenMax;
      const TimelineMax = window.TimelineMax;
      const Power0 = window.Power0;

      // --- UTILS ---
      const utils = {
        extend: (dst: any, src: any) => {
          for (let key in src) dst[key] = src[key];
          return dst;
        }
      };

      // --- THREERoot CLASS ---
      function THREERoot(this: any, params: any) {
        params = utils.extend({
          fov: 60,
          zNear: 10,
          zFar: 100000,
          createCameraControls: true
        }, params);

        this.renderer = new THREE.WebGLRenderer({ antialias: params.antialias, alpha: true });
        this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
        
        // Append to our React ref instead of document.getElementById
        containerRef.current?.appendChild(this.renderer.domElement);

        this.camera = new THREE.PerspectiveCamera(params.fov, window.innerWidth / window.innerHeight, params.zNear, params.zfar);
        this.scene = new THREE.Scene();

        if (params.createCameraControls) {
          this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        }

        this.resize = this.resize.bind(this);
        this.tick = this.tick.bind(this);

        this.resize();
        this.tick();

        window.addEventListener('resize', this.resize, false);
      }

      THREERoot.prototype = {
        tick: function() {
          this.update();
          this.render();
          animationFrameId = requestAnimationFrame(this.tick);
        },
        update: function() {
          this.controls && this.controls.update();
        },
        render: function() {
          this.renderer.render(this.scene, this.camera);
        },
        resize: function() {
          this.camera.aspect = window.innerWidth / window.innerHeight;
          this.camera.updateProjectionMatrix();
          this.renderer.setSize(window.innerWidth, window.innerHeight);
        }
      };

      // --- SLIDE GEOMETRY ---
      function SlideGeometry(this: any, model: any) {
        THREE.BAS.ModelBufferGeometry.call(this, model);
      }
      SlideGeometry.prototype = Object.create(THREE.BAS.ModelBufferGeometry.prototype);
      SlideGeometry.prototype.constructor = SlideGeometry;
      SlideGeometry.prototype.bufferPositions = function() {
        let positionBuffer = this.createAttribute('position', 3).array;
        for (let i = 0; i < this.faceCount; i++) {
          let face = this.modelGeometry.faces[i];
          let centroid = THREE.BAS.Utils.computeCentroid(this.modelGeometry, face);
          let a = this.modelGeometry.vertices[face.a];
          let b = this.modelGeometry.vertices[face.b];
          let c = this.modelGeometry.vertices[face.c];

          positionBuffer[face.a * 3]     = a.x - centroid.x;
          positionBuffer[face.a * 3 + 1] = a.y - centroid.y;
          positionBuffer[face.a * 3 + 2] = a.z - centroid.z;

          positionBuffer[face.b * 3]     = b.x - centroid.x;
          positionBuffer[face.b * 3 + 1] = b.y - centroid.y;
          positionBuffer[face.b * 3 + 2] = b.z - centroid.z;

          positionBuffer[face.c * 3]     = c.x - centroid.x;
          positionBuffer[face.c * 3 + 1] = c.y - centroid.y;
          positionBuffer[face.c * 3 + 2] = c.z - centroid.z;
        }
      };

      // --- SLIDE CLASS ---
      function Slide(this: any, width: number, height: number, animationPhase: string) {
        // Capped segmentation to match original vertex depth to avoid WebGL memory overflow on large screens
        let plane = new THREE.PlaneGeometry(width, height, 150, 90);
        THREE.BAS.Utils.separateFaces(plane);

        let geometry = new (SlideGeometry as any)(plane);
        geometry.bufferUVs();

        let aAnimation = geometry.createAttribute('aAnimation', 2);
        let aStartPosition = geometry.createAttribute('aStartPosition', 3);
        let aControl0 = geometry.createAttribute('aControl0', 3);
        let aControl1 = geometry.createAttribute('aControl1', 3);
        let aEndPosition = geometry.createAttribute('aEndPosition', 3);

        let minDuration = 0.8;
        let maxDuration = 1.2;
        let maxDelayX = 0.9;
        let maxDelayY = 0.125;
        let stretch = 0.11;

        this.totalDuration = maxDuration + maxDelayX + maxDelayY + stretch;

        let startPosition = new THREE.Vector3();
        let control0 = new THREE.Vector3();
        let control1 = new THREE.Vector3();
        let endPosition = new THREE.Vector3();
        let tempPoint = new THREE.Vector3();

        function getControlPoint0(centroid: any) {
          let signY = Math.sign(centroid.y);
          tempPoint.x = THREE.Math.randFloat(0.1, 0.3) * 50;
          tempPoint.y = signY * THREE.Math.randFloat(0.1, 0.3) * 70;
          tempPoint.z = THREE.Math.randFloatSpread(20);
          return tempPoint;
        }

        function getControlPoint1(centroid: any) {
          let signY = Math.sign(centroid.y);
          tempPoint.x = THREE.Math.randFloat(0.3, 0.6) * 50;
          tempPoint.y = -signY * THREE.Math.randFloat(0.3, 0.6) * 70;
          tempPoint.z = THREE.Math.randFloatSpread(20);
          return tempPoint;
        }

        let i, i2, i3, i4, v;
        for (i = 0, i2 = 0, i3 = 0, i4 = 0; i < geometry.faceCount; i++, i2 += 6, i3 += 9, i4 += 12) {
          let face = plane.faces[i];
          let centroid = THREE.BAS.Utils.computeCentroid(plane, face);

          let duration = THREE.Math.randFloat(minDuration, maxDuration);
          let delayX = THREE.Math.mapLinear(centroid.x, -width * 0.5, width * 0.5, 0.0, maxDelayX);
          let delayY;

          if (animationPhase === 'in') {
            delayY = THREE.Math.mapLinear(Math.abs(centroid.y), 0, height * 0.5, 0.0, maxDelayY);
          } else {
            delayY = THREE.Math.mapLinear(Math.abs(centroid.y), 0, height * 0.5, maxDelayY, 0.0);
          }

          for (v = 0; v < 6; v += 2) {
            aAnimation.array[i2 + v] = delayX + delayY + Math.random() * stretch * duration;
            aAnimation.array[i2 + v + 1] = duration;
          }

          endPosition.copy(centroid);
          startPosition.copy(centroid);

          if (animationPhase === 'in') {
            control0.copy(centroid).sub(getControlPoint0(centroid));
            control1.copy(centroid).sub(getControlPoint1(centroid));
          } else {
            control0.copy(centroid).add(getControlPoint0(centroid));
            control1.copy(centroid).add(getControlPoint1(centroid));
          }

          for (v = 0; v < 9; v += 3) {
            aStartPosition.array[i3 + v] = startPosition.x;
            aStartPosition.array[i3 + v + 1] = startPosition.y;
            aStartPosition.array[i3 + v + 2] = startPosition.z;

            aControl0.array[i3 + v] = control0.x;
            aControl0.array[i3 + v + 1] = control0.y;
            aControl0.array[i3 + v + 2] = control0.z;

            aControl1.array[i3 + v] = control1.x;
            aControl1.array[i3 + v + 1] = control1.y;
            aControl1.array[i3 + v + 2] = control1.z;

            aEndPosition.array[i3 + v] = endPosition.x;
            aEndPosition.array[i3 + v + 1] = endPosition.y;
            aEndPosition.array[i3 + v + 2] = endPosition.z;
          }
        }

        let material = new THREE.BAS.BasicAnimationMaterial({
          shading: THREE.FlatShading,
          side: THREE.DoubleSide,
          uniforms: { uTime: { type: 'f', value: 0 } },
          shaderFunctions: [
            THREE.BAS.ShaderChunk['cubic_bezier'],
            THREE.BAS.ShaderChunk['ease_in_out_cubic'],
            THREE.BAS.ShaderChunk['quaternion_rotation']
          ],
          shaderParameters: [
            'uniform float uTime;',
            'attribute vec2 aAnimation;',
            'attribute vec3 aStartPosition;',
            'attribute vec3 aControl0;',
            'attribute vec3 aControl1;',
            'attribute vec3 aEndPosition;'
          ],
          shaderVertexInit: [
            'float tDelay = aAnimation.x;',
            'float tDuration = aAnimation.y;',
            'float tTime = clamp(uTime - tDelay, 0.0, tDuration);',
            'float tProgress = ease(tTime, 0.0, 1.0, tDuration);'
          ],
          shaderTransformPosition: [
            animationPhase === 'in' ? 'transformed *= tProgress;' : 'transformed *= 1.0 - tProgress;',
            'transformed += cubicBezier(aStartPosition, aControl0, aControl1, aEndPosition, tProgress);'
          ]
        }, { map: new THREE.Texture() });

        THREE.Mesh.call(this, geometry, material);
        this.frustumCulled = false;
      }
      
      Slide.prototype = Object.create(THREE.Mesh.prototype);
      Slide.prototype.constructor = Slide;
      
      Object.defineProperty(Slide.prototype, 'time', {
        get: function () { return this.material.uniforms['uTime'].value; },
        set: function (v: any) { this.material.uniforms['uTime'].value = v; }
      });

      Slide.prototype.setImage = function(image: any) {
        this.material.uniforms.map.value.image = image;
        this.material.uniforms.map.value.needsUpdate = true;
      };

      Slide.prototype.transition = function() {
        return TweenMax.fromTo(this, 3.0, { time: 0.0 }, { time: this.totalDuration, ease: Power0.easeInOut });
      };

      // --- INITIALIZATION ---
      const root = new (THREERoot as any)({
        createCameraControls: false,
        antialias: window.devicePixelRatio === 1,
        fov: 80
      });
      rootInstance = root; // Save reference for cleanup

      root.renderer.setClearColor(0x000000, 0);
      root.camera.position.set(0, 0, 60);

      // Dynamic width/height calculation from perspective
      let fov = 80;
      let cameraZ = 60;
      let height = 2 * Math.tan((fov * Math.PI / 180) / 2) * cameraZ;
      let width = height * (window.innerWidth / window.innerHeight);

      let slideOut = new (Slide as any)(width, height, 'out');
      let slideIn = new (Slide as any)(width, height, 'in');

      root.scene.add(slideOut);
      root.scene.add(slideIn);

      const imageUrls = [
          '/images/bg_1.png',
          '/images/bg_2.png',
          '/images/bg_3.png',
          '/images/bg_4.png',
          '/images/bg_5.png'
      ];

      let loadedImages: any[] = [];
      let currentImageIndex = 0;
      let isAnimating = false;

      let l1 = new THREE.ImageLoader();
      l1.setCrossOrigin('Anonymous');

      Promise.all(imageUrls.map(url => new Promise((resolve, reject) => {
        l1.load(
            url, 
            (img: any) => resolve(img),
            undefined,
            (err: any) => { console.error("Texture load error:", err); resolve(null); } // Resolve null so it doesn't hang!
        );
      }))).then(images => {
        loadedImages = images.filter(img => img !== null); // safety fallback
        if (loadedImages.length > 0) {
            slideOut.setImage(loadedImages[0]);
        }
        if (loadedImages.length > 1) {
            slideIn.setImage(loadedImages[1]);
        }
        setIsLoaded(true);
      });

      // --- SCROLL CONTROLS ---
      const handleScroll = (e: WheelEvent) => {
        if (loadedImages.length < 2) return;

        // If the browser has native-scrolled past the gallery, let it scroll freely back into view!
        if (window.scrollY > 10) {
            return;
        }

        let direction = e.deltaY > 0 ? 1 : -1;
        let nextIndex = currentImageIndex + direction;
        let isWithinBounds = nextIndex >= 0 && nextIndex < loadedImages.length;

        // If trying to scroll past the first or last image
        if (!isWithinBounds) {
            // Un-trap the trackpad/mouse so the browser natively scrolls the web page up or down!
            // But if we are mid-animation, swallow the momentum so the UI stays stable.
            if (isAnimating) {
                e.preventDefault();
            }
            return;
        }

        // We are within gallery bounds. Trap the scroll to lock the page in place.
        e.preventDefault();

        if (isAnimating) return;
        isAnimating = true;

        slideOut.setImage(loadedImages[currentImageIndex]);
        slideIn.setImage(loadedImages[nextIndex]);
        
        slideOut.time = 0;
        slideIn.time = 0;

        TweenMax.to([slideOut, slideIn], 2.5, { // slightly accelerated for scroll responsiveness
          time: slideOut.totalDuration,
          ease: Power0.easeInOut,
          onComplete: () => {
            currentImageIndex = nextIndex;
            isAnimating = false;
          }
        });
      };

      if (containerRef.current) {
         containerRef.current.style.cursor = 'ns-resize';
      }

      window.addEventListener('wheel', handleScroll, { passive: false });

      // Attach cleanups to rootInstance so we can clear them on unmount
      rootInstance.cleanupEvents = () => {
         window.removeEventListener('wheel', handleScroll);
      }
    };

    initSequence();

    // Cleanup phase
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (rootInstance) {
        if (rootInstance.cleanupEvents) rootInstance.cleanupEvents();
        window.removeEventListener('resize', rootInstance.resize);
        
        // Remove canvas from DOM
        if (containerRef.current && rootInstance.renderer.domElement) {
          containerRef.current.removeChild(rootInstance.renderer.domElement);
        }
        
        // Dispose WebGL contexts
        if (rootInstance.renderer) {
          rootInstance.renderer.dispose();
          rootInstance.renderer.forceContextLoss();
        }
      }
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {!isLoaded && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white' }}>
          Loading 3D Assets...
        </div>
      )}
      <div 
        ref={containerRef} 
        style={{ 
          width: '100%', 
          height: '100%', 
          backgroundImage: 'radial-gradient(#666, #333)' 
        }} 
      />

    </div>
  );
};

export default ThreeImageTransition;
