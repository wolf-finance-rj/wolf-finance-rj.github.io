"use client";

import { motion } from "framer-motion";
import { Brain, Code, TrendingUp, Presentation } from "lucide-react";
import { skillCategories } from "@/data/portfolioData";
import SectionTitle from "./SectionTitle";
import { useLanguage } from "@/context/LanguageContext";

const categoryIcons: Record<string, React.ElementType> = {
  "Inteligência Artificial e Dados": Brain,
  "Desenvolvimento Backend": Code,
  "Pesquisa quantitativa": TrendingUp,
  "Ferramentas e negócio": Presentation,
};

const categoryTransKeys = ["ai", "backend", "quant", "tools"];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const card = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Skills() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="py-24 bg-[#f4f7fa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          label={t("skills.label")}
          title={t("skills.title")}
          description={t("skills.description")}
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {skillCategories.map((category, i) => {
            const Icon = categoryIcons[category.title] || Code;
            return (
              <motion.div
                key={category.title}
                variants={card}
                className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-sm transition-shadow"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-[#003070]" />
                </div>
                <h3 className="font-semibold text-[#001030] mb-3">
                  {t(`skills.categories.${categoryTransKeys[i]}`)}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 text-xs font-medium text-[#003070] bg-blue-50 rounded-lg"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
