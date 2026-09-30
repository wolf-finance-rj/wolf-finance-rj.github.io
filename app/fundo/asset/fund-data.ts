/**
 * ============================================================================
 * WOLF FINANCE CAPITAL — DADOS DE MANUTENÇÃO MENSAL (ASSET RESEARCH)
 * ============================================================================
 * Este arquivo é a ÚNICA fonte de dados da página /fundo/asset.
 * Todo o restante (curva de cota, contribuição por mesa, drawdown, excesso de
 * retorno) é DERIVADO automaticamente a partir daqui — não há número repetido.
 *
 * COMO ATUALIZAR (a cada mês):
 *  1. Em `REFERENCIA`, troque `mes` e `updatedAt`.
 *  2. Em `SERIE_MENSAL`, ADICIONE uma nova linha ao FINAL do array (um objeto
 *     `LinhaMensal`). A soma das contribuições deve bater com `fundo`.
 *  3. Revise os números resumidos de `FUNDO`, `RISCO` e de cada mesa em
 *     `DESKS` (retornoAno, volatilidade, sharpe, posicoes, metricaChave).
 *  4. Ajuste `ALOCACAO` se a distribuição de capital entre mesas mudar.
 *
 * Dados zerados — aguardando dados reais.
 * ============================================================================
 */

export type Contribuicao = { macro: number; equity: number; digital: number };

export type LinhaMensal = {
  /** Rótulo curto do mês, ex. "Jan" */
  mes: string;
  /** Retorno do fundo no mês, em % */
  fundo: number;
  /** Benchmark CDI no mês, em % */
  cdi: number;
  /** Benchmark Ibovespa no mês, em % */
  ibov: number;
  /** Contribuição de cada mesa no mês, em p.p. (soma ≈ fundo) */
  contribuicao: Contribuicao;
  /** Drawdown acumulado do fundo no fim do mês, em % (≤ 0) */
  drawdown: number;
};

export type Mesa = {
  id: "macro" | "equity" | "digital";
  numero: string;
  nome: string;
  sigla: string;
  /** Fonte de retorno (doc institucional) */
  fonte: string;
  /** Natureza da posição */
  natureza: string;
  /** Cor do gráfico (hex) */
  cor: string;
  oQueE: string;
  objetivo: string;
  retornoAno: number; // %
  volatilidade: number; // % anualizada
  sharpe: number;
  posicoes: number;
  metricaChave: { label: string; value: string };
};

export const REFERENCIA = {
  mes: "Setembro de 2026",
  updatedAt: "22/09/2026 às 17h05 (BRT)",
  proximaRevisao: "outubro de 2026",
};

export const CORES = {
  fundo: "#0b1f3a", // wolf-navy
  cdi: "#5186bb",
  ibov: "#a4b1c2",
  macro: "#b45309",
  equity: "#1f3c6d",
  digital: "#7c3aed",
  caixa: "#cbd5e1",
  positivo: "#059669",
  negativo: "#dc2626",
};

export const FUNDO = {
  nome: "Wolf Finance Capital",
  ticker: "WFC-01",
  /** Base para derivar a cota e o patrimônio (derivados da série mensal). */
  capitalInicial: 100000,
  sharpe: 0,
  volatilidade: 0, // % anualizada
};

/** Números que não são deriváveis da série mensal. */
export const RISCO = {
  var: 0, // VaR 95% · 1 dia (%)
  cvar: 0, // CVaR 95% · 1 dia (%)
  beta: 0, // beta vs Ibovespa
  alpha: 0, // alpha anualizado (%)
};

