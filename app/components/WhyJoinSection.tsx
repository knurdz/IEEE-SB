import React from 'react';
import './why-join.css';

export default function WhyJoinSection() {
  return (
    <section className="mindmap-section">
      <div className="mindmap-wrapper">
        <svg className="connections" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
          <path className="line line-1" d="M 600 350 L 600 200" />
          <path className="pulse pulse-1" d="M 600 350 L 600 200" />
          
          <path className="line line-2" d="M 680 400 L 800 400 L 800 320 L 895 320" strokeLinejoin="miter" />
          <path className="pulse pulse-2" d="M 680 400 L 800 400 L 800 320 L 895 320" strokeLinejoin="miter" />
          
          <path className="line line-3" d="M 680 400 L 800 400 L 800 560" strokeLinejoin="miter" />
          <path className="pulse pulse-3" d="M 680 400 L 800 400 L 800 560" strokeLinejoin="miter" />
          
          <path className="line line-4" d="M 520 400 L 400 400 L 400 560" strokeLinejoin="miter" />
          <path className="pulse pulse-4" d="M 520 400 L 400 400 L 400 560" strokeLinejoin="miter" />
          
          <path className="line line-5" d="M 520 400 L 400 400 L 400 320 L 305 320" strokeLinejoin="miter" />
          <path className="pulse pulse-5" d="M 520 400 L 400 400 L 400 320 L 305 320" strokeLinejoin="miter" />
        </svg>

        <div className="center-card">
          <h1>Why Join<br />IEEE</h1>
        </div>

        <div className="card card-1" style={{ left: '50%', top: '15%' }}>
          <h3>Global Network</h3>
          <p>Connect with over 400,000 tech professionals across 160 countries.</p>
        </div>

        <div className="card card-2" style={{ left: '85%', top: '40%' }}>
          <h3>Research Access</h3>
          <p>Unlock the world's largest technical library and leading journals.</p>
        </div>

        <div className="card card-3" style={{ left: '75%', top: '80%' }}>
          <h3>Premier Events</h3>
          <p>Attend and present at top-tier technical conferences and symposiums.</p>
        </div>

        <div className="card card-4" style={{ left: '25%', top: '80%' }}>
          <h3>Career Growth</h3>
          <p>Gain mentorship, career resources, and exclusive tech job opportunities.</p>
        </div>

        <div className="card card-5" style={{ left: '15%', top: '40%' }}>
          <h3>Global Standards</h3>
          <p>Shape the future of technology by contributing to global frameworks.</p>
        </div>
      </div>
    </section>
  );
}
