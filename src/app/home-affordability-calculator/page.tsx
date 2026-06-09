import type { Metadata } from "next";
import { HomeAffordabilityCalc } from "./calculator";
import { RelatedCalculators } from "@/components/related-calculators";
import { RelatedArticles } from "@/components/related-articles";
import { Breadcrumb } from "@/components/breadcrumb";
import { AffiliateBanner } from "@/components/affiliate-banner";
import { FaqSection } from "@/components/faq-section";

export const metadata: Metadata = {
  title: "Home Affordability Calculator - How Much House Can I Afford? | FinanceCalcAI",
  description:
    "Find out how much house you can afford based on your income, debts, and down payment. See your max home price, monthly payment breakdown, and debt-to-income ratio with AI insights.",
  keywords:
    "how much house can I afford, home affordability calculator, mortgage affordability calculator, home buying calculator, DTI calculator, how much home can I afford",
  alternates: { canonical: "/home-affordability-calculator" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Home Affordability Calculator",
  url: "https://www.financecalcai.com/home-affordability-calculator",
  description:
    "Free home affordability calculator with AI-powered insights. See how much house you can afford based on income, debts, and down payment.",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function HomeAffordabilityPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumb items={[{ label: "Home Affordability Calculator" }]} />
      <div className="mb-8">
        <h1 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">
          Home Affordability Calculator
        </h1>
        <p className="text-lg text-gray-600">
          Enter your income, debts, and down payment to see exactly how much
          house you can afford. Get a full monthly payment breakdown and
          debt-to-income analysis with AI insights.
        </p>
      </div>
      <HomeAffordabilityCalc />

      <div className="mt-10">
        <AffiliateBanner variant="general" />
      </div>

      <section className="mt-16 space-y-8">
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            The 28/36 Rule Explained
          </h2>
          <p className="text-gray-600">
            Lenders use the 28/36 rule to assess mortgage affordability. The
            front-end ratio limits your housing costs (principal, interest,
            taxes, insurance) to 28% of your gross monthly income. The
            back-end ratio limits all debt payments (housing + car loans +
            student loans + credit cards) to 36% of gross income. Staying
            within these guidelines gives you financial flexibility for savings
            and unexpected expenses.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            What Affects How Much House You Can Afford?
          </h2>
          <p className="text-gray-600">
            Your maximum home price depends on five key factors: annual
            income, existing monthly debts, down payment amount, current
            mortgage interest rate, and local property taxes. A higher income
            or larger down payment increases affordability. Higher existing
            debts or a higher interest rate reduces it. Even a 1% change in
            mortgage rate can shift your affordable home price by 10% or more.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            Down Payment: Why 20% Matters
          </h2>
          <p className="text-gray-600">
            A 20% down payment eliminates private mortgage insurance (PMI),
            which typically costs 0.5–1.5% of the loan annually. On a
            $400,000 loan, that's $2,000–$6,000 per year added to your
            housing costs. You can buy with as little as 3–5% down (FHA or
            conventional loans), but the PMI adds significantly to your
            monthly payment and reduces your buying power.
          </p>
        </div>
      </section>

      <FaqSection
        items={[
          {
            question: "How much house can I afford on a $100,000 salary?",
            answer:
              "On a $100,000 salary with $500/month in existing debts, 10% down, and a 6.8% mortgage rate, you can typically afford a home in the $350,000–$400,000 range. Your monthly housing costs would be roughly $2,300, which is about 28% of your $8,333 monthly gross income. Use the calculator above to get a precise number based on your actual situation.",
          },
          {
            question: "What is debt-to-income ratio and why does it matter?",
            answer:
              "Debt-to-income ratio (DTI) is your total monthly debt payments divided by your gross monthly income. Lenders use two ratios: front-end DTI (housing costs only, max 28%) and back-end DTI (all debts, max 36–43%). Most conventional loans require back-end DTI below 43%. FHA loans can go higher. A lower DTI not only helps you qualify — it also means you can handle your mortgage without financial stress.",
          },
          {
            question: "Should I buy the maximum I can afford?",
            answer:
              "Almost never. The maximum you can qualify for and the amount that's wise to borrow are very different. Lenders approve based on income and debts, but don't factor in your lifestyle, savings goals, retirement contributions, or home maintenance costs (typically 1–2% of home value annually). Most financial advisors suggest keeping housing costs below 25% of take-home pay — more conservative than lender guidelines.",
          },
          {
            question: "What costs are not included in the calculator?",
            answer:
              "The calculator doesn't include private mortgage insurance (PMI, required when down payment is under 20%), closing costs (typically 2–5% of purchase price), moving costs, home inspection fees, ongoing maintenance and repairs (budget 1–2% of home value per year), utilities, and any immediate renovation costs. These can add $10,000–$30,000 or more to the first year of homeownership.",
          },
          {
            question: "How does the interest rate affect affordability?",
            answer:
              "Interest rate has a major impact on affordability. On a $400,000 home with 20% down ($320,000 loan), a 5% rate gives a $1,718/month P&I payment. At 7%, that rises to $2,129/month — a $411 difference. Over 30 years, the 7% loan costs $148,000 more in total interest. Even a 0.5% rate improvement significantly expands your affordable price range.",
          },
        ]}
      />
      <RelatedArticles calculatorHref="/home-affordability-calculator" />
      <RelatedCalculators currentSlug="home-affordability-calculator" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "How much house can I afford on a $100,000 salary?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "On a $100,000 salary with $500/month in debts, 10% down, and 6.8% rate, you can typically afford a home in the $350,000–$400,000 range, with monthly housing costs around $2,300.",
                },
              },
              {
                "@type": "Question",
                name: "What is debt-to-income ratio?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "DTI is your total monthly debt payments divided by gross monthly income. Lenders typically require front-end DTI below 28% and back-end DTI below 36–43%.",
                },
              },
              {
                "@type": "Question",
                name: "Should I buy the maximum I can afford?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Almost never. Most financial advisors suggest keeping housing below 25% of take-home pay. The bank's maximum approval doesn't account for your savings goals, retirement, or home maintenance costs.",
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
