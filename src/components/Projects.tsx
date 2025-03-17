import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: 'Stoic Labs Website',
    description: 'A modern, futuristic website with 3D interactions and smooth animations.',
    image: 'https://images.unsplash.com/photo-1481887328591-3e277f9473dc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tech: ['React (Vite)', 'Three.js', 'Tailwind CSS', 'Firebase'],
    status: 'Ongoing',
  },
  {
    title: 'Hospital Management System',
    description: 'A system to manage hospital records with real-time availability tracking.',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tech: ['React', 'Tailwind CSS', 'MySQL'],
    status: 'Ongoing',
  },
  {
    title: 'CrisisConnect',
    description: 'A platform for skill exchange, featuring a whiteboard, video chat, and chat box.',
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tech: ['Django', 'SQLite', 'WebRTC'],
    status: 'Completed',
  },
  {
    title: "Women's Safety Wearable Tazer",
    description: 'A smart wearable device with a tazer, live location tracking, and emergency alert features.',
    image: 'https://images.unsplash.com/photo-1589578228447-e1a4e481c6c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tech: ['IoT', 'GPS', 'Mobile App'],
    status: 'Completed',
  },
];

const Projects = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section id="projects" className="min-h-screen flex items-center justify-center relative">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="heading">Projects</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="card group"
              >
                <div className="relative overflow-hidden rounded-lg mb-4 aspect-video">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-100/80 to-transparent" />
                </div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary">
                    {project.status}
                  </span>
                </div>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-1 rounded-full bg-dark-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="text-primary hover:text-primary/80 transition-colors flex items-center gap-2"
                  >
                    <Github size={16} />
                    <span>Code</span>
                  </a>
                  <a
                    href="#"
                    className="text-primary hover:text-primary/80 transition-colors flex items-center gap-2"
                  >
                    <ExternalLink size={16} />
                    <span>Live Demo</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;