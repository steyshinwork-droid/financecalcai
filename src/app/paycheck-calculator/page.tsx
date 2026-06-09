import type { Metadata } from "next";
import { PaycheckCalc } from "./calculator";
import { RelatedCalculators } from "@/components/related-calculators";
import { RelatedArticles } from "@/components/related-articles";
import { Breadcrumb } from "@/components/breadcrumb";
import { AffiliateBanner } from "@/components/affiliate-banner";
import { FaqSection } from "@/components/faq-section";

export const metadata: Metadata = {
  title: "Paycheck Calculator — Take-Home Pay After Taxes | FinanceCalcAI",
  description:
    "Calculate your exact take-home pay after federal taxes, Social Security, Medicare, state tax, and 401(k). Free paycheck calculator for 2025.",
  keywords:
    "paycheck calculator, take-home pay calculator, net pay calculator, salary after taxes, paycheck after tax, how much will my paycheck be",
  alternates: { canonical: "/paycheck-calculator" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Paycheck Calculator",
  url: "https://www.financecalcai.com/paycheck-calculator",
  description: "Calculate your take-home pay after federal income tax, Social Security, Medicare, state tax, and 401(k) contributions.",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function PaycheckCalculatorPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumb items={[{ label: "Paycheck Calculator" }]} />
      <div className="mb-8">
        <h1 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">Paycheck Calculator</h1>
        <p className="text-lg text-gray-600">
          Enter your salary and see exactly how much you take home after federal taxes, FICA, state tax, and 401(k) contributions.
        </p>
      </div>

      <PaycheckCalc />

      <div className="mt-10">
        <AffiliateBanner variant="general" />
      </div>

      <section className="mt-16 space-y-8">
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">Why Is My Take-Home Pay Lower Than My Salary?</h2>
          <p className="text-gray-600">
            Your gross salary is what your employer pays before deductions. Federal income tax, Social Security (6.2%), Medicare (1.45%),
            state income tax, and any pre-tax benefit contributions (401k, health insurance) all reduce your take-home pay.
            For most Americans, take-home pay is 65–80% of gross salary depending on income level and state.
          </p>
        </div>
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">How 401(k) Contributions Affect Your Paycheck</h2>
          <p className="text-gray-600">
            Traditional 401(k) contributions are made pre-tax — they reduce your federal and state taxable income, which means
            the tax savings partially offset the contribution. Contributing 6% of a $70,000 salary ($4,200) might only reduce
            your paycheck by about $3,000 after the tax savings, while building long-term retirement wealth.
          </p>
        </div>
      </section>

      <FaqSection items={[
        { question: "How do I calculate my take-home pay?", answer: "Start with gross pay. Subtract federal income tax (based on 2025 brackets and your standard deduction), Social Security (6.2%), Medicare (1.45%), state income tax, and any 401(k) or benefit deductions. The remainder is your net take-home pay." },
        { question: "What percentage of my paycheck goes to taxes?", answer: "For most Americans, total federal and FICA taxes run 20–30% of gross income. Add state taxes and the effective total is typically 25–35%. However, the marginal rate (on your last dollar) is higher than your effective rate (average across all income)." },
        { question: "Does contributing to a 401(k) reduce my taxes?", answer: "Yes. Traditional 401(k) contributions are pre-tax, reducing your federal and state taxable income. If you're in the 22% federal bracket and contribute $5,000, you save $1,100 in federal taxes alone — your paycheck only drops by $3,900 instead of $5,000." },
        { question: "What is the difference between gross and net pay?", answer: "Gross pay is your salary before any deductions. Net pay (take-home pay) is what hits your bank account after federal income tax, Social Security, Medicare, state taxes, and any pre-tax deductions like 401(k) or health insurance." },
        { question: "Which states have no income tax?", answer: "Florida, Texas, Washington, Nevada, South Dakota, Wyoming, Alaska, Tennessee, and New Hampshire have no state income tax on wages. If you live in one of these states, enter 0% for state tax rate in the calculator." },
      ]} />
      <RelatedArticles calculatorHref="/paycheck-calculator" />
      <RelatedCalculators currentSlug="paycheck-calculator" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "How do I calculate my take-home pay?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Start with gross pay. Subtract federal income tax (based on 2025 tax brackets and standard deduction), Social Security (6.2%), Medicare (1.45%), state income tax, and any 401(k) contributions. The result is your net take-home pay.",
                },
              },
              {
                "@type": "Question",
                name: "What percentage of my paycheck goes to taxes?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "For most Americans, 20–30% of gross income goes to federal income tax and FICA (Social Security + Medicare). Add state taxes for a typical effective total of 25–35%. Your effective rate is lower than your marginal (top bracket) rate.",
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
