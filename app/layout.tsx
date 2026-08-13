import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const GA_ID = "G-X1XW5X893X";

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
  verification: {
    google: "Ek_poBhImXwxW24u_M5uL_0mSKRhhqmTyK1iMi8SVVc",
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
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
