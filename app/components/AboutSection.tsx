'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<NodeListOf<HTMLElement> | null>(null);

  useEffect(() => {
    // Stat Counters
    let countersStarted = false;
    const runCounters = () => {
      if (countersStarted) return;
      countersStarted = true;
      if (statsRef.current) {
        statsRef.current.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-target') || '0', 10);
          const duration = 1500;
          const startTime = performance.now();
          const updateCount = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            stat.innerText = Math.floor(easeOut * target).toString();
            if (progress < 1) requestAnimationFrame(updateCount);
            else stat.innerText = target.toString();
          };
          requestAnimationFrame(updateCount);
        });
      }
    };

    const resetCounters = () => {
      countersStarted = false;
      if (statsRef.current) {
        statsRef.current.forEach(stat => {
          stat.innerText = '0';
        });
      }
    };

    statsRef.current = document.querySelectorAll('.stat-num') as NodeListOf<HTMLElement>;

    // Handle words split
    if (headlineRef.current) {
      const text = headlineRef.current.innerText || "Pushing the Boundaries of Innovation and Excellence";
      const words = text.split(' ');
      headlineRef.current.innerHTML = '';
      words.forEach((word, index) => {
        const span = document.createElement('span');
        span.classList.add('word', 'inline-block', 'opacity-0', 'translate-y-[30px]', 'blur-sm', 'transition-all', 'will-change-transform');
        span.innerText = word;
        span.style.transitionDelay = `${(index * 50) + 1200}ms`;
        headlineRef.current?.appendChild(span);
        headlineRef.current?.appendChild(document.createTextNode(' '));
      });
    }

    // Three.js
    const container = containerRef.current;
    let animateIn = () => {};
    let animateOut = () => {};

    if (container) {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 1, 1000);
        camera.position.z = 52;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        // Load texture (using a placeholder or path if 2m2.png is in public)
        const textureLoader = new THREE.TextureLoader();
        const mapTexture = textureLoader.load('/2m2.png');
        
        const globe = new THREE.Group();
        scene.add(globe);

        const width = 45;
        const height = 30;
        const geo = new THREE.PlaneGeometry(width, height, 64, 64);
        
        const originalPositions = new Float32Array(geo.attributes.position.array);
        geo.setAttribute('aOriginalPosition', new THREE.BufferAttribute(originalPositions, 3));

        const mat = new THREE.ShaderMaterial({ 
            uniforms: {
                tDiffuse: { value: mapTexture },
                uOpacity: { value: 0.9 },
                uTime: { value: 0.0 }
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
            `
        });
        const mesh = new THREE.Mesh(geo, mat);
        globe.add(mesh);

        let isMousing = false;
        globe.scale.set(0.01, 0.01, 0.01);
        let targetRotX = 0;
        let targetRotY = 0;

        let animationFrameId: number;
        function animate() {
            animationFrameId = requestAnimationFrame(animate);
            const time = performance.now() * 0.001;
            
            const posAttr = geo.attributes.position;
            const origPos = originalPositions;
            
            for (let i = 0; i < posAttr.count; i++) {
                const x = origPos[i * 3];
                const y = origPos[i * 3 + 1];
                let z = Math.sin(x * 0.5 + time) * 0.4 + Math.cos(y * 0.5 + time) * 0.4;
                posAttr.setZ(i, z);
            }
            posAttr.needsUpdate = true;
            mat.uniforms.uTime.value = time;

            if (isMousing) {
                globe.rotation.x += (targetRotX - globe.rotation.x) * 0.05;
                globe.rotation.y += (targetRotY - globe.rotation.y) * 0.05;
            } else {
                globe.rotation.y += (Math.sin(time * 0.5) * 0.05 - globe.rotation.y) * 0.05;
                globe.rotation.x += (Math.cos(time * 0.5) * 0.05 - globe.rotation.x) * 0.05;
            }

            renderer.render(scene, camera);
        }
        animate();
        
        const handleResize = () => {
            if (container.clientWidth > 0 && container.clientHeight > 0) {
                camera.aspect = container.clientWidth / container.clientHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(container.clientWidth, container.clientHeight);
            }
        };
        window.addEventListener('resize', handleResize);
        
        const visualArea = document.querySelector('.about-visual');
        if (visualArea) {
            visualArea.addEventListener('mousemove', (e: any) => {
                isMousing = true;
                const rect = visualArea.getBoundingClientRect();
                const x = e.clientX - rect.left - (rect.width / 2);
                const y = e.clientY - rect.top - (rect.height / 2);
                targetRotX = (y / (rect.height / 2)) * -0.3;
                targetRotY = (x / (rect.width / 2)) * 0.3;
            });
            visualArea.addEventListener('mouseleave', () => {
                isMousing = false;
                targetRotX = 0;
                targetRotY = 0;
            });
        }

        animateIn = () => {
            gsap.to(globe.scale, { x: 1, y: 1, z: 1, duration: 2, ease: "expo.out" });
            gsap.to(mat.uniforms.uOpacity, { value: 0.9, duration: 1.5 });
        };
        
        animateOut = () => {
            gsap.to(globe.scale, { x: 0.01, y: 0.01, z: 0.01, duration: 1.2, ease: "power2.inIn" });
            gsap.to(mat.uniforms.uOpacity, { value: 0, duration: 1 });
        };

        const mainObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    sectionRef.current?.classList.remove('state-exit');
                    sectionRef.current?.classList.add('state-enter');
                    setTimeout(runCounters, 800);
                    animateIn();
                } else {
                    if (sectionRef.current?.classList.contains('state-enter')) {
                        sectionRef.current?.classList.remove('state-enter');
                        sectionRef.current?.classList.add('state-exit');
                        resetCounters();
                        animateOut();
                    }
                }
            });
        }, { root: null, rootMargin: '0px', threshold: 0.5 });

        const elementObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                } else {
                    entry.target.classList.remove('is-visible');
                }
            });
        }, { root: null, rootMargin: '0px', threshold: 0.15 });

        if (sectionRef.current) mainObserver.observe(sectionRef.current);
        document.querySelectorAll('.observer-element').forEach(el => elementObserver.observe(el));

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
            renderer.dispose();
            mainObserver.disconnect();
            elementObserver.disconnect();
        };
    }
  }, []);

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400&family=Orbitron:wght@400;700;900&family=Space+Mono:wght@400;700&display=swap');
        
        .animate-on-scroll { transition: opacity 1s cubic-bezier(0.25, 1, 0.5, 1), transform 1s cubic-bezier(0.25, 1, 0.5, 1); }
        .pan-left-hidden { opacity: 0; transform: translateX(-150px); }
        .pan-right-hidden { opacity: 0; transform: translateX(150px); }
        .rise-hidden { opacity: 0; transform: translateY(100px); }
        .shine-effect { position: relative; overflow: hidden; display: inline-block; }
        .shine-effect::after { content: ''; position: absolute; top: 0; left: -150%; width: 50%; height: 100%; background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%); transform: skewX(-25deg); animation: shine 4s infinite; pointer-events: none; z-index: 20; }
        @keyframes shine { 0% { left: -100%; } 50% { left: 200%; } 100% { left: 200%; } }
        .global-shine-wrapper { position: relative; overflow: hidden; border-radius: 0.75rem; }
        .global-shine-wrapper::after { content: ''; position: absolute; top: -50%; left: -100%; width: 100%; height: 200%; background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%); transform: rotate(35deg); animation: globalShine 6s infinite; pointer-events: none; z-index: 30; }
        @keyframes globalShine { 0% { left: -150%; } 40% { left: 200%; } 100% { left: 200%; } }
        .is-visible { opacity: 1 !important; transform: translate(0, 0) !important; }
        .is-visible .animate-on-scroll.delay-content { opacity: 1; transform: translate(0, 0); transition-delay: 2.5s; }
        .is-visible .animate-on-scroll:not(.delay-content) { opacity: 1; transform: translate(0, 0); }

        :root { 
            --bg-base: #000408; 
            --bg-alt: #000408; 
            --cyan: #00c8ff; 
            --blue: #3d9eff; 
            --font-head: 'Orbitron', sans-serif; 
            --font-body: 'DM Sans', sans-serif; 
            --font-num: 'Space Mono', monospace; 
            --ease-enter: cubic-bezier(0.2, 1, 0.3, 1); 
            --ease-exit: cubic-bezier(0.7, 0, 0.8, 0.2); 
        }

        .about-section { position: relative; min-height: auto; padding-bottom: 80px; width: 100%; background: linear-gradient(135deg, var(--bg-base) 0%, var(--bg-alt) 100%); display: flex; align-items: center; justify-content: center; padding: 6rem 2rem; overflow: hidden; z-index: 1; }
        .about-grid { position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background-image: radial-gradient(rgba(0, 200, 255, 0.8) 1px, transparent 1px); background-size: 30px 30px; opacity: 0.03; z-index: -2; animation: drift-grid 30s linear infinite; pointer-events: none; }
        @keyframes drift-grid { 0% { transform: translateY(0) translateX(0); } 100% { transform: translateY(30px) translateX(30px); } }
        .scan-line { position: absolute; left: 0; top: 0; width: 100%; height: 2px; background: var(--cyan); box-shadow: 0 0 15px 2px var(--cyan); opacity: 0; z-index: 10; pointer-events: none; will-change: transform, opacity; }
        .state-enter .scan-line { animation: scan-sweep-down 2.5s var(--ease-enter) forwards; }
        .state-exit .scan-line { animation: scan-sweep-up 1.2s linear forwards; }
        @keyframes scan-sweep-down { 0% { transform: translateY(0); opacity: 0; } 10% { opacity: 0.8; } 90% { opacity: 0.8; } 100% { transform: translateY(100vh); opacity: 0; } }
        @keyframes scan-sweep-up { 0% { transform: translateY(100vh); opacity: 0; } 10% { opacity: 0.8; } 90% { opacity: 0.8; } 100% { transform: translateY(0); opacity: 0; } }
        
        .about-container { position: relative; max-width: 1300px; width: 100%; display: grid; grid-template-columns: 0.8fr 1.2fr; gap: 6rem; align-items: center; z-index: 2; margin: 0 auto; }
        .about-visual { position: relative; width: 100%; aspect-ratio: 1/1; display: flex; justify-content: center; align-items: center; perspective: 1200px; }
        .about-content { display: flex; flex-direction: column; gap: 2rem; text-align: left; }
        
        .eyebrow { display: flex; align-items: center; gap: 1rem; opacity: 0; transform: translateX(-20px); will-change: transform, opacity; }
        .eyebrow-line { height: 4px; width: 50px; background: var(--cyan); box-shadow: 0 0 10px var(--cyan), 0 0 20px var(--cyan); border-radius: 10px; position: relative; overflow: hidden; }
        .eyebrow-line::after { content: ''; position: absolute; top: 0; left: 0; width: 60%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,1), transparent); animation: shimmer-line-h 2.5s ease-in-out infinite; }
        @keyframes shimmer-line-h { 0% { transform: translateX(-200%); } 100% { transform: translateX(250%); } }
        
        .eyebrow-text { font-family: var(--font-head); font-size: 2.4rem; letter-spacing: 0.3em; text-transform: uppercase; font-weight: 700; background: linear-gradient(90deg, var(--cyan) 0%, #ffffff 50%, var(--cyan) 100%); background-size: 200% auto; -webkit-background-clip: text; color: transparent; animation: shimmer-text 3.3s linear infinite; filter: drop-shadow(0 0 8px var(--cyan)); }
        @keyframes shimmer-text { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        
        .state-enter .eyebrow { opacity: 1; transform: translateX(0); transition: opacity 0.6s, transform 0.6s var(--ease-enter); transition-delay: 0.8s; }
        .state-exit .eyebrow { opacity: 0; transform: translateX(20px); transition: opacity 0.4s 1.0s, transform 0.4s var(--ease-exit) 1.0s; }
        
        .headline { font-family: var(--font-head); font-size: clamp(1.8rem, 3vw, 2.8rem); line-height: 1.1; font-weight: 700; color: #ffffff; margin: 0; text-transform: uppercase; }
        
        .state-enter :global(.word) { opacity: 1 !important; transform: translateY(0) !important; filter: blur(0) !important; transition: opacity 0.8s, transform 0.8s var(--ease-enter), filter 0.8s ease; }
        .state-exit :global(.word) { opacity: 0 !important; transform: translateY(-30px) !important; filter: blur(8px) !important; transition: opacity 0.4s 0.7s, transform 0.4s var(--ease-exit) 0.7s, filter 0.4s ease 0.7s; }
        
        .body-wrapper { position: relative; padding-left: 2rem; display: flex; flex-direction: column; gap: 1rem; }
        .body-line { position: absolute; left: 0; top: 0; width: 4px; border-radius: 10px; height: 0; background: var(--cyan); box-shadow: 0 0 10px var(--cyan), 0 0 20px var(--cyan); will-change: height; overflow: hidden; }
        .body-line::after { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 80px; background: linear-gradient(180deg, transparent, rgba(255,255,255,1), transparent); animation: shimmer-line-v 3.3s linear infinite; }
        @keyframes shimmer-line-v { 0% { transform: translateY(800px); } 100% { transform: translateY(-100px); } }
        
        .state-enter .body-line { height: 100%; transition: height 1.8s var(--ease-enter) 1.2s; }
        .state-exit .body-line { height: 0; bottom: 0; top: auto; transition: height 0.4s var(--ease-exit) 0.5s; }
        
        .body-text-p { font-size: 1.1rem; line-height: 1.7; color: #a0aec0; font-weight: 300; opacity: 0; transform: translateX(-20px); will-change: transform, opacity; font-family: var(--font-body); }
        .state-enter .body-text-p { opacity: 1; transform: translateX(0); transition: opacity 0.8s, transform 0.8s var(--ease-enter); }
        .state-exit .body-text-p { opacity: 0; transform: translateX(20px); transition: opacity 0.4s 0.5s, transform 0.4s var(--ease-exit) 0.5s; }
        .body-text-p strong { color: #fff; font-weight: 400; text-shadow: 0 0 10px rgba(255,255,255,0.2); }
        
        .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; margin-top: 0.5rem; border-top: 1px solid rgba(0, 200, 255, 0.15); padding-top: 2rem; }
        .stat-item { display: flex; flex-direction: column; gap: 0.5rem; border-left: 1px solid transparent; padding-left: 0; cursor: default; opacity: 0; filter: blur(10px); transform: translateY(20px); will-change: transform, opacity, filter, text-shadow; }
        .state-enter .stat-item { opacity: 1; filter: blur(0); transform: translateY(0); transition: opacity 0.8s, filter 0.8s, transform 0.8s var(--ease-enter); }
        .state-exit .stat-item { opacity: 0; filter: blur(10px); transform: translateY(-20px); transition: opacity 0.4s 0.2s, filter 0.4s 0.2s, transform 0.4s var(--ease-exit) 0.2s; }
        .stat-item:hover { animation: surge 0.4s var(--ease-enter); }
        .stat-item:hover .stat-top { color: var(--cyan); text-shadow: 0 0 20px rgba(0, 200, 255, 0.6); }
        @keyframes surge { 0% { transform: scale(1); } 50% { transform: scale(1.06); } 100% { transform: scale(1); } }
        
        .stat-top { display: flex; align-items: baseline; gap: 0.2rem; color: #ffffff; transition: color 0.3s, text-shadow 0.3s; }
        .stat-num { font-family: var(--font-num); font-size: 2.5rem; font-weight: 700; line-height: 1; }
        .stat-plus { font-family: var(--font-num); color: var(--cyan); font-size: 2rem; font-weight: 700; }
        .stat-label { font-family: var(--font-body); font-size: 0.9rem; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 400; }
        
        @media (max-width: 1024px) { .about-container { gap: 3rem; grid-template-columns: 1fr; } .headline { font-size: 2.2rem; } }
        @media (max-width: 768px) { .about-section { padding: 4rem 1.5rem; } .about-container { grid-template-columns: 1fr; gap: 2rem; } .about-visual { max-width: 250px; margin: 0 auto; order: -1; } .headline { font-size: 1.8rem; } .stats-grid { grid-template-columns: 1fr; gap: 2rem; padding-top: 2rem; } .stat-item { align-items: center; text-align: center; } .body-wrapper { padding-left: 1.5rem; } }
      `}</style>
      
      {/* 1. ABOUT SECTION */}
      <section id="about" className="about-section" ref={sectionRef}>
          <div className="about-grid"></div>
          <div className="scan-line"></div>
          <div className="about-container">
              {/* Left Visual (Advanced 3D) */}
              <div className="about-visual">
                  <div ref={containerRef} id="canvas-container" style={{ width: '100%', height: '100%', position: 'absolute', zIndex: 10 }}></div>
              </div>
              
              {/* Right Content */}
              <div className="about-content">
                  <div className="eyebrow">
                      <div className="eyebrow-line"></div>
                      <span className="eyebrow-text">About Us</span>
                  </div>
                  <h2 ref={headlineRef} className="headline split-text">Pushing the Boundaries of Innovation and Excellence</h2>
                  <div className="body-wrapper">
                      <div className="body-line"></div>
                      <p className="body-text-p" style={{ transitionDelay: '1.4s' }}>
                          Being the leading IEEE student branch in Sri Lanka, IEEE student branch of University of Moratuwa provides a major platform in flourishing innovative and creative ideas of the undergraduates. Currently around 650+ subscribers together with an extensive number of fervent volunteers are involved in many aspects. In spite of developing technological and professional skills, it’s vividly concerned about uplifting unity and harmony among the members too. Therefore we as IEEE UOM community believe that it is not only a student branch but also a family hand in hand with togetherness and humanity.
                      </p>
                  </div>
                  <div className="stats-grid">
                      <div className="stat-item" style={{ transitionDelay: '1.8s' }}>
                          <div className="stat-top"><span className="stat-num" data-target="25">0</span><span className="stat-plus">+</span></div>
                          <span className="stat-label">Years of Excellence</span>
                      </div>
                      <div className="stat-item" style={{ transitionDelay: '2.0s' }}>
                          <div className="stat-top"><span className="stat-num" data-target="500">0</span><span className="stat-plus">+</span></div>
                          <span className="stat-label">Active Members</span>
                      </div>
                      <div className="stat-item" style={{ transitionDelay: '2.2s' }}>
                          <div className="stat-top"><span className="stat-num" data-target="100">0</span><span className="stat-plus">+</span></div>
                          <span className="stat-label">Events Annually</span>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* 2. INTERNATIONAL AWARD SECTION */}
      <section className="bg-[#000408] py-6 px-6 md:px-12 lg:px-24" id="awards">
          <div className="flex flex-col items-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight" style={{ fontFamily: 'var(--font-head)' }}>AWARDS</h2>
          </div>

          <div className="max-w-6xl mx-auto group rounded-xl border border-gray-800 bg-[#070d18] relative overflow-hidden py-0 text-center transition-all duration-300 hover:border-cyan-500 hover:shadow-[0_0_40px_rgba(6,182,212,0.15)]">
              
              <div className="shine-effect w-full h-full animate-on-scroll rise-hidden observer-element">
                  <img src="/s2.jpg" alt="Award Banner" className="w-full h-auto object-cover block relative z-10" />
              </div>
              
              <div className="relative z-10 flex flex-col items-center py-10 px-6 md:px-12">
                  <div className="bg-[#0a172a] text-cyan-400 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded border border-cyan-900 mb-6 transition-colors group-hover:bg-cyan-900/40">
                      International Recognition
                  </div>
                  
                  <span className="text-sm font-bold text-gray-500 mb-2 transition-colors group-hover:text-gray-300">2024</span>
                  
                  <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-2 tracking-tight transition-all duration-300 transform group-hover:-translate-y-2 group-hover:text-cyan-50 group-hover:drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]">
                      International Award
                  </h2>
              </div>
          </div>
      </section>

      {/* 3. OTHER AWARDS SECTION */}
      <section className="bg-[#000408] text-white py-24 px-6 md:px-12 lg:px-24">
          <div className="max-w-6xl mx-auto global-shine-wrapper">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                  {/* Card 1 */}
                  <div className="group bg-[#070d18] rounded-xl border border-gray-800 p-0 flex flex-col transition-all duration-300 hover:border-cyan-500 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] relative overflow-hidden">
                      <div className="w-full h-80 sm:h-[450px] animate-on-scroll rise-hidden observer-element" style={{ overflow: 'hidden' }}>
                          <img src="/award.jpg" alt="Award Banner" className="w-full h-full object-cover block relative z-10 transform transition-transform duration-500 group-hover:scale-110" />
                      </div>
                      
                      <div className="p-8 flex flex-col items-center text-center">
                          <span className="text-xs font-bold text-gray-500 mb-4 transition-colors group-hover:text-gray-300">2023</span>
                          
                          <h3 className="text-xl font-bold text-white mb-2 transition-all duration-300 transform group-hover:-translate-y-1 group-hover:text-cyan-50 group-hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">
                              Best Innovation Award
                          </h3>
                      </div>
                  </div>
                  
                  {/* Card 2 */}
                  <div className="group bg-[#070d18] rounded-xl border border-gray-800 p-0 flex flex-col transition-all duration-300 hover:border-cyan-500 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] relative overflow-hidden">
                      <div className="w-full h-80 sm:h-[450px] animate-on-scroll rise-hidden observer-element" style={{ transitionDelay: '100ms', overflow: 'hidden' }}>
                          <img src="/award.jpg" alt="Award Banner" className="w-full h-full object-cover block relative z-10 transform transition-transform duration-500 group-hover:scale-110" />
                      </div>
                      
                      <div className="p-8 flex flex-col items-center text-center">
                          <span className="text-xs font-bold text-gray-500 mb-4 transition-colors group-hover:text-gray-300">2022</span>
                          
                          <h3 className="text-xl font-bold text-white mb-2 transition-all duration-300 transform group-hover:-translate-y-1 group-hover:text-cyan-50 group-hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">
                              Industry Leadership Award
                          </h3>
                      </div>
                  </div>
                  
                  {/* Card 3 */}
                  <div className="group bg-[#070d18] rounded-xl border border-gray-800 p-0 flex flex-col transition-all duration-300 hover:border-cyan-500 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] relative overflow-hidden">
                      <div className="w-full h-80 sm:h-[450px] animate-on-scroll rise-hidden observer-element" style={{ transitionDelay: '200ms', overflow: 'hidden' }}>
                          <img src="/award.jpg" alt="Award Banner" className="w-full h-full object-cover block relative z-10 transform transition-transform duration-500 group-hover:scale-110" />
                      </div>
                      
                      <div className="p-8 flex flex-col items-center text-center">
                          <span className="text-xs font-bold text-gray-500 mb-4 transition-colors group-hover:text-gray-300">2021</span>
                          
                          <h3 className="text-xl font-bold text-white mb-2 transition-all duration-300 transform group-hover:-translate-y-1 group-hover:text-cyan-50 group-hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">
                              Quality Excellence Award
                          </h3>
                      </div>
                  </div>
              </div>
          </div>
      </section>
    </>
  );
}
