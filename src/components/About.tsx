import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section id="about" className="min-h-screen flex items-center justify-center relative">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="heading">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="AI and Technology"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-left"
            >
              <p className="text-lg text-gray-300 mb-6">
                I am an AIML undergraduate at MVJ College of Engineering, deeply interested in artificial intelligence, web development, and creative design.
              </p>
              <p className="text-lg text-gray-300">
                My journey involves building scalable applications, exploring AI, and designing intuitive user experiences.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;