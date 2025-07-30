import React, { useState, useRef, useEffect } from 'react';

const App = () => {
  // State management
  const [activeTab, setActiveTab] = useState('about');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [showIntro, setShowIntro] = useState(true);
  const [typedText, setTypedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

  // Permanent profile picture
  const profilePic = profilePhoto;

  // Refs for mobile scrolling
  const sections = {
    about: useRef(null),
    education: useRef(null),
    projects: useRef(null),
    contact: useRef(null),
  };

  // Constants
  const FULL_TEXT = 'TECHNICAL PROJECT MANAGER';
  const SKILLS = [
    'Project Management', 'Agile & Scrum', 'Stakeholder Management',
    'Risk Management', 'SDLC', 'Team Leadership', 'Problem Solving',
    'Communication', 'Jira', 'Confluence', 'MS Project', 'Python',
    'Data Analysis'
  ];

  // Check screen size
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (!showIntro) return;

    let i = 0;
    const timer = setTimeout(() => {
      const type = () => {
        if (i < FULL_TEXT.length) {
          setTypedText(FULL_TEXT.substring(0, i + 1));
          i++;
          setTimeout(type, 100);
        } else {
          setIsTypingComplete(true);
        }
      };
      type();
    }, 800);

    return () => clearTimeout(timer);
  }, [showIntro]);

  // Auto-hide intro
  useEffect(() => {
    if (isTypingComplete) {
      const timer = setTimeout(() => setShowIntro(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isTypingComplete]);

  // Navigation handler
  const handleNavClick = (id) => {
    setActiveTab(id);
    if (!isDesktop) {
      sections[id].current?.scrollIntoView({ behavior: 'smooth' });
    }
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

  // Intro Component
  if (showIntro) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-purple-700 mb-4">
            NKEM MOYE
          </h1>
          <h2 className="text-xl md:text-3xl font-bold text-purple-900">
            {typedText}
            <span className="animate-pulse">|</span>
          </h2>
        </div>
      </div>
    );
  }

  // Desktop: Single-page view
  if (isDesktop) {
    return (
      <div className="min-h-screen bg-white text-gray-800">
        {/* Header */}
        <header className="bg-white shadow-md sticky top-0 z-30">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-purple-700">Nkem Moye</h1>
            <nav className="flex space-x-8">
              {['about', 'education', 'projects', 'contact'].map((id) => (
                <button
                  key={id}
                  onClick={() => handleNavClick(id)}
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
          </div>
        </header>

        {/* Desktop Content */}
        <main className="container mx-auto px-6 py-12">
          {activeTab === 'about' && (
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-40 h-40">
                <img 
                  src={profilePic} 
                  alt="Nkem Moye" 
                  className="rounded-2xl border-4 border-purple-300 shadow-lg w-full h-full object-cover"
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
                    <span key={skill} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'education' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">About</h2>
              {/* Education content here */}
            </div>
          )}

          {activeTab === 'projects' && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Recommendations</h2>
              {/* Projects content here */}
            </div>
          )}

          {activeTab === 'contact' && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Contact Me</h2>
              {/* Contact content here */}
            </div>
          )}
        </main>
      </div>
    );
  }

  // Mobile: Scrollable view
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Mobile Header */}
      <header className="bg-white shadow-md sticky top-0 z-30">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-700">Nkem Moye</h1>
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

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg absolute top-full left-0 w-full px-6 py-4 space-y-4 z-20">
            {['about', 'education', 'projects', 'contact'].map((id) => (
              <button
                key={id}
                onClick={() => handleNavClick(id)}
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

      {/* Mobile Content (scrollable) */}
      <main className="container mx-auto px-6 pt-12 pb-24">
        {/* About Section */}
        <section ref={sections.about} className="min-h-screen py-12">
          <div className="flex flex-col items-center gap-8">
            <div className="w-40 h-40">
              <img 
                src={profilePic} 
                alt="Nkem Moye" 
                className="rounded-2xl border-4 border-purple-300 shadow-lg w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
                Hello, I'm Nkem Moye 👋
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                I'm a skilled <strong className="text-purple-700">Technical Project Manager</strong>.
              </p>
              <div className="flex flex-wrap gap-2">
                {SKILLS.map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Other sections... */}
      </main>
    </div>
  );
};

export default App;
