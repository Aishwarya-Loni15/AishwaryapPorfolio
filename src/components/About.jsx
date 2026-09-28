import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Sparkles, Layers, FileText, ExternalLink, MapPin, Mail, Award } from 'lucide-react';
import { Github, Linkedin } from './Icons';
import { personalInfo, corePhilosophies } from '../data/portfolioData';

export default function About({ onOpenResume }) {
  const iconMap = {
    ShieldAlert: <ShieldAlert className="w-5 h-5 text-red-400" />,
    Sparkles: <Sparkles className="w-5 h-5 text-purple-400" />,
    Layers: <Layers className="w-5 h-5 text-cyan-400" />
  };

  return (
    <section id="about" className="py-24 relative bg-slate-950 light:bg-white border-t border-slate-800/60">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Avatar Image Card Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 flex flex-col items-center"
          >
            <div className="relative group w-full max-w-sm">
              {/* Animated Glow Halo */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition duration-500 animate-pulse" />

              {/* Card Container */}
              <div className="relative rounded-3xl overflow-hidden glass-card p-3 border border-slate-700/80 bg-slate-900/90 shadow-2xl">
                <img
                  src="/avatar.jpg"
                  alt="Aishwarya Loni"
                  className="w-full h-[380px] object-cover rounded-2xl group-hover:scale-105 transition duration-500"
                />

                {/* Floating Overlay Badge */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800 text-center">
                  <h4 className="font-heading font-extrabold text-white text-base">Aishwarya Loni</h4>
                  <p className="text-xs font-mono text-purple-400 font-semibold">MCA Candidate & Full-Stack Engineer</p>
                </div>
              </div>
            </div>

            {/* Direct Contact Links strip */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-purple-500 transition shadow-md"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-purple-500 transition shadow-md"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-purple-500 transition shadow-md"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Bio & Philosophy Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 space-y-6"
          >
            <div>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/30 uppercase tracking-widest mb-3">
                <Sparkles className="w-3.5 h-3.5" /> About Me & Engineering Values
              </span>
              <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white light:text-slate-900 tracking-tight">
                Crafting Reliable Code & Secure Architectures
              </h2>
            </div>

            <p className="text-slate-300 light:text-slate-600 text-sm sm:text-base leading-relaxed">
              I am an MCA student driven by the challenge of bridging software complexity into seamless, high-performance web applications. My background spans Java microservices, Python AI pipelines, embedded ESP32 hardware telemetry, and cybersecurity principles.
            </p>

            <p className="text-slate-300 light:text-slate-600 text-sm sm:text-base leading-relaxed">
              Whether building an enterprise financial audit platform or simulating 3D nature ecosystems, I focus on delivering code that is secure, well-documented, and visually delightful.
            </p>

            {/* Engineering Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {corePhilosophies.map((p, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-900/60 light:bg-slate-100 border border-slate-800/80 light:border-slate-200">
                  <div className="mb-2">{iconMap[p.icon]}</div>
                  <h4 className="font-heading font-bold text-xs text-white light:text-slate-900 mb-1">{p.title}</h4>
                  <p className="text-[11px] text-slate-400 light:text-slate-600 leading-snug">{p.desc}</p>
                </div>
              ))}
            </div>

            {/* Resume Button CTA */}
            <div className="pt-4 flex items-center gap-4">
              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs shadow-lg shadow-purple-600/30 transition"
              >
                <FileText className="w-4 h-4" /> Open Full Interactive Resume
              </button>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
