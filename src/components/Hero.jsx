import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, Sparkles, Terminal, Code, ShieldCheck, Cpu, Brain, Download, ExternalLink, ArrowRight } from 'lucide-react';
import ThreeCanvas from './ThreeCanvas';
import { personalInfo } from '../data/portfolioData';

export default function Hero({ isDark, onExploreWork, onOpenResume }) {
  const [tagIndex, setTagIndex] = useState(0);
  const roles = [
    "Master of Computer Applications (MCA) Student",
    "Full-Stack Java & Python Developer",
    "AI Systems & 3D Simulation Developer",
    "Cybersecurity & IoT Hardware Explorer"
  ];

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-grid-pattern">
      {/* 3D Particle Canvas Background */}
      <ThreeCanvas isDark={isDark} />

      {/* Decorative Glow Spheres */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Availability Badge & Profile Avatar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-3 mb-6"
        >
          {/* Profile Photo Thumbnail */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300" />
            <img
              src="/avatar.jpg"
              alt="Aishwarya Loni"
              className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-slate-900 shadow-xl"
            />
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 light:bg-white/80 border border-slate-700/60 light:border-slate-300 shadow-xl backdrop-blur-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-mono text-slate-300 light:text-slate-700 font-medium">
              {personalInfo.status}
            </span>
          </div>
        </motion.div>

        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-4"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-extrabold tracking-tight text-white light:text-slate-900 leading-[1.1]">
            Hello, I'm{' '}
            <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-cyan-400 light:from-purple-700 light:to-cyan-600 bg-clip-text text-transparent">
              {personalInfo.name}
            </span>
          </h1>
        </motion.div>

        {/* Cycling Subheadline Role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="h-10 mb-6 flex items-center justify-center"
        >
          <motion.div
            key={currentRoleIndex}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="text-lg sm:text-2xl font-mono text-purple-400 light:text-purple-700 font-semibold flex items-center gap-2"
          >
            <Terminal className="w-5 h-5 text-cyan-400 inline-block" />
            <span>{roles[currentRoleIndex]}</span>
          </motion.div>
        </motion.div>

        {/* Bio Pitch */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="max-w-2xl text-slate-400 light:text-slate-600 text-sm sm:text-base leading-relaxed mb-8"
        >
          Passionate about building robust enterprise microservices, interactive 3D simulations, embedded IoT hardware telemetry, and AI security systems. MCA student with a relentless drive for clean code and polished deliverables.
        </motion.p>

        {/* Dynamic Skill Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-2.5 mb-10 max-w-3xl"
        >
          {personalInfo.skillsSummary.map((skill, i) => (
            <motion.span
              key={skill}
              whileHover={{ scale: 1.08, y: -2 }}
              className="px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium bg-slate-900/70 light:bg-slate-100 border border-slate-800 light:border-slate-300 text-slate-300 light:text-slate-700 shadow-md hover:border-purple-500/60 hover:text-purple-300 transition duration-200 cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3 h-3 text-cyan-400" />
              {skill}
            </motion.span>
          ))}
        </motion.div>

        {/* Primary CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
        >
          <a
            href="#projects"
            onClick={onExploreWork}
            className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-purple-600 to-purple-500 text-white font-semibold text-sm shadow-xl shadow-purple-600/30 hover:shadow-purple-600/50 hover:scale-[1.02] transition duration-200"
          >
            <span>Explore My Work</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </a>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-slate-900/80 light:bg-white border border-slate-800 light:border-slate-300 text-slate-200 light:text-slate-800 font-semibold text-sm hover:bg-slate-800 light:hover:bg-slate-100 transition shadow-md"
          >
            Get In Touch
          </a>

          <button
            onClick={onOpenResume}
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-purple-950/40 light:bg-purple-100 border border-purple-500/30 text-purple-300 light:text-purple-800 font-semibold text-sm hover:bg-purple-900/50 transition"
          >
            <Download className="w-4 h-4" />
            <span>Interactive Resume</span>
          </button>
        </motion.div>

        {/* Animated Quick Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl glass-card border border-slate-800/80 shadow-2xl"
        >
          {personalInfo.stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center p-2">
              <span className="font-heading font-extrabold text-2xl sm:text-3xl text-white light:text-slate-900 flex items-center">
                {stat.value}
                <span className="text-purple-400 text-lg sm:text-xl font-mono">{stat.suffix}</span>
              </span>
              <span className="text-xs font-mono text-slate-400 light:text-slate-600 mt-1 uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
