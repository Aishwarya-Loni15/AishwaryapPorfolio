import React from 'react';
import { ArrowUp, Code, Heart, Sparkles, Mail } from 'lucide-react';
import { Github, Linkedin } from './Icons';
import { personalInfo } from '../data/portfolioData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 py-12 text-slate-400 font-sans text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Info */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Code className="w-5 h-5" />
          </div>
          <div>
            <div className="font-heading font-bold text-white text-sm">
              Aishwarya Loni
            </div>
            <div className="font-mono text-[11px] text-slate-500">
              © {new Date().getFullYear()} Aishwarya Loni. All rights reserved.
            </div>
          </div>
        </div>

        {/* Center Tech Stack Badge */}
        <div className="flex items-center gap-2 font-mono text-[11px] bg-slate-900/80 px-4 py-2 rounded-full border border-slate-800">
          <span>Architected with</span>
          <span className="text-purple-400 font-bold">React</span>
          <span>•</span>
          <span className="text-cyan-400 font-bold">Three.js</span>
          <span>•</span>
          <span className="text-emerald-400 font-bold">Framer Motion</span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-slate-900 hover:text-white border border-slate-800 transition"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-slate-900 hover:text-white border border-slate-800 transition"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs font-bold transition shadow-md shadow-purple-600/20"
            aria-label="Scroll to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
