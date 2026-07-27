"use client";

import { navLinks, contato } from "@/data/wolfData";
import { img } from "@/lib/paths";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-wolf-navy text-white/70 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <img
                src={img("/images/wolf-finance-logo-transparente.svg")}
                alt="Wolf Finance"
                className="h-8 w-auto"
              />
              <p className="text-white font-bold text-lg">Wolf Finance</p>
            </div>
            <p className="mt-1 text-sm text-white/50">Liga de Investimentos do CEFET/RJ</p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Navegação</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Contato</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href={`mailto:${contato.email}`}
                  className="text-sm text-white/50 hover:text-white transition-colors"
                >
                  {contato.email}
                </a>
              </li>
              <li>
                <a
                  href={contato.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/50 hover:text-white transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={contato.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/50 hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">
            © {year} Wolf Finance. Todos os direitos reservados.
          </p>
          <p className="text-xs text-white/30">CEFET/RJ</p>
        </div>
      </div>
    </footer>
  );
}
