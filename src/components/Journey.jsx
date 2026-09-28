import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, BookOpen, Sparkles, Calendar, CheckCircle2 } from 'lucide-react';
import { journeyTimeline } from '../data/portfolioData';

export default function Journey() {
  return (
    <section id="journey" className="py-24 relative bg-slate-950/70 light:bg-slate-50 border-t border-slate-800/60">
      {/* Decorative Glow */}
      <div className="absolute bottom-10 left-1/3 w-96 h-96 bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/30 uppercase tracking-widest mb-3"
          >
            <Sparkles className="w-3.5 h-3.5" /> Academic & Professional Growth
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-heading font-extrabold text-white light:text-slate-900 tracking-tight"
          >
            Education & Journey Timeline
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-3 max-w-2xl text-slate-400 light:text-slate-600 text-sm sm:text-base"
          >
            Tracking academic achievements in Master of Computer Applications (MCA), technical certifications, and milestone project deployments.
          </motion.p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l-2 border-purple-500/30 ml-4 sm:ml-8 md:ml-1/2 space-y-12">
          {journeyTimeline.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative pl-8 sm:pl-10"
            >
              {/* Animated Timeline Node */}
              <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-slate-950 border-2 border-purple-500 flex items-center justify-center text-purple-400 shadow-lg shadow-purple-500/40">
                <GraduationCap className="w-4 h-4" />
              </div>

              {/* Card Container */}
              <div className="glass-card p-6 sm:p-8 rounded-2xl border border-slate-800/80 light:border-slate-200 hover:shadow-2xl">
                {/* Year & Badge */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-400 bg-cyan-950/50 px-3 py-1 rounded-full border border-cyan-800/60">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.year}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    {item.badge}
                  </span>
                </div>

                {/* Title & Institution */}
                <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-white light:text-slate-900 mb-1">
                  {item.title}
                </h3>
                <h4 className="text-xs sm:text-sm font-mono text-purple-400 light:text-purple-700 mb-4">
                  {item.institution}
                </h4>

                {/* Description */}
                <p className="text-slate-300 light:text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                  {item.description}
                </p>

                {/* Bullet Highlights */}
                <div className="space-y-2">
                  <h5 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Key Highlights & Deliverables
                  </h5>
                  {item.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300 light:text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
