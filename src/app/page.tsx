import Link from "next/link";
import {
  TrendingUp,
  Home,
  Wallet,
  CreditCard,
  PiggyBank,
  Calculator,
  Sparkles,
  ArrowRight,
  Zap,
  Brain,
  Eye,
  Clock,
  BarChart3,
  Scale,
  Shield,
  Receipt,
  BookOpen,
  Tag,
  BadgePercent,
  ArrowLeftRight,
} from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { blogPosts } from "@/lib/blog";

const calculators = [
  {
    title: "Compound Interest Calculator",
    description:
      "See how your money grows over time with the power of compound interest. AI explains the best strategy for you.",
    href: "/compound-interest-calculator",
    icon: TrendingUp,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    badge: "Popular",
  },
  {
    title: "Mortgage Calculator",
    description:
      "Calculate your monthly mortgage payment and get AI advice on whether you can afford it.",
    href: "/mortgage-calculator",
    icon: Home,
    color: "text-blue-600",
    bg: "bg-blue-50",
    badge: "Popular",
  },
  {
    title: "Budget Calculator",
    description:
      "Plan your monthly budget with AI that finds where you can save money.",
    href: "/budget-calculator",
    icon: Wallet,
    color: "text-purple-600",
    bg: "bg-purple-50",
    badge: null,
  },
  {
    title: "Debt Payoff Calculator",
    description:
      "Find the fastest way to pay off your debts. AI compares snowball vs avalanche methods.",
    href: "/debt-payoff-calculator",
    icon: CreditCard,
    color: "text-red-600",
    bg: "bg-red-50",
    badge: null,
  },
  {
    title: "Savings Goal Calculator",
    description:
      "Set a savings goal and get a personalized plan. AI tells you exactly how much to save each month.",
    href: "/savings-goal-calculator",
    icon: PiggyBank,
    color: "text-amber-600",
    bg: "bg-amber-50",
    badge: null,
  },
  {
    title: "Retirement Calculator",
    description:
      "Plan your retirement with confidence. AI shows if you're on track and how to optimize your savings.",
    href: "/retirement-calculator",
    icon: Clock,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    badge: "New",
  },
  {
    title: "Investment Return Calculator",
    description:
      "Calculate potential returns on stocks, ETFs, and more. AI compares strategies and risk levels.",
    href: "/investment-calculator",
    icon: BarChart3,
    color: "text-cyan-600",
    bg: "bg-cyan-50",
    badge: "New",
  },
  {
    title: "Net Worth Calculator",
    description:
      "Track your total assets vs liabilities. AI gives you a financial health score and tips to improve.",
    href: "/net-worth-calculator",
    icon: Scale,
    color: "text-teal-600",
    bg: "bg-teal-50",
    badge: null,
  },
  {
    title: "Emergency Fund Calculator",
    description:
      "Find out how much you need in your emergency fund. AI personalizes it based on your situation.",
    href: "/emergency-fund-calculator",
    icon: Shield,
    color: "text-orange-600",
    bg: "bg-orange-50",
    badge: null,
  },
  {
    title: "Tax Bracket Calculator",
    description:
      "See which tax bracket you're in and your effective rate. AI explains how marginal taxes actually work.",
    href: "/tax-bracket-calculator",
    icon: Receipt,
    color: "text-rose-600",
    bg: "bg-rose-50",
    badge: null,
  },
  {
    title: "Credit Card Payoff Calculator",
    description:
      "See exactly when you'll be debt-free and how much interest you'll pay. Compare your plan vs. minimum payments.",
    href: "/credit-card-payoff-calculator",
    icon: BadgePercent,
    color: "text-pink-600",
    bg: "bg-pink-50",
    badge: "New",
  },
  {
    title: "Loan Comparison Calculator",
    description:
      "Compare two loan offers side by side. AI tells you which one saves more money in the long run.",
    href: "/loan-comparison-calculator",
    icon: ArrowLeftRight,
    color: "text-violet-600",
    bg: "bg-violet-50",
    badge: "New",
  },
];

