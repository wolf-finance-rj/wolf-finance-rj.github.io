"use client";

import { motion } from "framer-motion";

interface SectionTitleProps {
  label: string;
  title: string;
  description?: string;
}

export default function SectionTitle({ label, title, description }: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className="mb-16"
    >
      <span className="text-[#003070] text-sm font-semibold tracking-wider uppercase">
        {label}
      </span>
      <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-[#001030] tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-[#5a6a7a] text-lg max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}
