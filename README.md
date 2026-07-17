# Matheus — Portfólio

Landing page pessoal construída com Next.js, TypeScript, Tailwind CSS, Framer Motion e Lucide React.

## Rodar localmente

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Build de produção

```bash
npm run build
npm start
```

## Estrutura do projeto

```
├── app/
│   ├── globals.css       # Estilos globais + paleta de cores
│   ├── layout.tsx        # Layout raiz + SEO (Open Graph, Twitter Card)
│   └── page.tsx          # Página principal (monta todas as seções)
├── components/
│   ├── Navbar.tsx        # Barra de navegação fixa + menu mobile
│   ├── Hero.tsx          # Hero section com canvas geométrico animado
│   ├── About.tsx         # Sobre mim + pilares
│   ├── Projects.tsx      # Grade de projetos
│   ├── ProjectCard.tsx   # Card individual de projeto
│   ├── Experience.tsx    # Linha do tempo de experiência
│   ├── Skills.tsx        # Competências por categoria
│   ├── Education.tsx     # Formação acadêmica
│   ├── Stats.tsx         # Indicadores numéricos
│   ├── Contact.tsx       # Formulário + canais de contato
│   ├── Footer.tsx        # Rodapé
│   ├── SectionTitle.tsx  # Título de seção reutilizável
│   └── SocialLinks.tsx   # Ícones de redes sociais
├── data/
│   └── portfolioData.ts  # TODOS os dados: projetos, skills, experiências, etc.
├── public/
│   └── favicon.svg       # Favicon
└── package.json
```

## Como personalizar

**TODOS os textos, links, projetos e dados estão em um único arquivo:**

`data/portfolioData.ts`

Abra e edite:

- `personalInfo` — nome, headline, e-mail, links
- `socialLinks` — GitHub, LinkedIn, email
- `projects` — adicione/remova projetos no array
- `experiences` — experiências e linha do tempo
- `skillCategories` — competências por categoria
- `education` — dados da formação
- `stats` — números da seção de destaques
- `seo` — título e descrição para meta tags

As cores estão em `app/globals.css` na seção `@theme inline`.

## Formulário de contato

O formulário está preparado para integração com **Formspree** (gratuito para até 50 envios/mês):

1. Crie conta em [formspree.io](https://formspree.io)
2. Crie um formulário e copie o endpoint
3. Em `components/Contact.tsx`, substitua `FORMSPREE_ENDPOINT` pelo seu endpoint

Alternativas: EmailJS, Resend, ou uma API própria.

## Publicar na Vercel

1. Faça push do projeto para um repositório no GitHub
2. Acesse [vercel.com](https://vercel.com) e importe o repositório
3. A Vercel detecta Next.js automaticamente — sem configuração extra

## Publicar na VPS

```bash
# Na VPS (após fazer push para o GitHub)
ssh root@173.224.122.125

# Instalar Node.js 20+
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt install -y nodejs

# Clonar o repositório
git clone <seu-repo> /opt/site
cd /opt/site

# Instalar e buildar
npm install
npm run build

# Instalar PM2 para manter o app rodando
npm install -g pm2
pm2 start npm --name "site-matheus" -- start
pm2 save
pm2 startup

# Configurar Nginx como proxy reverso
apt install -y nginx
```

Exemplo de configuração Nginx (`/etc/nginx/sites-available/matheus`):

```nginx
server {
    listen 80;
    server_name seudominio.com.br www.seudominio.com.br;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Ativar o site:

```bash
ln -s /etc/nginx/sites-available/matheus /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

Para HTTPS, use o Certbot:

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d seudominio.com.br -d www.seudominio.com.br
```

## Dados que precisam ser preenchidos

Estes campos em `data/portfolioData.ts` usam placeholders — substitua:

| Campo | Localização | Placeholder atual |
|---|---|---|
| Email real | `personalInfo.email` | `matheus@email.com` |
| URL do currículo | `personalInfo.resumeUrl` | `#` |
| GitHub real | `socialLinks[0].href` | `https://github.com/matheus` |
| LinkedIn real | `socialLinks[1].href` | `https://linkedin.com/in/matheus` |
| URLs dos projetos | `projects[].githubUrl` | Links de exemplo |
| Período da graduação | `education.period` | `[Período a preencher]` |
| Previsão de conclusão | `education.expectedCompletion` | `[Previsão de conclusão a preencher]` |
| Números dos stats | `stats[].value` | `[X]+`, `[X]` |
| Endpoint Formspree | `Contact.tsx` → `FORMSPREE_ENDPOINT` | `SEU_FORM_ID` |
| URL do site | `seo.url` e `layout.tsx` → `metadataBase` | `https://matheus.dev` |

## Sugestões de elementos visuais

- **Foto de perfil**: adicione uma foto em `public/photo.jpg` e inclua na Hero ou About
- **Screenshots dos projetos**: substitua o placeholder visual em `ProjectCard.tsx` por imagens reais
- **PDF do currículo**: coloque em `public/curriculo.pdf` e atualize `resumeUrl`

## Licença

Código livre para uso pessoal.
