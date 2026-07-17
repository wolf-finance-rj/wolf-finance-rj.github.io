"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import type { SocialLink } from "@/data/portfolioData";

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
};

interface SocialLinksProps {
  links: SocialLink[];
}

export default function SocialLinks({ links }: SocialLinksProps) {

  return (
    <div className="flex items-center gap-2">
      {links.map((link) => {
        const Icon = iconMap[link.icon];
        return (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="p-3 rounded-xl text-gray-500 hover:text-[#003070] hover:bg-gray-100 transition-colors"
          >
            <Icon size={20} />
          </a>
        );
      })}
    </div>
  );
}
