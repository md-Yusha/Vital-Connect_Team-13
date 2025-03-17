import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Chatbot from './components/Chatbot';
import VoiceAgent from './components/VoiceAgent';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen />}
      </AnimatePresence>

      {!loading && (
        <div className="bg-dark-100 min-h-screen">
          <Navbar />
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
          <Chatbot />
          <VoiceAgent />
        </div>
      )}
    </>
  );
}

export default App