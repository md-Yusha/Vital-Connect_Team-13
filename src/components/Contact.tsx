import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, Linkedin, Mail } from 'lucide-react';

const Contact = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section id="contact" className="min-h-screen flex items-center justify-center relative">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="heading">Get in Touch</h2>
          <div className="max-w-2xl mx-auto">
            <p className="text-lg text-gray-300 mb-8">
              I'm always open to new opportunities and collaborations. Feel free to reach out!
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <motion.a
                href="mailto:yushaoffline@gmail.com"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="card flex flex-col items-center gap-4 hover:border hover:border-primary group"
              >
                <Mail className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                <div>
                  <h3 className="font-semibold mb-2">Email</h3>
                  <p className="text-sm text-gray-400">yushaoffline@gmail.com</p>
                </div>
              </motion.a>

              <motion.a
                href="https://linkedin.com/in/mohammad-yusha"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="card flex flex-col items-center gap-4 hover:border hover:border-primary group"
              >
                <Linkedin className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                <div>
                  <h3 className="font-semibold mb-2">LinkedIn</h3>
                  <p className="text-sm text-gray-400">Mohammad Yusha</p>
                </div>
              </motion.a>

              <motion.a
                href="https://github.com/md-Yusha"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="card flex flex-col items-center gap-4 hover:border hover:border-primary group"
              >
                <Github className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                <div>
                  <h3 className="font-semibold mb-2">GitHub</h3>
                  <p className="text-sm text-gray-400">md-Yusha</p>
                </div>
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;