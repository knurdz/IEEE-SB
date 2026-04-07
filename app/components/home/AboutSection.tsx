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
      <section className="bg-background py-6 px-6 md:px-12 lg:px-24" id="awards">
          <div className="flex flex-col items-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight" style={{ fontFamily: 'var(--font-head)' }}>AWARDS</h2>
          </div>

          <div className="max-w-6xl mx-auto group rounded-xl border border-gray-800 bg-surface-alt relative overflow-hidden py-0 text-center transition-all duration-300 hover:border-primary hover:shadow-[0_0_40px_var(--primary-glow)]">
              
              <div className="shine-effect w-full h-full animate-on-scroll rise-hidden observer-element">
                  <img src="/s2.jpg" alt="Award Banner" className="w-full h-auto object-cover block relative z-10" />
              </div>
              
              <div className="relative z-10 flex flex-col items-center py-10 px-6 md:px-12">
                  <div className="bg-surface text-primary text-xs font-bold tracking-widest uppercase px-4 py-2 rounded border border-primary/20 mb-6 transition-colors group-hover:bg-primary/20">
                      International Recognition
                  </div>
                  
                  <span className="text-sm font-bold text-gray-500 mb-2 transition-colors group-hover:text-gray-300">2024</span>
                  
                  <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-2 tracking-tight transition-all duration-300 transform group-hover:-translate-y-2 group-hover:text-white group-hover:drop-shadow-[0_0_15px_var(--primary-glow)] font-orbitron">
                      International Award
                  </h2>
              </div>
          </div>
      </section>

      {/* 3. OTHER AWARDS SECTION */}
      <section className="bg-background text-white py-24 px-6 md:px-12 lg:px-24">
          <div className="max-w-6xl mx-auto global-shine-wrapper">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                  <div className="group bg-surface-alt rounded-xl border border-gray-800 p-0 flex flex-col transition-all duration-300 hover:border-primary hover:shadow-[0_0_30px_var(--primary-glow)] relative overflow-hidden">
                      <div className="w-full h-80 sm:h-[450px] animate-on-scroll rise-hidden observer-element" style={{ overflow: 'hidden' }}>
                          <img src="/award.jpg" alt="Award Banner" className="w-full h-full object-cover block relative z-10 transform transition-transform duration-500 group-hover:scale-110" />
                      </div>
                      
                      <div className="p-8 flex flex-col items-center text-center">
                          <span className="text-xs font-bold text-gray-500 mb-4 transition-colors group-hover:text-gray-300">2023</span>
                          
                          <h3 className="text-xl font-bold text-white mb-2 transition-all duration-300 transform group-hover:-translate-y-1 group-hover:text-white group-hover:drop-shadow-[0_0_10px_var(--primary-glow)] font-orbitron">
                              Best Innovation Award
                          </h3>
                      </div>
                  </div>
                  
                  {/* Card 2 */}
                  <div className="group bg-surface-alt rounded-xl border border-gray-800 p-0 flex flex-col transition-all duration-300 hover:border-primary hover:shadow-[0_0_30px_var(--primary-glow)] relative overflow-hidden">
                      <div className="w-full h-80 sm:h-[450px] animate-on-scroll rise-hidden observer-element" style={{ transitionDelay: '100ms', overflow: 'hidden' }}>
                          <img src="/award.jpg" alt="Award Banner" className="w-full h-full object-cover block relative z-10 transform transition-transform duration-500 group-hover:scale-110" />
                      </div>
                      
                      <div className="p-8 flex flex-col items-center text-center">
                          <span className="text-xs font-bold text-gray-500 mb-4 transition-colors group-hover:text-gray-300">2022</span>
                          
                          <h3 className="text-xl font-bold text-white mb-2 transition-all duration-300 transform group-hover:-translate-y-1 group-hover:text-white group-hover:drop-shadow-[0_0_10px_var(--primary-glow)] font-orbitron">
                              Industry Leadership Award
                          </h3>
                      </div>
                  </div>
                  
                  {/* Card 3 */}
                  <div className="group bg-surface-alt rounded-xl border border-gray-800 p-0 flex flex-col transition-all duration-300 hover:border-primary hover:shadow-[0_0_30px_var(--primary-glow)] relative overflow-hidden">
                      <div className="w-full h-80 sm:h-[450px] animate-on-scroll rise-hidden observer-element" style={{ transitionDelay: '200ms', overflow: 'hidden' }}>
                          <img src="/award.jpg" alt="Award Banner" className="w-full h-full object-cover block relative z-10 transform transition-transform duration-500 group-hover:scale-110" />
                      </div>
                      
                      <div className="p-8 flex flex-col items-center text-center">
                          <span className="text-xs font-bold text-gray-500 mb-4 transition-colors group-hover:text-gray-300">2021</span>
                          
                          <h3 className="text-xl font-bold text-white mb-2 transition-all duration-300 transform group-hover:-translate-y-1 group-hover:text-white group-hover:drop-shadow-[0_0_10px_var(--primary-glow)] font-orbitron">
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
