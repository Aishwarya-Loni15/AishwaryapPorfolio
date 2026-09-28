import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Code2, Layers, Play, CheckCircle2, Copy, Check } from 'lucide-react';
import { Github } from './Icons';
import GovtTrackerSimulator from './GovtTrackerSimulator';
import ElectronicsShopSimulator from './ElectronicsShopSimulator';
import LoanTrackerSimulator from './LoanTrackerSimulator';
import Nature3DCanvas from './Nature3DCanvas';
import IoTSimulator from './IoTSimulator';
import ThreatDetectorSimulator from './ThreatDetectorSimulator';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'demo', 'code'
  const [copiedCode, setCopiedCode] = useState(false);

  const handleCopyCode = () => {
    if (!project.codeSnippet) return;
    navigator.clipboard.writeText(project.codeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const renderSimulator = () => {
    switch (project.interactiveType) {
      case 'govt-tracker':
        return <GovtTrackerSimulator />;
      case 'electronics-shop':
        return <ElectronicsShopSimulator />;
      case 'loan-tracker':
        return <LoanTrackerSimulator />;
      case 'nature-3d':
        return <Nature3DCanvas />;
      case 'iot-simulator':
        return <IoTSimulator />;
      case 'threat-suite':
        return <ThreatDetectorSimulator />;
      default:
        return (
          <div className="p-8 text-center bg-slate-900 rounded-xl border border-slate-800 text-slate-400">
            <Play className="w-12 h-12 text-purple-400 mx-auto mb-3 animate-pulse" />
            <h4 className="font-heading font-bold text-lg text-white mb-1">Live Interactive Sandbox Ready</h4>
            <p className="text-xs max-w-md mx-auto mb-4">
              Explore source repository or access full live deployed instance.
            </p>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs transition"
            >
              <Github className="w-4 h-4" /> View GitHub Repository
            </a>
          </div>
        );
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-10 my-auto flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-slate-800 flex items-start justify-between bg-slate-900/60">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {project.category}
                </span>
                <span className="text-xs text-slate-400 font-mono">{project.type}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-white">
                {project.title}
              </h3>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Tabs Bar */}
          <div className="px-6 pt-3 bg-slate-900/40 border-b border-slate-800 flex items-center gap-4 text-xs font-medium font-mono">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 border-b-2 transition ${
                activeTab === 'overview'
                  ? 'border-purple-500 text-purple-400 font-bold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Overview & Features
            </button>
            <button
              onClick={() => setActiveTab('demo')}
              className={`pb-3 border-b-2 transition flex items-center gap-1.5 ${
                activeTab === 'demo'
                  ? 'border-purple-500 text-purple-400 font-bold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Play className="w-3.5 h-3.5 text-cyan-400" /> Interactive Simulation Demo
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`pb-3 border-b-2 transition flex items-center gap-1.5 ${
                activeTab === 'code'
                  ? 'border-purple-500 text-purple-400 font-bold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" /> Architecture & Code
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 overflow-y-auto flex-1 space-y-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-purple-400 mb-2">
                    Project Description
                  </h4>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {project.fullDesc}
                  </p>
                </div>

                {/* Metrics Grid */}
                {project.metrics && (
                  <div>
                    <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-purple-400 mb-3">
                      Performance Metrics & Results
                    </h4>
                    <div className="grid grid-cols-3 gap-3">
                      {project.metrics.map((m, i) => (
                        <div key={i} className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-center">
                          <div className="font-heading font-extrabold text-xl text-purple-400">{m.value}</div>
                          <div className="text-[11px] text-slate-400 font-mono mt-0.5">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Features */}
                <div>
                  <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-purple-400 mb-3">
                    Core Technical Features
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {project.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Badges */}
                <div>
                  <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-purple-400 mb-2">
                    Technologies & Frameworks
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span key={t} className="px-3 py-1 rounded-md text-xs font-mono bg-slate-800 text-slate-200 border border-slate-700">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'demo' && (
              <div className="space-y-4">
                <div className="text-xs text-slate-400 font-mono mb-2 flex items-center justify-between">
                  <span>Interactive Live Sandbox Environment</span>
                  <span className="text-purple-400">Click & Interact with controls below</span>
                </div>
                {renderSimulator()}
              </div>
            )}

            {activeTab === 'code' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-purple-400">
                    Source Code Architecture Snippet
                  </h4>
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1.5 px-3 py-1 rounded bg-slate-800 text-xs font-mono text-slate-300 hover:text-white transition border border-slate-700"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-purple-300 overflow-x-auto">
                  <pre>{project.codeSnippet}</pre>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-900/80 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs transition border border-slate-700"
              >
                <Github className="w-4 h-4" /> GitHub Repository
              </a>
            </div>

            <button
              onClick={onClose}
              className="px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition"
            >
              Close Details
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
