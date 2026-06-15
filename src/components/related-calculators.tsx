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
  "credit-card-payoff-calculator": {
    name: "Credit Card Payoff Calculator",
    href: "/credit-card-payoff-calculator",
    description: "See how fast you can pay off your credit card.",
  },
  "loan-comparison-calculator": {
    name: "Loan Comparison Calculator",
    href: "/loan-comparison-calculator",
    description: "Compare two loans side by side.",
  },
  "tip-calculator": {
    name: "Tip Calculator",
    href: "/tip-calculator",
    description: "Calculate tip and split the bill instantly.",
  },
  "salary-calculator": {
    name: "Salary Calculator",
    href: "/salary-calculator",
    description: "Convert salary between hourly, monthly, and annual.",
  },
  "inflation-calculator": {
    name: "Inflation Calculator",
    href: "/inflation-calculator",
    description: "See how inflation erodes purchasing power over time.",
  },
  "loan-calculator": {
    name: "Loan Calculator",
    href: "/loan-calculator",
    description: "Calculate monthly payment and total interest for any loan.",
  },
  "car-affordability-calculator": {
    name: "Car Affordability Calculator",
    href: "/car-affordability-calculator",
    description: "Find out how much car you can truly afford.",
  },
  "rent-vs-buy-calculator": {
    name: "Rent vs. Buy Calculator",
    href: "/rent-vs-buy-calculator",
    description: "See whether renting or buying a home is the smarter financial move.",
  },
  "student-loan-calculator": {
    name: "Student Loan Calculator",
    href: "/student-loan-calculator",
    description: "See how fast you can pay off student loans with extra payments.",
  },
  "home-affordability-calculator": {
    name: "Home Affordability Calculator",
    href: "/home-affordability-calculator",
    description: "See how much house you can afford based on your income and debts.",
  },
  "paycheck-calculator": {
    name: "Paycheck Calculator",
    href: "/paycheck-calculator",
    description: "See your exact take-home pay after taxes and deductions.",
  },
  "dividend-calculator": {
    name: "Dividend Calculator",
    href: "/dividend-calculator",
    description: "Calculate dividend income and DRIP reinvestment growth over time.",
  },
  "social-security-calculator": {
    name: "Social Security Calculator",
    href: "/social-security-calculator",
    description: "Estimate your monthly SS benefit and find the best age to claim.",
  },
  "fire-calculator": {
    name: "FIRE Calculator",
    href: "/fire-calculator",
    description: "Find your FIRE number and see when you can retire early.",
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
  "credit-card-payoff-calculator": ["debt-payoff-calculator", "budget-calculator", "loan-comparison-calculator"],
  "loan-comparison-calculator": ["mortgage-calculator", "credit-card-payoff-calculator", "debt-payoff-calculator"],
  "tip-calculator": ["budget-calculator", "salary-calculator", "loan-comparison-calculator"],
  "salary-calculator": ["budget-calculator", "tax-bracket-calculator", "retirement-calculator"],
  "inflation-calculator": ["compound-interest-calculator", "investment-calculator", "retirement-calculator"],
  "loan-calculator": ["debt-payoff-calculator", "credit-card-payoff-calculator", "loan-comparison-calculator"],
  "car-affordability-calculator": ["loan-calculator", "budget-calculator", "loan-comparison-calculator"],
  "rent-vs-buy-calculator": ["mortgage-calculator", "budget-calculator", "investment-calculator"],
  "student-loan-calculator": ["debt-payoff-calculator", "budget-calculator", "loan-calculator"],
  "home-affordability-calculator": ["mortgage-calculator", "rent-vs-buy-calculator", "budget-calculator"],
  "paycheck-calculator": ["budget-calculator", "tax-bracket-calculator", "salary-calculator"],
  "dividend-calculator": ["investment-calculator", "compound-interest-calculator", "retirement-calculator"],
  "social-security-calculator": ["retirement-calculator", "investment-calculator", "paycheck-calculator"],
  "fire-calculator": ["retirement-calculator", "investment-calculator", "compound-interest-calculator"],
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
