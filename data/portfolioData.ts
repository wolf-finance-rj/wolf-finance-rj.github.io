export interface Project {
  id: string;
  name: string;
  summary: string;
  problem: string;
  contribution: string;
  result: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
}

export interface Experience {
  id: string;
  organization: string;
  role: string;
  period: string;
  description: string[];
  type: "professional" | "academic" | "leadership";
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "mail";
}

export interface Pillar {
  title: string;
  description: string;
  icon: string;
}

// ─── Personal Info ────────────────────────────────────────────
export const personalInfo = {
  name: "Matheus Carvalho",
  role: "AI Developer | Backend Developer | Python & FastAPI",
  headline: "Transformando IA, dados e estratégia em soluções reais.",
  subtitle:
    "AI Developer com experiência em chatbots com IA, LLMs, FastAPI, Python, PostgreSQL, Redis e machine learning. Graduando em Ciência da Computação no CEFET/RJ.",
  availability: "Disponível para oportunidades em IA, Desenvolvimento Backend e Dados.",
  email: "matheuspc3@hotmail.com",
  location: "Rio de Janeiro, Brasil",
  resumeUrl: "/curriculo.pdf",
} as const;

// ─── Navigation ──────────────────────────────────────────────
export const navLinks: NavLink[] = [
  { label: "Início", href: "#hero" },
  { label: "Sobre", href: "#about" },
  { label: "Projetos", href: "#projects" },
  { label: "Experiência", href: "#experience" },
  { label: "Competências", href: "#skills" },
  { label: "Contato", href: "#contact" },
];

// ─── Social Links ────────────────────────────────────────────
export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/matheuspc3", icon: "github" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/matheuspc3/", icon: "linkedin" },
  { label: "Email", href: "mailto:matheuspc3@hotmail.com", icon: "mail" },
];

// ─── About ────────────────────────────────────────────────────
export const aboutBio = {
  intro:
    "Sou graduando em Ciência da Computação no CEFET/RJ e atuo como AI Developer, com foco em desenvolvimento de chatbots com inteligência artificial, integração de APIs, automação de fluxos de atendimento e machine learning. Tenho experiência com Python, FastAPI, Docker, PostgreSQL, Redis e modelos de linguagem (LLMs).",
  extended:
    "Além da atuação técnica, sou Presidente da Wolf Finance — liga de investimentos do CEFET/RJ — onde lidero projetos de educação financeira, pesquisa quantitativa e desenvolvimento técnico dos membros. Tenho experiência anterior com Salesforce, BI e desenvolvimento de sistemas internos.",
};

export const pillars: Pillar[] = [
  {
    title: "Inteligência Artificial",
    description:
      "Desenvolvimento de chatbots com IA, integração com WhatsApp, modelos de linguagem e fluxos conversacionais automatizados.",
    icon: "cpu",
  },
  {
    title: "Backend e infraestrutura",
    description:
      "APIs com FastAPI, Docker, PostgreSQL, Redis, webhooks e integração entre sistemas em tempo real.",
    icon: "chart",
  },
  {
    title: "Liderança e impacto",
    description:
      "Presidente da Wolf Finance, liderando equipes, estruturando processos e promovendo educação financeira e pesquisa quantitativa.",
    icon: "users",
  },
];

