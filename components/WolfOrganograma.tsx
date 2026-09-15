"use client";

import { motion } from "framer-motion";
import { governanca } from "@/data/wolfData";
import SectionTitle from "./SectionTitle";
import { img } from "@/lib/paths";

const topContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: "easeOut",
    },
  },
};

const verticalLine = {
  hidden: {
    opacity: 0,
    scaleY: 0,
  },
  visible: {
    opacity: 1,
    scaleY: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const diretoriasContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.15,
    },
  },
};

export default function WolfOrganograma() {
  return (
    <section id="organograma" className="py-24 bg-wolf-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <SectionTitle
          label="Governança"
          title="Nossa estrutura"
          description="Conheça a estrutura organizacional da Wolf Finance"
          light
        />

        <div className="max-w-6xl mx-auto">

          {/* Presidência → Vice */}
          <motion.div
            variants={topContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col items-center"
          >

            {/* Presidente */}
            <motion.div
              variants={item}
              className="
                bg-wolf-blue
                border border-white/20
                text-white
                rounded-2xl
                px-10 py-6
                text-center
                shadow-xl
                min-w-[280px]
              "
            >
              <img
                src={img(governanca.presidencia.photo)}
                alt={governanca.presidencia.name}
                className="
                  w-20 h-20
                  rounded-full
                  object-cover
                  mx-auto mb-4
                  border-2 border-white/30
                "
              />

              <p className="text-xs uppercase tracking-widest text-gray-300">
                Presidência
              </p>

              <h3 className="font-bold text-lg mt-1">
                {governanca.presidencia.name}
              </h3>
            </motion.div>

            {/* Linha Presidente → Vice */}
            <motion.div
              variants={verticalLine}
              className="w-px h-8 bg-white/40 origin-top"
            />

            {/* Vice */}
            <motion.div
              variants={item}
              className="
                bg-white/10
                backdrop-blur-sm
                border border-white/20
                text-white
                rounded-2xl
                px-10 py-6
                text-center
                shadow-lg
                min-w-[280px]
              "
            >
              <img
                src={img(governanca.vicePresidencia.photo)}
                alt={governanca.vicePresidencia.name}
                className="
                  w-20 h-20
                  rounded-full
                  object-cover
                  mx-auto mb-4
                  border-2 border-white/30
                "
              />

              <p className="text-xs uppercase tracking-widest text-gray-300">
                Vice-Presidência
              </p>

              <h3 className="font-bold text-lg mt-1">
                {governanca.vicePresidencia.name}
              </h3>
            </motion.div>

            {/* Linha Vice → Diretorias */}
            <motion.div
              variants={verticalLine}
              className="w-px h-10 bg-white/40 origin-top"
            />
          </motion.div>

          {/* Linha horizontal das diretorias */}
          <motion.div
            initial={{
              opacity: 0,
              scaleX: 0,
            }}
            whileInView={{
              opacity: 1,
              scaleX: 1,
            }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
            }}
            className="
              hidden md:block
              max-w-5xl
              mx-auto
              h-px
              bg-white/30
              origin-center
            "
          />

          {/* Diretorias */}
          <motion.div
            variants={diretoriasContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-5
              gap-5
            "
          >
            {governanca.diretorias.map((diretoria) => (
              <motion.div
                key={diretoria.area}
                variants={item}
                className="relative"
              >

                {/* Linha vertical para cada diretoria */}
                <motion.div
                  initial={{
                    opacity: 0,
                    scaleY: 0,
                  }}
                  whileInView={{
                    opacity: 1,
                    scaleY: 1,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: 0.15,
                  }}
                  className="
                    hidden md:block
                    absolute
                    left-1/2
                    top-0
                    h-6
                    w-px
                    bg-white/30
                    origin-top
                  "
                />

                {/* Card da diretoria */}
                <div
                  className="
                    mt-6
                    h-full
                    bg-white
                    border border-wolf-light-gray
                    rounded-2xl
                    p-5
                    text-center
                    shadow-md
                    hover:shadow-xl
                    hover:-translate-y-1
                    transition-all
                    duration-300
                  "
                >
                  <img
                    src={img(diretoria.photo)}
                    alt={diretoria.name}
                    className="
                      w-16 h-16
                      rounded-full
                      object-cover
                      mx-auto mb-4
                      border-2 border-wolf-blue/20
                    "
                  />

                  <p className="text-xs uppercase tracking-wider text-wolf-blue font-semibold mb-2">
                    {diretoria.area}
                  </p>

                  <h3 className="font-bold text-wolf-navy">
                    {diretoria.name}
                  </h3>

                  <p className="text-sm text-wolf-navy/60 mt-1">
                    {diretoria.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}