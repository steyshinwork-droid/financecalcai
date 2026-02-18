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
  openGraph: {
    type: "website",
    siteName: "FinanceCalcAI",
    title: "FinanceCalcAI - Free AI-Powered Financial Calculators",
    description:
      "Free calculators with AI-powered insights. Get personalized advice, not just numbers.",
  },
  twitter: {
    card: "summary_large_image",
    title: "FinanceCalcAI - Free AI-Powered Financial Calculators",
    description:
      "Free calculators with AI-powered insights. Get personalized advice, not just numbers.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Analytics />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