// ─── Projects ────────────────────────────────────────────────
export const projects: Project[] = [
  {
    id: "chatbots-ia",
    name: "Chatbots com IA para Empresas",
    summary:
      "Desenvolvimento e implantação de chatbots inteligentes para empresas, integrando WhatsApp, Evolution API, Chatwoot e modelos de linguagem.",
    problem:
      "Empresas precisam automatizar atendimento digital, qualificar leads e gerenciar conversas em tempo real com qualidade e escalabilidade.",
    contribution:
      "Criação de agentes conversacionais personalizados, configuração de webhooks, automação de fluxos de atendimento e handoff para atendimento humano.",
    result:
      "Solução funcional que transforma regras de negócio em fluxos automatizados de conversa, otimizando atendimento, vendas e suporte.",
    technologies: [
      "Python",
      "FastAPI",
      "Docker",
      "PostgreSQL",
      "Redis",
      "LLMs",
      "Evolution API",
      "Chatwoot",
      "Webhooks",
    ],
    githubUrl: "https://github.com/matheuspc3",
  },
  {
    id: "hedge-fund-lab",
    name: "Hedge Fund Lab",
    summary:
      "Laboratório quantitativo de backtesting baseado em sistemas multiagentes, desenvolvido como projeto acadêmico na Wolf Finance.",
    problem:
      "Explorar como diferentes agentes especializados podem colaborar na análise, avaliação e execução de estratégias quantitativas no mercado financeiro.",
    contribution:
      "Arquitetura do sistema multiagente, definição dos papéis dos agentes e estruturação do pipeline de backtesting.",
    result:
      "Plataforma funcional para experimentação com estratégias financeiras, permitindo avaliação quantitativa de diferentes abordagens.",
    technologies: [
      "Python",
      "Machine Learning",
      "Large Language Models",
      "Sistemas multiagentes",
      "Backtesting",
      "Análise quantitativa",
      "APIs",
    ],
    githubUrl: "https://github.com/matheuspc3/hedge-fund-lab",
  },
  {
    id: "ml-experiments",
    name: "Projetos de ML e Análise de Dados",
    summary:
      "Experimentos e estudos envolvendo modelos preditivos, processamento de dados e análise quantitativa aplicada ao mercado financeiro.",
    problem:
      "Aplicar técnicas de machine learning em problemas reais, desde análise exploratória até a avaliação de modelos preditivos.",
    contribution:
      "Construção de pipelines completos: coleta e preparação de dados, engenharia de features, treinamento e avaliação de modelos.",
    result:
      "Conjunto de experimentos documentados com métricas, visualizações e análises demonstrando o domínio do ciclo completo de ML.",
    technologies: [
      "Python",
      "Scikit-learn",
      "Pandas",
      "Machine Learning",
      "Análise exploratória",
      "Pipelines",
      "Visualização de dados",
      "Jupyter",
    ],
    githubUrl: "https://github.com/matheuspc3/ml-experiments",
  },
];

// ─── Experience ──────────────────────────────────────────────
export const experiences: Experience[] = [
  {
    id: "wolf-presidente",
    organization: "Wolf Finance | Liga de Investimentos CEFET/RJ",
    role: "Presidente",
    period: "jul 2026 — Presente",
    type: "leadership",
    description: [
      "Liderança estratégica da liga, impulsionando projetos de educação financeira, pesquisa quantitativa e desenvolvimento técnico dos membros",
      "Gestão e expansão dos projetos internos: Educação Financeira, Asset Manager e NAF",
      "Desenvolvimento de iniciativas de engajamento e formação técnica: eventos, maratonas, estudos dirigidos e integração entre áreas",
      "Coordenação de times e orientação estratégica entre os grupos Quant, Macro, Equity Research e Gestão",
      "Fortalecimento da cultura de alta performance da equipe",
    ],
  },
  {
    id: "vexa-ai",
    organization: "Vexa Labs",
    role: "Desenvolvedor de IA",
    period: "mai 2026 — Presente",
    type: "professional",
    description: [
      "Desenvolvimento e implantação de chatbots com inteligência artificial para empresas, integrando WhatsApp, Evolution API, Chatwoot e modelos de linguagem",
      "Criação de agentes conversacionais personalizados, configuração de webhooks e automação de fluxos de atendimento",
      "Qualificação de leads, handoff para atendimento humano e tratamento de mensagens em tempo real",
      "Transformação de regras de negócio em fluxos automatizados de conversa com FastAPI, Docker e PostgreSQL",
    ],
  },
  {
    id: "wolf-vice",
    organization: "Wolf Finance | Liga de Investimentos CEFET/RJ",
    role: "Vice-Presidente",
    period: "nov 2025 — jun 2026",
    type: "leadership",
    description: [
      "Atuação na liderança estratégica da liga, apoiando a presidência na tomada de decisões e coordenação de times",
      "Estruturação de processos e organização de iniciativas intergrupos",
      "Promoção de ambiente colaborativo focado na formação de profissionais para o mercado financeiro",
    ],
  },
  {
    id: "wolf-tech-lead",
    organization: "Wolf Finance | Liga de Investimentos CEFET/RJ",
    role: "Líder Técnico — Núcleo Quant",
    period: "jun 2024 — mar 2026",
    type: "leadership",
    description: [
      "Planejamento de capacitações em Python e suas bibliotecas para análise quantitativa de ações do mercado financeiro",
      "Estruturação de processos seletivos com desafios práticos para avaliação de candidatos",
      "Participação e implementação de desafios quantitativos aplicando conhecimentos em situações reais",
    ],
  },
  {
    id: "studio-vs",
    organization: "STUDIO VS | Gestão de Shopping Centers",
    role: "Desenvolvedor de BI",
    period: "set 2025 — mar 2026",
    type: "professional",
    description: [
      "Desenvolvimento e manutenção de aplicações internas com PHP e SQL Server para automação de processos",
      "Manutenção de pipelines de ETL com Pentaho Data Integration (Kettle) para consolidação de dados de múltiplas fontes",
      "Criação de painéis e dashboards interativos para acompanhamento de indicadores internos",
    ],
  },
  {
    id: "condor-dev",
    organization: "Condor Tecnologias Não-Letais",
    role: "Assistente em Desenvolvimento e Análise de Sistemas",
    period: "abr 2024 — set 2025",
    type: "professional",
    description: [
      "Administração completa do Salesforce: contatos, usuários, perfis, papéis, licenças, permissões, campos e objetos",
      "Suporte aos times comerciais com automação de processos e correção de falhas no CRM",
      "Melhoria de práticas de segurança interna e otimização contínua do Salesforce Sales Cloud e Marketing Cloud",
    ],
  },
  {
    id: "condor-estagio",
    organization: "Condor Tecnologias Não-Letais",
    role: "Estagiário de Gestão de Sistemas de Informação",
    period: "out 2022 — abr 2024",
    type: "professional",
    description: [
      "Apoio técnico no projeto de melhorias do CRM (Sales Cloud e Marketing Cloud): levantamento de requisitos e validação com stakeholders",
      "Verificação e análise de vigência de contratos de fornecedores de TI",
      "Implementação e manutenção de inventário de ativos da companhia e projeto de substituição de máquinas",
    ],
  },
];

