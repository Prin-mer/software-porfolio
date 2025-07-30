import { useEffect, useState } from "react";
import siteConfig from "../data/siteConfig.js";
import "./index.css";

function App() {
  const [typedText, setTypedText] = useState("");
  const fullText = siteConfig.role;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText((prev) => prev + fullText[index]);
        setIndex(index + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [index, fullText]);

  return (
    <main className="bg-black text-white min-h-screen font-sans overflow-x-hidden relative">
      {/* Fixed profile picture in top-right */}
      <div className="fixed top-4 right-4 z-50 flex flex-col items-center">
        <img
          src="/profile.jpg"
          alt="Nkem Moye"
          className="w-20 h-20 rounded-md object-cover border-2 border-white shadow-md"
        />
        <p className="mt-2 text-sm font-semibold text-white">Nkem Moye</p>
      </div>

      {/* Intro */}
      <section className="flex flex-col items-center justify-center h-screen px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-4">
          {siteConfig.name.split("").map((char, i) => (
            <span
              key={i}
              className="inline-block animate-fall"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {char}
            </span>
          ))}
        </h1>
        <p className="text-xl md:text-2xl text-center">{typedText}</p>
      </section>

      {/* About */}
      <section className="bg-white text-black py-16 px-6 md:px-24">
        <h2 className="text-3xl font-bold mb-4">About Me</h2>
        <p className="mb-4">{siteConfig.about}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {siteConfig.skills.map((skill, i) => (
            <span
              key={i}
              className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-sm text-center animate-float"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Elise Section */}
      <section className="bg-gray-100 text-black py-16 px-6 md:px-24">
        <h2 className="text-3xl font-bold mb-4">Experience</h2>
        <ul className="list-disc pl-5">
          {siteConfig.experience.map((exp, i) => (
            <li key={i} className="mb-2">
              <strong>{exp.title}</strong> – {exp.org} ({exp.date})
            </li>
          ))}
        </ul>
      </section>

      {/* Certifications */}
      <section className="bg-white text-black py-16 px-6 md:px-24">
        <h2 className="text-3xl font-bold mb-4">Certifications</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 list-disc pl-5">
          {siteConfig.certifications.map((cert, i) => (
            <li key={i}>{cert}</li>
          ))}
        </ul>
      </section>

      {/* Testimonials */}
      <section className="bg-purple-100 text-black py-16 px-6 md:px-24">
        <h2 className="text-3xl font-bold mb-4">Recommendations</h2>
        <div className="overflow-x-auto whitespace-nowrap scroll-smooth space-x-6 flex">
          {siteConfig.recommendations.map((rec, i) => (
            <blockquote
              key={i}
              className="bg-white shadow p-4 rounded-lg w-80 shrink-0"
            >
              <p className="italic">"{rec.text}"</p>
              <footer className="mt-2 text-right font-semibold">
                – {rec.name}
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-black text-white py-16 px-6 md:px-24 text-center">
        <h2 className="text-3xl font-bold mb-4">Let's Connect</h2>
        <a
          href={siteConfig.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-purple-600 hover:bg-purple-700 transition text-white font-semibold px-6 py-3 rounded-full shadow-lg"
        >
          Connect on LinkedIn
        </a>
      </section>
    </main>
  );
}

export default App;
