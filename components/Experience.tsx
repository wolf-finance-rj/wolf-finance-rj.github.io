"use client";

import { motion } from "framer-motion";
import { Building2, GraduationCap, Users } from "lucide-react";
import { experiences } from "@/data/portfolioData";
import SectionTitle from "./SectionTitle";
import { useLanguage } from "@/context/LanguageContext";

const typeConfig = {
  professional: { icon: Building2, color: "bg-blue-50 text-blue-600" },
  academic: { icon: GraduationCap, color: "bg-emerald-50 text-emerald-600" },
  leadership: { icon: Users, color: "bg-violet-50 text-violet-600" },
};

const expKeyMap: Record<string, string> = {
  "wolf-presidente": "wolf_president",
  "vexa-ai": "vexa",
  "wolf-vice": "wolf_vp",
  "wolf-tech-lead": "wolf_tech",
  "studio-vs": "studio",
  "condor-dev": "condor_dev",
  "condor-estagio": "condor_intern",
};

export default function Experience() {
  const { t, ta } = useLanguage();

  return (
    <section id="experience" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          label={t("experience.label")}
          title={t("experience.title")}
          description={t("experience.description")}
        />

        <div className="max-w-3xl mx-auto space-y-8">
          {experiences.map((exp, i) => {
            const config = typeConfig[exp.type];
            const Icon = config.icon;
            const ek = expKeyMap[exp.id] || exp.id;
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.15 }}
                className="relative pl-10"
              >
                {i < experiences.length - 1 && (
                  <div className="absolute left-[15px] top-10 bottom-0 w-px bg-gray-200" aria-hidden="true" />
                )}

                <div
                  className={`absolute left-0 top-1 w-8 h-8 rounded-xl ${config.color} flex items-center justify-center`}
                >
                  <Icon size={16} />
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-200">
                  <span className="text-xs font-semibold text-[#003070] uppercase tracking-wider">
                    {t(`experience.${ek}.period`)}
                  </span>
                  <h3 className="mt-1 text-lg font-bold text-[#001030]">
                    {t(`experience.${ek}.org`)}
                  </h3>
                  <p className="text-sm text-[#003060] font-medium">
                    {t(`experience.${ek}.role`)}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {ta(`experience.${ek}.bullets`).map((item, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2 text-sm text-[#5a6a7a] leading-relaxed"
                      >
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-[#003070]/30 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
