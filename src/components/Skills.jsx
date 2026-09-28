import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Server, Layout, Cpu, Brain, ShieldCheck, Sparkles, CheckCircle } from 'lucide-react';
import { skillsCategories } from '../data/portfolioData';

export default function Skills() {
  const [selectedCategoryId, setSelectedCategoryId] = useState('all');

  const iconMap = {
    Server: <Server className="w-5 h-5 text-purple-400" />,
    Layout: <Layout className="w-5 h-5 text-cyan-400" />,
    Cpu: <Cpu className="w-5 h-5 text-emerald-400" />,
    Brain: <Brain className="w-5 h-5 text-amber-400" />,
    ShieldCheck: <ShieldCheck className="w-5 h-5 text-red-400" />
  };

  const displayedCategories =
    selectedCategoryId === 'all'
      ? skillsCategories
      : skillsCategories.filter(c => c.id === selectedCategoryId);

  return (
    <section id="skills" className="py-24 relative bg-slate-950 light:bg-white border-t border-slate-800/60">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/30 uppercase tracking-widest mb-3"
          >
            <Sparkles className="w-3.5 h-3.5" /> Technical Matrix & Proficiency
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-heading font-extrabold text-white light:text-slate-900 tracking-tight"
          >
            Skills & Core Domains
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-3 max-w-2xl text-slate-400 light:text-slate-600 text-sm sm:text-base"
          >
            Cross-disciplinary technical depth spanning enterprise backend development, responsive web engineering, embedded IoT hardware, AI data pipelines, and cyber security fundamentals.
          </motion.p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-12">
          <button
            onClick={() => setSelectedCategoryId('all')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition ${
              selectedCategoryId === 'all'
                ? 'bg-purple-600 text-white font-bold shadow-lg shadow-purple-600/30'
                : 'bg-slate-900 light:bg-slate-100 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            All Categories
          </button>
          {skillsCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategoryId(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition flex items-center gap-2 ${
                selectedCategoryId === cat.id
                  ? 'bg-purple-600 text-white font-bold shadow-lg shadow-purple-600/30'
                  : 'bg-slate-900 light:bg-slate-100 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {iconMap[cat.icon]}
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayedCategories.map((category) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl glass-card p-6 border border-slate-800/80 light:border-slate-200 flex flex-col justify-between hover:shadow-2xl"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 rounded-xl bg-slate-900 light:bg-slate-100 border border-slate-800 light:border-slate-200">
                    {iconMap[category.icon]}
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-extrabold text-white light:text-slate-900">
                      {category.name}
                    </h3>
                    <span className="text-[11px] font-mono text-purple-400">
                      {category.skills.length} Competencies
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-400 light:text-slate-600 mb-6 leading-relaxed">
                  {category.description}
                </p>

                {/* Skill Items with Animated Progress Bars */}
                <div className="space-y-4">
                  {category.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-center text-xs mb-1.5 font-mono">
                        <span className="text-slate-200 light:text-slate-800 font-medium flex items-center gap-1.5">
                          <CheckCircle className="w-3.5 h-3.5 text-purple-400" />
                          {skill.name}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-900 text-slate-400 border border-slate-800">
                            {skill.status}
                          </span>
                          <span className="font-bold text-purple-400">{skill.level}%</span>
                        </div>
                      </div>

                      {/* Progress Bar Container */}
                      <div className="w-full bg-slate-900 light:bg-slate-200 rounded-full h-2.5 overflow-hidden p-0.5 border border-slate-800/80">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: 'easeOut' }}
                          className="h-full rounded-full bg-gradient-to-r from-purple-500 via-purple-400 to-cyan-400 shadow-md shadow-purple-500/20"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/60 text-[11px] font-mono text-slate-500 flex items-center justify-between">
                <span>Domain Focus</span>
                <span className="text-purple-400">Polished Production Standards</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
