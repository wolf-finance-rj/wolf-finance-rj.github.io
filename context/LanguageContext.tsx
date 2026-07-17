"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { Lang } from "@/data/translations";
import { t as resolve, ta as resolveArray } from "@/data/translations";

type LanguageCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (path: string) => string;
  ta: (path: string) => string[];
};

const LanguageContext = createContext<LanguageCtx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("pt");

  useEffect(() => {
    const stored = localStorage.getItem("lang");
    if (stored === "en" || stored === "pt") setLangState(stored);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("lang", l);
    document.documentElement.lang = l === "en" ? "en-US" : "pt-BR";
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: (p) => resolve(lang, p), ta: (p) => resolveArray(lang, p) }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageCtx {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
