import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Maaaatheus Carvalho | AI Developer | Python, IA e Desenvolvimento Backend",
  description:
    "Portfólio de Matheus Carvalho — AI Developer e graduando em Ciência da Computação no CEFET/RJ. Experiência com chatbots IA, FastAPI, Python, LLMs, machine learning e pesquisa quantitativa.",
  metadataBase: new URL("https://matheus.dev"),
  openGraph: {
    title: "Matheus Carvalho | AI Developer | Python, IA e Desenvolvimento Backend",
    description:
      "Portfólio de Matheus Carvalho — AI Developer e graduando em Ciência da Computação no CEFET/RJ. Experiência com chatbots IA, FastAPI, Python, LLMs e machine learning.",
    url: "https://matheus.dev",
    siteName: "Matheus Carvalho",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Matheus Carvalho | AI Developer | Python, IA e Backend",
    description:
      "Portfólio de Matheus Carvalho — AI Developer, chatbots com IA, FastAPI, Python, LLMs e machine learning.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={inter.variable}
    >
      <body className="min-h-screen bg-white text-[#001030] antialiased font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
