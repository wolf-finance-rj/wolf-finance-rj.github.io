"use client";

import { useEffect, useRef } from "react";
import { ArrowDown, Circle } from "lucide-react";
import { motion } from "framer-motion";
import { socialLinks } from "@/data/portfolioData";
import SocialLinks from "./SocialLinks";
import { useLanguage } from "@/context/LanguageContext";

function GeometricVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    const nodes: { x: number; y: number; r: number; vx: number; vy: number }[] = [];
    const nodeCount = 28;

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 3 + 1.5,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, w, h);

      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0) node.x = w;
        if (node.x > w) node.x = 0;
        if (node.y < 0) node.y = h;
        if (node.y > h) node.y = 0;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(20, 110, 245, 0.4)";
        ctx.fill();
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(20, 110, 245, ${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
}

function MiniChart({ className }: { className?: string }) {
  return (
    <div className={`bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-sm border border-gray-200 ${className}`}>
      <svg width="80" height="40" viewBox="0 0 80 40" aria-hidden="true">
        <path
          d="M0 35 L8 30 L16 32 L24 20 L32 22 L40 15 L48 18 L56 10 L64 14 L72 5 L80 8"
          fill="none"
          stroke="#003070"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M0 35 L8 30 L16 32 L24 20 L32 22 L40 15 L48 18 L56 10 L64 14 L72 5 L80 8 L80 40 L0 40Z"
          fill="url(#chartGrad)"
          opacity="0.15"
        />
        <defs>
          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#003070" />
            <stop offset="100%" stopColor="#003070" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function MiniNodeGraph({ className }: { className?: string }) {
  return (
    <div className={`bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-sm border border-gray-200 ${className}`}>
      <svg width="50" height="50" viewBox="0 0 50 50" aria-hidden="true">
        <circle cx="25" cy="10" r="3" fill="#003070" opacity="0.6" />
        <circle cx="10" cy="30" r="2.5" fill="#003070" opacity="0.5" />
        <circle cx="40" cy="30" r="2.5" fill="#003070" opacity="0.5" />
        <circle cx="25" cy="40" r="2" fill="#003070" opacity="0.4" />
        <line x1="25" y1="13" x2="10" y2="27.5" stroke="#003070" strokeWidth="0.6" opacity="0.3" />
        <line x1="25" y1="13" x2="40" y2="27.5" stroke="#003070" strokeWidth="0.6" opacity="0.3" />
        <line x1="10" y1="32.5" x2="25" y2="38" stroke="#003070" strokeWidth="0.6" opacity="0.25" />
        <line x1="40" y1="32.5" x2="25" y2="38" stroke="#003070" strokeWidth="0.6" opacity="0.25" />
        <line x1="10" y1="30" x2="40" y2="30" stroke="#003070" strokeWidth="0.6" opacity="0.2" />
      </svg>
    </div>
  );
}

function MiniBarChart({ className }: { className?: string }) {
  return (
    <div className={`bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-sm border border-gray-200 ${className}`}>
      <svg width="60" height="40" viewBox="0 0 60 40" aria-hidden="true">
        <rect x="2" y="18" width="6" height="22" rx="1" fill="#003070" opacity="0.3" />
        <rect x="11" y="10" width="6" height="30" rx="1" fill="#003070" opacity="0.5" />
        <rect x="20" y="14" width="6" height="26" rx="1" fill="#003070" opacity="0.4" />
        <rect x="29" y="6" width="6" height="34" rx="1" fill="#003070" opacity="0.6" />
        <rect x="38" y="8" width="6" height="32" rx="1" fill="#003070" opacity="0.5" />
        <rect x="47" y="16" width="6" height="24" rx="1" fill="#003070" opacity="0.3" />
      </svg>
    </div>
  );
}

export default function Hero() {
  const { t } = useLanguage();

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#f4f7fa] via-white to-[#e0edf5]"
    >
      <div className="absolute inset-0 opacity-50" aria-hidden="true">
        <GeometricVisual />
      </div>

      <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block" aria-hidden="true">
        <MiniChart className="absolute top-[20%] right-[15%]" />
        <MiniNodeGraph className="absolute top-[35%] right-[35%]" />
        <MiniBarChart className="absolute top-[50%] right-[20%]" />
        <MiniChart className="absolute top-[60%] right-[40%]" />
        <MiniNodeGraph className="absolute top-[15%] right-[40%]" />
        <div className="absolute top-[30%] right-[8%] grid grid-cols-4 gap-2 opacity-20">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#003070]" />
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium text-[#003070] bg-blue-50 rounded-full mb-6">
              <Circle size={8} className="fill-[#003070] text-[#003070]" />
              {t("hero.availability")}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#001030] tracking-tight leading-[1.08]"
          >
            {t("hero.headline")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-[#5a6a7a] leading-relaxed max-w-2xl"
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <button
              onClick={() => scrollTo("#projects")}
              className="px-6 py-3 text-sm font-semibold text-white bg-[#003070] rounded-xl hover:bg-[#003060] transition-colors shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#003070] focus-visible:ring-offset-2"
            >
              {t("hero.viewProjects")}
            </button>
            <button
              onClick={() => scrollTo("#contact")}
              className="px-6 py-3 text-sm font-semibold text-[#003070] bg-transparent border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#003070] focus-visible:ring-offset-2"
            >
              {t("hero.getInTouch")}
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8"
          >
            <SocialLinks links={socialLinks} />
          </motion.div>
        </div>
      </div>

      <motion.button
        onClick={() => scrollTo("#about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 6, 0] }}
        transition={{ opacity: { delay: 0.8 }, y: { repeat: Infinity, duration: 2 } }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 p-2 rounded-full text-gray-400 hover:text-[#003070] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#003070]"
        aria-label={t("hero.scrollDown")}
      >
        <ArrowDown size={20} />
      </motion.button>
    </section>
  );
}