const features = [
  {
    icon: Brain,
    title: "AI-Powered Insights",
    description:
      "Not just numbers — get personalized explanations and advice in plain English.",
  },
  {
    icon: Zap,
    title: "Instant Results",
    description:
      "Lightning-fast calculations with beautiful charts and visualizations.",
  },
  {
    icon: Eye,
    title: "Clean Interface",
    description:
      "Distraction-free design built for clarity. No pop-ups, no clutter — just the tools you need.",
  },
];

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "FinanceCalcAI",
  url: "https://financecalcai.vercel.app",
  description:
    "Free AI-powered financial calculators with personalized insights.",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://financecalcai.vercel.app/?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "FinanceCalcAI",
  url: "https://financecalcai.vercel.app",
  description:
    "Free AI-powered financial calculators to help you make smarter money decisions.",
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50 to-white px-4 pb-16 pt-20">
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-4">
            <Sparkles className="mr-1 h-3 w-3" /> Powered by AI
          </Badge>
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Financial Calculators
            <br />
            <span className="text-emerald-600">That Actually Help</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
            Free calculators with AI-powered insights. Get personalized advice,
            &quot;what if&quot; scenarios, and plain-English explanations — not
            just numbers.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/compound-interest-calculator"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
            >
              <Calculator className="h-5 w-5" />
              Try a Calculator
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#calculators"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              See All Calculators
            </Link>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="border-b px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-2 text-center text-sm font-semibold uppercase tracking-wider text-emerald-600">
            Why FinanceCalcAI
          </h2>
          <p className="mb-12 text-center text-2xl font-bold text-gray-900">
            More than just a calculator
          </p>
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculators List */}
      <section id="calculators" className="px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-2 text-center text-sm font-semibold uppercase tracking-wider text-emerald-600">
            Free Tools
          </h2>
          <p className="mb-12 text-center text-2xl font-bold text-gray-900">
            Choose a Calculator
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {calculators.map((calc) => (
              <Link key={calc.href} href={calc.href} className="group">
                <Card className="h-full transition group-hover:border-emerald-200 group-hover:shadow-lg">
                  <CardHeader>
                    <div className="mb-3 flex items-center justify-between">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg ${calc.bg}`}
                      >
                        <calc.icon className={`h-5 w-5 ${calc.color}`} />
                      </div>
                      {calc.badge && (
                        <Badge variant="secondary" className="text-xs">
                          {calc.badge}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg group-hover:text-emerald-600">
                      {calc.title}
                    </CardTitle>
                    <CardDescription>{calc.description}</CardDescription>
                    <div className="mt-3 flex items-center text-sm font-medium text-emerald-600 opacity-0 transition group-hover:opacity-100">
                      Calculate now <ArrowRight className="ml-1 h-4 w-4" />
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles Section */}
      <section className="border-t px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 flex items-center justify-between">
            <div>
              <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-emerald-600">
                Free Guides
              </p>
              <h2 className="text-2xl font-bold text-gray-900">
                Latest Financial Tips
              </h2>
            </div>
            <Link
              href="/blog"
              className="flex items-center gap-1 text-sm font-medium text-emerald-600 hover:text-emerald-700"
            >
              View all {blogPosts.length} guides <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {blogPosts.slice(0, 3).map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                <article className="h-full rounded-xl border border-gray-200 bg-white p-5 transition hover:border-emerald-200 hover:shadow-md">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                      <Tag className="h-3 w-3" />
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="mb-2 font-bold text-gray-900 group-hover:text-emerald-600">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{post.description}</p>
                  <div className="mt-3 flex items-center gap-1 text-sm font-medium text-emerald-600">
                    <BookOpen className="h-4 w-4" /> Read guide
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-emerald-600 px-4 py-16 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold">
            Stop Guessing. Start Calculating.
          </h2>
          <p className="mb-8 text-lg text-emerald-100">
            Our AI doesn&apos;t just crunch numbers — it explains what they mean
            for YOUR situation.
          </p>
          <Link
            href="/compound-interest-calculator"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-emerald-600 transition hover:bg-emerald-50"
          >
            <Calculator className="h-5 w-5" />
            Try Your First Calculator
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
