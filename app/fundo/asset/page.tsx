"use client";

import { useMemo, useState, type MouseEvent, type ReactNode } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { img } from "@/lib/paths";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bitcoin,
  CalendarDays,
  ChartCandlestick,
  ChartNoAxesCombined,
  ChevronRight,
  Clock3,
  FileCheck,
  History,
  Info,
  Landmark,
  PieChart,
  Scale,
  Wallet,
} from "lucide-react";
import { motion } from "framer-motion";

import {
  ALOCACAO,
  CORES,
  DESKS,
  FUNDO,
  REFERENCIA,
  RISCO,
  SERIE_MENSAL,
  type Mesa,
} from "./fund-data";

/**
 * Wolf Finance Capital — dashboard do fundo multimercado gerido pela
 * Asset Research (3 mesas: Macroeconomia, Equity e Ativos Digitais).
 * Rota: /fundo/asset
 * A fonte única de dados é ./fund-data.ts. Para a manutenção mensal, edite
 * apenas aquele arquivo (REFERENCIA + uma linha em SERIE_MENSAL). Tudo o que
 * aparece aqui — cota, patrimônio, curva acumulada, drawdown, excesso de
 * retorno — é DERIVADO da série mensal.
 * Todos os valores são FICTÍCIOS (simulação acadêmica).
 */

/* ------------------------------------------------------------------ */
/* Helpers de formatação                                               */
/* ------------------------------------------------------------------ */

