"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function SectionWrapper({ children, className }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.8, 
        ease: [0.21, 0.47, 0.32, 0.98] // Custom cubic-bezier untuk efek smooth
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}