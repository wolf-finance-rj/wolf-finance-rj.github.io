/**
 * ============================================================================
 * WOLF QUANT FUND — DADOS DE MANUTENÇÃO MENSAL
 * ============================================================================
 * Este arquivo é a ÚNICA fonte de dados da página /fundo/quant.
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

export type Contribuicao = { pair: number; momentum: number; ml: number };

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
  id: "pair" | "momentum" | "ml";
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
  pair: "#0e7490",
  momentum: "#1f3c6d",
  ml: "#7c3aed",
  caixa: "#cbd5e1",
  positivo: "#059669",
  negativo: "#dc2626",
};

export const FUNDO = {
  nome: "Wolf Quant Fund",
  ticker: "WQF-01",
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
    id: "pair",
    numero: "Mesa 1",
    nome: "Pair Trading",
    sigla: "PT",
    fonte: "Reversão estatística entre pares de ativos",
    natureza: "Market neutral",
    cor: CORES.pair,
    oQueE:
      "Identifica pares de ativos cointegrados e opera a convergência de desvios temporários: compra o relativamente desvalorizado e vende o sobrevalorizado, apostando no retorno da relação à média histórica.",
    objetivo:
      "Entregar fluxo de retorno descorrelacionado do mercado — estabilizador da carteira em quedas ou alta volatilidade. Mantém apenas pares com relação estatística validada.",
    retornoAno: 0,
    volatilidade: 0,
    sharpe: 0,
    posicoes: 0,
    metricaChave: { label: "Z-score médio de entrada", value: "—" },
  },
  {
    id: "momentum",
    numero: "Mesa 2",
    nome: "Momentum",
    sigla: "MOM",
    fonte: "Continuidade de tendência de preço",
    natureza: "Direcional comprada",
    cor: CORES.momentum,
    oQueE:
      "Seleciona os ativos mais líquidos com maior retorno acumulado numa janela definida, confirmando a tendência com filtro de médio/longo prazo antes da entrada.",
    objetivo:
      "Capturar o prêmio de tendência — maior potencial de retorno em altas consistentes, com dimensionamento por volatilidade para evitar concentração em poucos ativos ou setores.",
    retornoAno: 0,
    volatilidade: 0,
    sharpe: 0,
    posicoes: 0,
    metricaChave: { label: "Janela de seleção", value: "—" },
  },
  {
    id: "ml",
    numero: "Mesa 3",
    nome: "Machine Learning",
    sigla: "ML",
    fonte: "Padrões estatísticos aprendidos de múltiplas variáveis",
    natureza: "Direcional, filtrada pelas demais",
    cor: CORES.ml,
    oQueE:
      "Modelo supervisionado que estima a probabilidade de um ativo superar a mediana do universo num horizonte futuro, a partir de tendência, volatilidade, volume e exposição ao mercado.",
    objetivo:
      "Atuar como filtro de qualidade sobre os sinais das demais mesas, reduzindo entradas de baixa probabilidade; evolui como terceira fonte de retorno à medida que é retreinado.",
    retornoAno: 0,
    volatilidade: 0,
    sharpe: 0,
    posicoes: 0,
    metricaChave: { label: "Acurácia (fora da amostra)", value: "—" },
  },
];

/** Alocação de capital entre as mesas (soma = 100). */
export const ALOCACAO = [
  { label: "Momentum", value: 40, cor: CORES.momentum },
  { label: "Pair Trading", value: 25, cor: CORES.pair },
  { label: "Machine Learning", value: 15, cor: CORES.ml },
  { label: "Caixa / Reserva", value: 20, cor: CORES.caixa },
];

/**
 * Série mensal (jan/2026 → mês corrente). ADICIONE UMA LINHA POR MÊS.
 * `fundo` deve ser ≈ pair + momentum + ml (p.p.).
 */
export const SERIE_MENSAL: LinhaMensal[] = [
  { mes: "Jan", fundo: 0, cdi: 0, ibov: 0, contribuicao: { pair: 0, momentum: 0, ml: 0 }, drawdown: 0 },
  { mes: "Fev", fundo: 0, cdi: 0, ibov: 0, contribuicao: { pair: 0, momentum: 0, ml: 0 }, drawdown: 0 },
  { mes: "Mar", fundo: 0, cdi: 0, ibov: 0, contribuicao: { pair: 0, momentum: 0, ml: 0 }, drawdown: 0 },
  { mes: "Abr", fundo: 0, cdi: 0, ibov: 0, contribuicao: { pair: 0, momentum: 0, ml: 0 }, drawdown: 0 },
  { mes: "Mai", fundo: 0, cdi: 0, ibov: 0, contribuicao: { pair: 0, momentum: 0, ml: 0 }, drawdown: 0 },
  { mes: "Jun", fundo: 0, cdi: 0, ibov: 0, contribuicao: { pair: 0, momentum: 0, ml: 0 }, drawdown: 0 },
  { mes: "Jul", fundo: 0, cdi: 0, ibov: 0, contribuicao: { pair: 0, momentum: 0, ml: 0 }, drawdown: 0 },
  { mes: "Ago", fundo: 0, cdi: 0, ibov: 0, contribuicao: { pair: 0, momentum: 0, ml: 0 }, drawdown: 0 },
  { mes: "Set", fundo: 0, cdi: 0, ibov: 0, contribuicao: { pair: 0, momentum: 0, ml: 0 }, drawdown: 0 },
];
