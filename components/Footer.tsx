"use client";

import { personalInfo, socialLinks, navLinks } from "@/data/portfolioData";
import { useLanguage } from "@/context/LanguageContext";

const navKeys = ["inicio", "sobre", "projetos", "experiencia", "competencias", "contato"];

export default function Footer() {
  const year = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="bg-[#001030] text-white/70 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-3 gap-8 mb-8">
          <div>
            <p className="text-white font-bold text-lg">{personalInfo.name}</p>
            <p className="mt-1 text-sm text-white/50">{personalInfo.role}</p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-3">{t("footer.navigation")}</h4>
            <ul className="space-y-2">
              {navLinks.map((link, i) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {t(`nav.${navKeys[i]}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-3">{t("footer.links")}</h4>
            <ul className="space-y-2">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">
            © {year} {personalInfo.name}. {t("footer.note")}.
          </p>
          <p className="text-xs text-white/30">{personalInfo.location}</p>
        </div>
      </div>
    </footer>
  );
}
