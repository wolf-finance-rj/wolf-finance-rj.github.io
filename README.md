# Wolf Finance — Site Institucional

Site institucional da Wolf Finance, liga de investimentos do CEFET/RJ.
Publicado em **https://wolf-finance-rj.github.io**.

---

## 🚀 Rápido — como editar o site

| O que você quer fazer | Onde editar |
|---|---|
| Mudar textos do site | `data/wolfData.ts` |
| Trocar fotos | `public/images/` |
| Adicionar/remover seções | `app/page.tsx` + criar componente em `components/` |
| Mudar cores do tema | `app/globals.css` (bloco `@theme`) |
| Adicionar link no menu | `data/wolfData.ts` → `navLinks` |
| Atualizar redes sociais | `data/wolfData.ts` → `socialLinks` e `contato` |

---

## 📁 Estrutura do projeto

```
├── app/                  # Páginas do Next.js
│   ├── layout.tsx        # Layout global (head, meta, fonts)
│   ├── page.tsx          # Página principal (monta as seções)
│   ├── globals.css       # Estilos globais e tema Tailwind
│   └── fundo/          # Páginas dos fundos fictícios
│       ├── asset/        # Wolf Finance Capital (WFC-01)
│       └── quant/        # Wolf Quant Fund (WQF-01)
├── components/           # Componentes do site
│   ├── Navbar.tsx        # Menu de navegação
│   ├── Footer.tsx        # Rodapé
│   ├── SectionTitle.tsx  # Título padronizado de seção
│   ├── WolfHero.tsx      # Seção inicial
│   ├── WolfSobre.tsx     # Quem somos
│   ├── WolfAreas.tsx     # Áreas de atuação
│   ├── WolfEventos.tsx   # Eventos e oportunidades
│   ├── WolfGaleria.tsx   # Galeria de fotos (carrossel)
│   ├── WolfSeletivo.tsx  # Processo seletivo
│   ├── WolfParcerias.tsx # Parcerias
│   └── Contact.tsx       # Contato
├── data/
│   └── wolfData.ts       # TODOS os textos do site — centralizado
├── lib/
│   └── paths.ts          # Utilitário de caminhos de imagens
├── public/
│   └── images/           # Imagens do site
├── .github/workflows/    # Deploy automático (GitHub Actions)
└── next.config.ts        # Config do Next.js
```

---

## ✏️ Como editar textos

Tudo que aparece escrito no site está em **`data/wolfData.ts`**. Para alterar:

1. Abra `data/wolfData.ts`
2. Localize a seção que quer mudar (ex: `sobre.quemSomos`, `hero.headline`, `areas`)
3. Edite o texto entre aspas
4. Suba as alterações (veja abaixo)

Não precisa editar nada nos componentes — eles só exibem o que está nesse arquivo.

---

## 📈 Manutenção mensal dos fundos

Os dois fundos fictícios têm um arquivo de dados que é a **única fonte de verdade** —
todos os gráficos das páginas (cota, contribuição por mesa, drawdown, excesso de retorno)
são **derivados automaticamente** dele. Para atualizar os números do mês, mexa apenas aqui:

| Fundo | Página | Arquivo de dados |
|---|---|---|
| Wolf Finance Capital (WFC-01) | `/fundo/asset` | `app/fundo/asset/fund-data.ts` |
| Wolf Quant Fund (WQF-01) | `/fundo/quant` | `app/fundo/quant/fund-data.ts` |

A cada mês, em **cada** arquivo:

1. **`REFERENCIA`** — troque `mes`, `updatedAt` e `proximaRevisao`.
2. **`SERIE_MENSAL`** — adicione **uma linha nova no fim** do array com o mês novo
   (`mes`, `fundo`, `cdi`, `ibov`, `contribuicao`, `drawdown`).
   A soma de `contribuicao` deve bater com `fundo`.
3. **`FUNDO`, `RISCO` e `DESKS`** — revise os números resumidos (`sharpe`, `volatilidade`,
   `retornoAno`, `posicoes` e `metricaChave` de cada mesa).
4. **`ALOCACAO`** — ajuste só se a distribuição de capital entre as mesas mudar.

Exemplo de linha nova em `SERIE_MENSAL`:

```ts
// Wolf Finance Capital — contribuicao usa { macro, equity, digital }
{ mes: "Out", fundo: 1.4, cdi: 1.1, ibov: 0.9, contribuicao: { macro: 0.5, equity: 0.6, digital: 0.3 }, drawdown: -0.5 },

// Wolf Quant Fund — contribuicao usa { pair, momentum, ml }
{ mes: "Out", fundo: 1.4, cdi: 1.1, ibov: 0.9, contribuicao: { pair: 0.5, momentum: 0.6, ml: 0.3 }, drawdown: -0.5 },
```

> Os valores são **fictícios** (simulação acadêmica). Não há número repetido no código —
> tudo que não está nesses arquivos é calculado a partir deles.

---

## 🖼️ Como trocar imagens

1. Coloque a foto nova em `public/images/`
2. No arquivo `data/wolfData.ts` ou no componente, use o caminho `/images/seu-arquivo.jpeg`
3. O helper `img()` cuida do prefixo automaticamente

### Galeria de fotos

O carrossel da seção "Nossos momentos" está em `components/WolfGaleria.tsx`. Para adicionar/remover fotos:

```ts
const fotos = [
  { src: "/images/sua-foto.jpeg", alt: "Descrição", legenda: "Legenda na tela" },
  // ...
];
```

### Mapa de imagens nos Eventos

Em `components/WolfEventos.tsx`, a `photoMap` associa cada evento a uma imagem. Edite os caminhos lá.

---

## 🎨 Como mudar cores

Em `app/globals.css`:

```css
@theme inline {
  --color-wolf-navy: #0B1F3A;
  --color-wolf-blue: #1F3C6D;
  --color-wolf-light-gray: #E5E7EB;
}
```

As cores são usadas como `bg-wolf-navy`, `text-wolf-blue`, etc. nos componentes.

---

## 🖥️ Rodar localmente

```bash
npm install      # instalar dependências
npm run dev      # servidor local em http://localhost:3000
npm run build    # gerar versão estática (pasta out/)
```

---

## 🌐 Publicar

O deploy é **automático** via GitHub Actions. Basta subir as alterações no `main`:

```bash
git add -A
git commit -m "descrição do que mudou"
git push origin main
```

Acompanhe o progresso na aba **Actions** do GitHub. O site atualiza em ~2 minutos.

---

## 🧱 Tecnologias

- **Next.js** 16 (static export) — framework
- **React** 19 — biblioteca
- **Tailwind CSS 4** — estilos
- **Framer Motion** — animações
- **Lucide React** — ícones
- **GitHub Actions** — deploy contínuo
- **GitHub Pages** — hospedagem

---

## ❓ Dúvidas

Se algo não estiver claro, converse com o pessoal de tecnologia da Wolf ou abra uma issue no repositório.
