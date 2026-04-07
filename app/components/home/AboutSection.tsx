'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate, useSpring } from 'framer-motion';

const stats = [
  { num: 500, plus: '+', label: 'Active Members' },
  { num: 15, plus: '+', label: 'Years of Excellence' },
  { num: 50, plus: '+', label: 'Annual Events' },
  { num: 15, plus: '+', label: 'Chapters & Societies' },
];

function Counter({ value, isInView }: { value: number; isInView: boolean }) {
  const springValue = useSpring(0, {
    stiffness: 40,
    damping: 20,
    restDelta: 0.001
  });
  const displayValue = useTransform(springValue, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, value, springValue]);

  return <motion.span>{displayValue}</motion.span>;
}

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section 
      ref={ref}
      className={`about-section ${isInView ? 'state-enter' : ''}`} 
      id="about"
    >
      <div className="about-grid" />
      
      <div className="about-container">
        <div className="about-text-column">
          <h2 className="about-main-title">About Us</h2>
          
          <p className="headline">
            Empowering the Next Generation of Tech Leaders
          </p>
          
          <div className="body-wrapper">
            <p className="body-text-p">
              The IEEE Student Branch of the University of Moratuwa is a vibrant community 
              dedicated to fostering technical innovation and professional growth. 
              As one of the leading student branches in the region, we provide our 
              members with unparalleled opportunities to connect, learn, and lead 
              in the ever-evolving world of technology.
            </p>
            <p className="body-text-p">
              Our mission is to inspire and engage students through technical excellence, 
              community service, and professional development, building a bridge 
              between academic learning and industry impact.
            </p>
          </div>
        </div>

        <div className="about-stats-column">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                className="stat-item"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="stat-top">
                  <span className="stat-num">
                    <Counter value={stat.num} isInView={isInView} />
                  </span>
                  <span className="stat-plus">{stat.plus}</span>
                </div>
                <span className="stat-label">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
