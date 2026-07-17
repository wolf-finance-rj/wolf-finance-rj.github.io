"use client";

import { motion } from "framer-motion";
import { GraduationCap, MapPin, Calendar } from "lucide-react";
import { education } from "@/data/portfolioData";
import SectionTitle from "./SectionTitle";
import { useLanguage } from "@/context/LanguageContext";

export default function Education() {
  const { t, ta } = useLanguage();

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          label={t("education.label")}
          title={t("education.title")}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                <GraduationCap size={24} className="text-[#003070]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#001030]">{education.degree}</h3>
                <p className="text-[#003070] font-semibold mt-1">{education.institution}</p>

                <div className="flex flex-wrap gap-4 mt-3 text-sm text-[#5a6a7a]">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar size={14} />
                    {education.period}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin size={14} />
                    {education.expectedCompletion}
                  </span>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="text-sm font-semibold text-[#001030] mb-3">
                    {t("education.highlightsTitle")}
                  </h4>
                  <ul className="space-y-2">
                    {ta("education.highlights").map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-[#5a6a7a] leading-relaxed"
                      >
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-[#003070]/30 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
