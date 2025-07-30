    import React, { useState, useRef, useEffect } from 'react';

const App = () => {
  const [activeTab, setActiveTab] = useState('about');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [profilePic, setProfilePic] = useState('https://picsum.photos/400/400');
  const [showIntro, setShowIntro] = useState(true);
  const [typedText, setTypedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const sections = {
    about: useRef(null),
    education: useRef(null),
    projects: useRef(null),
    contact: useRef(null),
  };

  const fullText = 'TECHNICAL PROJECT MANAGER';

  // Typewriter effect
  useEffect(() => {
    if (!showIntro) return;

    let i = 0;
    const timer = setTimeout(() => {
      const type = () => {
        if (i < fullText.length) {
          setTypedText(fullText.substring(0, i + 1));
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

  // Auto-hide intro after animation
  useEffect(() => {
    if (isTypingComplete) {
      const hideTimer = setTimeout(() => {
        setShowIntro(false);
      }, 1000);
      return () => clearTimeout(hideTimer);
    }
  }, [isTypingComplete]);

  const scrollToSection = (id) => {
    setActiveTab(id);
    sections[id]?.current?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleSendMessage = () => {
    if (name && email && newMessage) {
      const message = {
        id: Date.now(),
        name,
        email,
        text: newMessage,
        date: new Date().toLocaleString(),
      };
      setMessages([message, ...messages]);
      setName('');
      setEmail('');
      setNewMessage('');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      Object.keys(sections).forEach((id) => {
        const element = sections[id]?.current;
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
            setActiveTab(id);
          }
        }
      });
    };

    if (!showIntro) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [showIntro]);

  if (showIntro) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
        <div className="text-center">
          {/* Name */}
          <h1
            className="text-6xl font-extrabold text-purple-700 mb-4 animate-slide-in-left"
            style={{ fontFamily: `'Poppins', sans-serif` }}
          >
            NKEM MOYE
          </h1>

          {/* Typing Text */}
          <h2
            className="text-3xl font-bold text-purple-900 opacity-0 animate-fade-in-type"
            style={{
              fontFamily: `'Courier New', monospace`,
            }}
          >
            {typedText}
            <span className="animate-pulse">|</span>
          </h2>
        </div>

        <style jsx>{`
          .animate-slide-in-left {
            animation: slideInLeft 0.8s ease-out forwards;
            opacity: 0;
          }
          .animate-fade-in-type {
            animation: fadeInType 0.5s ease-out 0.5s forwards;
          }
          @keyframes slideInLeft {
            from {
              transform: translateX(-100px);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
          @keyframes fadeInType {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          @keyframes slideOutRight {
            from {
              transform: translateX(0);
              opacity: 1;
            }
            to {
              transform: translateX(100vw);
              opacity: 0;
            }
          }
          .animate-slide-out-right {
            animation: slideOutRight 0.8s ease-in forwards;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Header with Navigation */}
      <header className="bg-white shadow-md sticky top-0 z-30 transition-all duration-300">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-700">Nkem Moye</h1>
          <nav className="hidden md:flex space-x-8">
            {Object.keys(sections).map((id) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`capitalize font-medium transition-colors relative group ${
                  activeTab === id ? 'text-purple-700' : 'text-gray-600 hover:text-purple-500'
                }`}
              >
                {id === 'about' && 'Home'}
                {id === 'education' && 'About'}
                {id === 'projects' && 'Projects'}
                {id === 'contact' && 'Contact'}

                <span
                  className={`absolute bottom-0 left-0 w-0 h-0.5 bg-purple-700 group-hover:w-full transition-all duration-300 ${
                    activeTab === id ? 'w-full' : ''
                  }`}
                />
              </button>
            ))}
          </nav>
          <button
            className="md:hidden text-gray-600 focus:outline-none z-40"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
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
            {Object.keys(sections).map((id) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`block w-full text-left capitalize font-medium py-2 ${
                  activeTab === id ? 'text-purple-700 font-semibold' : 'text-gray-700 hover:text-purple-500'
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
      <main className="container mx-auto px-6 pt-12 pb-24 animate-fade-in">
        {/* Home Section */}
        <section ref={sections.about} id="about" className="min-h-screen py-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative group">
              <div className="w-40 h-40 rounded-2xl overflow-hidden border-4 border-purple-300 shadow-lg transform transition-transform group-hover:scale-105">
                <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () => setProfilePic(reader.result);
                    reader.readAsDataURL(file);
                  }
                }}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <span className="absolute bottom-2 right-2 text-xs bg-white text-purple-700 px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                Edit
              </span>
            </div>
            <div>
              <h2
                className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight"
                style={{ fontFamily: `'Poppins', sans-serif` }}
              >
                Hello, I'm Nkem Moye 👋
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                I'm a skilled and dedicated <strong className="text-purple-700">Technical Project Manager</strong> with a passion for leading cross-functional teams to deliver complex technology projects on time and within scope. With experience at Union Bank and a strong foundation in Agile, Scrum, and SDLC, I bridge the gap between technical execution and business strategy.
              </p>
              <p className="text-gray-700 mb-6">
                I thrive in fast-paced environments, managing timelines, risks, and stakeholder expectations with clarity and precision. My goal is to drive innovation through structured leadership and collaborative problem-solving.
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  'Project Management',
                  'Agile & Scrum',
                  'Stakeholder Management',
                  'Risk Management',
                  'SDLC',
                  'Team Leadership',
                  'Problem Solving',
                  'Communication',
                  'Jira',
                  'Confluence',
                  'MS Project',
                  'Python',
                  'Data Analysis',
                ].map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section ref={sections.education} id="education" className="min-h-screen py-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">About</h2>

          {/* Certifications */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8 border border-purple-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Certifications</h3>
            <ul className="space-y-2 text-gray-700">
              <li><strong>Introduction to Data Analysis Using Excel</strong> – Rice University, Texas</li>
              <li><strong>Professional Conduct and Ethics</strong> – The Chartered Institute of Bankers of Nigeria (CIBN)</li>
              <li><strong>Programming For Everybody (Getting Started with Python)</strong> – University of Michigan</li>
            </ul>
          </div>

          {/* Accomplishments */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8 border border-purple-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Accomplishments</h3>
            <p className="text-gray-700">13+ successful technology projects delivered on time and within budget across banking and fintech sectors.</p>
          </div>

          {/* Strengths */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-purple-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Strengths</h3>
            <ul className="space-y-3 text-gray-700">
              <li><strong>Leadership:</strong> Proven ability to lead technical teams through complex project lifecycles.</li>
              <li><strong>Communication:</strong> Excels at translating technical details for non-technical stakeholders.</li>
              <li><strong>Problem-Solving:</strong> Strategic thinker who anticipates risks and delivers proactive solutions.</li>
              <li><strong>Team Collaboration:</strong> Builds trust and fosters high-performance team culture.</li>
              <li><strong>Continuous Learning:</strong> Committed to staying ahead in tech and project management trends.</li>
            </ul>
          </div>
        </section>

        {/* Recommendations Section */}
        <section ref={sections.projects} id="projects" className="min-h-screen py-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Recommendations</h2>
          <div className="space-y-8">
            {/* Recommendation 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <p className="text-gray-700 mb-4 leading-relaxed">
                I highly recommend Nkem as a skilled and dedicated Technical Project Manager. My experience working with him at Union Bank has been overwhelmingly positive, and I'm confident he'll excel in any role he takes on.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                <strong>Strong analytical skills:</strong> Nkem has a knack for understanding complex business problems and breaking them down into actionable insights. He's proficient in using data analysis tools to gather and interpret information, leading to informed decision-making.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                <strong>Excellent communication:</strong> Nkem effectively communicates both technical and non-technical information to stakeholders at all levels. He's a great listener and actively seeks feedback to ensure everyone is on the same page.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                <strong>Problem-solving:</strong> Nkem thrives in challenging environments and approaches problems with a creative and solutions-oriented mindset. He's not afraid to think outside the box and explore innovative solutions.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                <strong>Teamwork:</strong> Nkem is a valuable team player who collaborates effectively with colleagues from various departments. He fosters a positive and supportive work environment, always willing to go the extra mile.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Beyond his technical skills, Nkem possesses a genuine passion for his work and a dedication to continuous learning. He's a valuable asset to any team, and I have no doubt he'll continue to achieve great things.
              </p>
              <p className="text-gray-700">
                I strongly encourage anyone seeking a talented and reliable Technical Project Manager to connect with Nkem on LinkedIn. You won't be disappointed!
              </p>
              <div className="mt-6 flex items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 mr-4">
                  <img src="https://picsum.photos/200/200?random=1" alt="Anthony Obasi" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Anthony Obasi, PSPO, PSM</p>
                  <p className="text-sm text-gray-500">Thought Leadership | Operational Risk | Project Implementation</p>
                  <p className="text-xs text-gray-400">January 29, 2024 | Managed Nkem directly</p>
                </div>
              </div>
            </div>

            {/* Recommendation 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <p className="text-gray-700 mb-4 leading-relaxed">
                I recommend Nkem for any Technical Project Management role. He is highly proficient in Agile methodologies and has a strong grasp of SDLC, which enabled him to lead productive and efficient project teams during his time at our organization.
              </p>
              <div className="mt-6 flex items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 mr-4">
                  <img src="https://picsum.photos/200/200?random=2" alt="Tosin Okumoye" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Tosin Okumoye, PSPO</p>
                  <p className="text-sm text-gray-500">Service Assurance | Business Process Improvement</p>
                  <p className="text-xs text-gray-400">January 9, 2024 | Managed Nkem directly</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section ref={sections.contact} id="contact" className="min-h-screen py-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Contact Me</h2>
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Get in Touch</h3>
              <p className="text-gray-600">Feel free to reach out via LinkedIn or send me a message below.</p>
              <div className="mt-4 space-y-2">
                <p className="text-gray-700 font-bold">📧 Email: nkem.moye@example.com</p>
                <p className="text-gray-700 font-bold">📱 Phone: +234 812 345 6789</p>
                <p className="text-gray-700 font-bold">📍 Location: Lagos, Nigeria</p>
                <div className="mt-4">
                  <a
                    href="https://www.linkedin.com/in/nkemmoye"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-purple-700 text-white py-2 px-6 rounded-md hover:bg-purple-800 transition-colors font-medium"
                  >
                    Connect on LinkedIn
                  </a>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-800 mb-4">Send a Message</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="bg-white p-6 rounded-lg shadow-md border border-purple-100"
            >
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Your message..."
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
                required
              ></textarea>
              <button
                type="submit"
                className="w-full bg-purple-700 text-white py-2 px-4 rounded-md hover:bg-purple-800 transition-colors"
              >
                Send Message
              </button>
            </form>

            {/* Message Board */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Messages</h4>
              <div className="space-y-4">
                {messages.length === 0 && <p className="text-gray-500">No messages yet.</p>}
                {messages.map((msg) => (
                  <div key={msg.id} className="bg-white p-4 rounded shadow-sm border border-gray-200">
                    <p className="font-semibold text-purple-700">{msg.name} <{msg.email}></p>
                    <p className="text-gray-700 mt-1">{msg.text}</p>
                    <p className="text-xs text-gray-400 mt-2">{msg.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="container mx-auto px-6 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Nkem Moye. All rights reserved.</p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes slideOutRight {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100vw);
            opacity: 0;
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 0;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default App;  
