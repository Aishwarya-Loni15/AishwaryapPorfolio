import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, FileText, CheckCircle2, Award, Briefcase, GraduationCap, Sparkles, Mail, Phone } from 'lucide-react';
import { Github, Linkedin } from './Icons';
import confetti from 'canvas-confetti';
import { personalInfo, projectsData, skillsCategories, journeyTimeline, achievementsList } from '../data/portfolioData';

export default function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    confetti({
      particleCount: 110,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#a855f7', '#06b6d4', '#10b981']
    });

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);

    const resumeText = `====================================================
AISHWARYA LONI
Software Developer — Java — Python
Phone: +91-8010799591
Email: ${personalInfo.email}
GitHub: https://github.com/AishwaryaLoni15
LinkedIn: https://linkedin.com/in/aishwarya-loni
====================================================

CAREER OBJECTIVE:
Motivated MCA student with knowledge of Java, Python, and MySQL, seeking an opportunity as a Software Engineer. Interested in software development, application testing, debugging, and learning new technologies. A hardworking and quick learner who enjoys solving problems and working as part of a team.

EDUCATION:
- Master of Computer Applications (Pursuing) [Expected: 2027]
  SVERI's College of Engineering, Pandharpur
- Bachelor of Science (Entire Computer Science) [2025] - CGPA: 8.47 / 10
  Sangmeshwar College, Solapur
- Class XII (HSC - State Board) [2021] - 90.83%
  D.H.B Soni College, Solapur
- Class X (SSC - State Board) [2019] - 80.40%
  P.G. Chitale English Medium School, Barur

TECHNICAL SKILLS:
- Programming Languages: Java, Python
- Backend: REST API Design, Java-based Application Development
- Database: MySQL, MongoDB, SQL
- Core Java: OOP, Collections Framework, Exception Handling, JDBC, Multithreading
- Tools & IDEs: Git, GitHub, Eclipse, VS Code
- Core Concepts: OOP, Data Structures Basics, Exception Handling, DBMS, SDLC, Testing & Debugging
- Cloud: AWS Foundations
- Soft Skills: Problem Solving, Communication, Teamwork, Quick Learning, Time Management

EXPERIENCE / ACADEMIC PROJECTS (2024 - 2026):
1. Smart Government Productivity Tracker (Python, HTML, CSS, JavaScript, MySQL)
   - Developed full-stack system with 4 user roles to manage government employee tasks.
   - Implemented 10+ features including task management, employee monitoring, and reports.
   - Connected MySQL database with 5+ major data tables.
   - Tested 20+ test cases, fixed errors, and verified system functionality.

2. Online Electronics Shop Management System (Java, Core Java, JDBC, MySQL)
   - Developed Java-based system with 4 main modules for electronics shop management.
   - Implemented product inventory, sales, purchase, and customer CRM features.
   - Tested 20+ test cases and checked database operations.

3. Personal Portfolio Website (React.js, HTML, CSS, JavaScript)
   - Responsive portfolio with 5+ sections and JavaScript animations.

ACHIEVEMENTS & CERTIFICATIONS:
- Elite Certification in Programming in Java — NPTEL (IIT-delivered Java course)
- AWS Cloud Foundations Workshop — AWS
- React JS Certification — CodeChef
====================================================`;

    const blob = new Blob([resumeText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Aishwarya_Loni_Resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-10 my-auto flex flex-col max-h-[92vh]"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-heading font-extrabold text-white">
                  AISHWARYA LONI — Official Resume
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  Software Developer — Java — Python • MCA Scholar
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleDownload}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition shadow-lg shadow-purple-600/30"
              >
                <Download className="w-4 h-4" />
                <span>{downloaded ? 'Downloaded CV!' : 'Download Resume'}</span>
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition"
                aria-label="Close resume"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Resume Document Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-8 text-slate-200 text-xs sm:text-sm font-sans">
            
            {/* Contact Header Block */}
            <div className="pb-6 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white mb-1">
                  AISHWARYA LONI
                </h1>
                <p className="text-purple-400 font-mono text-xs font-semibold">
                  Software Developer — Java — Python
                </p>
              </div>

              <div className="space-y-1 font-mono text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-purple-400" /> +91-8010799591
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-cyan-400" /> aishwaryaloni872@gmail.com
                </div>
                <div className="flex items-center gap-2">
                  <Github className="w-3.5 h-3.5 text-purple-400" /> github.com/AishwaryaLoni15
                </div>
              </div>
            </div>

            {/* Career Objective */}
            <div>
              <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-purple-400 mb-2 flex items-center gap-1.5 font-mono">
                <Sparkles className="w-4 h-4" /> Career Objective
              </h4>
              <p className="text-slate-300 leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-xs sm:text-sm">
                {personalInfo.bio}
              </p>
            </div>

            {/* Education */}
            <div>
              <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-purple-400 mb-3 flex items-center gap-1.5 font-mono">
                <GraduationCap className="w-4 h-4" /> Education
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {journeyTimeline.map((edu, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <h5 className="font-bold text-white text-xs">{edu.title}</h5>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-cyan-400 font-mono border border-slate-700">
                          {edu.year}
                        </span>
                      </div>
                      <span className="text-xs text-purple-400 font-mono">{edu.institution}</span>
                      <p className="text-xs text-slate-400 mt-1 font-semibold">{edu.badge}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Projects */}
            <div>
              <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-purple-400 mb-3 flex items-center gap-1.5 font-mono">
                <Briefcase className="w-4 h-4" /> Projects & Academic Systems
              </h4>
              <div className="space-y-3">
                {projectsData.slice(0, 3).map((p) => (
                  <div key={p.id} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                    <div className="flex justify-between items-center mb-1">
                      <h5 className="font-bold text-white text-xs sm:text-sm">{p.title}</h5>
                      <span className="text-[10px] font-mono text-purple-400">{p.type}</span>
                    </div>
                    <p className="text-xs text-slate-300 mb-2">{p.shortDesc}</p>
                    <div className="flex flex-wrap gap-1">
                      {p.tech.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements & Certifications */}
            <div>
              <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-purple-400 mb-3 flex items-center gap-1.5 font-mono">
                <Award className="w-4 h-4" /> Achievements & Certifications
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {achievementsList.map((ach, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                    <h5 className="font-bold text-white text-xs mb-0.5">{ach.title}</h5>
                    <span className="text-[11px] font-mono text-cyan-400 block mb-1">{ach.issuer}</span>
                    <p className="text-[11px] text-slate-400 leading-snug">{ach.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-800 bg-slate-900/80 flex justify-between items-center text-xs font-mono text-slate-400">
            <span>Aishwarya Loni • Official Resume</span>
            <button
              onClick={handleDownload}
              className="text-purple-400 hover:underline font-bold"
            >
              Click to Download CV (.txt)
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
