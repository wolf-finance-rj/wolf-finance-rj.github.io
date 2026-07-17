"use client";

import { motion } from "framer-motion";
import { Cpu, BarChart3, Users } from "lucide-react";
import { pillars } from "@/data/portfolioData";
import SectionTitle from "./SectionTitle";
import { useLanguage } from "@/context/LanguageContext";

const iconMap: Record<string, React.ElementType> = {
  cpu: Cpu,
  chart: BarChart3,
  users: Users,
};

const pillarKeys = ["ai", "backend", "leadership"];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          label={t("about.label")}
          title={t("about.title")}
        />

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <p className="text-[#5a6a7a] text-lg leading-relaxed">
              {t("about.intro")}
            </p>
            <p className="text-[#5a6a7a] text-lg leading-relaxed">
              {t("about.extended")}
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4"
          >
            {pillars.map((pillar, i) => {
              const Icon = iconMap[pillar.icon] || Cpu;
              return (
                <motion.div
                  key={pillarKeys[i]}
                  variants={item}
                  className="flex gap-4 p-5 rounded-2xl bg-white border border-gray-200 hover:shadow-sm transition-shadow"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                    <Icon size={20} className="text-[#003070]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#001030]">
                      {t(`about.pillars.${pillarKeys[i]}.title`)}
                    </h3>
                    <p className="mt-1 text-sm text-[#5a6a7a] leading-relaxed">
                      {t(`about.pillars.${pillarKeys[i]}.description`)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
