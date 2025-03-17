import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-dark-100 flex items-center justify-center z-50"
    >
      <div className="text-center">
        <span className="loader"></span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-xl font-mono text-primary"
        >
          Mohammad Yusha
        </motion.h2>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;