export const DESKS: Mesa[] = [
  {
    id: "macro",
    numero: "Mesa 1",
    nome: "Macroeconomia",
    sigla: "MAC",
    fonte: "Ciclos econômicos, política monetária e fluxos globais",
    natureza: "Direcional top-down",
    cor: CORES.macro,
    oQueE:
      "Traduz o cenário macro — juros, inflação, atividade, câmbio e política monetária — em posições direcionais sobre taxas, moedas e commodities, com horizonte de meses.",
    objetivo:
      "Capturar prêmios de ciclos e choques macroeconômicos, funcionando como proteção e diversificação frente às demais mesas em cenários de reprecificação.",
    retornoAno: 0,
    volatilidade: 0,
    sharpe: 0,
    posicoes: 0,
    metricaChave: { label: "Duração média da carteira", value: "—" },
  },
  {
    id: "equity",
    numero: "Mesa 2",
    nome: "Equity",
    sigla: "EQ",
    fonte: "Análise fundamentalista e valuation",
    natureza: "Direcional comprada (ações)",
    cor: CORES.equity,
    oQueE:
      "Seleciona empresas por análise fundamentalista — resultados, geração de caixa, múltiplos e catalisadores — construindo uma carteira concentrada de ações Brasil e global.",
    objetivo:
      "Capturar o prêmio de longo prazo da renda variável com margem de segurança em valuation, controlando concentração setorial e liquidez.",
    retornoAno: 0,
    volatilidade: 0,
    sharpe: 0,
    posicoes: 0,
    metricaChave: { label: "P/L médio (12m)", value: "—" },
  },
  {
    id: "digital",
    numero: "Mesa 3",
    nome: "Ativos Digitais",
    sigla: "AD",
    fonte: "Análise on-chain e fundamentos de protocolos",
    natureza: "Direcional (criptoativos)",
    cor: CORES.digital,
    oQueE:
      "Acompanha criptoativos e protocolos blockchain combinando métricas on-chain, adoção, tokenomics e liquidez para alocar em ativos digitais líquidos.",
    objetivo:
      "Acessar o prêmio de crescimento do ecossistema digital com gestão rigorosa de risco, dado o caráter de maior volatilidade da classe.",
    retornoAno: 0,
    volatilidade: 0,
    sharpe: 0,
    posicoes: 0,
    metricaChave: { label: "Exposição BTC + ETH", value: "—" },
  },
];

/** Alocação de capital entre as mesas (soma = 100). */
export const ALOCACAO = [
  { label: "Equity", value: 35, cor: CORES.equity },
  { label: "Macroeconomia", value: 30, cor: CORES.macro },
  { label: "Ativos Digitais", value: 15, cor: CORES.digital },
  { label: "Caixa / Reserva", value: 20, cor: CORES.caixa },
];

/**
 * Série mensal (jan/2026 → mês corrente). ADICIONE UMA LINHA POR MÊS.
 * `fundo` deve ser ≈ macro + equity + digital (p.p.).
 */
export const SERIE_MENSAL: LinhaMensal[] = [
  { mes: "Jan", fundo: 0, cdi: 0, ibov: 0, contribuicao: { macro: 0, equity: 0, digital: 0 }, drawdown: 0 },
  { mes: "Fev", fundo: 0, cdi: 0, ibov: 0, contribuicao: { macro: 0, equity: 0, digital: 0 }, drawdown: 0 },
  { mes: "Mar", fundo: 0, cdi: 0, ibov: 0, contribuicao: { macro: 0, equity: 0, digital: 0 }, drawdown: 0 },
  { mes: "Abr", fundo: 0, cdi: 0, ibov: 0, contribuicao: { macro: 0, equity: 0, digital: 0 }, drawdown: 0 },
  { mes: "Mai", fundo: 0, cdi: 0, ibov: 0, contribuicao: { macro: 0, equity: 0, digital: 0 }, drawdown: 0 },
  { mes: "Jun", fundo: 0, cdi: 0, ibov: 0, contribuicao: { macro: 0, equity: 0, digital: 0 }, drawdown: 0 },
  { mes: "Jul", fundo: 0, cdi: 0, ibov: 0, contribuicao: { macro: 0, equity: 0, digital: 0 }, drawdown: 0 },
  { mes: "Ago", fundo: 0, cdi: 0, ibov: 0, contribuicao: { macro: 0, equity: 0, digital: 0 }, drawdown: 0 },
  { mes: "Set", fundo: 0, cdi: 0, ibov: 0, contribuicao: { macro: 0, equity: 0, digital: 0 }, drawdown: 0 },
];
