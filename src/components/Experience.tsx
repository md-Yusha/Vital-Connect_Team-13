import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, Code } from 'lucide-react';

const experiences = [
  {
    title: 'Technical Team Member',
    company: 'Tensor Club',
    period: '2023 - Present',
    icon: <Code className="w-6 h-6 text-primary" />,
    responsibilities: [
      "Developing the club's website",
      'Contributing to technical projects and workshops',
    ],
  },
  {
    title: 'Freelance Graphic Designer & Web Developer',
    company: 'Self-employed',
    period: '2022 - Present',
    icon: <Briefcase className="w-6 h-6 text-primary" />,
    responsibilities: [
      'Designed a school calendar',
      'Created websites for startups and academic projects',
    ],
  },
];

const Experience = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section id="experience" className="min-h-screen flex items-center justify-center relative">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="heading">Experience</h2>
          <div className="max-w-3xl mx-auto">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="relative pl-8 pb-12 last:pb-0"
              >
                <div className="absolute left-0 top-0 w-px h-full bg-primary/30">
                  <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-dark-200 border-2 border-primary flex items-center justify-center">
                    {exp.icon}
                  </div>
                </div>
                <div className="card text-left ml-8">
                  <h3 className="text-xl font-semibold mb-2">{exp.title}</h3>
                  <p className="text-gray-400 mb-4">{exp.company} • {exp.period}</p>
                  <ul className="list-disc list-inside text-gray-300">
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i} className="mb-2">{resp}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;