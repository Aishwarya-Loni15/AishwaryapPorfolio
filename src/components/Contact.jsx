import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Copy, Check, MapPin, Sparkles, MessageSquare, CheckCircle2 } from 'lucide-react';
import { Github, Linkedin } from './Icons';
import confetti from 'canvas-confetti';
import { personalInfo } from '../data/portfolioData';

export default function Contact({ onShowToast }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Discuss a Job Opportunity',
    message: ''
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const presets = [
    'Discuss a Job Opportunity',
    'Collaborate on a Project',
    'General Inquiry'
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    onShowToast && onShowToast('Email copied to clipboard!');
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      onShowToast && onShowToast('Please fill out all required fields.');
      return;
    }

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 }
    });

    setSubmitted(true);
    onShowToast && onShowToast('Message transmitted successfully!');
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: 'Discuss a Job Opportunity', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-24 relative bg-slate-950/80 light:bg-slate-50 border-t border-slate-800/60">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/30 uppercase tracking-widest mb-3"
          >
            <Sparkles className="w-3.5 h-3.5" /> Direct Contact & Collaboration
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-heading font-extrabold text-white light:text-slate-900 tracking-tight"
          >
            Let's Build Something Exceptional
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-3 max-w-2xl text-slate-400 light:text-slate-600 text-sm sm:text-base"
          >
            Available for full-time engineering roles, technical advisory, and high-impact project collaborations. Send a direct message below.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Direct Info Card */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="p-8 rounded-3xl glass-card border border-slate-800/80 light:border-slate-200 shadow-2xl space-y-6">
              <h3 className="text-xl font-heading font-extrabold text-white light:text-slate-900">
                Contact Details
              </h3>

              {/* Email Copier Card */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400 uppercase">Direct Email</div>
                    <div className="text-xs font-mono font-bold text-slate-200">{personalInfo.email}</div>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition border border-slate-700"
                  aria-label="Copy Email"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Status Indicator */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-slate-400 uppercase">Current Location</div>
                  <div className="text-xs font-mono font-bold text-slate-200">MCA Scholar & Engineer • India</div>
                </div>
              </div>

              {/* Social Profiles Grid */}
              <div>
                <div className="text-xs font-mono text-slate-400 uppercase mb-3">Professional Profiles</div>
                <div className="flex items-center gap-3">
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-purple-500/60 text-slate-300 hover:text-white font-mono text-xs font-medium transition flex items-center justify-center gap-2"
                  >
                    <Github className="w-4 h-4 text-purple-400" /> GitHub
                  </a>
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-purple-500/60 text-slate-300 hover:text-white font-mono text-xs font-medium transition flex items-center justify-center gap-2"
                  >
                    <Linkedin className="w-4 h-4 text-cyan-400" /> LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form Column */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <div className="p-8 rounded-3xl glass-card border border-slate-800/80 light:border-slate-200 shadow-2xl">
              
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-heading font-extrabold text-white">Message Transmitted!</h3>
                  <p className="text-xs font-mono text-slate-400 max-w-sm mx-auto">
                    Thank you for reaching out! I have received your note and will respond promptly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  {/* Subject Preset Quick Selector */}
                  <div>
                    <label className="block text-xs font-mono text-purple-400 mb-2 font-semibold">
                      Inquiry Subject Topic
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {presets.map((preset) => (
                        <button
                          type="button"
                          key={preset}
                          onClick={() => setFormData({ ...formData, subject: preset })}
                          className={`px-3 py-1.5 rounded-lg text-xs font-mono transition ${
                            formData.subject === preset
                              ? 'bg-purple-600 text-white font-bold'
                              : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                          }`}
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name & Email Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sarah Jenkins"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-purple-500 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">Your Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="sarah@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-purple-500 transition"
                      />
                    </div>
                  </div>

                  {/* Message Input */}
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Message Details *</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Share details about the role, project scope, or technical collaboration..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-purple-500 transition resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold text-xs shadow-xl shadow-purple-600/30 hover:scale-[1.01] transition flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" /> Transmit Message
                  </button>

                </form>
              )}

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
