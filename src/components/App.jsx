import React, { useState, useRef, useEffect } from 'react';
import profilePic from './assets/profile.jpeg';
import recommender1 from './assets/recommender1.jpg';
import recommender2 from './assets/recommender2.jpg';

const App = () => {
  // State management
  const [activeTab, setActiveTab] = useState('about');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [showIntro, setShowIntro] = useState(true);
  const [showName, setShowName] = useState(true);
  const [typedText, setTypedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  // Animation sequence
  useEffect(() => {
    if (!showIntro) return;

    const nameTimer = setTimeout(() => {
      setShowName(false);
      const typingTimer = setTimeout(() => {
        let i = 0;
        const type = () => {
          if (i < 'TECHNICAL PROJECT MANAGER'.length) {
            setTypedText('TECHNICAL PROJECT MANAGER'.substring(0, i + 1));
            i++;
            setTimeout(type, 100);
          } else {
            setIsTypingComplete(true);
          }
        };
        type();
      }, 500);
    }, 2000);

    return () => clearTimeout(nameTimer);
  }, [showIntro]);

  useEffect(() => {
    if (isTypingComplete) {
      const timer = setTimeout(() => setShowIntro(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isTypingComplete]);

  // Navigation handler
  const scrollToSection = (id) => {
    setActiveTab(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  // Form handler
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      const newMsg = {
        id: Date.now(),
        ...formData,
        date: new Date().toLocaleString()
      };
      setMessages([newMsg, ...messages]);
      setFormData({ name: '', email: '', message: '' });
    }
  };

  // Skills with animation
  const SKILLS = [
    'Project Management', 'Agile & Scrum', 'Stakeholder Management',
    'Risk Management', 'SDLC', 'Team Leadership', 'Problem Solving',
    'Communication', 'Jira', 'Confluence', 'MS Project', 'Python',
    'Data Analysis'
  ];

  // Intro Component
  if (showIntro) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
        <div className="text-center">
          {showName ? (
            <h1 className="text-4xl md:text-6xl font-extrabold text-purple-700 animate-fadeIn">
              NKEM MOYE
            </h1>
          ) : (
            <h2 className="text-xl md:text-3xl font-bold text-purple-900 animate-fadeIn">
              {typedText}
              <span className="ml-1 animate-pulse">|</span>
            </h2>
          )}
        </div>
      </div>
    );
  }

  // Main App
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-30">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-700">Nkem Moye</h1>
          <nav className="hidden md:flex space-x-8">
            {['about', 'education', 'projects', 'contact'].map((id) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`capitalize font-medium ${
                  activeTab === id ? 'text-purple-700' : 'text-gray-600 hover:text-purple-500'
                }`}
              >
                {id === 'about' && 'Home'}
                {id === 'education' && 'About'}
                {id === 'projects' && 'Projects'}
                {id === 'contact' && 'Contact'}
              </button>
            ))}
          </nav>
          <button
            className="md:hidden text-gray-600 z-40"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg absolute top-full left-0 w-full px-6 py-4 space-y-4 z-20">
            {['about', 'education', 'projects', 'contact'].map((id) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`block w-full text-left capitalize py-2 ${
                  activeTab === id ? 'text-purple-700 font-semibold' : 'text-gray-700'
                }`}
              >
                {id === 'about' && 'Home'}
                {id === 'education' && 'About'}
                {id === 'projects' && 'Projects'}
                {id === 'contact' && 'Contact'}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 pt-12 pb-24">
        {/* About Section */}
        <section id="about" className="min-h-screen py-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-40 h-40 rounded-2xl overflow-hidden border-4 border-purple-300 shadow-lg">
              <img 
                src={profilePic} 
                alt="Nkem Moye Profile" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x400?text=Profile+Photo';
                }}
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                Hello, I'm Nkem Moye 👋
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                I'm a skilled <strong className="text-purple-700">Technical Project Manager</strong> with experience at Union Bank.
              </p>
              <div className="flex flex-wrap gap-2">
                {SKILLS.map((skill) => (
                  <span 
                    key={skill} 
                    className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm animate-float"
                    style={{
                      animationDelay: `${Math.random() * 0.5}s`,
                      animationDuration: `${2 + Math.random() * 2}s`
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="min-h-screen py-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">About</h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-purple-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Certifications</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Introduction to Data Analysis Using Excel – Rice University</li>
                <li>• Professional Conduct and Ethics – CIBN</li>
                <li>• Programming For Everybody (Python) – University of Michigan</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-purple-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Accomplishments</h3>
              <p className="text-gray-700">13+ successful technology projects delivered on time and within budget.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-purple-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Strengths</h3>
              <ul className="space-y-3 text-gray-700">
                <li>• <strong>Leadership:</strong> Proven ability to lead technical teams</li>
                <li>• <strong>Communication:</strong> Translates technical details effectively</li>
                <li>• <strong>Problem-Solving:</strong> Strategic thinker with proactive solutions</li>
                <li>• <strong>Team Collaboration:</strong> Builds high-performance cultures</li>
                <li>• <strong>Continuous Learning:</strong> Stays ahead of tech trends</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="min-h-screen py-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Recommendations</h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <p className="text-gray-700 mb-4">
                "Nkem is a skilled Technical Project Manager. My experience working with him at Union Bank was overwhelmingly positive. He demonstrates strong analytical skills and excellent communication."
              </p>
              <div className="flex items-center mt-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-purple-200">
                  <img 
                    src={recommender1} 
                    alt="Anthony Obasi" 
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/150?text=Recommender+1';
                    }}
                  />
                </div>
                <div className="ml-4">
                  <p className="font-semibold">Anthony Obasi, PSPO, PSM</p>
                  <p className="text-sm text-gray-500">January 29, 2024</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <p className="text-gray-700 mb-4">
                "Highly proficient in Agile methodologies with strong grasp of SDLC. Nkem consistently delivered projects on schedule while maintaining excellent team morale."
              </p>
              <div className="flex items-center mt-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-purple-200">
                  <img 
                    src={recommender2} 
                    alt="Tosin Okumoye" 
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/150?text=Recommender+2';
                    }}
                  />
                </div>
                <div className="ml-4">
                  <p className="font-semibold">Tosin Okumoye, PSPO</p>
                  <p className="text-sm text-gray-500">January 9, 2024</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="min-h-screen py-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Contact Me</h2>
          <div className="max-w-3xl mx-auto">
            <div className="mb-8 text-center">
              <p className="text-gray-600 mb-4">Feel free to reach out via LinkedIn or email:</p>
              <div className="space-y-2">
                <p className="text-gray-700 font-medium">nkem.moye@example.com</p>
                <p className="text-gray-700 font-medium">+234 812 345 6789</p>
                <a 
                  href="https://linkedin.com/in/nkemmoye" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-purple-700 text-white py-2 px-6 rounded-md mt-4 hover:bg-purple-800 transition-colors"
                >
                  Connect on LinkedIn
                </a>
              </div>
            </div>
            
            <form onSubmit={handleSendMessage} className="bg-white p-6 rounded-lg shadow-md border border-purple-100">
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Your Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="Your Email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                placeholder="Your message..."
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="w-full bg-purple-700 text-white py-2 px-4 rounded-md hover:bg-purple-800 transition-colors"
              >
                Send Message
              </button>
            </form>
            
            {messages.length > 0 && (
              <div className="mt-8">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Messages</h4>
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div key={msg.id} className="bg-white p-4 rounded shadow-sm border border-gray-200">
                      <p className="font-semibold text-purple-700">{msg.name} &lt;{msg.email}&gt;</p>
                      <p className="text-gray-700 mt-1">{msg.message}</p>
                      <p className="text-xs text-gray-400 mt-2">{msg.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 text-center text-gray-600">
        <p>© {new Date().getFullYear()} Nkem Moye. All rights reserved.</p>
      </footer>

      {/* Animation styles */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-float {
          animation: float infinite ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