// ─── Skills ──────────────────────────────────────────────────
export const skillCategories: SkillCategory[] = [
  {
    title: "Inteligência Artificial e Dados",
    skills: [
      "Python",
      "Machine Learning",
      "Large Language Models",
      "Sistemas multiagentes",
      "Pandas",
      "Scikit-learn",
      "Prompt Engineering",
      "Análise preditiva",
      "Visualização de dados",
    ],
  },
  {
    title: "Desenvolvimento Backend",
    skills: [
      "FastAPI",
      "Docker",
      "PostgreSQL",
      "Redis",
      "APIs REST",
      "Webhooks",
      "Chatwoot",
      "Evolution API",
      "Git e GitHub",
    ],
  },
  {
    title: "Pesquisa quantitativa",
    skills: [
      "Backtesting",
      "Análise de estratégias",
      "Métricas de risco e retorno",
      "Séries temporais",
      "Mercado financeiro",
      "Experimentação",
    ],
  },
  {
    title: "Ferramentas e negócio",
    skills: [
      "Salesforce Admin",
      "SQL Server",
      "Pentaho (ETL)",
      "PHP",
      "BI e dashboards",
      "Liderança",
      "Gestão de projetos",
      "Educação financeira",
    ],
  },
];

// ─── Education ───────────────────────────────────────────────
export const education = {
  degree: "Bacharelado em Ciência da Computação",
  institution: "CEFET/RJ — Centro Federal de Educação Tecnológica",
  period: "nov 2021 — dez 2026",
  expectedCompletion: "8º período — Rio de Janeiro, Brasil",
  highlights: [
    "Presidente da Wolf Finance — Liga de Investimentos do CEFET/RJ",
    "Líder técnico do núcleo Quant por 1 ano e 10 meses",
    "Projetos de pesquisa em IA, machine learning e sistemas multiagentes",
    "Organização de processos seletivos, capacitações e eventos acadêmicos",
    "Formação técnica complementar: Estácio — Técnico em Logística (2014 — 2015)",
  ],
};

// ─── Footer ─────────────────────────────────────────────────
export const footerNote = "Desenvolvido com React, TypeScript e Next.js";

// ─── SEO ────────────────────────────────────────────────────
export const seo = {
  title: "Matheus Carvalho | AI Developer | Python, IA e Desenvolvimento Backend",
  description:
    "Portfólio de Matheus Carvalho — AI Developer e graduando em Ciência da Computação no CEFET/RJ. Experiência com chatbots IA, FastAPI, Python, LLMs, machine learning e pesquisa quantitativa.",
  url: "https://matheus.dev",
} as const;
