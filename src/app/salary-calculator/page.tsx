import type { Metadata } from "next";
import { SalaryCalc } from "./calculator";
import { RelatedCalculators } from "@/components/related-calculators";
import { RelatedArticles } from "@/components/related-articles";
import { Breadcrumb } from "@/components/breadcrumb";
import { AffiliateBanner } from "@/components/affiliate-banner";
import { FaqSection } from "@/components/faq-section";

export const metadata: Metadata = {
  title: "Salary Calculator — Hourly to Annual | FinanceCalcAI",
  description:
    "Convert any salary to hourly, daily, weekly, monthly, or annual pay instantly. Free salary calculator with take-home pay estimate.",
  keywords:
    "salary calculator, hourly to annual salary, annual salary to hourly, salary converter, paycheck calculator",
  alternates: { canonical: "/salary-calculator" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Salary Calculator",
  url: "https://www.financecalcai.com/salary-calculator",
  description: "Convert salary between hourly, weekly, monthly, and annual pay periods instantly.",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function SalaryCalculatorPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumb items={[{ label: "Salary Calculator" }]} />
      <div className="mb-8">
        <h1 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">Salary Calculator</h1>
        <p className="text-lg text-gray-600">
          Enter any pay amount and period — instantly see your equivalent hourly, weekly, monthly, and annual salary.
        </p>
      </div>

      <SalaryCalc />

      <div className="mt-10">
        <AffiliateBanner variant="general" />
      </div>

      <section className="mt-16 space-y-8">
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">How to Convert Hourly to Annual Salary</h2>
          <p className="text-gray-600">
            Multiply your hourly rate by the number of hours you work per week, then multiply by 52 weeks.
            For a standard 40-hour work week: $25/hour × 40 hours × 52 weeks = $52,000/year.
            Our calculator does this instantly for any schedule.
          </p>
        </div>
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">US Salary Benchmarks (2025)</h2>
          <p className="text-gray-600">
            The median US annual wage is approximately $59,000 ($28.37/hour). The federal minimum wage is
            $7.25/hour ($15,080/year at 40 hours/week). Many states have higher minimums — California,
            Washington, and New York are at $16–$17/hour. The top 10% of earners make $130,000+/year.
          </p>
        </div>
      </section>

      <FaqSection items={[
        { question: "How do I convert hourly wage to annual salary?", answer: "Multiply your hourly rate by the number of hours per week, then by 52 weeks. Standard formula: hourly × 40 hours × 52 = annual salary. Example: $25/hour × 40 × 52 = $52,000/year." },
        { question: "What is a good hourly wage in the US?", answer: "The US median wage is about $28/hour ($59,000/year). The federal minimum wage is $7.25/hour, but many states are at $16–$17/hour. $20/hour ($41,600/year) is above the federal minimum; $30+/hour puts you above median income." },
        { question: "How much of my salary should I save?", answer: "The standard rule is to save at least 20% of your income (the 50/30/20 rule: 50% needs, 30% wants, 20% savings). For retirement, aim to save 15% of gross income. Even 10% is a strong start if you're just beginning." },
        { question: "What is the difference between gross and net salary?", answer: "Gross salary is what your employer pays before any deductions. Net salary (take-home pay) is what you receive after federal and state taxes, Social Security, Medicare, and any benefits deductions. Net pay is typically 70–80% of gross for most Americans." },
        { question: "How do I negotiate a higher salary?", answer: "Research the market rate for your role using sites like Glassdoor and LinkedIn Salary. Come with a specific number (not a range), anchor high, and time the conversation after a win or performance review. Always negotiate — most employers expect it." },
      ]} />
      <RelatedArticles calculatorHref="/salary-calculator" />
      <RelatedCalculators currentSlug="salary-calculator" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "How do I convert hourly to annual salary?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Multiply your hourly rate by your weekly hours, then multiply by 52. Example: $20/hour × 40 hours × 52 weeks = $41,600/year.",
                },
              },
              {
                "@type": "Question",
                name: "What is a good hourly wage in the US?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The US median wage is about $28/hour ($59,000/year). Anything above $20/hour is above the federal minimum wage, and $30+/hour puts you above median income. What counts as 'good' depends on your location and cost of living.",
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
