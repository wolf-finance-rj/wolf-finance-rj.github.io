export type Lang = "pt" | "en";

type TranslationDict = {
  [K in Lang]: Record<string, unknown>;
};

const translations = {
  pt: {
    nav: {
      mainNav: "Navegação principal",
      goTop: "Ir para o topo",
      openMenu: "Abrir menu",
      closeMenu: "Fechar menu",
      downloadResume: "Baixar currículo",
      inicio: "Início",
      sobre: "Sobre",
      projetos: "Projetos",
      experiencia: "Experiência",
      competencias: "Competências",
      contato: "Contato",
    },
    hero: {
      availability: "Disponível para oportunidades em IA, Desenvolvimento Backend e Dados.",
      headline: "Transformando IA, dados e estratégia em soluções reais.",
      subtitle:
        "AI Developer com experiência em chatbots com IA, LLMs, FastAPI, Python, PostgreSQL, Redis e machine learning. Graduando em Ciência da Computação no CEFET/RJ.",
      viewProjects: "Ver projetos",
      getInTouch: "Entrar em contato",
      scrollDown: "Rolar para o conteúdo",
    },
    about: {
      label: "Sobre mim",
      title: "Na interseção entre tecnologia, dados e finanças",
      intro:
        "Sou graduando em Ciência da Computação no CEFET/RJ e atuo como AI Developer, com foco em desenvolvimento de chatbots com inteligência artificial, integração de APIs, automação de fluxos de atendimento e machine learning. Tenho experiência com Python, FastAPI, Docker, PostgreSQL, Redis e modelos de linguagem (LLMs).",
      extended:
        "Além da atuação técnica, sou Presidente da Wolf Finance — liga de investimentos do CEFET/RJ — onde lidero projetos de educação financeira, pesquisa quantitativa e desenvolvimento técnico dos membros. Tenho experiência anterior com Salesforce, BI e desenvolvimento de sistemas internos.",
      pillars: {
        ai: {
          title: "Inteligência Artificial",
          description:
            "Desenvolvimento de chatbots com IA, integração com WhatsApp, modelos de linguagem e fluxos conversacionais automatizados.",
        },
        backend: {
          title: "Backend e infraestrutura",
          description:
            "APIs com FastAPI, Docker, PostgreSQL, Redis, webhooks e integração entre sistemas em tempo real.",
        },
        leadership: {
          title: "Liderança e impacto",
          description:
            "Presidente da Wolf Finance, liderando equipes, estruturando processos e promovendo educação financeira e pesquisa quantitativa.",
        },
      },
    },
    projects: {
      label: "Projetos",
      title: "O que tenho construído",
      description:
        "Projetos que combinam ciência de dados, inteligência artificial e engenharia de software.",
      problem: "Problema",
      contribution: "Contribuição",
      result: "Resultado",
      code: "Código",
      demo: "Demonstração",
      footer: "Novos projetos são adicionados conforme são desenvolvidos.",
      chatbots: {
        name: "Chatbots com IA para Empresas",
        summary:
          "Desenvolvimento e implantação de chatbots inteligentes para empresas, integrando WhatsApp, Evolution API, Chatwoot e modelos de linguagem.",
        problem:
          "Empresas precisam automatizar atendimento digital, qualificar leads e gerenciar conversas em tempo real com qualidade e escalabilidade.",
        contribution:
          "Criação de agentes conversacionais personalizados, configuração de webhooks, automação de fluxos de atendimento e handoff para atendimento humano.",
        result:
          "Solução funcional que transforma regras de negócio em fluxos automatizados de conversa, otimizando atendimento, vendas e suporte.",
      },
      hedgefund: {
        name: "Hedge Fund Lab",
        summary:
          "Laboratório quantitativo de backtesting baseado em sistemas multiagentes, desenvolvido como projeto acadêmico na Wolf Finance.",
        problem:
          "Explorar como diferentes agentes especializados podem colaborar na análise, avaliação e execução de estratégias quantitativas no mercado financeiro.",
        contribution:
          "Arquitetura do sistema multiagente, definição dos papéis dos agentes e estruturação do pipeline de backtesting.",
        result:
          "Plataforma funcional para experimentação com estratégias financeiras, permitindo avaliação quantitativa de diferentes abordagens.",
      },
      ml: {
        name: "Projetos de ML e Análise de Dados",
        summary:
          "Experimentos e estudos envolvendo modelos preditivos, processamento de dados e análise quantitativa aplicada ao mercado financeiro.",
        problem:
          "Aplicar técnicas de machine learning em problemas reais, desde análise exploratória até a avaliação de modelos preditivos.",
        contribution:
          "Construção de pipelines completos: coleta e preparação de dados, engenharia de features, treinamento e avaliação de modelos.",
        result:
          "Conjunto de experimentos documentados com métricas, visualizações e análises demonstrando o domínio do ciclo completo de ML.",
      },
    },
    experience: {
      label: "Experiência",
      title: "Trajetória e liderança",
      description: "Atuação em projetos, pesquisa e iniciativas acadêmicas.",
      types: {
        professional: "Profissional",
        academic: "Acadêmico",
        leadership: "Liderança",
      },
      wolf_president: {
        org: "Wolf Finance | Liga de Investimentos CEFET/RJ",
        role: "Presidente",
        period: "jul 2026 — Presente",
        bullets: [
          "Liderança estratégica da liga, impulsionando projetos de educação financeira, pesquisa quantitativa e desenvolvimento técnico dos membros",
          "Gestão e expansão dos projetos internos: Educação Financeira, Asset Manager e NAF",
          "Desenvolvimento de iniciativas de engajamento e formação técnica: eventos, maratonas, estudos dirigidos e integração entre áreas",
          "Coordenação de times e orientação estratégica entre os grupos Quant, Macro, Equity Research e Gestão",
          "Fortalecimento da cultura de alta performance da equipe",
        ],
      },
      vexa: {
        org: "Vexa Labs",
        role: "Desenvolvedor de IA",
        period: "mai 2026 — Presente",
        bullets: [
          "Desenvolvimento e implantação de chatbots com inteligência artificial para empresas, integrando WhatsApp, Evolution API, Chatwoot e modelos de linguagem",
          "Criação de agentes conversacionais personalizados, configuração de webhooks e automação de fluxos de atendimento",
          "Qualificação de leads, handoff para atendimento humano e tratamento de mensagens em tempo real",
          "Transformação de regras de negócio em fluxos automatizados de conversa com FastAPI, Docker e PostgreSQL",
        ],
      },
      wolf_vp: {
        org: "Wolf Finance | Liga de Investimentos CEFET/RJ",
        role: "Vice-Presidente",
        period: "nov 2025 — jun 2026",
        bullets: [
          "Atuação na liderança estratégica da liga, apoiando a presidência na tomada de decisões e coordenação de times",
          "Estruturação de processos e organização de iniciativas intergrupos",
          "Promoção de ambiente colaborativo focado na formação de profissionais para o mercado financeiro",
        ],
      },
      wolf_tech: {
        org: "Wolf Finance | Liga de Investimentos CEFET/RJ",
        role: "Líder Técnico — Núcleo Quant",
        period: "jun 2024 — mar 2026",
        bullets: [
          "Planejamento de capacitações em Python e suas bibliotecas para análise quantitativa de ações do mercado financeiro",
          "Estruturação de processos seletivos com desafios práticos para avaliação de candidatos",
          "Participação e implementação de desafios quantitativos aplicando conhecimentos em situações reais",
        ],
      },
      studio: {
        org: "STUDIO VS | Gestão de Shopping Centers",
        role: "Desenvolvedor de BI",
        period: "set 2025 — mar 2026",
        bullets: [
          "Desenvolvimento e manutenção de aplicações internas com PHP e SQL Server para automação de processos",
          "Manutenção de pipelines de ETL com Pentaho Data Integration (Kettle) para consolidação de dados de múltiplas fontes",
          "Criação de painéis e dashboards interativos para acompanhamento de indicadores internos",
        ],
      },
      condor_dev: {
        org: "Condor Tecnologias Não-Letais",
        role: "Assistente em Desenvolvimento e Análise de Sistemas",
        period: "abr 2024 — set 2025",
        bullets: [
          "Administração completa do Salesforce: contatos, usuários, perfis, papéis, licenças, permissões, campos e objetos",
          "Suporte aos times comerciais com automação de processos e correção de falhas no CRM",
          "Melhoria de práticas de segurança interna e otimização contínua do Salesforce Sales Cloud e Marketing Cloud",
        ],
      },
      condor_intern: {
        org: "Condor Tecnologias Não-Letais",
        role: "Estagiário de Gestão de Sistemas de Informação",
        period: "out 2022 — abr 2024",
        bullets: [
          "Apoio técnico no projeto de melhorias do CRM (Sales Cloud e Marketing Cloud): levantamento de requisitos e validação com stakeholders",
          "Verificação e análise de vigência de contratos de fornecedores de TI",
          "Implementação e manutenção de inventário de ativos da companhia e projeto de substituição de máquinas",
        ],
      },
    },
    skills: {
      label: "Competências",
      title: "O que eu domino",
      description: "Habilidades técnicas e interpessoais organizadas por área de atuação.",
      categories: {
        ai: "Inteligência Artificial e Dados",
        backend: "Desenvolvimento Backend",
        quant: "Pesquisa quantitativa",
        tools: "Ferramentas e negócio",
      },
    },
    education: {
      label: "Formação",
      title: "Trajetória acadêmica",
      highlightsTitle: "Atividades e destaques",
      highlights: [
        "Presidente da Wolf Finance — Liga de Investimentos do CEFET/RJ",
        "Líder técnico do núcleo Quant por 1 ano e 10 meses",
        "Projetos de pesquisa em IA, machine learning e sistemas multiagentes",
        "Organização de processos seletivos, capacitações e eventos acadêmicos",
        "Formação técnica complementar: Estácio — Técnico em Logística (2014 — 2015)",
      ],
    },
    contact: {
      label: "Contato",
      title: "Vamos construir algo relevante?",
      description:
        "Estou aberto a oportunidades, projetos, pesquisas e colaborações envolvendo Inteligência Artificial, Ciência de Dados, desenvolvimento de software e mercado quantitativo.",
      name: "Nome",
      namePlaceholder: "Seu nome",
      email: "E-mail",
      emailPlaceholder: "seu@email.com",
      message: "Mensagem",
      messagePlaceholder: "Descreva seu projeto, oportunidade ou ideia...",
      send: "Enviar mensagem",
      sending: "Enviando...",
      success: "Mensagem enviada com sucesso! Entrarei em contato em breve.",
      error: "Erro ao enviar. Tente novamente ou use o e-mail diretamente.",
      directChannels: "Canais diretos",
      emailLabel: "Email",
      socialLabel: "Redes",
      downloadResume: "Baixar currículo",
      validation: {
        nameRequired: "Nome é obrigatório.",
        emailRequired: "E-mail é obrigatório.",
        emailInvalid: "E-mail inválido.",
        messageRequired: "Mensagem é obrigatória.",
        messageShort: "Mensagem muito curta (mínimo 10 caracteres).",
      },
    },
    footer: {
      navigation: "Navegação",
      links: "Links",
      note: "Desenvolvido com React, TypeScript e Next.js",
    },
  },

  en: {
    nav: {
      mainNav: "Main navigation",
      goTop: "Go to top",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      downloadResume: "Download resume",
      inicio: "Home",
      sobre: "About",
      projetos: "Projects",
      experiencia: "Experience",
      competencias: "Skills",
      contato: "Contact",
    },
    hero: {
      availability: "Open to opportunities in AI, Backend Development, and Data.",
      headline: "Turning AI, data, and strategy into real solutions.",
      subtitle:
        "AI Developer with experience in AI chatbots, LLMs, FastAPI, Python, PostgreSQL, Redis, and machine learning. Computer Science student at CEFET/RJ.",
      viewProjects: "View projects",
      getInTouch: "Get in touch",
      scrollDown: "Scroll to content",
    },
    about: {
      label: "About me",
      title: "At the intersection of technology, data, and finance",
      intro:
        "I'm a Computer Science student at CEFET/RJ and work as an AI Developer, focused on building AI-powered chatbots, API integrations, service automation, and machine learning. I have experience with Python, FastAPI, Docker, PostgreSQL, Redis, and large language models (LLMs).",
      extended:
        "Beyond my technical work, I serve as President of Wolf Finance — CEFET/RJ's investment club — where I lead financial education projects, quantitative research, and technical development of members. I also have prior experience with Salesforce, BI, and internal systems development.",
      pillars: {
        ai: {
          title: "Artificial Intelligence",
          description:
            "AI chatbot development, WhatsApp integration, language models, and automated conversational workflows.",
        },
        backend: {
          title: "Backend & Infrastructure",
          description:
            "APIs with FastAPI, Docker, PostgreSQL, Redis, webhooks, and real-time system integration.",
        },
        leadership: {
          title: "Leadership & Impact",
          description:
            "President of Wolf Finance, leading teams, structuring processes, and promoting financial education and quantitative research.",
        },
      },
    },
    projects: {
      label: "Projects",
      title: "What I've been building",
      description:
        "Projects combining data science, artificial intelligence, and software engineering.",
      problem: "Problem",
      contribution: "Contribution",
      result: "Result",
      code: "Code",
      demo: "Demo",
      footer: "New projects are added as they are developed.",
      chatbots: {
        name: "AI Chatbots for Business",
        summary:
          "Development and deployment of intelligent chatbots for companies, integrating WhatsApp, Evolution API, Chatwoot, and language models.",
        problem:
          "Companies need to automate digital customer service, qualify leads, and manage real-time conversations with quality and scalability.",
        contribution:
          "Creation of custom conversational agents, webhook configuration, service flow automation, and handoff to human support.",
        result:
          "Functional solution that turns business rules into automated conversation flows, optimizing service, sales, and support.",
      },
      hedgefund: {
        name: "Hedge Fund Lab",
        summary:
          "Quantitative backtesting laboratory based on multi-agent systems, developed as an academic project at Wolf Finance.",
        problem:
          "Explore how different specialized agents can collaborate in analyzing, evaluating, and executing quantitative strategies in financial markets.",
        contribution:
          "Multi-agent system architecture, agent role definition, and backtesting pipeline structuring.",
        result:
          "Functional platform for experimenting with financial strategies, enabling quantitative evaluation of different approaches.",
      },
      ml: {
        name: "ML & Data Analysis Projects",
        summary:
          "Experiments and studies involving predictive models, data processing, and quantitative analysis applied to financial markets.",
        problem:
          "Apply machine learning techniques to real problems, from exploratory analysis to predictive model evaluation.",
        contribution:
          "Building complete pipelines: data collection and preparation, feature engineering, model training and evaluation.",
        result:
          "Collection of documented experiments with metrics, visualizations, and analyses demonstrating mastery of the full ML cycle.",
      },
    },
    experience: {
      label: "Experience",
      title: "Career & Leadership",
      description: "Work across projects, research, and academic initiatives.",
      types: {
        professional: "Professional",
        academic: "Academic",
        leadership: "Leadership",
      },
      wolf_president: {
        org: "Wolf Finance | CEFET/RJ Investment Club",
        role: "President",
        period: "Jul 2026 — Present",
        bullets: [
          "Strategic leadership of the club, driving financial education projects, quantitative research, and member technical development",
          "Management and expansion of internal projects: Financial Education, Asset Manager, and NAF",
          "Development of engagement and technical training initiatives: events, hackathons, study groups, and cross-area integration",
          "Team coordination and strategic guidance across Quant, Macro, Equity Research, and Management groups",
          "Strengthening the team's high-performance culture",
        ],
      },
      vexa: {
        org: "Vexa Labs",
        role: "AI Developer",
        period: "May 2026 — Present",
        bullets: [
          "Development and deployment of AI-powered chatbots for companies, integrating WhatsApp, Evolution API, Chatwoot, and language models",
          "Creation of custom conversational agents, webhook configuration, and customer service flow automation",
          "Lead qualification, human handoff, and real-time message handling",
          "Turning business rules into automated conversation flows with FastAPI, Docker, and PostgreSQL",
        ],
      },
      wolf_vp: {
        org: "Wolf Finance | CEFET/RJ Investment Club",
        role: "Vice President",
        period: "Nov 2025 — Jun 2026",
        bullets: [
          "Strategic leadership role, supporting the presidency in decision-making and team coordination",
          "Process structuring and cross-group initiative organization",
          "Fostering a collaborative environment focused on developing professionals for the financial market",
        ],
      },
      wolf_tech: {
        org: "Wolf Finance | CEFET/RJ Investment Club",
        role: "Technical Lead — Quant Team",
        period: "Jun 2024 — Mar 2026",
        bullets: [
          "Planning Python training programs and libraries for quantitative stock market analysis",
          "Structuring selection processes with practical challenges for candidate evaluation",
          "Participation in and implementation of quantitative challenges applying knowledge to real-world situations",
        ],
      },
      studio: {
        org: "STUDIO VS | Shopping Center Management",
        role: "BI Developer",
        period: "Sep 2025 — Mar 2026",
        bullets: [
          "Development and maintenance of internal applications with PHP and SQL Server for process automation",
          "Maintenance of ETL pipelines with Pentaho Data Integration (Kettle) for consolidating data from multiple sources",
          "Creation of interactive dashboards for internal KPI tracking",
        ],
      },
      condor_dev: {
        org: "Condor Non-Lethal Technologies",
        role: "Systems Development & Analysis Assistant",
        period: "Apr 2024 — Sep 2025",
        bullets: [
          "Full Salesforce administration: contacts, users, profiles, roles, licenses, permissions, fields, and objects",
          "Support for commercial teams with process automation and CRM bug fixes",
          "Improvement of internal security practices and continuous optimization of Salesforce Sales Cloud and Marketing Cloud",
        ],
      },
      condor_intern: {
        org: "Condor Non-Lethal Technologies",
        role: "Information Systems Management Intern",
        period: "Oct 2022 — Apr 2024",
        bullets: [
          "Technical support for CRM improvement projects (Sales Cloud and Marketing Cloud): requirements gathering and stakeholder validation",
          "Review and analysis of IT supplier contract validity",
          "Implementation and maintenance of company asset inventory and machine replacement project",
        ],
      },
    },
    skills: {
      label: "Skills",
      title: "What I master",
      description: "Technical and interpersonal skills organized by area of expertise.",
      categories: {
        ai: "Artificial Intelligence & Data",
        backend: "Backend Development",
        quant: "Quantitative Research",
        tools: "Tools & Business",
      },
    },
    education: {
      label: "Education",
      title: "Academic background",
      highlightsTitle: "Activities & Highlights",
      highlights: [
        "President of Wolf Finance — CEFET/RJ Investment Club",
        "Quant team technical lead for 1 year and 10 months",
        "Research projects in AI, machine learning, and multi-agent systems",
        "Organization of selection processes, training programs, and academic events",
        "Additional technical education: Estácio — Logistics Technician (2014 — 2015)",
      ],
    },
    contact: {
      label: "Contact",
      title: "Let's build something meaningful?",
      description:
        "I'm open to opportunities, projects, research, and collaborations involving Artificial Intelligence, Data Science, software development, and quantitative finance.",
      name: "Name",
      namePlaceholder: "Your name",
      email: "Email",
      emailPlaceholder: "you@email.com",
      message: "Message",
      messagePlaceholder: "Describe your project, opportunity, or idea...",
      send: "Send message",
      sending: "Sending...",
      success: "Message sent successfully! I'll get back to you soon.",
      error: "Error sending. Please try again or reach out via email directly.",
      directChannels: "Direct channels",
      emailLabel: "Email",
      socialLabel: "Social",
      downloadResume: "Download resume",
      validation: {
        nameRequired: "Name is required.",
        emailRequired: "Email is required.",
        emailInvalid: "Invalid email.",
        messageRequired: "Message is required.",
        messageShort: "Message too short (minimum 10 characters).",
      },
    },
    footer: {
      navigation: "Navigation",
      links: "Links",
      note: "Built with React, TypeScript, and Next.js",
    },
  },
} as const;

// Resolve a dot-notation path like "hero.viewProjects" against the translations object
type PathInto<T, P extends string> = P extends `${infer K}.${infer Rest}`
  ? K extends keyof T
    ? PathInto<T[K], Rest>
    : never
  : P extends keyof T
    ? T[P]
    : never;

export function t(lang: Lang, path: string): string {
  const keys = path.split(".");
  let value: unknown = translations[lang];
  for (const key of keys) {
    if (value && typeof value === "object" && key in value) {
      value = (value as Record<string, unknown>)[key];
    } else {
      return path; // fallback: return the path itself
    }
  }
  if (typeof value === "string") return value;
  if (Array.isArray(value)) {
    // If path resolves to an array, return it joined or as-is; caller should handle
    return path; // arrays must be accessed directly
  }
  return path;
}

export function ta(lang: Lang, path: string): string[] {
  const keys = path.split(".");
  let value: unknown = translations[lang];
  for (const key of keys) {
    if (value && typeof value === "object" && key in value) {
      value = (value as Record<string, unknown>)[key];
    } else {
      return [];
    }
  }
  if (Array.isArray(value)) return value as string[];
  return [];
}
