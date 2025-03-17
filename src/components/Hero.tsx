import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-10" />
      
      <div className="section-container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl sm:text-7xl font-bold mb-6">
            Mohammad <span className="text-primary">Yusha</span>
          </h1>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xl sm:text-2xl text-gray-400 mb-8"
          >
            AI Enthusiast | Full-Stack Developer | Designer
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto mb-12"
          >
            Passionate about AI, full-stack development, and design, I create impactful digital solutions with a blend of innovation and technology.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex justify-center space-x-6"
          >
            <a
              href="https://github.com/md-Yusha"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary transition-colors"
            >
              <Github size={24} />
            </a>
            <a
              href="https://linkedin.com/in/mohammad-yusha"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary transition-colors"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="mailto:yushaoffline@gmail.com"
              className="text-gray-400 hover:text-primary transition-colors"
            >
              <Mail size={24} />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;