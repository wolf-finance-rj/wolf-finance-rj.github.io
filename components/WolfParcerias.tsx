"use client";

import { motion } from "framer-motion";
import { Handshake } from "lucide-react";

export default function WolfParcerias() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-wolf-blue/10 flex items-center justify-center mx-auto mb-6">
            <Handshake size={32} className="text-wolf-blue" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-wolf-navy tracking-tight mb-4">
            Construa projetos com a Wolf Finance
          </h2>
          <p className="text-lg text-wolf-navy/70 leading-relaxed mb-8">
            A Wolf Finance está aberta a parcerias com empresas, instituições, profissionais,
            professores e organizações interessadas em contribuir para a formação de estudantes.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {["Palestras", "Visitas", "Mentorias", "Competições", "Capacitações", "Eventos", "Pesquisa", "Educação Financeira"].map(
              (item) => (
                <span
                  key={item}
                  className="px-3 py-1 text-sm font-medium text-wolf-blue bg-wolf-blue/5 rounded-lg border border-wolf-blue/10"
                >
                  {item}
                </span>
              )
            )}
          </div>
          <button
            onClick={() => scrollTo("#contato")}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-wolf-blue rounded-xl hover:bg-[#254a7d] transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-wolf-blue focus-visible:ring-offset-2"
          >
            Fale com a Wolf
          </button>
        </motion.div>
      </div>
    </section>
  );
}
