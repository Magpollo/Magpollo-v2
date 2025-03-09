
import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedArrowProps {
  color?: string;
  className?: string;
}

const AnimatedArrow: React.FC<AnimatedArrowProps> = ({
  color = 'currentColor',
  className = '',
}) => {
  return (
    <motion.svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block ${className}`}
      initial={{ x: -5, opacity: 0.8 }}
      animate={{ 
        x: 0, 
        opacity: 1,
        transition: { 
          repeat: Infinity, 
          repeatType: "reverse", 
          duration: 1
        }
      }}
    >
      <path
        d="M5 12H19M19 12L13 6M19 12L13 18"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
};

export default AnimatedArrow;