const brl = (n: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(n);

const pct = (n: number, d = 2) =>
  `${n > 0 ? "+" : ""}${n.toFixed(d).replace(".", ",")}%`;

const num = (n: number, d = 2) => n.toFixed(d).replace(".", ",");

/* ------------------------------------------------------------------ */
/* Derivação a partir da série mensal (fonte única de verdade)         */
/* ------------------------------------------------------------------ */

type Curva = { mes: string; fundo: number; cdi: number; ibov: number };

function curvaAcumulada(): Curva[] {
  let f = 0;
  let c = 0;
  let i = 0;
  return SERIE_MENSAL.map((m) => {
    f = (1 + f / 100) * (1 + m.fundo / 100) - 1;
    c = (1 + c / 100) * (1 + m.cdi / 100) - 1;
    i = (1 + i / 100) * (1 + m.ibov / 100) - 1;
    return { mes: m.mes, fundo: f * 100, cdi: c * 100, ibov: i * 100 };
  });
}

function rebase(pts: Curva[]): Curva[] {
  const base = pts[0];
  return pts.map((p) => ({
    mes: p.mes,
    fundo: p.fundo - base.fundo,
    cdi: p.cdi - base.cdi,
    ibov: p.ibov - base.ibov,
  }));
}

const DESK_ICONS: Record<Mesa["id"], LucideIcon> = {
  macro: Landmark,
  equity: ChartCandlestick,
  digital: Bitcoin,
};

/* ------------------------------------------------------------------ */
/* Componentes base                                                    */
/* ------------------------------------------------------------------ */

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-wolf-light-gray bg-white shadow-[0_6px_26px_rgba(11,31,58,0.04)] ${className}`}>
      {children}
    </div>
  );
}

function SectionTitle({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div>
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-wolf-blue">{eyebrow}</p>
      <h2 className="text-2xl font-bold tracking-tight text-wolf-navy sm:text-3xl">{title}</h2>
      {description && <p className="mt-3 max-w-2xl text-sm leading-6 text-[#5a6a7a]">{description}</p>}
    </div>
  );
}

function Kpi({ label, value, detail, icon: Icon, accent = false }: {
  label: string;
  value: string;
  detail: string;
  icon: LucideIcon;
  accent?: boolean;
}) {
  return (
    <Card className="p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#9db3d3] hover:shadow-[0_12px_34px_rgba(11,31,58,0.09)]">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium text-[#5a6a7a]">{label}</span>
        <span className={`rounded-xl p-2.5 ${accent ? "bg-[#e6eef9] text-wolf-blue" : "bg-[#f1f4f8] text-wolf-navy"}`}>
          <Icon size={19} strokeWidth={1.8} />
        </span>
      </div>
      <p className={`mt-5 text-[27px] font-bold tracking-tight sm:text-[30px] ${accent ? "text-wolf-blue" : "text-wolf-navy"}`}>
        {value}
      </p>
      <p className="mt-2 text-xs text-[#64748b]">{detail}</p>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/* Gráfico 1 — Curva de performance (fundo vs CDI vs Ibovespa)         */
/* ------------------------------------------------------------------ */

type LineKey = "fundo" | "cdi" | "ibov";

function PerformanceChart({ data, fundLabel }: { data: Curva[]; fundLabel: string }) {
  const width = 880;
  const height = 330;
  const pad = { left: 48, right: 16, top: 18, bottom: 32 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;

  const [hover, setHover] = useState<{ key: LineKey; x: number; y: number } | null>(null);

  const series = data.flatMap((p) => [p.fundo, p.cdi, p.ibov]);
  const rawMin = Math.min(0, ...series);
  const rawMax = Math.max(0, ...series);
  const span = Math.max(rawMax - rawMin, 1);
  const min = rawMin - span * 0.12;
  const max = rawMax + span * 0.12;

  const x = (i: number) => pad.left + (i / (data.length - 1)) * plotW;
  const y = (v: number) => pad.top + (1 - (v - min) / (max - min)) * plotH;
  const path = (key: LineKey) =>
    data.map((p, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(p[key]).toFixed(1)}`).join(" ");

  const ticks = Array.from({ length: 5 }, (_, i) => min + ((max - min) * i) / 4);

  const names: Record<LineKey, string> = { fundo: fundLabel, cdi: "CDI", ibov: "Ibovespa" };

  const onMove = (e: MouseEvent<SVGPathElement>) => {
    const rect = e.currentTarget.ownerSVGElement!.getBoundingClientRect();
    const key = e.currentTarget.dataset.key as LineKey;
    setHover({
      key,
      x: ((e.clientX - rect.left) / rect.width) * width,
      y: ((e.clientY - rect.top) / rect.height) * height,
    });
  };

  const hit = (key: LineKey) => (
    <path
      d={path(key)}
      data-key={key}
      fill="none" stroke="transparent" strokeWidth="14"
      onMouseMove={onMove}
      style={{ pointerEvents: "stroke", cursor: "pointer" }}
    />
  );

  const tipLabel = hover ? names[hover.key] : "";
  const tipX = hover ? Math.min(hover.x + 12, width - (tipLabel.length * 7 + 24)) : 0;
  const tipY = hover ? Math.max(hover.y - 26, 6) : 0;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full" role="img" aria-label="Curva de performance do fundo contra CDI e Ibovespa" onMouseLeave={() => setHover(null)}>
      <defs>
        <linearGradient id="wolfFundFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={CORES.fundo} stopOpacity="0.18" />
          <stop offset="100%" stopColor={CORES.fundo} stopOpacity="0" />
        </linearGradient>
      </defs>

      {ticks.map((t, i) => (
        <g key={i}>
          <line x1={pad.left} y1={y(t)} x2={width - pad.right} y2={y(t)} stroke="#e8edf4" strokeWidth="1" />
          <text x={pad.left - 8} y={y(t) + 4} fill="#94a3b8" fontSize="11" textAnchor="end">
            {num(t, 1)}%
          </text>
        </g>
      ))}

      <motion.path
        d={`${path("fundo")} L${x(data.length - 1).toFixed(1)},${y(min)} L${x(0).toFixed(1)},${y(min)} Z`}
        fill="url(#wolfFundFill)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 1.1 }}
      />
      <motion.path
        d={path("ibov")}
        fill="none" stroke={CORES.ibov} strokeWidth="2.2" strokeDasharray="5 5" strokeLinejoin="round"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.9 }}
      />
      <motion.path
        d={path("cdi")}
        fill="none" stroke={CORES.cdi} strokeWidth="2.5" strokeDasharray="8 4" strokeLinejoin="round"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.9 }}
      />
      <motion.path
        d={path("fundo")}
        fill="none" stroke={CORES.fundo} strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: "easeOut" }}
      />
      <motion.circle
        cx={x(data.length - 1)} cy={y(data[data.length - 1].fundo)} r="5" fill={CORES.fundo} stroke="#ffffff" strokeWidth="3"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.3 }}
      />

      {hit("ibov")}
      {hit("cdi")}
      {hit("fundo")}

      {hover && (
        <g pointerEvents="none">
          <rect x={tipX} y={tipY} rx="6" width={tipLabel.length * 7 + 16} height="20" fill="#0b1f3a" />
          <text x={tipX + 8} y={tipY + 14} fill="#ffffff" fontSize="11" fontWeight="600">
            {tipLabel}
          </text>
        </g>
      )}

      {data.map((p, i) => (
        <text
          key={i}
          x={x(i)}
          y={height - 9}
          fill="#64748b"
          fontSize="11"
          textAnchor={i === 0 ? "start" : i === data.length - 1 ? "end" : "middle"}
        >
          {p.mes}
        </text>
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Gráfico 2 — Contribuição mensal por mesa (barras empilhadas ±)      */
/* ------------------------------------------------------------------ */

function ContributionChart() {
  const width = 880;
  const height = 320;
  const pad = { left: 46, right: 16, top: 18, bottom: 30 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;
  const baseline = pad.top + plotH / 2;

  const keys = ["macro", "equity", "digital"] as const;
  const [hover, setHover] = useState<{ i: number; x: number; y: number } | null>(null);
  let maxPos = 0;
  let maxNeg = 0;
  SERIE_MENSAL.forEach((m) => {
    let p = 0;
    let n = 0;
    for (const k of keys) {
      const v = m.contribuicao[k];
      if (v >= 0) p += v;
      else n += v;
    }
    maxPos = Math.max(maxPos, p);
    maxNeg = Math.min(maxNeg, n);
  });
  const scale = Math.max(maxPos, -maxNeg, 0.5) * 1.2;
  const y = (v: number) => baseline - (v / scale) * (plotH / 2);

  const n = SERIE_MENSAL.length;
  const step = plotW / n;
  const barW = step * 0.6;
  const x = (i: number) => pad.left + i * step;
  const fundLine = SERIE_MENSAL.map((m, i) => `${(x(i) + step / 2).toFixed(1)},${y(m.fundo).toFixed(1)}`).join(" ");

  const onMove = (e: MouseEvent<SVGRectElement>, i: number) => {
    const rect = e.currentTarget.ownerSVGElement!.getBoundingClientRect();
    setHover({
      i,
      x: ((e.clientX - rect.left) / rect.width) * width,
      y: ((e.clientY - rect.top) / rect.height) * height,
    });
  };

  const hovered = hover !== null ? SERIE_MENSAL[hover.i] : null;
  const tooltip = hovered
    ? {
        mes: hovered.mes,
        fundo: hovered.fundo,
        rows: DESKS.map((d) => ({ label: d.nome, v: hovered.contribuicao[d.id], c: d.cor })),
      }
    : null;
  const tw = 168;
  const th = 26 + (tooltip ? tooltip.rows.length : 0) * 16;
  const tx = hover ? Math.min(hover.x + 12, width - tw - 8) : 0;
  const ty = hover ? Math.max(hover.y - th, 6) : 0;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full" role="img" aria-label="Contribuição mensal de cada mesa para o retorno do fundo" onMouseLeave={() => setHover(null)}>
      <line x1={pad.left} y1={baseline} x2={width - pad.right} y2={baseline} stroke="#cbd5e1" strokeWidth="1.4" />
      <line x1={pad.left} y1={y(maxPos)} x2={width - pad.right} y2={y(maxPos)} stroke="#e8edf4" strokeWidth="1" strokeDasharray="4 4" />
      <line x1={pad.left} y1={y(maxNeg)} x2={width - pad.right} y2={y(maxNeg)} stroke="#e8edf4" strokeWidth="1" strokeDasharray="4 4" />
      <text x={pad.left - 8} y={y(maxPos) + 4} fill="#94a3b8" fontSize="11" textAnchor="end">+{num(maxPos, 1)}</text>
      <text x={pad.left - 8} y={y(maxNeg) + 4} fill="#94a3b8" fontSize="11" textAnchor="end">{num(maxNeg, 1)}</text>

      <motion.g
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
      >
        {SERIE_MENSAL.map((m, i) => {
          let pos = 0;
          let neg = 0;
          const x0 = x(i) + (step - barW) / 2;
          return (
            <g key={m.mes} style={{ opacity: hover && hover.i !== i ? 0.3 : 1, transition: "opacity 150ms" }}>
              {keys.map((k) => {
                const v = m.contribuicao[k];
                const rect = v >= 0
                  ? { y: y(pos + v), h: y(pos) - y(pos + v) }
                  : { y: y(neg), h: y(neg + v) - y(neg) };
                if (v >= 0) pos += v;
                else neg += v;
                const h = Math.max(rect.h, 0.6);
                return (
                  <motion.rect
                    key={k}
                    x={x0}
                    width={barW}
                    fill={CORES[k]}
                    rx="1.5"
                    variants={{
                      hidden: { height: 0, y: v >= 0 ? baseline : rect.y, opacity: 0 },
                      visible: { height: h, y: rect.y, opacity: 1, transition: { duration: 0.45, ease: "easeOut" } },
                    }}
                  />
                );
              })}
            </g>
          );
        })}
      </motion.g>

      <motion.polyline
        points={fundLine}
        fill="none" stroke={CORES.fundo} strokeWidth="2.6" strokeLinejoin="round" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
      />
      {SERIE_MENSAL.map((m, i) => (
        <motion.circle
          key={m.mes}
          cx={x(i) + step / 2} cy={y(m.fundo)} r="3.4" fill={CORES.fundo} stroke="#ffffff" strokeWidth="1.6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5 }}
        />
      ))}

      {SERIE_MENSAL.map((m, i) => (
        <text key={m.mes} x={x(i) + step / 2} y={height - 9} fill="#64748b" fontSize="11" textAnchor="middle">
          {m.mes}
        </text>
      ))}

      {/* overlay de captura de hover por mês */}
      {SERIE_MENSAL.map((m, i) => (
        <rect
          key={`hit-${m.mes}`}
          x={x(i)}
          y={pad.top}
          width={step}
          height={plotH}
          fill="transparent"
          onMouseMove={(e) => onMove(e, i)}
          style={{ cursor: "pointer" }}
        />
      ))}

      {/* guia vertical no mês em foco */}
      {hover && (
        <line
          x1={x(hover.i) + step / 2}
          y1={pad.top}
          x2={x(hover.i) + step / 2}
          y2={pad.top + plotH}
          stroke={CORES.fundo}
          strokeWidth="1"
          strokeDasharray="3 3"
          opacity="0.4"
          pointerEvents="none"
        />
      )}

      {/* tooltip */}
      {hover && tooltip && (
        <g pointerEvents="none">
          <rect x={tx} y={ty} width={tw} height={th} rx="8" fill="#0b1f3a" />
          <text x={tx + 10} y={ty + 17} fill="#ffffff" fontSize="12" fontWeight="700">
            {tooltip.mes}
          </text>
          <text x={tx + tw - 10} y={ty + 17} fill="#ffffff" fontSize="12" fontWeight="700" textAnchor="end">
            {tooltip.fundo >= 0 ? "+" : ""}{num(tooltip.fundo, 2)}
          </text>
          {tooltip.rows.map((r, idx) => (
            <g key={r.label}>
              <circle cx={tx + 11} cy={ty + 35 + idx * 16} r="3" fill={r.c} />
              <text x={tx + 20} y={ty + 39 + idx * 16} fill="#cbd5e1" fontSize="11">
                {r.label}
              </text>
              <text x={tx + tw - 10} y={ty + 39 + idx * 16} fill="#ffffff" fontSize="11" fontWeight="600" textAnchor="end">
                {r.v >= 0 ? "+" : ""}{num(r.v, 2)}
              </text>
            </g>
          ))}
        </g>
      )}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Gráfico 3 — Drawdown acumulado                                      */
/* ------------------------------------------------------------------ */

function DrawdownChart() {
  const width = 880;
  const height = 250;
  const pad = { left: 46, right: 16, top: 16, bottom: 30 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;

  const n = SERIE_MENSAL.length;
  const min = Math.min(...SERIE_MENSAL.map((m) => m.drawdown));
  const span = min === 0 ? -1 : min; // guarda contra série zerada (0/0 → NaN)
  const x = (i: number) => pad.left + (i / (n - 1)) * plotW;
  const y = (v: number) => pad.top + (1 - v / span) * plotH;

  const line = SERIE_MENSAL.map((m, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(m.drawdown).toFixed(1)}`).join(" ");
  const area = `${line} L${x(n - 1).toFixed(1)},${y(0)} L${x(0).toFixed(1)},${y(0)} Z`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full" role="img" aria-label="Drawdown acumulado do fundo ao longo dos meses">
      <line x1={pad.left} y1={y(0)} x2={width - pad.right} y2={y(0)} stroke="#e8edf4" strokeWidth="1.2" />
      <text x={pad.left - 8} y={y(0) + 4} fill="#94a3b8" fontSize="11" textAnchor="end">0%</text>
      <text x={pad.left - 8} y={y(min) + 4} fill="#94a3b8" fontSize="11" textAnchor="end">{num(min, 1)}%</text>

      <motion.path
        d={area} fill={CORES.negativo}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.12 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 1.0 }}
      />
      <motion.path
        d={line} fill="none" stroke={CORES.negativo} strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.3, ease: "easeOut" }}
      />

      {SERIE_MENSAL.map((m, i) => (
        <text key={m.mes} x={x(i)} y={height - 9} fill="#64748b" fontSize="11" textAnchor="middle">
          {m.mes}
        </text>
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Sparkline — contribuição mensal de uma mesa                         */
/* ------------------------------------------------------------------ */

function Sparkline({ values, color }: { values: number[]; color: string }) {
  const w = 220;
  const h = 56;
  const pad = 3;
  const min = Math.min(0, ...values);
  const max = Math.max(0, ...values);
  const span = max - min || 1;
  const x = (i: number) => pad + (i / (values.length - 1)) * (w - pad * 2);
  const y = (v: number) => pad + (1 - (v - min) / span) * (h - pad * 2);
  const line = values.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  const area = `${x(0).toFixed(1)},${(h - pad).toFixed(1)} ${line} ${x(values.length - 1).toFixed(1)},${(h - pad).toFixed(1)}`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" role="img" aria-label="Sparkline de contribuição mensal da mesa">
      <line x1={pad} y1={y(0)} x2={w - pad} y2={y(0)} stroke="#e2e8f0" strokeWidth="1" />
      <motion.polygon
        points={area} fill={color}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.12 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.9 }}
      />
      <motion.polyline
        points={line} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Gráfico 4 — Donut de alocação (hover enfatiza a fatia)              */
/* ------------------------------------------------------------------ */

function polar(cx: number, cy: number, r: number, deg: number) {
  const a = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

function slicePath(cx: number, cy: number, outer: number, inner: number, from: number, to: number) {
  const large = to - from > 180 ? 1 : 0;
  const a = polar(cx, cy, outer, from);
  const b = polar(cx, cy, outer, to);
  const c = polar(cx, cy, inner, to);
  const d = polar(cx, cy, inner, from);
  return [
    `M${a.x.toFixed(2)},${a.y.toFixed(2)}`,
    `A${outer},${outer} 0 ${large} 1 ${b.x.toFixed(2)},${b.y.toFixed(2)}`,
    `L${c.x.toFixed(2)},${c.y.toFixed(2)}`,
    `A${inner},${inner} 0 ${large} 0 ${d.x.toFixed(2)},${d.y.toFixed(2)}`,
    "Z",
  ].join(" ");
}

function Donut({ data }: { data: typeof ALOCACAO }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const cx = 100;
  const cy = 100;
  const inner = 58;
  const outer = 88;

  let acc = 0;
  const slices = data.map((a) => {
    const from = (acc / 100) * 360;
    acc += a.value;
    return { ...a, from, to: (acc / 100) * 360 };
  });
  const active = slices.find((s) => s.label === hovered);

  return (
    <>
      <motion.div
        className="mx-auto shrink-0"
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <svg viewBox="0 0 200 200" className="size-48" role="img" aria-label="Alocação de capital por mesa">
          {slices.map((s) => {
            const dim = hovered !== null && hovered !== s.label;
            const r = hovered === s.label ? outer + 6 : outer;
            return (
              <path
                key={s.label}
                d={slicePath(cx, cy, r, inner, s.from, s.to)}
                fill={s.cor}
                onMouseEnter={() => setHovered(s.label)}
                onMouseLeave={() => setHovered(null)}
                opacity={dim ? 0.22 : 1}
                style={{ cursor: "pointer", transition: "opacity 0.2s ease" }}
              />
            );
          })}
          <circle cx={cx} cy={cy} r={inner} fill="#ffffff" />
          <text x={cx} y={cy - 2} textAnchor="middle" fill="#0b1f3a" fontSize="28" fontWeight="800">
            {active ? `${active.value}%` : "100%"}
          </text>
          <text x={cx} y={cy + 18} textAnchor="middle" fill="#94a3b8" fontSize="11">
            {active ? active.label : "patrimônio"}
          </text>
        </svg>
      </motion.div>
      <ul className="w-full space-y-1.5">
        {data.map((item) => {
          const on = hovered === item.label;
          return (
            <li
              key={item.label}
              onMouseEnter={() => setHovered(item.label)}
              onMouseLeave={() => setHovered(null)}
              className={`flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors ${on ? "bg-[#f1f4f8]" : ""}`}
            >
              <span className="size-3 shrink-0 rounded-full" style={{ background: item.cor }} />
              <span className="min-w-0 flex-1 text-sm text-[#5a6a7a]">{item.label}</span>
              <span className="font-bold text-wolf-navy">{item.value}%</span>
            </li>
          );
        })}
      </ul>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Página                                                              */
/* ------------------------------------------------------------------ */

type Range = "3M" | "6M" | "2026";
const ranges: Range[] = ["3M", "6M", "2026"];

export default function AssetFundPage() {
  const [range, setRange] = useState<Range>("2026");

  const curva = useMemo(curvaAcumulada, []);
  const chartData = useMemo(() => {
    const pts = range === "2026" ? curva : curva.slice(-(range === "6M" ? 6 : 3));
    return rebase(pts);
  }, [curva, range]);

  const retornoAcumulado = curva[curva.length - 1].fundo;
  const cdiAcumulado = curva[curva.length - 1].cdi;
  const ibovAcumulado = curva[curva.length - 1].ibov;
  const excessoCdi = retornoAcumulado - cdiAcumulado;
  const cota = 1 + retornoAcumulado / 100;
  const patrimonio = FUNDO.capitalInicial * cota;
  const maxDrawdown = Math.min(...SERIE_MENSAL.map((m) => m.drawdown));
  const last = chartData[chartData.length - 1];

  const riscoCards = [
    { label: "VaR 95% · 1 dia", value: pct(RISCO.var, 1), detail: "Perda máxima esperada em 1 dia" },
    { label: "CVaR 95% · 1 dia", value: pct(RISCO.cvar, 1), detail: "Perda média além do VaR" },
    { label: "Drawdown máximo", value: pct(maxDrawdown, 1), detail: `Pior queda da série (${REFERENCIA.mes})` },
    { label: "Volatilidade", value: `${num(FUNDO.volatilidade, 1)}% a.a.`, detail: "Realizada, janela de 12m" },
    { label: "Beta vs Ibovespa", value: num(RISCO.beta, 2), detail: "Exposição ao risco de mercado" },
    { label: "Alpha anualizado", value: pct(RISCO.alpha, 1), detail: "Excesso de retorno ajustado ao risco" },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-wolf-navy">
      {/* Navbar independente: a navbar da home utiliza âncoras apenas da página inicial. */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-wolf-navy shadow-sm">
        <div className="mx-auto flex h-17 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex min-w-0 items-center gap-3" aria-label="Ir ao site institucional da Wolf Finance">
            <img src={img("/images/wolf-finance-logo-transparente.svg")} alt="" className="h-9 w-auto shrink-0" />
            <div className="leading-tight">
              <p className="font-bold tracking-wide text-white">Wolf Finance</p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#c1cad8]">Asset Research</p>
            </div>
          </Link>
          <nav className="hidden items-center gap-7 text-sm text-[#d5deec] md:flex" aria-label="Seções do fundo">
            <a href="#performance" className="transition hover:text-white">Performance</a>
            <a href="#mesas" className="transition hover:text-white">Mesas</a>
            <a href="#alocacao" className="transition hover:text-white">Alocação</a>
            <a href="#risco" className="transition hover:text-white">Risco</a>
            <a href="#governanca" className="transition hover:text-white">Governança</a>
          </nav>
          <Link href="/" className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-white/20 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/10 sm:text-sm">
            <span className="hidden sm:inline">Site da Wolf</span>
            <span className="sm:hidden">Voltar</span>
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </header>

      <main>
        {/* Hero com o mesmo gradiente institucional da home. */}
        <section className="relative isolate overflow-hidden bg-gradient-to-br from-wolf-navy via-[#0d2240] to-wolf-blue text-white">
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-28 size-96 rounded-full border border-white/10" />
          <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-10 size-72 rounded-full border border-white/10" />
          <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-9 sm:px-6 sm:pb-16 sm:pt-12 lg:px-8">
            <p className="mb-8 text-xs font-semibold text-[#cbd5e1]">
              <Link href="/" className="hover:text-white">Início</Link>
              <ChevronRight size={13} className="mx-1.5 inline-block" />Asset Research
              <ChevronRight size={13} className="mx-1.5 inline-block" />Fundo Capital
            </p>
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <div className="mb-5 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white">
                    <span className="size-1.5 rounded-full bg-[#b2d0f5]" />Fundo multimercado fundamentalista
                  </span>
                  <span className="rounded-full border border-white/20 px-3 py-1.5 text-xs font-semibold tracking-wide text-[#e5e7eb]">SIMULAÇÃO ACADÊMICA</span>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">{FUNDO.nome}</h1>
                  <span className="rounded-md border border-white/25 px-2 py-1 text-xs font-medium tracking-wide text-[#e5e7eb]">{FUNDO.ticker}</span>
                </div>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-[#d9e1ed] sm:text-base">
                  Fundo multimercado fictício que integra a pesquisa da Asset Research em três mesas —
                  Macroeconomia, Equity e Ativos Digitais — com gestão de risco consolidada e governança
                  de aprovação de mudanças. Atualizado mensalmente pela Wolf Finance.
                </p>
                <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-xs text-[#dce4ef] sm:text-sm">
                  <span className="inline-flex items-center gap-2"><CalendarDays size={16} />Referência: {REFERENCIA.mes}</span>
                  <span className="inline-flex items-center gap-2"><Clock3 size={16} />Atualizado: {REFERENCIA.updatedAt}</span>
                </div>
              </div>
              <div className="rounded-2xl border border-white/20 bg-white/10 px-6 py-5 shadow-lg backdrop-blur-sm lg:min-w-60">
                <p className="text-sm text-[#d8e2ef]">Rentabilidade acumulada</p>
                <p className="mt-2 text-4xl font-extrabold tracking-tight text-white">{pct(retornoAcumulado)}</p>
                <div className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-white/15 px-2.5 py-1.5 text-xs font-semibold text-white">
                  <ArrowUpRight size={14} />{num(excessoCdi)} p.p. vs CDI*
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 sm:pt-10 lg:px-8">
          {/* KPIs */}
          <section aria-label="Indicadores principais" className="mb-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Kpi icon={Wallet} label="Patrimônio simulado" value={brl(patrimonio)} detail={`Capital inicial: ${brl(FUNDO.capitalInicial)}`} />
            <Kpi icon={ChartNoAxesCombined} label="Cota fictícia" value={`R$ ${num(cota, 4)}`} detail="Cota inicial: R$ 1,0000" />
            <Kpi icon={ArrowUpRight} label="Retorno no ano" value={pct(retornoAcumulado)} detail={`CDI*: ${pct(cdiAcumulado)} · Ibov*: ${pct(ibovAcumulado)}`} accent />
            <Kpi icon={Activity} label="Sharpe" value={num(FUNDO.sharpe)} detail={`Volatilidade: ${num(FUNDO.volatilidade, 1)}% a.a.`} accent />
          </section>

          {/* Desempenho */}
          <section id="performance" className="mb-14 scroll-mt-24">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <SectionTitle
                eyebrow="Performance"
                title="Rentabilidade acumulada"
                description={`Fundo vs benchmarks (CDI e Ibovespa), já ajustado para o período selecionado. Último mês: ${pct(last.fundo, 2)} (fundo) · ${pct(last.cdi, 2)} (CDI) · ${pct(last.ibov, 2)} (Ibovespa).`}
              />
              <div className="flex gap-1 rounded-lg border border-wolf-light-gray bg-white p-1">
                {ranges.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setRange(option)}
                    className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition sm:text-sm ${range === option ? "bg-wolf-blue text-white shadow-sm" : "text-[#50627b] hover:bg-white hover:text-wolf-navy"}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <Card className="p-5 sm:p-7">
              <div className="mb-5 flex flex-wrap gap-x-6 gap-y-2 text-xs">
                <div className="flex items-center gap-2"><span className="size-2.5 rounded-full bg-wolf-navy" /><span className="text-[#64748b]">Wolf Capital</span><strong className="ml-1 text-wolf-navy">{pct(last.fundo, 2)}</strong></div>
                <div className="flex items-center gap-2"><span className="size-2.5 rounded-full" style={{ background: CORES.cdi }} /><span className="text-[#64748b]">CDI*</span><strong className="ml-1 text-wolf-navy">{pct(last.cdi, 2)}</strong></div>
                <div className="flex items-center gap-2"><span className="size-2.5 rounded-full" style={{ background: CORES.ibov }} /><span className="text-[#64748b]">Ibovespa*</span><strong className="ml-1 text-wolf-navy">{pct(last.ibov, 2)}</strong></div>
              </div>
              <PerformanceChart data={chartData} fundLabel="Wolf Capital" />
            </Card>
          </section>

          {/* Contribuição por mesa */}
          <section id="contribuicao" className="mb-14 scroll-mt-24">
            <div className="mb-6">
              <SectionTitle
                eyebrow="Atribuição"
                title="Contribuição de cada mesa"
                description="Quanto cada estratégia adicionou (ou retirou) ao retorno mensal do fundo, em pontos percentuais. A linha escura é o retorno líquido consolidado do mês."
              />
            </div>
            <Card className="p-5 sm:p-7">
              <div className="mb-5 flex flex-wrap gap-x-6 gap-y-2 text-xs">
                {DESKS.map((d) => (
                  <div key={d.id} className="flex items-center gap-2">
                    <span className="size-2.5 rounded-full" style={{ background: d.cor }} />
                    <span className="text-[#64748b]">{d.nome}</span>
                  </div>
                ))}
                <div className="flex items-center gap-2">
                  <span className="h-0.5 w-5 rounded-full" style={{ background: CORES.fundo }} />
                  <span className="text-[#64748b]">Fundo (líquido)</span>
                </div>
              </div>
              <ContributionChart />
            </Card>
          </section>

          {/* Mesas */}
          <section id="mesas" className="mb-14 scroll-mt-24">
            <div className="mb-6">
              <SectionTitle
                eyebrow="Estrutura"
                title="As três mesas do fundo"
                description="Cada mesa opera com fonte de retorno, natureza de posição e métrica-chave próprias. Os números abaixo são a fotografia do mês de referência."
              />
            </div>
            <div className="grid gap-5 lg:grid-cols-3">
              {DESKS.map((desk) => {
                const Icon = DESK_ICONS[desk.id];
                const values = SERIE_MENSAL.map((m) => m.contribuicao[desk.id]);
                return (
                  <Card key={desk.id} className="flex flex-col p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(11,31,58,0.10)]">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="rounded-xl p-2.5 text-white" style={{ background: desk.cor }}>
                          <Icon size={20} />
                        </span>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-[#94a3b8]">{desk.numero}</p>
                          <h3 className="text-lg font-bold text-wolf-navy">{desk.nome}</h3>
                        </div>
                      </div>
                      <span className="rounded-md border border-wolf-light-gray px-2 py-0.5 text-[11px] font-bold tracking-wide text-[#5a6a7a]">{desk.sigla}</span>
                    </div>

                    <span className="mt-4 inline-flex w-fit rounded-full px-2.5 py-1 text-[11px] font-semibold" style={{ background: `${desk.cor}14`, color: desk.cor }}>
                      {desk.natureza}
                    </span>

                    <p className="mt-4 text-sm leading-6 text-[#5a6a7a]">{desk.oQueE}</p>
                    <p className="mt-3 text-sm leading-6 text-[#5a6a7a]">{desk.objetivo}</p>

                    <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4 border-t border-wolf-light-gray pt-5">
                      <div><p className="text-[11px] uppercase tracking-wider text-[#94a3b8]">Retorno no ano</p><p className="mt-1 text-lg font-bold text-wolf-navy">{pct(desk.retornoAno, 2)}</p></div>
                      <div><p className="text-[11px] uppercase tracking-wider text-[#94a3b8]">Volatilidade</p><p className="mt-1 text-lg font-bold text-wolf-navy">{num(desk.volatilidade, 1)}%</p></div>
                      <div><p className="text-[11px] uppercase tracking-wider text-[#94a3b8]">Sharpe</p><p className="mt-1 text-lg font-bold text-wolf-navy">{num(desk.sharpe)}</p></div>
                      <div><p className="text-[11px] uppercase tracking-wider text-[#94a3b8]">Posições</p><p className="mt-1 text-lg font-bold text-wolf-navy">{desk.posicoes}</p></div>
                    </div>

                    <div className="mt-5 rounded-xl bg-[#f8fafc] p-3">
                      <p className="text-[11px] uppercase tracking-wider text-[#94a3b8]">{desk.metricaChave.label}</p>
                      <p className="mt-1 text-sm font-bold text-wolf-navy">{desk.metricaChave.value}</p>
                    </div>

                    <div className="mt-auto pt-5">
                      <p className="mb-1 text-[11px] uppercase tracking-wider text-[#94a3b8]">Contribuição mensal</p>
                      <Sparkline values={values} color={desk.cor} />
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Alocação */}
          <section id="alocacao" className="mb-14 scroll-mt-24">
            <div className="grid gap-5 lg:grid-cols-[1.1fr_1fr]">
              <Card className="p-6 sm:p-7">
                <div className="mb-6 flex items-center justify-between">
                  <div><h3 className="font-bold text-wolf-navy">Alocação de capital</h3><p className="mt-1 text-xs text-[#64748b]">Distribuição do patrimônio entre as mesas e a reserva</p></div>
                  <PieChart size={19} className="text-wolf-blue" />
                </div>
                <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-center">
                  <Donut data={ALOCACAO} />
                </div>
              </Card>

              <Card className="p-6 sm:p-7">
                <div className="mb-6 flex items-center gap-3">
                  <span className="rounded-xl bg-[#e7eef9] p-2.5 text-wolf-blue"><BarChart3 size={22} /></span>
                  <div><h3 className="font-bold text-wolf-navy">Resumo do fundo</h3><p className="mt-1 text-xs text-[#64748b]">Referência: {REFERENCIA.mes}</p></div>
                </div>
                <dl className="divide-y divide-wolf-light-gray text-sm">
                  {[
                    ["Estratégia", "Multimercado fundamentalista"],
                    ["Mesas ativas", `${DESKS.length} (Macro, Equity, Ativos Digitais)`],
                    ["Benchmark", "CDI e Ibovespa"],
                    ["Excesso vs CDI", `${num(excessoCdi)} p.p.`],
                    ["Excesso vs Ibovespa", `${num(retornoAcumulado - ibovAcumulado)} p.p.`],
                    ["Próxima revisão", REFERENCIA.proximaRevisao],
                  ].map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between gap-4 py-3">
                      <dt className="text-[#5a6a7a]">{k}</dt>
                      <dd className="text-right font-semibold text-wolf-navy">{v}</dd>
                    </div>
                  ))}
                </dl>
              </Card>
            </div>
          </section>

          {/* Risco */}
          <section id="risco" className="mb-14 scroll-mt-24">
            <div className="mb-6">
              <SectionTitle
                eyebrow="Gestão de risco consolidada"
                title="Métricas de risco"
                description="Indicadores consolidados do fundo (estimativas fictícias). O drawdown abaixo mostra a evolução da perda acumulada em relação ao último pico."
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {riscoCards.map((r) => (
                <Card key={r.label} className="p-5">
                  <p className="text-sm font-medium text-[#5a6a7a]">{r.label}</p>
                  <p className="mt-3 text-2xl font-bold text-wolf-navy">{r.value}</p>
                  <p className="mt-1.5 text-xs text-[#64748b]">{r.detail}</p>
                </Card>
              ))}
            </div>
            <Card className="mt-5 p-5 sm:p-7">
              <div className="mb-4 flex items-center gap-2">
                <span className="size-2.5 rounded-full" style={{ background: CORES.negativo }} />
                <span className="text-xs text-[#64748b]">Drawdown acumulado (fim de cada mês)</span>
              </div>
              <DrawdownChart />
            </Card>
          </section>

          {/* Governança */}
          <section id="governanca" className="mb-14 scroll-mt-24">
            <div className="mb-6">
              <SectionTitle
                eyebrow="Governança"
                title="Controle e rastreabilidade"
                description="O mandato do fundo exige disciplina formal sobre qualquer mudança de estratégia ou parâmetro — as três frentes abaixo sustentam a operação mensal."
              />
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { icon: FileCheck, title: "Aprovação de mudanças", body: "Toda alteração de estratégia, alocação ou parâmetro passa por aprovação formal no comitê, com registro documentado antes de ir ao ar." },
                { icon: Scale, title: "Auditoria de risco", body: "Revisão periódica e independente dos limites de exposição e das métricas (VaR, CVaR, drawdown, volatilidade) contra o mandato aprovado." },
                { icon: History, title: "Rastreabilidade", body: "Cada decisão e parametrização fica versionada e auditável, garantindo reprodutibilidade e histórico completo de mudanças." },
              ].map((step) => (
                <Card key={step.title} className="relative overflow-hidden p-6">
                  <div className="absolute left-0 top-0 h-1 w-full bg-wolf-blue" />
                  <div className="mb-7"><span className="rounded-xl bg-[#e7eef9] p-3 text-wolf-blue"><step.icon size={23} /></span></div>
                  <h3 className="text-base font-bold text-wolf-navy">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#5a6a7a]">{step.body}</p>
                </Card>
              ))}
            </div>
          </section>

          <aside className="mt-10 flex items-start gap-3 rounded-xl border border-[#cedced] bg-[#eef4fb] p-5 text-sm leading-6 text-[#485d78]">
            <Info className="mt-0.5 shrink-0 text-wolf-blue" size={19} />
            <p><strong className="text-wolf-navy">Projeto demonstrativo.</strong> Todos os valores, índices, métricas de risco, contribuições e datas desta página são fictícios. Não representam rentabilidade real, oferta de cotas ou recomendação de investimento. *Os benchmarks também são simulados.</p>
          </aside>
        </div>
      </main>

      <footer className="bg-wolf-navy py-10 text-white/70">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div>
            <div className="flex items-center gap-2"><img src={img("/images/wolf-finance-logo-transparente.svg")} alt="" className="h-8 w-auto" /><span className="font-bold text-white">Wolf Finance</span></div>
            <p className="mt-2 text-xs text-white/50">Liga de Investimentos do CEFET/RJ · Asset Research · Simulação acadêmica</p>
          </div>
          <Link href="/" className="inline-flex items-center gap-2 self-start text-sm font-semibold text-white/80 transition hover:text-white">
            Voltar ao site institucional <ArrowRight size={16} />
          </Link>
        </div>
      </footer>
    </div>
  );
}
