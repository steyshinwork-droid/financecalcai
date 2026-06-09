import type { Metadata } from "next";
import { InflationCalc } from "./calculator";
import { RelatedCalculators } from "@/components/related-calculators";
import { RelatedArticles } from "@/components/related-articles";
import { Breadcrumb } from "@/components/breadcrumb";
import { AffiliateBanner } from "@/components/affiliate-banner";
import { FaqSection } from "@/components/faq-section";

export const metadata: Metadata = {
  title: "Inflation Calculator - How Much Has Money Lost Value? | FinanceCalcAI",
  description:
    "Calculate how inflation has eroded your dollar's purchasing power. See what $1,000 in 2000 is worth today using real US CPI data. Free inflation calculator.",
  keywords:
    "inflation calculator, purchasing power calculator, CPI calculator, how much is a dollar worth today, inflation rate calculator, historical inflation",
  alternates: { canonical: "/inflation-calculator" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Inflation Calculator",
  url: "https://www.financecalcai.com/inflation-calculator",
  description: "Free inflation calculator using US CPI data — see how purchasing power changes over time.",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function InflationCalculatorPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumb items={[{ label: "Inflation Calculator" }]} />
      <div className="mb-8">
        <h1 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">Inflation Calculator</h1>
        <p className="text-lg text-gray-600">
          Enter an amount and date range to see how inflation has changed purchasing power using historical US CPI data.
        </p>
      </div>

      <InflationCalc />

      <div className="mt-10">
        <AffiliateBanner variant="general" />
      </div>

      <section className="mt-16 space-y-8">
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">What Is Inflation?</h2>
          <p className="text-gray-600">
            Inflation is the gradual increase in prices over time, which means each dollar buys less than it used to.
            The US Federal Reserve targets 2% annual inflation as a sign of a healthy economy. When inflation rises above
            that — as it did in 2022 (8%) — the purchasing power of savings and fixed incomes erodes quickly.
            From 2000 to 2025, cumulative US inflation exceeded 90%, meaning $1,000 in 2000 now requires over $1,900 to
            match the same purchasing power.
          </p>
        </div>
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">How This Calculator Works</h2>
          <p className="text-gray-600">
            This calculator applies actual annual US Consumer Price Index (CPI) rates year by year from 1990 to 2025.
            Enter a starting amount, a from-year, and a to-year — and it compounds the inflation rate each year to show
            the equivalent value. The chart shows purchasing power as a curve so you can see years with high inflation
            (like 2022) versus low-inflation periods (like 2015 at just 0.1%).
          </p>
        </div>
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">Why Inflation Matters for Investing</h2>
          <p className="text-gray-600">
            If your savings account earns 1% interest while inflation runs at 3%, you are losing 2% of real purchasing
            power every year. Over 25 years that compounds into a major loss. This is why financial advisors recommend
            keeping long-term savings in assets that historically outpace inflation — such as diversified stock index
            funds, which have returned roughly 7% per year after inflation over the past century.
          </p>
        </div>
      </section>

      <FaqSection items={[
        { question: "What is inflation and why does it happen?", answer: "Inflation is the gradual rise in prices over time, meaning each dollar buys less than before. It's caused by increased money supply, higher demand for goods, rising production costs, or supply chain disruptions. The US Federal Reserve targets 2% annual inflation as a sign of a healthy, growing economy. When inflation exceeds that — like 2022's 8% — it erodes purchasing power rapidly." },
        { question: "What was the average US inflation rate over 25 years?", answer: "From 2000 to 2025, average annual US inflation was approximately 2.5–2.6%. Prices roughly doubled over that period. The highest recent year: 2022 at 8.0%. The lowest: 2015 at just 0.1%. This means $1,000 in 2000 has the equivalent purchasing power of roughly $1,900 today." },
        { question: "How does inflation affect my savings?", answer: "If your savings account earns 1% while inflation runs at 3%, you're losing 2% of real purchasing power per year. Over 25 years at that rate, the real value of your savings drops by about 40%. This is why financial advisors recommend keeping long-term savings in assets that outpace inflation — stock index funds have returned roughly 7% per year after inflation historically." },
        { question: "What investments beat inflation?", answer: "Historically, stocks (7% real return), real estate (3–4% real return), and TIPS (Treasury Inflation-Protected Securities) are the main inflation beaters. Cash and traditional savings accounts typically lose to inflation. I-Bonds are excellent during high-inflation periods — they're guaranteed to keep pace with CPI. Gold is inconsistent — good during some inflationary periods, not others." },
        { question: "What is the current US inflation rate?", answer: "As of early 2025, US inflation has cooled significantly from its 2022 peak of 8%. The Federal Reserve's actions brought it closer to their 2% target. Check the Bureau of Labor Statistics (bls.gov) for the most current CPI figures, as rates change monthly." },
      ]} />
      <RelatedArticles calculatorHref="/inflation-calculator" />
      <RelatedCalculators currentSlug="inflation-calculator" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What was the average US inflation rate over the last 25 years?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "From 2000 to 2025, the average annual US inflation rate was approximately 2.5–2.6%. This means prices roughly doubled over that 25-year period. The highest recent year was 2022 at 8.0%; the lowest was 2015 at just 0.1%.",
                },
              },
              {
                "@type": "Question",
                name: "How do I calculate inflation-adjusted value?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Multiply the original amount by each year's CPI inflation rate compounded. For example, $1,000 in 2000 growing at 2.5%/year for 25 years = $1,000 × (1.025)^25 ≈ $1,854. Our calculator uses actual CPI rates for each year, not a fixed average.",
                },
              },
              {
                "@type": "Question",
                name: "Does inflation affect Social Security benefits?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Social Security benefits are adjusted annually using Cost of Living Adjustments (COLA) tied to the CPI-W index. In 2023, benefits increased 8.7% due to high inflation. In 2024 the COLA was 3.2%.",
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
