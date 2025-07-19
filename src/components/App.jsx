import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import siteConfig from '../data/siteConfig';

const App = () => {
  const [filter, setFilter] = useState("All");

  const filteredProjects = siteConfig.projects.filter(
    (proj) => filter === "All" || proj.tech.includes(filter)
  );

  const techOptions = ["All", ...new Set(siteConfig.projects.flatMap(p => p.tech))];

  useEffect(() => {
    toast.success('Welcome to my portfolio!');
  }, []);

  const handleSend = (e) => {
    e.preventDefault();
    toast.success("Message captured. (Form not connected to backend)");
    e.target.reset();
  };

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
        <a
          href="/resume.pdf"
          download
          className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Download Resume
        </a>
      </section>

      <section id="projects" className="py-12 px-6 bg-gray-100">
        <h3 className="text-2xl font-bold mb-8 text-center">Featured Projects</h3>
        <div className="mb-4 flex justify-center gap-3 flex-wrap">
          {techOptions.map((tech, index) => (
            <button
              key={index}
              onClick={() => setFilter(tech)}
              className={`px-3 py-1 rounded-full text-sm ${
                filter === tech ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              {tech}
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {filteredProjects.map((proj, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <h4 className="font-bold text-lg mb-2">{proj.title}</h4>
              <p className="text-sm text-gray-600 mb-4">{proj.description}</p>
              <div className="flex gap-2 mb-2">
                {proj.tech.map((t, i) => (
                  <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">{t}</span>
                ))}
              </div>
              <div className="flex justify-between text-sm font-medium">
                <a href={proj.live} target="_blank" className="text-blue-500 hover:underline">Live Demo</a>
                <a href={proj.github} target="_blank" className="text-gray-600 hover:underline">GitHub</a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="blog" className="py-12 px-6 bg-white text-center">
        <h3 className="text-2xl font-bold mb-6">Latest Articles</h3>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          {siteConfig.blog.map((post, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded shadow">
              <h4 className="text-lg font-semibold mb-2">{post.title}</h4>
              <p className="text-sm text-gray-600 mb-4">{post.summary}</p>
              <a href={post.url} className="text-blue-600 hover:underline text-sm">Read More →</a>
            </div>
          ))}
        </div>
      </section>

      <section id="testimonials" className="py-12 px-6 bg-gray-100 text-center">
        <h3 className="text-2xl font-bold mb-6">Testimonials</h3>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          {siteConfig.testimonials.map((t, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow">
              <p className="italic text-gray-700 mb-4">“{t.quote}”</p>
              <p className="text-sm font-semibold text-gray-900">{t.name}, {t.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="github" className="py-12 px-6 text-center">
        <h3 className="text-2xl font-bold mb-4">GitHub Activity</h3>
        <img
          loading="lazy"
          src="https://github-readme-stats.vercel.app/api?username=Prin-mer&show_icons=true&theme=default"
          alt="GitHub Stats"
          className="mx-auto"
        />
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

        <form onSubmit={handleSend} className="mt-8 bg-white p-6 rounded shadow max-w-xl mx-auto">
          <input name="name" required placeholder="Your Name" className="w-full px-4 py-2 mb-4 border border-gray-300 rounded" />
          <input name="email" type="email" required placeholder="Your Email" className="w-full px-4 py-2 mb-4 border border-gray-300 rounded" />
          <textarea name="message" required placeholder="Message..." className="w-full px-4 py-2 mb-4 border border-gray-300 rounded" />
          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
            Send
          </button>
        </form>
      </section>

      <footer className="py-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </footer>
    </main>
  );
};

export default App;
