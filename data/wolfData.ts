export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface Area {
  id: string;
  title: string;
  description: string;
  items?: string[];
  subareas?: { title: string; description: string }[];
}

export interface Governanca {
  name: string;
  role: string;
}

// ─── Colors ────────────────────────────────
export const colors = {
  navy: "#0b1f3a",
  blue: "#1f3c6d",
  lightGray: "#e5e7eb",
  white: "#ffffff",
} as const;

// ─── Navigation ────────────────────────────
export const navLinks: NavLink[] = [
  { label: "Início", href: "#hero" },
  { label: "Sobre", href: "#sobre" },
  { label: "Áreas", href: "#areas" },
  { label: "Eventos", href: "#eventos" },
  { label: "Seletivo", href: "#seletivo" },
  { label: "Contato", href: "#contato" },
];

// ─── Social ────────────────────────────────
export const socialLinks: SocialLink[] = [
  { label: "Instagram", href: "https://www.instagram.com/ligacefetrj/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/ligaceferj" },
  { label: "Email", href: "mailto:wolffinance@cefet-rj.br" },
];

// ─── Hero ──────────────────────────────────
export const hero = {
  tagline: "Liga de Investimentos do CEFET/RJ",
  headline: "Conhecimento financeiro que se transforma em experiência",
  subtitle:
    "A Wolf Finance conecta estudantes, mercado financeiro e sociedade por meio de pesquisa, formação técnica, projetos, competições e iniciativas de educação financeira.",
  ctas: [
    { label: "Conheça nossas áreas", href: "#areas" },
    { label: "Faça parte da Wolf", href: "#seletivo" },
    { label: "Acompanhe nossos projetos", href: "#eventos" },
  ],
};

// ─── Sobre ─────────────────────────────────
export const sobre = {
  quemSomos: [
    "A Wolf Finance é uma organização estudantil do CEFET/RJ dedicada à formação de estudantes interessados em mercado financeiro, investimentos, economia, tecnologia, gestão e impacto social.",
    "Nossa missão é complementar a formação acadêmica por meio de experiências práticas, projetos, estudos e atividades que estimulem o desenvolvimento técnico, profissional e pessoal dos nossos membros.",
    "Além da capacitação interna, atuamos como uma ponte entre estudantes, professores, empresas e profissionais do mercado, criando oportunidades de aprendizado, networking, troca de experiências e desenvolvimento de projetos que aproximam o ambiente acadêmico dos desafios reais do mercado.",
  ],
  missao:
    "Desenvolver estudantes por meio de experiências práticas em finanças, pesquisa, tecnologia e gestão, formando profissionais preparados para analisar problemas, tomar decisões e gerar impacto positivo.",
  visao:
    "Consolidar a Wolf Finance como uma referência acadêmica em formação financeira, pesquisa aplicada, desenvolvimento profissional e impacto social.",
  valores: [
    "Desenvolvimento contínuo",
    "Responsabilidade",
    "Trabalho em equipe",
    "Pensamento crítico",
    "Ética",
    "Inovação",
    "Compromisso com resultados",
    "Impacto positivo",
  ],
};

// ─── Áreas ─────────────────────────────────
export const areas: Area[] = [
  {
    id: "asset-research",
    title: "Asset Research",
    description:
      "Responsável pelo estudo dos mercados, classes de ativos e oportunidades de investimento, organizada em mesas especializadas.",
    items: [
      "Macroeconomia",
      "Câmbio",
      "Commodities",
      "Crédito Privado e Renda Fixa",
      "Renda Variável Brasil",
      "Renda Variável Global",
      "Criptoativos",
      "Gestão de Risco",
    ],
    subareas: [
      {
        title: "Wolf Finance Capital",
        description:
          "Fundo multimercado fictício que integra as análises das mesas em uma carteira simulada, praticando alocação de ativos, acompanhamento de posições e tomada de decisão em portfólio.",
      },
    ],
  },
  {
    id: "quant-research",
    title: "Quant Research",
    description:
      "Reúne estudantes interessados na aplicação de estatística, programação, ciência de dados e inteligência artificial ao mercado financeiro.",
    items: [
      "Research & Portfolio",
      "ML Research",
      "Risk Management",
      "Market Intelligence",
    ],
  },
  {
    id: "gestao",
    title: "Gestão e Desenvolvimento Institucional",
    description:
      "Áreas que garantem que as iniciativas da Wolf Finance sejam organizadas, divulgadas e executadas de maneira eficiente.",
    items: ["Marketing", "Recursos Humanos", "Projetos"],
  },
  {
    id: "wolf-social",
    title: "Wolf Social",
    description:
      "Iniciativas de impacto social e educação financeira, utilizando o conhecimento dos membros para produzir benefícios concretos para estudantes e sociedade.",
    items: [
      "Projeto de Educação Financeira",
      "Núcleo de Apoio Fiscal",
      "Núcleo de Atendimento em Educação Financeira",
    ],
  },
];

// ─── Eventos ───────────────────────────────
export const eventos = {
  title: "Eventos e oportunidades",
  items: [
    {
      title: "Wolf Finance Week",
      description:
        "Evento institucional previsto para outubro de 2026, voltado à aproximação dos estudantes com profissionais e organizações do mercado financeiro. Programação com palestras, painéis e conversas sobre Investment Banking, Criptoativos, Private Equity, Macroeconomia e Mercado de Ações.",
    },
    {
      title: "Challenges e competições",
      description:
        "Incentivamos a participação em desafios acadêmicos e competições externas para aplicar conhecimentos técnicos, trabalhar em equipe e representar a instituição.",
    },
    {
      title: "Palestras e visitas institucionais",
      description:
        "Aproximamos os membros de bancos, gestoras, corretoras, fundos e profissionais do mercado por meio de palestras, mentorias e visitas institucionais.",
    },
  ],
};

// ─── Seletivo ──────────────────────────────
export const seletivo = {
  title: "Faça parte da Wolf Finance",
  description:
    "O processo seletivo é destinado a estudantes interessados em desenvolver conhecimentos técnicos, profissionais e organizacionais.",
  inscricaoUrl: "https://forms.gle/jcYcpEeHyWdBW2Wr8",
  trilhas: [
    {
      title: "Grupo de Estudos",
      description:
        "Voltado a estudantes interessados nas áreas de Asset Research e Quant Research. Os participantes têm contato com análise de investimentos, economia, dados, programação, estratégias quantitativas e gestão de risco.",
    },
    {
      title: "Grupo de Gestão",
      description:
        "Voltado a estudantes interessados em Marketing, Recursos Humanos, Projetos e Wolf Social. Os participantes desenvolvem competências em comunicação, organização, liderança, gestão de pessoas e impacto social.",
    },
  ],
  etapas: [
    "Inscrição",
    "Avaliação de raciocínio e resolução de problemas",
    "Dinâmicas em grupo",
    "Capacitações",
    "Desafios práticos",
    "Apresentações",
    "Entrevista individual",
  ],
};

// ─── Governança ────────────────────────────
export const governanca: Governanca[] = [
  { name: "Matheus Carvalho", role: "Presidente" },
  { name: "Caio Tavares", role: "Vice-Presidente" },
];

// ─── Contato ───────────────────────────────
export const contato = {
  email: "wolffinance@cefet-rj.br",
  instagram: "https://www.instagram.com/ligacefetrj/",
  linkedin: "https://www.linkedin.com/company/ligaceferj",
};
