import React, { useState, useEffect, useCallback } from 'react';
import { Menu, X, ArrowUpRight, Download, Sparkles, Globe, Sun, Moon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

const CV_PATH = '/cv-dori-frans-dika.pdf';
const CV_FILENAME = 'CV-Dori-Frans-Dika.pdf';

// All section IDs in exact DOM order (top → bottom), mapped to their nav group
const orderedSections = [
  { id: 'beranda', navHref: '#beranda' },
  { id: 'tentang', navHref: '#tentang' },
  { id: 'pendidikan', navHref: '#tentang' },
  { id: 'keahlian', navHref: '#keahlian' },
  { id: 'sertifikasi', navHref: '#keahlian' },
  { id: 'pengalaman', navHref: '#proyek' },
  { id: 'proyek', navHref: '#proyek' },
  { id: 'kontak', navHref: '#kontak' },
];

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const { theme, isDark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#beranda');

  const navLinks = [
    { name: t.nav.beranda, href: '#beranda' },
    { name: t.nav.tentang, href: '#tentang' },
    { name: t.nav.keahlian, href: '#keahlian' },
    { name: t.nav.project, href: '#proyek' },
    { name: t.nav.kontak, href: '#kontak' },
  ];

  // Programmatic download that bypasses browser cache
  const handleDownloadCV = useCallback(async (e) => {
    e.preventDefault();
    const freshUrl = `${CV_PATH}?v=${Date.now()}`;
    try {
      const res = await fetch(freshUrl, { cache: 'no-store' });
      if (!res.ok) throw new Error('Network response was not ok');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = CV_FILENAME;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      window.open(freshUrl, '_blank');
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Top of page boundary check: always Beranda
      if (window.scrollY < 100) {
        setActiveSection('#beranda');
        return;
      }

      // Bottom of page boundary check: always Kontak
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
        setActiveSection('#kontak');
        return;
      }

      // Use getBoundingClientRect for reliable viewport-relative position
      let matched = '#beranda';

      for (const section of orderedSections) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            matched = section.navHref;
          }
        }
      }

      setActiveSection(matched);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (!target) return;

    if (window.lenis) {
      window.lenis.scrollTo(target, { offset: -60, duration: 1.2 });
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 py-4 pointer-events-none transition-all duration-300">
      <div
        className={`pointer-events-auto w-full max-w-6xl rounded-full px-5 sm:px-7 py-3 transition-all duration-500 flex items-center justify-between ${
          scrolled
            ? 'glass-nav shadow-md dark:shadow-2xl dark:shadow-black/80 py-2.5 border-gray-200 dark:border-gold/20'
            : 'bg-white/80 dark:bg-dark-900/60 backdrop-blur-md border border-gray-200/80 dark:border-white/10 shadow-sm dark:shadow-none'
        }`}
      >
        {/* Brand Logo */}
        <a
          href="#beranda"
          onClick={(e) => handleNavClick(e, '#beranda')}
          className="group flex items-center gap-2 font-sans text-lg sm:text-xl font-extrabold tracking-tight text-gray-900 dark:text-white hover:text-amber-600 dark:hover:text-gold transition-colors duration-300"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-gold shadow-[0_0_10px_#d4af37] group-hover:scale-125 transition-transform"></span>
          <span>Dori Frans Dika<span className="text-amber-600 dark:text-gold">.</span></span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative px-3.5 py-1.5 text-xs xl:text-sm font-medium tracking-wide transition-all duration-300 rounded-full ${
                  isActive
                    ? 'text-amber-600 dark:text-gold font-semibold bg-amber-500/10 dark:bg-gold/10'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-white/5'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold shadow-[0_0_6px_#d4af37]"></span>
                )}
              </a>
            );
          })}
        </nav>

        {/* Action Buttons: Theme Toggle, Language Switcher, Download CV & Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Toggle Button (Sun/Moon) */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? 'Ganti ke Light Mode' : 'Ganti ke Dark Mode'}
            title={isDark ? 'Mode Terang (Light Mode)' : 'Mode Gelap (Dark Mode)'}
            className="p-2 rounded-full border border-gray-200 dark:border-gold/30 bg-white/90 dark:bg-dark-900/90 text-gray-700 dark:text-gold hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-300 shadow-sm cursor-pointer hover:scale-105 active:scale-95"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400 animate-in spin-in-90 duration-300" />
            ) : (
              <Moon className="w-4 h-4 text-gray-700 animate-in spin-in-90 duration-300" />
            )}
          </button>

          {/* Language Switcher Pill */}
          <div className="flex items-center p-0.5 sm:p-1 rounded-full bg-white dark:bg-dark-900/90 border border-gray-200 dark:border-gold/30 text-xs font-mono backdrop-blur-md shadow-sm dark:shadow-inner">
            <button
              type="button"
              onClick={() => setLanguage('id')}
              title="Bahasa Indonesia"
              className={`px-2 py-0.5 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                language === 'id'
                  ? 'bg-gradient-to-r from-gold-300 via-gold to-amber-500 text-dark-950 shadow-sm'
                  : 'text-gray-500 hover:text-gray-900 dark:text-neutral-400 dark:hover:text-white'
              }`}
            >
              ID
            </button>
            <button
              type="button"
              onClick={() => setLanguage('en')}
              title="English"
              className={`px-2 py-0.5 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                language === 'en'
                  ? 'bg-gradient-to-r from-gold-300 via-gold to-amber-500 text-dark-950 shadow-sm'
                  : 'text-gray-500 hover:text-gray-900 dark:text-neutral-400 dark:hover:text-white'
              }`}
            >
              EN
            </button>
          </div>

          <button
            onClick={handleDownloadCV}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-dark-950 bg-gradient-to-r from-gold-300 via-gold to-amber-500 rounded-full hover:brightness-110 shadow-lg shadow-gold/20 hover:shadow-gold/40 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>{t.nav.downloadCv}</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:text-neutral-300 dark:hover:text-white dark:hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-amber-600 dark:text-gold" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto fixed inset-x-4 top-20 rounded-2xl glass-nav bg-white/95 dark:bg-dark-950/95 p-6 border border-gray-200 dark:border-gold/30 shadow-2xl flex flex-col gap-3 lg:hidden animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-white/10">
            <span className="text-xs font-mono text-amber-600 dark:text-gold uppercase tracking-widest flex items-center gap-1.5 font-semibold">
              <Sparkles className="w-3 h-3 text-amber-600 dark:text-gold" /> {t.nav.menuTitle}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-medium">
              Cumlaude 3.68
            </span>
          </div>

          {/* Mobile Language & Theme Row */}
          <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs">
            <span className="text-gray-600 dark:text-neutral-400 font-mono flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-amber-600 dark:text-gold" />
              <span>Bahasa / Language:</span>
            </span>
            <div className="flex items-center gap-1 p-0.5 rounded-lg bg-white dark:bg-dark-900 border border-gray-200 dark:border-gold/30 font-mono">
              <button
                type="button"
                onClick={() => setLanguage('id')}
                className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all ${
                  language === 'id'
                    ? 'bg-gold text-dark-950 shadow'
                    : 'text-gray-500 hover:text-gray-900 dark:text-neutral-400 dark:hover:text-white'
                }`}
              >
                ID
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all ${
                  language === 'en'
                    ? 'bg-gold text-dark-950 shadow'
                    : 'text-gray-500 hover:text-gray-900 dark:text-neutral-400 dark:hover:text-white'
                }`}
              >
                EN
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-neutral-300 hover:text-amber-600 dark:hover:text-gold hover:bg-amber-500/10 dark:hover:bg-gold/10 transition-colors flex items-center justify-between"
              >
                <span>{link.name}</span>
                <ArrowUpRight className="w-4 h-4 opacity-40 group-hover:opacity-100" />
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-gray-200 dark:border-white/10 flex flex-col gap-2">
            <button
              onClick={handleDownloadCV}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold uppercase tracking-wider text-dark-950 bg-gradient-to-r from-gold-300 via-gold to-amber-500 rounded-xl hover:brightness-110 shadow-lg shadow-gold/20 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{t.nav.downloadCv} PDF</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
