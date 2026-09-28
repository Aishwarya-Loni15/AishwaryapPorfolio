import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import ProjectModal from './components/ProjectModal';
import Skills from './components/Skills';
import Journey from './components/Journey';
import About from './components/About';
import ResumeModal from './components/ResumeModal';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Toast from './components/Toast';

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg(null);
    }, 3500);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Navigation Header */}
      <Navbar
        isDark={isDark}
        toggleTheme={toggleTheme}
        onOpenResume={() => setResumeOpen(true)}
      />

      {/* Main Sections */}
      <main>
        {/* Hero Section */}
        <Hero
          isDark={isDark}
          onExploreWork={() => {
            const el = document.getElementById('projects');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenResume={() => setResumeOpen(true)}
        />

        {/* Projects Showcase */}
        <Projects onSelectProject={(project) => setSelectedProject(project)} />

        {/* Technical Skills */}
        <Skills />

        {/* Education & Journey Timeline */}
        <Journey />

        {/* About Me & Core Philosophy */}
        <About onOpenResume={() => setResumeOpen(true)} />

        {/* Contact Form & CTA */}
        <Contact onShowToast={showToast} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* Resume Viewer Modal */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />

      {/* Feedback Toast */}
      <Toast
        message={toastMsg}
        onClose={() => setToastMsg(null)}
      />

    </div>
  );
}
