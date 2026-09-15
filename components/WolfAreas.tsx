"use client";

import { motion, type Variants } from "framer-motion";
import {
  TrendingUp,
  BarChart3,
  Building2,
  HeartHandshake,
} from "lucide-react";

import { areas } from "@/data/wolfData";
import SectionTitle from "./SectionTitle";

const iconMap: Record<string, React.ElementType> = {
  "asset-research": TrendingUp,
  "quant-research": BarChart3,
  gestao: Building2,
  "wolf-social": HeartHandshake,
};

/* Cards aparecendo um por um */
const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    },
  },
};

/* Animação principal de cada card */
const card: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.98,
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,

    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.08,
    },
  },
};

/* Conteúdo interno */
const content: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

/* Container das tags */
const tagsContainer: Variants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

/* Cada tag */
const tag: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 5,
  },

  visible: {
    opacity: 1,
    scale: 1,
    y: 0,

    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
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
          viewport={{
            once: true,
            amount: 0.1,
          }}
          className="space-y-6"
        >
          {areas.map((area) => {
            const Icon = iconMap[area.id] || Building2;

            return (
              <motion.div
                key={area.id}
                variants={card}
                className="
                  bg-white
                  rounded-2xl
                  border
                  border-wolf-light-gray
                  p-6
                  lg:p-8
                  hover:border-wolf-blue/30
                  hover:bg-wolf-blue/[0.03]
                  hover:shadow-md
                  hover:-translate-y-1
                  transition-all
                  duration-300
                "
              >
                <div className="flex gap-4">

                  {/* Ícone */}
                  <motion.div
                    variants={content}
                    className="
                      flex-shrink-0
                      w-12
                      h-12
                      rounded-xl
                      bg-wolf-blue/10
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <Icon
                      size={24}
                      className="text-wolf-blue"
                    />
                  </motion.div>

                  <div className="flex-1 min-w-0">

                    {/* Título */}
                    <motion.h3
                      variants={content}
                      className="text-xl font-bold text-wolf-navy"
                    >
                      {area.title}
                    </motion.h3>

                    {/* Descrição */}
                    <motion.p
                      variants={content}
                      className="mt-2 text-wolf-navy/70 leading-relaxed"
                    >
                      {area.description}
                    </motion.p>

                    {/* Itens */}
                    {area.items && (
                      <motion.div
                        variants={tagsContainer}
                        className="mt-4 flex flex-wrap gap-2"
                      >
                        {area.items.map((item) => (
                          <motion.span
                            key={item}
                            variants={tag}
                            className="
                              px-3
                              py-1
                              text-xs
                              font-medium
                              text-wolf-blue
                              bg-wolf-blue/5
                              rounded-lg
                              border
                              border-wolf-blue/10
                            "
                          >
                            {item}
                          </motion.span>
                        ))}
                      </motion.div>
                    )}

                    {/* Subáreas */}
                    {area.subareas?.map((sub) => (
                      <motion.div
                        key={sub.title}
                        variants={content}
                        className="
                          mt-4
                          pt-4
                          border-t
                          border-wolf-light-gray
                        "
                      >
                        <p className="text-sm font-semibold text-wolf-navy">
                          {sub.title}
                        </p>

                        <p className="mt-1 text-sm text-wolf-navy/70 leading-relaxed">
                          {sub.description}
                        </p>
                      </motion.div>
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