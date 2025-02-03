import { AnimatePresence, motion } from 'framer-motion';

const PageAnimation = ({ children, className }) => {
  const pageVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: 20 },
    transition: { duration: 2 },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div className={className} variants={pageVariants} initial="hidden" animate="visible" exit="exit" transition="transition">
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageAnimation;
