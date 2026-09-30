"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, LineChart } from "lucide-react";

const fundos = [
  {
    nome: "Wolf Finance Capital",
    ticker: "WFC-01",
    estrategia: "Multimercado",
    rota: "/fundo/asset",
    descricao:
      "Fundo multimercado que integra as análises das mesas de pesquisa em uma carteira simulada de multi-ativos.",
    mesas: ["Macroeconomia", "Equity", "Ativos Digitais"],
    metricas: [
      { label: "Sharpe", value: "0" },
      { label: "Volatilidade", value: "0%" },
    ],
  },
  {
    nome: "Wolf Quant Fund",
    ticker: "WQF-01",
    estrategia: "Quantitativo",
    rota: "/fundo/quant",
    descricao:
      "Fundo quantitativo estruturado em três mesas de estratégia — Pair Trading, Momentum e Machine Learning.",
    mesas: ["Pair Trading", "Momentum", "Machine Learning"],
    metricas: [
      { label: "Sharpe", value: "0" },
      { label: "Volatilidade", value: "0%" },
    ],
  },
];

export default function WolfFundos() {
  return (
    <section id="fundos" className="py-24 bg-wolf-navy relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-wolf-blue/30 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 bg-white/5 text-sm text-gray-300">
            <LineChart size={16} />
            Fundos fictícios
          </span>
          <h2 className="mt-5 text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Fundos da Wolf Finance
          </h2>
          <p className="mt-4 text-lg max-w-2xl leading-relaxed text-gray-300">
            Acompanhe os fundos simulados da liga — carteiras construídas e
            geridas pelas mesas de Asset Research e Quant, com finalidade acadêmica.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {fundos.map((fundo) => (
            <motion.div
              key={fundo.ticker}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
            >
              <Link
                href={fundo.rota}
                className="
                  group flex flex-col h-full
                  rounded-2xl border border-white/10
                  bg-white/[0.05]
                  p-7
                  hover:bg-white/[0.09]
                  hover:border-white/25
                  transition-colors
                "
              >
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 text-xs font-semibold tracking-wider text-white bg-white/10 rounded-lg">
                    {fundo.ticker}
                  </span>
                  <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
                    {fundo.estrategia}
                  </span>
                </div>

                <h3 className="mt-5 text-2xl font-bold text-white">
                  {fundo.nome}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-gray-300">
                  {fundo.descricao}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {fundo.mesas.map((mesa) => (
                    <span
                      key={mesa}
                      className="px-2.5 py-1 text-xs font-medium text-gray-300 bg-white/5 rounded-lg border border-white/10"
                    >
                      {mesa}
                    </span>
                  ))}
                </div>

                <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between">
                  <div className="flex gap-6">
                    {fundo.metricas.map((m) => (
                      <div key={m.label}>
                        <p className="text-xs text-gray-400">{m.label}</p>
                        <p className="mt-0.5 text-lg font-bold text-white">
                          {m.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-white group-hover:gap-3 transition-all">
                    Ver fundo
                    <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <p className="mt-6 text-xs text-gray-500">
          * Valores fictícios, com finalidade acadêmica. Não constituem recomendação de investimento.
        </p>
      </div>
    </section>
  );
}
