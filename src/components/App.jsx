
import React, { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';

const App = () => {
  useEffect(() => {
    toast.success('Welcome to my portfolio!');
  }, []);

  return (
    <main className="bg-white text-gray-800 min-h-screen overflow-x-hidden">
      <Toaster position="top-right" />
      <header className="py-4 px-6 shadow-md fixed top-0 w-full bg-white z-50">
        <nav className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">Michael Akunna</h1>
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
          Hi, I'm Michael — Full Stack Developer
        </motion.h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          I specialize in building modern web apps using React, Node.js, and Tailwind CSS. Let's build something amazing together.
        </p>
      </section>

      <section id="projects" className="py-12 px-6 bg-gray-100">
        <h3 className="text-2xl font-bold mb-8 text-center">Featured Projects</h3>
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {[1, 2, 3, 4].map((n) => (
            <motion.div 
              key={n} 
              whileHover={{ scale: 1.03 }} 
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <h4 className="font-bold text-lg mb-2">Project Title {n}</h4>
              <p className="text-sm text-gray-600 mb-4">Short description of the project. Features React, Tailwind CSS, and animations.</p>
              <div className="flex justify-between text-sm font-medium">
                <a href="#" className="text-blue-500 hover:underline">Live Demo</a>
                <a href="#" className="text-gray-600 hover:underline">GitHub</a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="contact" className="py-12 px-6 text-center">
        <h3 className="text-2xl font-bold mb-4">Let's Connect</h3>
        <p className="text-gray-600 max-w-lg mx-auto mb-6">Send me a message via email or connect with me on GitHub to start a project or collaboration.</p>
        <a 
          href="mailto:youremail@example.com"
          className="inline-block bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition"
        >
          Email Me
        </a>
      </section>

      <footer className="py-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Michael Akunna. All rights reserved.
      </footer>
    </main>
  );
};

export default App;
