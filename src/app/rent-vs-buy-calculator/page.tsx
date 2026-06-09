import type { Metadata } from "next";
import { RentVsBuyCalc } from "./calculator";
import { RelatedCalculators } from "@/components/related-calculators";
import { RelatedArticles } from "@/components/related-articles";
import { Breadcrumb } from "@/components/breadcrumb";
import { AffiliateBanner } from "@/components/affiliate-banner";
import { FaqSection } from "@/components/faq-section";

export const metadata: Metadata = {
  title: "Rent vs. Buy Calculator — Is It Better to Rent or Buy a Home? | FinanceCalcAI",
  description:
    "Compare the true cost of renting vs. buying a home. See break-even point, net costs, equity built, and get AI-powered analysis to make the right decision for your situation.",
  keywords:
    "rent vs buy calculator, should I rent or buy, rent or buy a home, renting vs buying comparison, break even rent buy, home buying calculator",
  alternates: { canonical: "/rent-vs-buy-calculator" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Rent vs. Buy Calculator",
  url: "https://www.financecalcai.com/rent-vs-buy-calculator",
  description: "Free rent vs. buy calculator — compare true costs, see the break-even point, and get AI analysis on whether renting or buying makes sense for you.",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function RentVsBuyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumb items={[{ label: "Rent vs. Buy Calculator" }]} />
      <div className="mb-8">
        <h1 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">Rent vs. Buy Calculator</h1>
        <p className="text-lg text-gray-600">
          Enter your rent, home price, and financial details to see which option costs less — and exactly when buying breaks even with renting.
        </p>
      </div>

      <RentVsBuyCalc />

      <div className="mt-10">
        <AffiliateBanner variant="general" />
      </div>

      <section className="mt-16 space-y-8">
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">How the Rent vs. Buy Decision Really Works</h2>
          <p className="text-gray-600">
            The rent vs. buy decision is not simply about monthly payment — it's about total cost over your actual time horizon.
            Buying has large upfront costs (down payment, closing costs of 2–5%) and ongoing costs (taxes, insurance, maintenance).
            Renting has lower upfront costs but no equity building and rent subject to annual increases.
            The key variable is time: the longer you stay, the more buying tends to win. The shorter your horizon, the more renting tends to win.
          </p>
        </div>
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">What Is the Break-Even Point?</h2>
          <p className="text-gray-600">
            The break-even point is the year at which buying's cumulative net cost (all payments minus equity built plus opportunity cost of the down payment)
            falls below renting's cumulative cost. Before that point, renting is cheaper on a net basis. After it, buying is cheaper.
            In most US markets, the break-even point falls between 4 and 8 years. If you plan to move before break-even, renting is likely the better financial choice.
          </p>
        </div>
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">The Opportunity Cost of a Down Payment</h2>
          <p className="text-gray-600">
            A down payment of $80,000 invested in a diversified index fund at 7% annual return grows to over $160,000 in 10 years.
            That growth you give up when you put money into a house instead of the market is called opportunity cost —
            and it's one reason buying isn't automatically better than renting even when monthly mortgage payments are similar to rent.
            Our calculator factors this in so you see the honest comparison.
          </p>
        </div>
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">The 5% Rule for Rent vs. Buy</h2>
          <p className="text-gray-600">
            A useful heuristic: multiply the home price by 5%, then divide by 12. If your annual rent is less than 5% of the home price,
            renting is likely more cost-effective. Example: $400,000 home × 5% = $20,000/year = $1,667/month.
            If rent is under $1,667, renting may be the better deal. This rule accounts for property taxes (~1%),
            maintenance (~1%), and the cost of capital tied up in the home (~3%).
          </p>
        </div>
      </section>

      <FaqSection items={[
        {
          question: "Is it always better to buy than rent?",
          answer: "No — it depends heavily on how long you stay. Buying has large upfront costs (down payment, closing costs of 2–5% of the home price) that take years to recoup through equity and appreciation. If you move within 2–4 years, renting is usually cheaper. If you stay 7–10+ years, buying typically wins financially. The break-even point varies by market, but most US cities see break-even between 4–8 years."
        },
        {
          question: "What does the break-even point mean?",
          answer: "The break-even point is the year at which the total net cost of buying (all payments minus equity built, plus the opportunity cost of your down payment) becomes less than the total rent you would have paid. Before break-even, renting saves money. After break-even, buying saves money. Your planned time in the home should exceed the break-even point for buying to make financial sense."
        },
        {
          question: "How much should I put down when buying a home?",
          answer: "20% down eliminates private mortgage insurance (PMI), which typically costs 0.5–1.5% of the loan annually. Below 20%, you pay PMI until you reach 20% equity. FHA loans allow as little as 3.5% down but require mortgage insurance for the life of the loan. A larger down payment reduces your monthly payment and total interest but increases your opportunity cost (money not invested). There's no universal right answer — it depends on your cash reserves, income stability, and how long you plan to stay."
        },
        {
          question: "What costs do homeowners often underestimate?",
          answer: "Maintenance and repairs are the most commonly underestimated cost. Financial advisors typically budget 1–2% of the home's value annually ($4,000–$8,000/year on a $400,000 home). Other overlooked costs: closing costs (2–5% upfront), property taxes (0.5–2.5% depending on state), HOA fees, homeowner's insurance, and the cost of capital tied up in the down payment. Together, these can add $1,000–$2,000/month beyond the mortgage payment on a median-priced home."
        },
        {
          question: "Does renting mean throwing money away?",
          answer: "No — this is one of the most persistent myths in personal finance. When you rent, you're paying for housing, flexibility, and the ability to invest the difference. When you buy, significant portions of your early mortgage payments go to interest (not equity), and you incur large ongoing costs beyond the mortgage. The 'throwing money away' framing ignores that buyers also pay interest, taxes, insurance, and maintenance — none of which build equity."
        },
      ]} />

      <RelatedArticles calculatorHref="/rent-vs-buy-calculator" />
      <RelatedCalculators currentSlug="rent-vs-buy-calculator" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Is it always better to buy than rent?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. It depends on how long you stay and local market conditions. If you move within 2–4 years, renting is usually cheaper after factoring in closing costs and the break-even timeline. Buying tends to win financially after 6–8+ years in most markets.",
                },
              },
              {
                "@type": "Question",
                name: "What is the break-even point in rent vs. buy?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The break-even point is when the cumulative net cost of buying (payments minus equity, plus opportunity cost of down payment) equals the total rent paid. After that point, buying is cheaper on a net basis. In most US markets, break-even falls between 4–8 years.",
                },
              },
              {
                "@type": "Question",
                name: "Does renting mean throwing money away?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. Rent pays for housing and flexibility. Early mortgage payments mostly go to interest, not equity. Buyers also pay property taxes, insurance, and maintenance — costs that don't build equity. The 'throwing money away' framing ignores the full cost of homeownership.",
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
