'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

const aboutStats = [
  { label: 'Years of Excellence', value: 25, delay: '1.8s' },
  { label: 'Active Members', value: 500, delay: '2.0s' },
  { label: 'Events Annually', value: 100, delay: '2.2s' },
];

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<NodeListOf<HTMLElement> | null>(null);

  useEffect(() => {
    let countersStarted = false;
    let animationFrameId = 0;

    const runCounters = () => {
      if (countersStarted || !statsRef.current) {
        return;
      }

      countersStarted = true;

      statsRef.current.forEach((stat) => {
        const target = parseInt(stat.getAttribute('data-target') || '0', 10);
        const duration = 1500;
        const startTime = performance.now();

        const updateCount = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

          stat.innerText = Math.floor(easeOut * target).toString();

          if (progress < 1) {
            requestAnimationFrame(updateCount);
            return;
          }

          stat.innerText = target.toString();
        };

        requestAnimationFrame(updateCount);
      });
    };

    const resetCounters = () => {
      countersStarted = false;
      statsRef.current?.forEach((stat) => {
        stat.innerText = '0';
      });
    };

    statsRef.current = document.querySelectorAll('.stat-num') as NodeListOf<HTMLElement>;

    if (headlineRef.current) {
      const text =
        headlineRef.current.innerText || 'Pushing the Boundaries of Innovation and Excellence';
      const words = text.split(' ');

      headlineRef.current.innerHTML = '';
      words.forEach((word, index) => {
        const span = document.createElement('span');
        span.classList.add(
          'word',
          'inline-block',
          'opacity-0',
          'translate-y-[30px]',
          'blur-sm',
          'transition-all',
          'will-change-transform',
        );
        span.innerText = word;
        span.style.transitionDelay = `${index * 50 + 1200}ms`;
        headlineRef.current?.appendChild(span);
        headlineRef.current?.appendChild(document.createTextNode(' '));
      });
    }

    const container = containerRef.current;
    if (!container) {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      1,
      1000,
    );
    camera.position.z = 52;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();
    const mapTexture = textureLoader.load('/2m2.png');

    const globe = new THREE.Group();
    scene.add(globe);

    const geometry = new THREE.PlaneGeometry(45, 30, 64, 64);
    const originalPositions = new Float32Array(geometry.attributes.position.array);
    geometry.setAttribute('aOriginalPosition', new THREE.BufferAttribute(originalPositions, 3));

    const material = new THREE.ShaderMaterial({
      uniforms: {
        tDiffuse: { value: mapTexture },
        uOpacity: { value: 0.9 },
        uTime: { value: 0.0 },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform float uOpacity;
        uniform float uTime;
        varying vec2 vUv;
        void main() {
          vec4 tex = texture2D(tDiffuse, vUv);
          float brightness = dot(tex.rgb, vec3(0.299, 0.587, 0.114));
          float alpha = smoothstep(0.12, 0.35, brightness) * uOpacity;
          float waveY = mod(uTime * 0.3, 1.0);
          float waveDist = abs(vUv.y - waveY);
          float waveGlow = smoothstep(0.04, 0.0, waveDist) * 1.5;
          vec3 finalColor = tex.rgb;
          finalColor += vec3(0.1, 0.5, 1.0) * waveGlow * alpha;
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
    });

    const mesh = new THREE.Mesh(geometry, material);
    globe.add(mesh);
    globe.scale.set(0.01, 0.01, 0.01);

    let isMousing = false;
    let targetRotX = 0;
    let targetRotY = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = performance.now() * 0.001;
      const positionAttribute = geometry.attributes.position;

      for (let index = 0; index < positionAttribute.count; index++) {
        const x = originalPositions[index * 3];
        const y = originalPositions[index * 3 + 1];
        const z = Math.sin(x * 0.5 + time) * 0.4 + Math.cos(y * 0.5 + time) * 0.4;

        positionAttribute.setZ(index, z);
      }

      positionAttribute.needsUpdate = true;
      material.uniforms.uTime.value = time;

      if (isMousing) {
        globe.rotation.x += (targetRotX - globe.rotation.x) * 0.05;
        globe.rotation.y += (targetRotY - globe.rotation.y) * 0.05;
      } else {
        globe.rotation.y += (Math.sin(time * 0.5) * 0.05 - globe.rotation.y) * 0.05;
        globe.rotation.x += (Math.cos(time * 0.5) * 0.05 - globe.rotation.x) * 0.05;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (container.clientWidth > 0 && container.clientHeight > 0) {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      }
    };

    const visualArea = sectionRef.current?.querySelector<HTMLElement>('.about-visual') ?? null;
    const handleMouseMove = (event: MouseEvent) => {
      if (!visualArea) {
        return;
      }

      isMousing = true;
      const rect = visualArea.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;

      targetRotX = (y / (rect.height / 2)) * -0.3;
      targetRotY = (x / (rect.width / 2)) * 0.3;
    };
    const handleMouseLeave = () => {
      isMousing = false;
      targetRotX = 0;
      targetRotY = 0;
    };

    window.addEventListener('resize', handleResize);
    visualArea?.addEventListener('mousemove', handleMouseMove);
    visualArea?.addEventListener('mouseleave', handleMouseLeave);

    const animateIn = () => {
      gsap.to(globe.scale, { x: 1, y: 1, z: 1, duration: 2, ease: 'expo.out' });
      gsap.to(material.uniforms.uOpacity, { value: 0.9, duration: 1.5 });
    };

    const animateOut = () => {
      gsap.to(globe.scale, { x: 0.01, y: 0.01, z: 0.01, duration: 1.2, ease: 'power2.inIn' });
      gsap.to(material.uniforms.uOpacity, { value: 0, duration: 1 });
    };

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            sectionRef.current?.classList.remove('state-exit');
            sectionRef.current?.classList.add('state-enter');
            window.setTimeout(runCounters, 800);
            animateIn();
            return;
          }

          if (sectionRef.current?.classList.contains('state-enter')) {
            sectionRef.current.classList.remove('state-enter');
            sectionRef.current.classList.add('state-exit');
            resetCounters();
            animateOut();
          }
        });
      },
      { root: null, rootMargin: '0px', threshold: 0.5 },
    );

    if (sectionRef.current) {
      sectionObserver.observe(sectionRef.current);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      visualArea?.removeEventListener('mousemove', handleMouseMove);
      visualArea?.removeEventListener('mouseleave', handleMouseLeave);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      renderer.dispose();
      sectionObserver.disconnect();
    };
  }, []);

  return (
    <section id="about" className="about-section relative" ref={sectionRef}>
      <div className="about-grid" />
      <div className="scan-line" />

      <div className="about-container">
        <div className="about-visual">
          <div
            ref={containerRef}
            id="canvas-container"
            style={{ width: '100%', height: '100%', position: 'absolute', zIndex: 10 }}
          />
        </div>

        <div className="about-content">
          <div className="eyebrow">
            <div className="eyebrow-line" />
            <span className="eyebrow-text">About Us</span>
          </div>

          <h2 ref={headlineRef} className="headline split-text">
            Pushing the Boundaries of Innovation and Excellence
          </h2>

          <div className="body-wrapper">
            <div className="body-line" />
            <p className="body-text-p" style={{ transitionDelay: '1.4s' }}>
              Being the leading IEEE student branch in Sri Lanka, IEEE student branch of
              University of Moratuwa provides a major platform in flourishing innovative and
              creative ideas of the undergraduates. Currently around 650+ subscribers together
              with an extensive number of fervent volunteers are involved in many aspects. In
              spite of developing technological and professional skills, it is vividly concerned
              about uplifting unity and harmony among the members too. Therefore we as IEEE UOM
              community believe that it is not only a student branch but also a family hand in
              hand with togetherness and humanity.
            </p>
          </div>

          <div className="stats-grid">
            {aboutStats.map((stat) => (
              <div key={stat.label} className="stat-item" style={{ transitionDelay: stat.delay }}>
                <div className="stat-top">
                  <span className="stat-num" data-target={stat.value}>
                    0
                  </span>
                  <span className="stat-plus">+</span>
                </div>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
