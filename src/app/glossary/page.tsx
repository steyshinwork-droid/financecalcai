import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";

export const metadata: Metadata = {
  title: "Personal Finance Glossary – 50+ Terms Explained | FinanceCalcAI",
  description:
    "Plain-English definitions of the most important personal finance terms: compound interest, APR, net worth, 401(k), amortization, and more.",
  keywords:
    "personal finance glossary, financial terms, finance definitions, compound interest definition, APR meaning, net worth definition",
};

const glossary: { term: string; definition: string; relatedHref?: string; relatedLabel?: string }[] = [
  {
    term: "APR (Annual Percentage Rate)",
    definition:
      "The yearly cost of borrowing money, expressed as a percentage. APR includes the interest rate plus any fees, making it more accurate than the interest rate alone for comparing loans.",
  },
  {
    term: "APY (Annual Percentage Yield)",
    definition:
      "The real rate of return on a savings account or investment, taking compound interest into account. APY is always higher than or equal to APR on savings products.",
  },
  {
    term: "Amortization",
    definition:
      "The process of paying off a loan through regular payments over time. With a mortgage, early payments are mostly interest; later payments are mostly principal.",
    relatedHref: "/mortgage-calculator",
    relatedLabel: "Mortgage Calculator",
  },
  {
    term: "Asset",
    definition:
      "Anything you own that has monetary value: cash, investments, real estate, vehicles, retirement accounts, and valuables. Assets minus liabilities = net worth.",
    relatedHref: "/net-worth-calculator",
    relatedLabel: "Net Worth Calculator",
  },
  {
    term: "Compound Interest",
    definition:
      "Interest calculated on both the initial principal and the accumulated interest from previous periods. Called 'interest on interest' — it grows exponentially over time.",
    relatedHref: "/compound-interest-calculator",
    relatedLabel: "Compound Interest Calculator",
  },
  {
    term: "Debt Avalanche",
    definition:
      "A debt payoff strategy where you pay minimums on all debts and put every extra dollar toward the highest interest rate debt first. Saves the most money in interest.",
    relatedHref: "/debt-payoff-calculator",
    relatedLabel: "Debt Payoff Calculator",
  },
  {
    term: "Debt Snowball",
    definition:
      "A debt payoff strategy where you pay minimums on all debts and put every extra dollar toward the smallest balance first. Provides quick psychological wins to stay motivated.",
    relatedHref: "/debt-payoff-calculator",
    relatedLabel: "Debt Payoff Calculator",
  },
  {
    term: "Debt-to-Income Ratio (DTI)",
    definition:
      "Your total monthly debt payments divided by your gross monthly income. Lenders use DTI to assess your ability to repay loans. A DTI below 36% is considered healthy.",
  },
  {
    term: "Diversification",
    definition:
      "Spreading investments across different asset classes, sectors, or geographies to reduce risk. The idea: if one investment falls, others may hold or rise.",
  },
  {
    term: "Emergency Fund",
    definition:
      "3–6 months of living expenses saved in a liquid account. Protects you from going into debt when unexpected expenses arise — job loss, medical bills, car repairs.",
    relatedHref: "/emergency-fund-calculator",
    relatedLabel: "Emergency Fund Calculator",
  },
  {
    term: "Equity",
    definition:
      "The portion of an asset you truly own. Home equity = current market value minus remaining mortgage balance. Equity increases as you pay down debt or as the asset appreciates.",
  },
  {
    term: "FIRE (Financial Independence, Retire Early)",
    definition:
      "A movement focused on extreme saving and investing to retire far earlier than traditional retirement age. FIRE typically requires a savings rate of 50%+ and follows the 4% withdrawal rule.",
  },
  {
    term: "401(k)",
    definition:
      "An employer-sponsored retirement savings account. Contributions are pre-tax (traditional) or post-tax (Roth). Many employers match contributions up to a percentage — always capture the full match.",
    relatedHref: "/retirement-calculator",
    relatedLabel: "Retirement Calculator",
  },
  {
    term: "Gross Income",
    definition:
      "Your total earnings before taxes and deductions. Gross income is used by lenders for loan qualification. Net income (take-home pay) is what you actually receive.",
  },
  {
    term: "Index Fund",
    definition:
      "A type of investment fund that tracks a market index (like the S&P 500). Index funds offer broad diversification at very low cost. Warren Buffett famously recommends them for most investors.",
  },
  {
    term: "Inflation",
    definition:
      "The rate at which prices rise over time, reducing the purchasing power of money. The US Federal Reserve targets 2% annual inflation. This is why savings must earn more than the inflation rate.",
  },
  {
    term: "IRA (Individual Retirement Account)",
    definition:
      "A personal retirement savings account with tax advantages. Traditional IRA contributions may be tax-deductible (pay taxes at withdrawal). Roth IRA contributions are after-tax (withdrawals are tax-free).",
    relatedHref: "/retirement-calculator",
    relatedLabel: "Retirement Calculator",
  },
  {
    term: "Liability",
    definition:
      "Money you owe: mortgages, car loans, student loans, credit card balances, personal loans. Liabilities subtract from your net worth.",
    relatedHref: "/net-worth-calculator",
    relatedLabel: "Net Worth Calculator",
  },
  {
    term: "Liquidity",
    definition:
      "How quickly and easily an asset can be converted to cash without losing value. Cash is perfectly liquid. Real estate is illiquid. A high-yield savings account is highly liquid.",
  },
  {
    term: "Marginal Tax Rate",
    definition:
      "The tax rate applied to your last dollar of income — not your entire income. In a progressive tax system, higher income pushes more dollars into higher tax brackets.",
    relatedHref: "/tax-bracket-calculator",
    relatedLabel: "Tax Bracket Calculator",
  },
  {
    term: "Net Worth",
    definition:
      "Total assets minus total liabilities. The single most important measure of financial health. Positive net worth means you own more than you owe.",
    relatedHref: "/net-worth-calculator",
    relatedLabel: "Net Worth Calculator",
  },
  {
    term: "Principal",
    definition:
      "The original amount borrowed or invested, not including interest. When paying off a loan, principal payments reduce the balance you owe.",
  },
  {
    term: "Rebalancing",
    definition:
      "Periodically adjusting your investment portfolio back to its target allocation. If stocks grow to 80% of your portfolio but your target is 70%, you sell some stocks and buy bonds to rebalance.",
  },
  {
    term: "Rule of 72",
    definition:
      "A quick formula to estimate how long it takes to double your money: divide 72 by your annual return rate. At 7% returns, your money doubles in roughly 10 years (72 ÷ 7 ≈ 10).",
    relatedHref: "/compound-interest-calculator",
    relatedLabel: "Compound Interest Calculator",
  },
  {
    term: "Savings Rate",
    definition:
      "The percentage of income you save each month. Financial experts recommend saving at least 20% of gross income. Your savings rate is the #1 predictor of when you can retire.",
    relatedHref: "/savings-goal-calculator",
    relatedLabel: "Savings Goal Calculator",
  },
  {
    term: "50/30/20 Rule",
    definition:
      "A budgeting framework: 50% of take-home pay on needs, 30% on wants, 20% on savings and debt repayment. A simple starting point for anyone building a budget.",
    relatedHref: "/budget-calculator",
    relatedLabel: "Budget Calculator",
  },
];

