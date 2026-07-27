import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wolf Finance | Liga de Investimentos do CEFET/RJ",
  description:
    "A Wolf Finance é uma liga acadêmica do CEFET/RJ que conecta estudantes, mercado financeiro e sociedade por meio de pesquisa, formação técnica, projetos, competições e educação financeira.",
  metadataBase: new URL("https://wolffinance.com.br"),
  openGraph: {
    title: "Wolf Finance | Liga de Investimentos do CEFET/RJ",
    description:
      "Conhecimento financeiro que se transforma em experiência — Wolf Finance, a liga de investimentos do CEFET/RJ.",
    url: "https://wolffinance.com.br",
    siteName: "Wolf Finance",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wolf Finance | Liga de Investimentos do CEFET/RJ",
    description:
      "Conhecimento financeiro que se transforma em experiência — Wolf Finance, a liga de investimentos do CEFET/RJ.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="min-h-screen bg-white text-wolf-navy antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
