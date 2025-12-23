import {componentType} from '@/types';
import {AnimatePresence, motion} from 'framer-motion';
import {useState} from 'react';
import {FaFolder, FaFolderClosed, FaMinus, FaPlus, FaSignsPost} from 'react-icons/fa6';

const childrenVariants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
  },
  open: {
    opacity: 1,
    height: 'auto',
    transition: {
      duration: 0.4,
      ease: [0.92, 0.2, 0.12, 1.36]
    }
  }
};
export const TreeNode: componentType = ({children, className, classNames, isChild, subtitle, rank}) => {
  const [isOpen, setIsOpen] = useState(rank === 0);
  return (
    <>
      <div className={`flex items-center ${className}`}>
        <div className={`${classNames?.icon ?? ''} z-10 flex gap-1`} style={{transform: `translateX(${rank}rem)`}}>
          {!!isChild ? (
            <button onClick={() => setIsOpen(!isOpen)}>{isOpen ? <FaMinus /> : <FaPlus />}</button>
          ) : (
            <FaSignsPost />
          )}
          {!!isChild ? <FaFolderClosed /> : <FaFolder />}
        </div>
        {subtitle}
      </div>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            variants={childrenVariants}
            initial="closed"
            animate="open"
            exit="closed"
            style={{overflow: 'hidden'}}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
export const Tree: componentType = ({children, className}) => {
  return <div className={`${className}`}>{children}</div>;
};
