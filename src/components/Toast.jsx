import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';

export default function Toast({ message, onClose }) {
  if (!message) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900 border border-purple-500/50 shadow-2xl text-xs font-mono text-slate-100 backdrop-blur-md"
      >
        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
        <span>{message}</span>
        <button
          onClick={onClose}
          className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition ml-2"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
