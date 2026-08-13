"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { img } from "@/lib/paths";
import SectionTitle from "./SectionTitle";

const fotos = [
  {
    src: "/images/blockchainrio1.jpeg",
    alt: "Blockchain Rio 1",
    legenda: "Blockchain Rio",
  },
  {
    src: "/images/blockchainrio2.jpeg",
    alt: "Blockchain Rio 2",
    legenda: "Blockchain Rio",
  },
  {
    src: "/images/apresentacao_asset.jpeg",
    alt: "Apresentação da Asset Research",
    legenda: "Apresentação da Asset Research",
  },
  {
    src: "/images/visita-hashdex.jpeg",
    alt: "Visita à Hashdex",
    legenda: "Visita institucional — Hashdex",
  },
  {
    src: "/images/palestra-educacao-financeira.jpeg",
    alt: "Palestra de Educação Financeira",
    legenda: "Wolf Social — Educação Financeira",
  },
  {
    src: "/images/visita_fgv.jpeg",
    alt: "Visita à FGV",
    legenda: "Visita institucional — FGV",
  },
  {
    src: "/images/novos_membros_25_2.jpeg",
    alt: "Novos membros 2025.2",
    legenda: "Novos membros 2025.2",
  },
  {
    src: "/images/confraternizacao_fperiodo.jpeg",
    alt: "Confraternização",
    legenda: "Confraternização fim de período",
  },
  {
    src: "/images/finalizacao_fase_treineer.jpeg",
    alt: "Finalização fase treineer",
    legenda: "Finalização — Fase Treineer",
  },
  {
    src: "/images/novos_membros_25_2_2.jpeg",
    alt: "Novos membros",
    legenda: "Novos membros 2025.2",
  },
  {
    src: "/images/palestra_ed_financeira.jpeg",
    alt: "Palestra Educação Financeira",
    legenda: "Palestra — Educação Financeira",
  },
];

export default function WolfGaleria() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = () => {
    setDirection(1);
    setIndex((i) => (i + 1) % fotos.length);
  };

  const prev = () => {
    setDirection(-1);
    setIndex((i) => (i - 1 + fotos.length) % fotos.length);
  };

  useEffect(() => {
    const timer = setInterval(next, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="galeria" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          label="Galeria"
          title="Nossos momentos"
          description="Registros de eventos, visitas e atividades da Wolf Finance"
        />

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              variants={{
                enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
                center: { x: 0, opacity: 1 },
                exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="relative rounded-2xl overflow-hidden aspect-[16/10]"
            >
              <img
                src={img(fotos[index].src)}
                alt={fotos[index].alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-white text-lg font-medium">
                  {fotos[index].legenda}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Prev */}
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow transition-all z-10"
          >
            <ChevronLeft size={20} className="text-wolf-navy" />
          </button>

          {/* Next */}
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow transition-all z-10"
          >
            <ChevronRight size={20} className="text-wolf-navy" />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {fotos.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === index
                    ? "bg-wolf-blue w-6"
                    : "bg-wolf-light-gray hover:bg-wolf-blue/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
