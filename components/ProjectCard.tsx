"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, FolderOpen } from "lucide-react";
import type { Project } from "@/data/portfolioData";
import { useLanguage } from "@/context/LanguageContext";

interface ProjectCardProps {
  project: Project;
  index: number;
}

const projectKeyMap: Record<string, string> = {
  "chatbots-ia": "chatbots",
  "hedge-fund-lab": "hedgefund",
  "ml-experiments": "ml",
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const { t } = useLanguage();
  const pk = projectKeyMap[project.id] || project.id;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-[#003070]/20 transition-all duration-300"
    >
      <div className="h-48 bg-gradient-to-br from-[#e0edf5] via-[#f4f7fa] to-white flex items-center justify-center relative overflow-hidden">
        <FolderOpen size={48} className="text-[#003070]/20 group-hover:text-[#003070]/30 transition-colors" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent" />
        <div className="absolute top-6 right-8 grid grid-cols-3 gap-1.5 opacity-15">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#003070]" />
          ))}
        </div>
      </div>

      <div className="p-6 sm:p-8">
        <h3 className="text-xl font-bold text-[#001030] group-hover:text-[#003070] transition-colors">
          {t(`projects.${pk}.name`)}
        </h3>
        <p className="mt-3 text-[#5a6a7a] leading-relaxed">
          {t(`projects.${pk}.summary`)}
        </p>

        <div className="mt-4 space-y-2 text-sm text-[#5a6a7a]">
          <p>
            <span className="font-semibold text-[#001030]">{t("projects.problem")}:</span>{" "}
            {t(`projects.${pk}.problem`)}
          </p>
          <p>
            <span className="font-semibold text-[#001030]">{t("projects.contribution")}:</span>{" "}
            {t(`projects.${pk}.contribution`)}
          </p>
          <p>
            <span className="font-semibold text-[#001030]">{t("projects.result")}:</span>{" "}
            {t(`projects.${pk}.result`)}
          </p>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-xs font-medium text-[#003070] bg-blue-50 rounded-lg"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-3 pt-4 border-t border-gray-200">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-[#003070] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#003070] rounded px-1"
            >
              <Github size={16} />
              {t("projects.code")}
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-[#003070] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#003070] rounded px-1"
            >
              <ExternalLink size={16} />
              {t("projects.demo")}
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
