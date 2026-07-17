"use client";

import { projects } from "@/data/portfolioData";
import SectionTitle from "./SectionTitle";
import ProjectCard from "./ProjectCard";
import { useLanguage } from "@/context/LanguageContext";

export default function Projects() {
  const { t } = useLanguage();

  return (
    <section id="projects" className="py-24 bg-[#f4f7fa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          label={t("projects.label")}
          title={t("projects.title")}
          description={t("projects.description")}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-[#5a6a7a]">
          {t("projects.footer")}
        </p>
      </div>
    </section>
  );
}
