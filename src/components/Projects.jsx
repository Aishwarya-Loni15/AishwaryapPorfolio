import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Play, ExternalLink, ArrowUpRight, Sparkles, Layers } from 'lucide-react';
import { Github } from './Icons';
import { projectsData } from '../data/portfolioData';

export default function Projects({ onSelectProject }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Enterprise', 'AI & 3D', 'IoT & Embedded', 'Academic', 'Personal'];

  const filteredProjects = projectsData.filter((project) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      project.category.toLowerCase().includes(selectedCategory.toLowerCase());

    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="py-24 relative bg-slate-950/60 light:bg-slate-50 border-t border-slate-800/60">
      {/* Glow background accent */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/30 uppercase tracking-widest mb-3"
          >
            <Sparkles className="w-3.5 h-3.5" /> Featured Engineering Portfolio
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-heading font-extrabold text-white light:text-slate-900 tracking-tight"
          >
            Innovations & Live Demos
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-3 max-w-2xl text-slate-400 light:text-slate-600 text-sm sm:text-base"
          >
            From enterprise financial audit systems to 3D graphics simulations and ESP32 IoT telemetry nodes. Explore interactive working demos directly in your browser.
          </motion.p>
        </div>

        {/* Category Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Category Pills */}
          <div className="flex items-center gap-1.5 flex-wrap justify-center bg-slate-900/80 light:bg-white p-1.5 rounded-2xl border border-slate-800 light:border-slate-300">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-medium font-mono transition duration-200 ${
                    active
                      ? 'bg-purple-600 text-white font-bold shadow-lg shadow-purple-600/30'
                      : 'text-slate-400 light:text-slate-600 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by tech or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 light:bg-white border border-slate-800 light:border-slate-300 text-xs text-slate-200 light:text-slate-900 placeholder:text-slate-500 focus:outline-none focus:border-purple-500 transition"
            />
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group relative flex flex-col justify-between rounded-2xl glass-card overflow-hidden p-6 hover:shadow-2xl border border-slate-800/80 light:border-slate-200 cursor-pointer"
                onClick={() => onSelectProject(project)}
              >
                {/* Top Badge & Action Arrow */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-purple-500/10 text-purple-300 light:text-purple-700 border border-purple-500/30">
                      {project.category}
                    </span>
                    <div className="p-2 rounded-full bg-slate-800/80 text-slate-400 group-hover:text-purple-400 group-hover:bg-purple-500/20 group-hover:scale-110 transition">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-heading font-extrabold text-white light:text-slate-900 group-hover:text-purple-400 transition mb-2">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 light:text-slate-600 text-xs sm:text-sm line-clamp-3 leading-relaxed mb-6">
                    {project.shortDesc}
                  </p>
                </div>

                <div>
                  {/* Highlights / Metric Chips */}
                  {project.metrics && (
                    <div className="grid grid-cols-3 gap-2 py-3 px-3 rounded-xl bg-slate-950/60 light:bg-slate-100 border border-slate-800/60 light:border-slate-200 mb-5 font-mono">
                      {project.metrics.map((m, idx) => (
                        <div key={idx} className="text-center">
                          <div className="text-xs font-bold text-purple-400">{m.value}</div>
                          <div className="text-[10px] text-slate-400 truncate">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tech.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-slate-900 light:bg-slate-200 text-slate-300 light:text-slate-700 border border-slate-800 light:border-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="px-2 py-1 rounded-md text-[10px] font-mono bg-purple-950/50 text-purple-300 border border-purple-800">
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </div>

                  {/* CTA Footer */}
                  <div className="pt-4 border-t border-slate-800/80 light:border-slate-200 flex items-center justify-between text-xs font-mono">
                    <span className="text-purple-400 font-semibold group-hover:underline flex items-center gap-1">
                      <Play className="w-3.5 h-3.5" /> Launch Demo & Details
                    </span>
                    <span className="text-slate-500 font-sans text-[11px]">{project.type}</span>
                  </div>
                </div>

                {/* Hover Glow Border Overlay */}
                <div className="absolute inset-0 rounded-2xl border-2 border-purple-500/0 group-hover:border-purple-500/40 pointer-events-none transition duration-300" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16 text-slate-400 font-mono text-sm">
            No projects matched your search term "{searchQuery}". Try searching for Java, React, Python, ESP32, or 3D.
          </div>
        )}

      </div>
    </section>
  );
}
