import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Sun, Moon, FileText, Menu, X, Sparkles, Terminal } from 'lucide-react';

export default function Navbar({ isDark, toggleTheme, onOpenResume }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Journey', href: '#journey' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Section highlight detector
      const sections = navLinks.map(link => link.href.substring(1));
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-slate-950/85 light:bg-white/85 backdrop-blur-md border-b border-slate-800/80 light:border-slate-200 shadow-xl'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#home" className="flex items-center gap-2.5 group">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-purple-600 to-cyan-500 text-white shadow-lg shadow-purple-600/30 group-hover:scale-105 transition duration-300">
            <Code2 className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-purple-400 light:from-slate-900 light:to-purple-700 bg-clip-text text-transparent">
              Aishwarya Loni
            </span>
            <span className="text-[10px] font-mono text-purple-400 light:text-purple-600 tracking-wider font-semibold uppercase">
              MCA • Full-Stack • AI
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 light:bg-slate-100/80 p-1.5 rounded-full border border-slate-800/80 light:border-slate-200 backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                className={`relative px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                  isActive
                    ? 'text-white light:text-slate-900 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 light:text-slate-600 light:hover:text-slate-900'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-500 rounded-full shadow-md"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="hidden md:flex items-center gap-3">
          {/* Resume Button */}
          <button
            onClick={onOpenResume}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-full bg-slate-800 light:bg-slate-200 text-slate-200 light:text-slate-800 hover:bg-slate-700 light:hover:bg-slate-300 border border-slate-700 light:border-slate-300 transition shadow-sm"
          >
            <FileText className="w-3.5 h-3.5 text-purple-400" />
            <span>Resume</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-slate-800 light:bg-slate-200 text-amber-400 light:text-purple-600 hover:bg-slate-700 light:hover:bg-slate-300 border border-slate-700 light:border-slate-300 transition"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-purple-600" />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-slate-800 text-amber-400 border border-slate-700"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-800 text-slate-200 border border-slate-700"
            aria-label="Open Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-950/95 light:bg-white/95 border-b border-slate-800 backdrop-blur-xl px-4 py-5 shadow-2xl"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 transition"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-3 mt-2 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenResume();
                  }}
                  className="w-full py-2.5 rounded-lg bg-purple-600 text-white font-medium text-sm flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4" /> View & Download Resume
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
