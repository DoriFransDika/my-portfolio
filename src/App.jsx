import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import { useLenis } from './hooks/useLenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function App() {
  const [showPreloader, setShowPreloader] = useState(true);

  // Initialize Lenis Smooth Scroll synchronized with GSAP ScrollTrigger
  useLenis();

  const handlePreloaderFinished = useCallback(() => {
    setShowPreloader(false);
  }, []);

  useEffect(() => {
    if (showPreloader) return;

    // Refresh ScrollTrigger calculations after preloader is gone and everything is rendered
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [showPreloader]);

  return (
    <div className="relative min-h-screen bg-[#0d0d0d] text-[#e5e5e5] selection:bg-gold/30 selection:text-gold-200">
      {/* Intro Preloader / Splash Screen */}
      {showPreloader && <Preloader onFinished={handlePreloaderFinished} />}

      {/* Top Floating Glassmorphism Navbar */}
      <Navbar />

      {/* Main Single-Page Content Sections */}
      <main>
        <Hero />
        <About />
        <Education />
        <Skills />
        <Certifications />
        <Experience />
        <Projects />
        <Contact />
      </main>

      {/* Footer with Running Marquee & Copyright */}
      <Footer />
    </div>
  );
}
