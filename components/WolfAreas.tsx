"use client";

import { motion } from "framer-motion";
import { TrendingUp, BarChart3, Building2, HeartHandshake } from "lucide-react";
import { areas } from "@/data/wolfData";
import SectionTitle from "./SectionTitle";

const iconMap: Record<string, React.ElementType> = {
  "asset-research": TrendingUp,
  "quant-research": BarChart3,
  gestao: Building2,
  "wolf-social": HeartHandshake,
};

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const card = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function WolfAreas() {
  return (
    <section id="areas" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          label="Atuação"
          title="Áreas de atuação"
          description="Conheça as áreas e iniciativas que compõem a Wolf Finance"
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6"
        >
          {areas.map((area) => {
            const Icon = iconMap[area.id] || Building2;
            return (
              <motion.div
                key={area.id}
                variants={card}
                className="bg-white rounded-2xl border border-wolf-light-gray p-6 lg:p-8 hover:border-wolf-blue/30 hover:bg-wolf-blue/[0.03] hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-wolf-blue/10 flex items-center justify-center">
                    <Icon size={24} className="text-wolf-blue" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-wolf-navy">{area.title}</h3>
                    <p className="mt-2 text-wolf-navy/70 leading-relaxed">{area.description}</p>

                    {area.items && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {area.items.map((item) => (
                          <span
                            key={item}
                            className="px-3 py-1 text-xs font-medium text-wolf-blue bg-wolf-blue/5 rounded-lg border border-wolf-blue/10"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    )}

                    {area.subareas?.map((sub) => (
                      <div key={sub.title} className="mt-4 pt-4 border-t border-wolf-light-gray">
                        <p className="text-sm font-semibold text-wolf-navy">{sub.title}</p>
                        <p className="mt-1 text-sm text-wolf-navy/70 leading-relaxed">
                          {sub.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
