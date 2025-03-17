import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, Database, Cpu, Palette } from 'lucide-react';

const skillCategories = [
  {
    title: 'Programming & Development',
    icon: <Code2 className="w-8 h-8 text-primary" />,
    skills: ['C', 'C++', 'Java', 'Python', 'HTML', 'CSS', 'JavaScript', 'Django', 'Express.js', 'Node.js', 'React'],
  },
  {
    title: 'Database Management',
    icon: <Database className="w-8 h-8 text-primary" />,
    skills: ['MySQL', 'PostgreSQL', 'SQLite', 'Firebase'],
  },
  {
    title: 'AI & ML',
    icon: <Cpu className="w-8 h-8 text-primary" />,
    skills: ['NumPy', 'Pyplot', 'AI Models'],
  },
  {
    title: 'Design Tools',
    icon: <Palette className="w-8 h-8 text-primary" />,
    skills: ['Photoshop', 'Illustrator', 'Figma'],
  },
];

const Skills = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section id="skills" className="min-h-screen flex items-center justify-center relative">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="heading">Skills</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="card"
              >
                <div className="flex items-center gap-4 mb-4">
                  {category.icon}
                  <h3 className="text-xl font-semibold">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-dark-300 rounded-full text-sm text-primary"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;