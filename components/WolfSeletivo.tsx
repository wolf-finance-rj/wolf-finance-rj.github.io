"use client";

import { motion } from "framer-motion";
import { BookOpen, Users, ListChecks } from "lucide-react";
import { seletivo } from "@/data/wolfData";
import SectionTitle from "./SectionTitle";

const trilhaIcons: Record<string, React.ElementType> = {
  "Grupo de Estudos": BookOpen,
  "Grupo de Gestão": Users,
};

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const card = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function WolfSeletivo() {
  return (
    <section id="seletivo" className="py-24 bg-wolf-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          label="Processo Seletivo"
          title={seletivo.title}
          description={seletivo.description}
          light
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12"
        >
          {seletivo.trilhas.map((trilha) => {
            const Icon = trilhaIcons[trilha.title] || BookOpen;
            return (
              <motion.div
                key={trilha.title}
                variants={card}
                className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6"
              >
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-white" />
                </div>
                <h3 className="font-bold text-white mb-2">{trilha.title}</h3>
                <p className="text-sm text-gray-300 leading-relaxed">{trilha.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <a
            href={seletivo.inscricaoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-wolf-blue hover:bg-wolf-blue/80 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105 shadow-lg"
          >
            Inscreva-se agora!
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <ListChecks size={20} className="text-white" />
            <h3 className="font-bold text-white">Etapas do processo</h3>
          </div>
          <div className="flex flex-col gap-3">
            {seletivo.etapas.map((etapa, i) => (
              <div
                key={etapa}
                className="flex items-center gap-2 text-sm text-gray-300"
              >
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/10 text-white text-xs flex items-center justify-center font-medium">
                  {i + 1}
                </span>
                {etapa}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