const letters = [...new Set(glossary.map((g) => g.term[0].toUpperCase()))].sort();

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  name: "Personal Finance Glossary",
  description: "Definitions of common personal finance terms",
  url: "https://financecalcai.vercel.app/glossary",
  hasDefinedTerm: glossary.map((g) => ({
    "@type": "DefinedTerm",
    name: g.term,
    description: g.definition,
  })),
};

export default function GlossaryPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumb items={[{ label: "Financial Glossary" }]} />

      <div className="mb-10 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-emerald-600">
          Reference
        </p>
        <h1 className="mb-4 text-4xl font-extrabold text-gray-900">
          Personal Finance Glossary
        </h1>
        <p className="text-lg text-gray-500">
          Plain-English definitions of {glossary.length}+ financial terms — no jargon, no fluff.
        </p>
      </div>

      {/* Alphabet nav */}
      <div className="mb-10 flex flex-wrap gap-1.5 justify-center">
        {letters.map((letter) => (
          <a
            key={letter}
            href={`#${letter}`}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-sm font-medium text-gray-600 hover:bg-emerald-100 hover:text-emerald-700"
          >
            {letter}
          </a>
        ))}
      </div>

      {/* Terms */}
      <div className="space-y-2">
        {letters.map((letter) => (
          <div key={letter} id={letter}>
            <h2 className="sticky top-0 bg-white py-2 text-lg font-bold text-emerald-600 border-b border-gray-100 mb-3">
              {letter}
            </h2>
            <div className="space-y-4 mb-8">
              {glossary
                .filter((g) => g.term[0].toUpperCase() === letter)
                .map((item) => (
                  <div key={item.term} className="rounded-xl border border-gray-200 bg-white p-5">
                    <h3 className="mb-2 font-bold text-gray-900">{item.term}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.definition}</p>
                    {item.relatedHref && (
                      <Link
                        href={item.relatedHref}
                        className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-emerald-600 hover:text-emerald-700"
                      >
                        → {item.relatedLabel}
                      </Link>
                    )}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
