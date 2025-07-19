
// src/components/App.jsx
import React, { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import siteConfig from '../data/siteConfig';

const App = () => {
  useEffect(() => {
    toast.success('Welcome to my portfolio!');
  }, []);

  return (
    <main className="bg-white text-gray-800 min-h-screen overflow-x-hidden">
      <Toaster position="top-right" />
      <header className="py-4 px-6 shadow-md fixed top-0 w-full bg-white z-50">
        <nav className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">{siteConfig.name}</h1>
          <ul className="flex space-x-4 font-semibold text-sm">
            <li><a href="#hero" className="hover:text-blue-500">Home</a></li>
            <li><a href="#projects" className="hover:text-blue-500">Projects</a></li>
            <li><a href="#contact" className="hover:text-blue-500">Contact</a></li>
          </ul>
        </nav>
      </header>

      <section id="hero" className="pt-24 pb-12 px-6 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          {siteConfig.about.intro}
        </motion.h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {siteConfig.about.description}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {siteConfig.skills.map((skill, i) => (
            <span key={i} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section id="projects" className="py-12 px-6 bg-gray-100">
        <h3 className="text-2xl font-bold mb-8 text-center">Featured Projects</h3>
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {siteConfig.projects.map((proj, index) => (
            <motion.div 
              key={index} 
              whileHover={{ scale: 1.03 }} 
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <h4 className="font-bold text-lg mb-2">{proj.title}</h4>
              <p className="text-sm text-gray-600 mb-4">{proj.description}</p>
              <div className="flex justify-between text-sm font-medium">
                <a href={proj.live} target="_blank" className="text-blue-500 hover:underline">Live Demo</a>
                <a href={proj.github} target="_blank" className="text-gray-600 hover:underline">GitHub</a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="contact" className="py-12 px-6 text-center">
        <h3 className="text-2xl font-bold mb-4">Let's Connect</h3>
        <p className="text-gray-600 max-w-lg mx-auto mb-6">
          You can reach me at <a className="text-blue-600 font-medium" href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a> or connect via social media.
        </p>
        <div className="flex justify-center gap-4 mb-6">
          {siteConfig.socials.github && <a href={siteConfig.socials.github} className="text-blue-600 hover:underline">GitHub</a>}
          {siteConfig.socials.linkedin && <a href={siteConfig.socials.linkedin} className="text-blue-600 hover:underline">LinkedIn</a>}
          {siteConfig.socials.twitter && <a href={siteConfig.socials.twitter} className="text-blue-600 hover:underline">Twitter</a>}
        </div>
        <p className="text-gray-500 text-sm">📍 {siteConfig.contact.location} | 📞 {siteConfig.contact.phone}</p>
      </section>

      <footer className="py-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </footer>
    </main>
  );
};

export default App;

       
