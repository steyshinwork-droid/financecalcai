import type { Metadata } from "next";
import { StudentLoanCalc } from "./calculator";
import { RelatedCalculators } from "@/components/related-calculators";
import { RelatedArticles } from "@/components/related-articles";
import { Breadcrumb } from "@/components/breadcrumb";
import { AffiliateBanner } from "@/components/affiliate-banner";
import { FaqSection } from "@/components/faq-section";

export const metadata: Metadata = {
  title: "Student Loan Payoff Calculator - Free AI-Powered | FinanceCalcAI",
  description:
    "Calculate how fast you can pay off your student loans. See how extra payments save thousands in interest. Compare federal and private loans with AI insights.",
  keywords:
    "student loan payoff calculator, student loan calculator, how to pay off student loans, student loan interest calculator, federal student loan calculator",
  alternates: { canonical: "/student-loan-calculator" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Student Loan Payoff Calculator",
  url: "https://www.financecalcai.com/student-loan-calculator",
  description:
    "Free student loan payoff calculator with AI-powered insights. See how extra payments save interest and cut your payoff timeline.",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function StudentLoanPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumb items={[{ label: "Student Loan Calculator" }]} />
      <div className="mb-8">
        <h1 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">
          Student Loan Payoff Calculator
        </h1>
        <p className="text-lg text-gray-600">
          Enter your loans to see your payoff timeline and how much interest you
          can save with extra payments. AI shows you the fastest path to
          debt-free.
        </p>
      </div>
      <StudentLoanCalc />

      <div className="mt-10">
        <AffiliateBanner variant="student" />
      </div>

      <section className="mt-16 space-y-8">
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            How Student Loan Repayment Works
          </h2>
          <p className="text-gray-600">
            Student loans accrue interest daily based on your outstanding
            balance and interest rate. Your monthly payment first covers
            accrued interest, then reduces the principal. In the early years,
            most of your payment goes to interest вЂ” which is why extra
            principal payments early in the loan save the most money.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            Federal vs. Private Student Loans
          </h2>
          <p className="text-gray-600">
            Federal loans offer income-driven repayment plans, deferment,
            forbearance, and potential forgiveness. Private loans have none of
            these protections but sometimes offer lower rates for
            creditworthy borrowers. Always exhaust federal loan options before
            taking private loans вЂ” the flexibility is worth more than a
            slightly lower rate.
          </p>
        </div>
      </section>

      <FaqSection
        items={[
          {
            question: "Should I pay off student loans or invest?",
            answer:
              "It depends on your interest rate. If your student loan rate is above 7%, prioritize paying it off вЂ” the guaranteed return beats uncertain stock returns. If below 5%, invest in tax-advantaged accounts first (401k match, then IRA). Between 5вЂ“7%, do both: invest enough to get any employer match, then split extra money between loans and investments.",
          },
          {
            question: "What is the avalanche method for student loans?",
            answer:
              "The avalanche method directs extra payments to your highest interest rate loan first. Once it's paid off, roll that payment to the next highest rate. This minimizes total interest paid and gets you debt-free faster mathematically. It's especially effective when you have a mix of high-rate private loans and lower-rate federal loans.",
          },
          {
            question: "How much does an extra $100/month save on student loans?",
            answer:
              "On a $30,000 loan at 6.5% with a 10-year term, an extra $100/month saves approximately $2,800 in interest and cuts about 2 years off your repayment. The earlier you start making extra payments, the greater the savings вЂ” because you're reducing the principal on which interest compounds.",
          },
          {
            question: "What are income-driven repayment plans?",
            answer:
              "Income-driven repayment (IDR) plans cap your federal student loan payment at 5вЂ“10% of your discretionary income. Plans include SAVE (formerly REPAYE), PAYE, IBR, and ICR. After 20вЂ“25 years of qualifying payments, any remaining balance is forgiven. These are ideal if your loan balance is high relative to your income.",
          },
          {
            question: "Should I refinance my student loans?",
            answer:
              "Refinancing private loans at a lower rate almost always makes sense. Refinancing federal loans into a private loan can save money short-term but permanently loses access to income-driven repayment, deferment, and Public Service Loan Forgiveness (PSLF). Only refinance federal loans if you're certain you won't need those protections and the rate savings are significant.",
          },
        ]}
      />
      <RelatedArticles calculatorHref="/student-loan-calculator" />
      <RelatedCalculators currentSlug="student-loan-calculator" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Should I pay off student loans or invest?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "It depends on your interest rate. If your student loan rate is above 7%, prioritize paying it off. If below 5%, invest in tax-advantaged accounts first. Between 5вЂ“7%, do both: get the 401k match, then split extra money between loans and investments.",
                },
              },
              {
                "@type": "Question",
                name: "How much does an extra $100/month save on student loans?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "On a $30,000 loan at 6.5% with a 10-year term, an extra $100/month saves approximately $2,800 in interest and cuts about 2 years off your repayment.",
                },
              },
              {
                "@type": "Question",
                name: "What are income-driven repayment plans?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Income-driven repayment plans cap your federal student loan payment at 5вЂ“10% of your discretionary income. After 20вЂ“25 years of qualifying payments, any remaining balance is forgiven.",
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}

