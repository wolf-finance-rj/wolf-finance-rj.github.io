"use client";

import { useState, useEffect, useCallback } from "react";
import { Menu, X, Download, Languages } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, personalInfo } from "@/data/portfolioData";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang, setLang, t } = useLanguage();

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleNavClick = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const navKeys = ["inicio", "sobre", "projetos", "experiencia", "competencias", "contato"];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-200"
          : "bg-transparent"
      }`}
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16"
        role="navigation"
        aria-label={t("nav.mainNav")}
      >
        <button
          onClick={() => handleNavClick("#hero")}
          className="text-xl font-bold text-[#001030] tracking-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-[#003070] rounded-lg px-1"
          aria-label={t("nav.goTop")}
        >
          {personalInfo.name}
        </button>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link, i) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-[#003070] rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#003070]"
            >
              {t(`nav.${navKeys[i]}`)}
            </button>
          ))}
          {/* Language toggle */}
          <button
            onClick={() => setLang(lang === "pt" ? "en" : "pt")}
            className="px-2 py-2 text-sm font-medium text-gray-500 hover:text-[#003070] rounded-lg hover:bg-gray-50 transition-colors"
            aria-label={lang === "pt" ? "Switch to English" : "Mudar para português"}
          >
            <Languages size={18} />
          </button>
          <a
            href={personalInfo.resumeUrl}
            className="ml-1 inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-[#003070] rounded-xl hover:bg-[#003060] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#003070] focus-visible:ring-offset-2"
          >
            <Download size={16} />
            {t("nav.downloadResume")}
          </a>
        </div>

        {/* Mobile hamburger + lang toggle */}
        <div className="flex lg:hidden items-center gap-1">
          <button
            onClick={() => setLang(lang === "pt" ? "en" : "pt")}
            className="p-2 rounded-lg text-[#001030] hover:bg-gray-100 transition-colors"
            aria-label={lang === "pt" ? "Switch to English" : "Mudar para português"}
          >
            <Languages size={18} />
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-lg text-[#001030] hover:bg-gray-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#003070]"
            aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
            aria-expanded={open}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden bg-white border-b border-gray-200 shadow-sm"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="w-full text-left px-3 py-3 text-sm font-medium text-gray-600 hover:text-[#003070] rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#003070]"
                >
                  {t(`nav.${navKeys[i]}`)}
                </button>
              ))}
              <a
                href={personalInfo.resumeUrl}
                className="mt-2 inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-[#003070] rounded-xl hover:bg-[#003060] transition-colors"
              >
                <Download size={16} />
                {t("nav.downloadResume")}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
