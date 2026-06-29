import type { Metadata } from "next";
import { LoanCalc } from "./calculator";
import { RelatedCalculators } from "@/components/related-calculators";
import { RelatedArticles } from "@/components/related-articles";
import { Breadcrumb } from "@/components/breadcrumb";
import { AffiliateBanner } from "@/components/affiliate-banner";
import { FaqSection } from "@/components/faq-section";

export const metadata: Metadata = {
  title: "Loan Calculator - Monthly Payment & Total Interest | FinanceCalcAI",
  description:
    "Calculate your monthly loan payment, total interest, and see a full amortization breakdown. Free personal loan calculator with AI affordability analysis.",
  keywords:
    "loan calculator, personal loan calculator, loan payment calculator, monthly payment calculator, loan interest calculator, amortization calculator",
  alternates: { canonical: "/loan-calculator" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Loan Calculator",
  url: "https://www.financecalcai.com/loan-calculator",
  description: "Free loan calculator — compute monthly payment, total interest, and get AI-powered affordability analysis.",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function LoanCalculatorPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumb items={[{ label: "Loan Calculator" }]} />
      <div className="mb-8">
        <h1 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">Loan Calculator</h1>
        <p className="text-lg text-gray-600">
          Enter your loan amount, interest rate, and term to see your monthly payment and total cost. AI checks if the loan fits your budget.
        </p>
      </div>

      <LoanCalc />

      <div className="mt-10">
        <AffiliateBanner variant="debt" />
      </div>

      <section className="mt-16 space-y-8">
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">How Is a Loan Payment Calculated?</h2>
          <p className="text-gray-600">
            Personal loan payments are calculated using the standard amortization formula:
            M = P × [r(1+r)^n] / [(1+r)^n − 1], where P is the principal, r is the monthly interest rate
            (annual rate ÷ 12), and n is the total number of payments. Early payments go mostly toward
            interest; later payments go mostly toward principal. This calculator shows the exact breakdown
            for each period so you can see how the split changes over time.
          </p>
        </div>
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">What Is a Good Interest Rate for a Personal Loan?</h2>
          <p className="text-gray-600">
            In 2024–2025, average personal loan rates in the US range from 8% to 36%, depending heavily on
            credit score. Excellent credit (720+) typically gets 8–13%. Good credit (680–719) gets 13–20%.
            Fair credit (640–679) often sees 20–28%. Below 640, rates can exceed 30%. Credit unions and
            online lenders often beat big banks by 2–5 percentage points on the same credit profile.
          </p>
        </div>
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">How Much Personal Loan Can I Afford?</h2>
          <p className="text-gray-600">
            A common rule is to keep your total monthly debt payments — including the new loan — below
            36% of gross monthly income. For example, if you earn $5,000/month, your maximum total debt
            payments should be $1,800. If you already pay $800 in rent and car payments, you can
            comfortably afford up to $1,000/month for a new loan. Our AI insight calculates this for you
            automatically when you enter your monthly income.
          </p>
        </div>
      </section>

      <FaqSection items={[
        { question: "How is a monthly loan payment calculated?", answer: "Monthly payment = P × [r(1+r)^n] / [(1+r)^n − 1], where P = loan amount, r = monthly rate (annual rate ÷ 12), n = number of months. For a $10,000 loan at 8.5% for 3 years: monthly payment ≈ $315. Early payments go mostly to interest; later payments mostly to principal — that's amortization." },
        { question: "Does paying off a loan early save interest?", answer: "Yes, significantly. Extra payments go directly to principal, which reduces future interest charges immediately. On a $10,000 loan at 10% for 5 years, an extra $100/month saves over $800 in interest and cuts 14 months off the term. Always check for prepayment penalties first — most personal loans don't have them, but some do." },
        { question: "What credit score do I need for a personal loan?", answer: "Most traditional lenders require 600–640 minimum. Online lenders may approve 560+, but at rates of 25–36%. For rates under 10%, you generally need 720+. Credit unions are often the best option for scores between 620–680 — they typically beat big banks by 2–5 percentage points." },
        { question: "What is a good interest rate on a personal loan?", answer: "In 2024–2025, rates range from 8% (excellent credit, 720+) to 36% (poor credit). Under 12% is generally good. Over 20% is expensive — consider alternatives like balance transfer cards (0% intro), home equity loans, or borrowing from a 401(k). Any rate above 29% should be a last resort." },
        { question: "How much personal loan can I afford?", answer: "Keep total monthly debt payments (all loans + housing) below 36% of gross income. If you earn $5,000/month, max total debt = $1,800. If you already pay $1,200 in rent and car, you can comfortably afford up to $600/month for a new loan. Our calculator shows the affordability assessment automatically." },
      ]} />
      <RelatedArticles calculatorHref="/loan-calculator" />
      <RelatedCalculators currentSlug="loan-calculator" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is the formula for a monthly loan payment?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Monthly payment = P × [r(1+r)^n] / [(1+r)^n − 1], where P = loan amount, r = monthly interest rate (annual rate ÷ 12), n = number of months. For a $10,000 loan at 8.5% for 3 years: r = 0.085/12 ≈ 0.00708, n = 36, monthly payment ≈ $315.",
                },
              },
              {
                "@type": "Question",
                name: "Does paying off a loan early save interest?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes — significantly. Because interest accrues on the remaining balance, paying extra principal reduces future interest charges immediately. On a $10,000 loan at 10% for 5 years, paying an extra $100/month could save over $800 in interest and cut 14 months off the term. Check for prepayment penalties before paying early.",
                },
              },
              {
                "@type": "Question",
                name: "What credit score do I need for a personal loan?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Most traditional lenders require a minimum credit score of 600–640. Online lenders may approve scores as low as 560, but at very high rates (25–36%). For the best rates under 10%, you typically need a score of 720 or higher. Credit unions are often the best option for borrowers with scores between 620–680.",
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}

