import type { Metadata } from "next";
import { EmergencyFundCalc } from "./calculator";
import { RelatedCalculators } from "@/components/related-calculators";
import { RelatedArticles } from "@/components/related-articles";
import { Breadcrumb } from "@/components/breadcrumb";
import { AffiliateBanner } from "@/components/affiliate-banner";
import { FaqSection } from "@/components/faq-section";

export const metadata: Metadata = {
  title: "Emergency Fund Calculator - Free AI-Powered | FinanceCalcAI",
  description:
    "Calculate how much you need in your emergency fund. AI analyzes your situation and creates a personalized savings plan.",
  keywords:
    "emergency fund calculator, how much emergency fund, emergency savings calculator, rainy day fund",
  alternates: { canonical: "/emergency-fund-calculator" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Emergency Fund Calculator",
  url: "https://www.financecalcai.com/emergency-fund-calculator",
  description:
    "Free emergency fund calculator calculating how much you need with personalized savings plan.",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function EmergencyFundPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumb items={[{ label: "Emergency Fund Calculator" }]} />
      <div className="mb-8">
        <h1 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">
          Emergency Fund Calculator
        </h1>
        <p className="text-lg text-gray-600">
          Find out how much you need for your emergency fund and how long it
          will take to build it. AI creates a personalized plan.
        </p>
      </div>
      <EmergencyFundCalc />

      <div className="mt-10">
        <AffiliateBanner variant="savings" />
      </div>
      <section className="mt-16 space-y-8">
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            Why You Need an Emergency Fund
          </h2>
          <p className="text-gray-600">
            An emergency fund is cash set aside for unexpected expenses — job
            loss, medical bills, car repairs, or home emergencies. Without one,
            you&apos;re forced to take on high-interest debt when life happens.
            It&apos;s the most important financial safety net you can build
            before investing.
          </p>
        </div>
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            How Much Do You Need?
          </h2>
          <p className="text-gray-600">
            The standard recommendation is 3–6 months of living expenses. If
            you have a stable job and few dependents, 3 months may be enough.
            If you&apos;re self-employed, have variable income, or support a
            family, aim for 6 months or more. Keep this money in a high-yield
            savings account — accessible but separate from your daily spending.
          </p>
        </div>
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            Building Your Fund Fast
          </h2>
          <p className="text-gray-600">
            Start small — even $500 provides a buffer against minor emergencies.
            Automate a fixed monthly transfer to your emergency savings account.
            Use windfalls like tax refunds or bonuses to boost it quickly. Once
            fully funded, redirect those contributions to investing.
          </p>
        </div>
      </section>

      <FaqSection items={[
        { question: "How much should I have in an emergency fund?", answer: "3–6 months of essential living expenses (rent/mortgage, utilities, groceries, insurance, minimum debt payments). Stable job, no dependents: 3 months is fine. Self-employed, variable income, or with dependents: 6 months minimum. Two-income households can often manage 3 months since both would need to lose their jobs simultaneously." },
        { question: "Where should I keep my emergency fund?", answer: "A high-yield savings account (HYSA) earning 4–5% APY. It should be: separate from your checking (out of sight, out of mind), FDIC-insured, and accessible within 1–2 business days. Don't invest emergency funds in stocks — markets can drop 30–50% right when you need the money. Don't keep it in a regular savings account earning 0.01%." },
        { question: "How long does it take to build an emergency fund?", answer: "At $500/month: a $15,000 fund takes 30 months. At $1,000/month: 15 months. At $200/month: ~6 years. Speed tip: set up automatic transfer on payday, use tax refunds and bonuses to make lump-sum contributions. Start with a $1,000 'starter' emergency fund as your first goal, then build to 3–6 months." },
        { question: "Should I have an emergency fund before investing?", answer: "Yes — build a $1,000 starter emergency fund before investing (except for getting your full 401k employer match, which is essentially free money). Without an emergency fund, any unexpected expense forces you to sell investments at a bad time or go into high-interest debt. The order: 401k match → $1,000 emergency fund → high-interest debt → full 3–6 month fund → then invest aggressively." },
        { question: "Is $10,000 a good emergency fund?", answer: "$10,000 is solid for most single people or couples without children in average-cost-of-living areas. Whether it's 'enough' depends on your monthly expenses. If you spend $3,000/month on essentials, $10,000 covers ~3 months — adequate for someone with stable employment. If you spend $5,000/month, $10,000 is only 2 months — consider building to $15,000–$20,000." },
      ]} />
      <RelatedArticles calculatorHref="/emergency-fund-calculator" />
      <RelatedCalculators currentSlug="emergency-fund-calculator" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "How much should I have in an emergency fund?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Most financial experts recommend 3-6 months of living expenses in your emergency fund. If you have a stable job and no dependents, 3 months may be enough. If you're self-employed, have variable income, or support a family, aim for 6 months or more.",
                },
              },
              {
                "@type": "Question",
                name: "Where should I keep my emergency fund?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Keep your emergency fund in a high-yield savings account (HYSA) that earns 4-5% APY. It should be separate from your checking account (to avoid spending it), FDIC-insured, and accessible within 1-2 business days. Do not invest your emergency fund in stocks.",
                },
              },
              {
                "@type": "Question",
                name: "How long does it take to build an emergency fund?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "It depends on your savings rate. Saving $500/month, a $15,000 emergency fund takes 30 months. Saving $1,000/month takes 15 months. Start with a $1,000 mini emergency fund as your first goal, then build to 3-6 months of expenses.",
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
