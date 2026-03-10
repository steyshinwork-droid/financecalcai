import Link from "next/link";

const ALL_CALCULATORS: Record<string, { name: string; href: string; description: string }> = {
  "compound-interest-calculator": {
    name: "Compound Interest Calculator",
    href: "/compound-interest-calculator",
    description: "See how your money grows over time.",
  },
  "mortgage-calculator": {
    name: "Mortgage Calculator",
    href: "/mortgage-calculator",
    description: "Calculate your monthly mortgage payment.",
  },
  "budget-calculator": {
    name: "Budget Calculator",
    href: "/budget-calculator",
    description: "Build a budget that actually works.",
  },
  "debt-payoff-calculator": {
    name: "Debt Payoff Calculator",
    href: "/debt-payoff-calculator",
    description: "Find your fastest path to debt-free.",
  },
  "savings-goal-calculator": {
    name: "Savings Goal Calculator",
    href: "/savings-goal-calculator",
    description: "Plan how to reach any savings target.",
  },
  "retirement-calculator": {
    name: "Retirement Calculator",
    href: "/retirement-calculator",
    description: "Know if you're on track for retirement.",
  },
  "investment-calculator": {
    name: "Investment Calculator",
    href: "/investment-calculator",
    description: "Project your investment returns.",
  },
  "net-worth-calculator": {
    name: "Net Worth Calculator",
    href: "/net-worth-calculator",
    description: "Calculate your total financial picture.",
  },
  "emergency-fund-calculator": {
    name: "Emergency Fund Calculator",
    href: "/emergency-fund-calculator",
    description: "Find out how much you need saved.",
  },
  "tax-bracket-calculator": {
    name: "Tax Bracket Calculator",
    href: "/tax-bracket-calculator",
    description: "See your effective tax rate.",
  },
};

const RELATED_MAP: Record<string, string[]> = {
  "compound-interest-calculator": ["investment-calculator", "savings-goal-calculator", "retirement-calculator"],
  "mortgage-calculator": ["budget-calculator", "net-worth-calculator", "savings-goal-calculator"],
  "budget-calculator": ["debt-payoff-calculator", "savings-goal-calculator", "net-worth-calculator"],
  "debt-payoff-calculator": ["budget-calculator", "compound-interest-calculator", "savings-goal-calculator"],
  "savings-goal-calculator": ["compound-interest-calculator", "budget-calculator", "emergency-fund-calculator"],
  "retirement-calculator": ["compound-interest-calculator", "investment-calculator", "tax-bracket-calculator"],
  "investment-calculator": ["compound-interest-calculator", "retirement-calculator", "savings-goal-calculator"],
  "net-worth-calculator": ["budget-calculator", "debt-payoff-calculator", "investment-calculator"],
  "emergency-fund-calculator": ["budget-calculator", "savings-goal-calculator", "debt-payoff-calculator"],
  "tax-bracket-calculator": ["retirement-calculator", "investment-calculator", "budget-calculator"],
};

export function RelatedCalculators({ currentSlug }: { currentSlug: string }) {
  const relatedSlugs = RELATED_MAP[currentSlug] ?? [];
  const related = relatedSlugs.map((slug) => ALL_CALCULATORS[slug]).filter(Boolean);

  if (related.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="mb-4 text-xl font-bold text-gray-900">Related Calculators</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {related.map((calc) => (
          <Link
            key={calc.href}
            href={calc.href}
            className="rounded-xl border border-gray-200 bg-white p-4 transition hover:border-emerald-400 hover:shadow-sm"
          >
            <p className="font-semibold text-gray-900">{calc.name}</p>
            <p className="mt-1 text-sm text-gray-500">{calc.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
