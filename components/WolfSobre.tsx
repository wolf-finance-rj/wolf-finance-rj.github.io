"use client";

import { motion } from "framer-motion";
import { Target, Eye, Heart } from "lucide-react";
import { sobre } from "@/data/wolfData";
import SectionTitle from "./SectionTitle";
import { img } from "@/lib/paths";

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

export default function WolfSobre() {
  return (
    <section id="sobre" className="py-24 bg-wolf-light-gray/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          label="Sobre"
          title="Quem somos"
          description="Conheça a Wolf Finance e nossa proposta"
        />

        <div className="max-w-3xl mx-auto space-y-6 mb-16">
          {sobre.quemSomos.map((par, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-wolf-navy/70 text-lg leading-relaxed"
            >
              {par}
            </motion.p>
          ))}
        </div>

        {/* Team photo */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl mx-auto mb-16"
        >
          <div className="relative group">
            <div className="absolute -inset-2 bg-wolf-blue/10 rounded-3xl blur-lg group-hover:blur-xl transition-all duration-500" />
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={img("/images/apresentacao_asset.jpeg")}
                alt="Membros da Wolf Finance"
                className="w-full h-[100px] sm:h-[400px] object-cover object-[center_70%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-wolf-navy/40 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
                <span className="px-3 py-1 text-xs font-medium text-white bg-white/20 backdrop-blur-sm rounded-lg">
                  Equipe Wolf Finance
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16"
        >
          <motion.div variants={item} className="bg-white rounded-2xl p-6 border border-wolf-light-gray">
            <div className="w-10 h-10 rounded-xl bg-wolf-blue/10 flex items-center justify-center mb-4">
              <Target size={20} className="text-wolf-blue" />
            </div>
            <h3 className="font-bold text-wolf-navy mb-2">Missão</h3>
            <p className="text-sm text-wolf-navy/70 leading-relaxed">{sobre.missao}</p>
          </motion.div>

          <motion.div variants={item} className="bg-white rounded-2xl p-6 border border-wolf-light-gray">
            <div className="w-10 h-10 rounded-xl bg-wolf-blue/10 flex items-center justify-center mb-4">
              <Eye size={20} className="text-wolf-blue" />
            </div>
            <h3 className="font-bold text-wolf-navy mb-2">Visão</h3>
            <p className="text-sm text-wolf-navy/70 leading-relaxed">{sobre.visao}</p>
          </motion.div>

          <motion.div variants={item} className="bg-white rounded-2xl p-6 border border-wolf-light-gray">
            <div className="w-10 h-10 rounded-xl bg-wolf-blue/10 flex items-center justify-center mb-4">
              <Heart size={20} className="text-wolf-blue" />
            </div>
            <h3 className="font-bold text-wolf-navy mb-2">Valores</h3>
            <ul className="space-y-1">
              {sobre.valores.map((v) => (
                <li key={v} className="text-sm text-wolf-navy/70 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-wolf-blue flex-shrink-0" />
                  {v}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>


      </div>
    </section>
  );
}
