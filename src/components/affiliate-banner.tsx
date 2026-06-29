import Link from "next/link";
import { ExternalLink } from "lucide-react";

interface AffiliateBannerProps {
  variant?: "savings" | "investing" | "debt" | "general" | "mortgage" | "retirement" | "student";
}

const banners = {
  savings: {
    label: "Recommended",
    title: "Earn Up to 4.50% APY — No Fees, FDIC Insured",
    description:
      "Open a high-yield savings account at Ally Bank. No minimum balance, no monthly fees, and earn 10x the national average interest rate on your savings.",
    cta: "Open Free Account",
    href: "https://www.ally.com/bank/online-savings-account/",
    bg: "bg-amber-50 border-amber-200",
    labelColor: "bg-amber-100 text-amber-800",
    ctaColor: "bg-amber-600 hover:bg-amber-700",
  },
  investing: {
    label: "Recommended",
    title: "Invest Automatically — Start With Just $5",
    description:
      "Acorns rounds up your everyday purchases and invests the spare change. Build wealth on autopilot with expert-built portfolios matched to your goals.",
    cta: "Start Investing Free",
    href: "https://www.acorns.com/",
    bg: "bg-emerald-50 border-emerald-200",
    labelColor: "bg-emerald-100 text-emerald-800",
    ctaColor: "bg-emerald-600 hover:bg-emerald-700",
  },
  debt: {
    label: "Recommended",
    title: "Compare Personal Loan Rates in 2 Minutes",
    description:
      "LendingTree lets you compare offers from multiple lenders at once. Find the lowest interest rate without hurting your credit score.",
    cta: "Compare Rates Free",
    href: "https://www.lendingtree.com/personal-loans/",
    bg: "bg-blue-50 border-blue-200",
    labelColor: "bg-blue-100 text-blue-800",
    ctaColor: "bg-blue-600 hover:bg-blue-700",
  },
  mortgage: {
    label: "Recommended",
    title: "Compare Mortgage Rates From 10+ Lenders",
    description:
      "See current mortgage rates from multiple lenders in minutes. No commitment, no hard credit pull. Compare offers and find the best rate for your home loan.",
    cta: "Compare Mortgage Rates",
    href: "https://www.lendingtree.com/home/mortgage/",
    bg: "bg-sky-50 border-sky-200",
    labelColor: "bg-sky-100 text-sky-800",
    ctaColor: "bg-sky-600 hover:bg-sky-700",
  },
  retirement: {
    label: "Recommended",
    title: "Track All Your Investments in One Place — Free",
    description:
      "Empower (formerly Personal Capital) connects all your accounts and shows your full financial picture. Net worth, investment performance, and retirement forecast — 100% free.",
    cta: "Try Empower Free",
    href: "https://www.empower.com/",
    bg: "bg-violet-50 border-violet-200",
    labelColor: "bg-violet-100 text-violet-800",
    ctaColor: "bg-violet-600 hover:bg-violet-700",
  },
  student: {
    label: "Recommended",
    title: "Refinance Student Loans — Save Thousands",
    description:
      "SoFi can lower your interest rate and monthly payment. Check your new rate in 2 minutes with no impact to your credit score. No fees, ever.",
    cta: "Check Your Rate Free",
    href: "https://www.sofi.com/refinance-student-loan/",
    bg: "bg-indigo-50 border-indigo-200",
    labelColor: "bg-indigo-100 text-indigo-800",
    ctaColor: "bg-indigo-600 hover:bg-indigo-700",
  },
  general: {
    label: "Sponsored",
    title: "Send Money Worldwide in Minutes",
    description:
      "Transfer funds to 200+ countries with Western Union. Competitive rates, multiple payout options — bank account, cash pickup, or mobile wallet.",
    cta: "Send Money Now",
    href: "https://kdbov.com/g/kryb7glvg7b0a3ffeae4a82f40b179/",
    bg: "bg-purple-50 border-purple-200",
    labelColor: "bg-purple-100 text-purple-800",
    ctaColor: "bg-purple-600 hover:bg-purple-700",
  },
};

export function AffiliateBanner({ variant = "general" }: AffiliateBannerProps) {
  const b = banners[variant];
  return (
    <div className={`rounded-xl border p-5 ${b.bg}`}>
      <div className="mb-3 flex items-center gap-2">
        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${b.labelColor}`}>
          {b.label}
        </span>
        <span className="text-xs text-gray-400">Affiliate disclosure</span>
      </div>
      <p className="mb-1 font-bold text-gray-900">{b.title}</p>
      <p className="mb-4 text-sm text-gray-600">{b.description}</p>
      <Link
        href={b.href}
        target="_blank"
        rel="nofollow noopener"
        className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white transition ${b.ctaColor}`}
      >
        {b.cta}
        <ExternalLink className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}
