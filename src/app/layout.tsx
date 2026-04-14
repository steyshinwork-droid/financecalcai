import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Analytics } from "@/components/analytics";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://financecalcai.vercel.app"),
  title: {
    default: "FinanceCalcAI - Free AI-Powered Financial Calculators",
    template: "%s | FinanceCalcAI",
  },
  description:
    "Free AI-powered financial calculators with personalized insights. Mortgage, compound interest, budget, debt payoff, retirement, investment, net worth, tax bracket and more.",
  keywords:
    "financial calculator, AI calculator, mortgage calculator, compound interest calculator, budget calculator, debt payoff calculator, retirement calculator, investment calculator, net worth calculator, tax bracket calculator",
  alternates: { canonical: "/" },
  verification: {
    other: {
      "verify-admitad": "b0a3ffeae4",
      "impact-site-verification": "e39330ed-e605-46f6-bf43-c88ea79d9fbe",
    },
  },
  openGraph: {
    type: "website",
    siteName: "FinanceCalcAI",
    title: "FinanceCalcAI - Free AI-Powered Financial Calculators",
    description:
      "Free calculators with AI-powered insights. Get personalized advice, not just numbers.",
    images: [
      {
        url: "/og?title=FinanceCalcAI&description=Free+AI-Powered+Financial+Calculators",
        width: 1200,
        height: 630,
        alt: "FinanceCalcAI - Free AI-Powered Financial Calculators",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FinanceCalcAI - Free AI-Powered Financial Calculators",
    description:
      "Free calculators with AI-powered insights. Get personalized advice, not just numbers.",
    images: ["/og?title=FinanceCalcAI&description=Free+AI-Powered+Financial+Calculators"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5936564601032306"
          crossOrigin="anonymous"
        />
        {/* @ts-ignore */}
        <meta name="impact-site-verification" value="e39330ed-e605-46f6-bf43-c88ea79d9fbe" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Analytics />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
