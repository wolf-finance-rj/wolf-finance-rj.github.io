"use client";

import { motion } from "framer-motion";
import { Calendar, Trophy, Presentation } from "lucide-react";
import { eventos } from "@/data/wolfData";
import SectionTitle from "./SectionTitle";
import { img } from "@/lib/paths";

const iconMap: Record<string, React.ElementType> = {
  "Wolf Finance Week": Calendar,
  "Challenges e competições": Trophy,
  "Palestras e visitas institucionais": Presentation,
};

const photoMap: Record<string, string> = {
  "Wolf Finance Week": "/images/membros-wolf.jpeg",
  "Challenges e competições": "/images/palestra-educacao-financeira.jpeg",
  "Palestras e visitas institucionais": "/images/visita-hashdex.jpeg",
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

export default function WolfEventos() {
  return (
    <section id="eventos" className="py-24 bg-wolf-light-gray/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          label="Eventos"
          title="Eventos e oportunidades"
          description="Iniciativas que conectam nossos membros ao mercado financeiro"
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6"
        >
          {eventos.items.map((evento) => {
            const Icon = iconMap[evento.title] || Calendar;
            return (
              <motion.div
                key={evento.title}
                variants={card}
                className="group bg-white rounded-2xl border border-wolf-light-gray overflow-hidden hover:border-wolf-blue/20 hover:shadow-sm transition-all"
              >
                {photoMap[evento.title] && (
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={img(photoMap[evento.title])}
                      alt={evento.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>
                )}
                <div className="p-6">
                  <div className="w-10 h-10 rounded-xl bg-wolf-blue/10 flex items-center justify-center mb-4">
                    <Icon size={20} className="text-wolf-blue" />
                  </div>
                  <h3 className="font-bold text-wolf-navy mb-2">{evento.title}</h3>
                  <p className="text-sm text-wolf-navy/70 leading-relaxed">{evento.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
