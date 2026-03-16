import Link from "next/link";
import { ExternalLink } from "lucide-react";

interface AffiliateBannerProps {
  variant?: "savings" | "investing" | "debt" | "general";
}

const banners = {
  savings: {
    label: "Recommended",
    title: "Earn Up to 5.00% APY on Your Savings",
    description:
      "Open a high-yield savings account and put your emergency fund to work. No fees, FDIC insured, instant access.",
    cta: "Compare Top HYSAs",
    href: "https://financecalcai.vercel.app/blog/what-is-high-yield-savings-account",
    bg: "bg-amber-50 border-amber-200",
    labelColor: "bg-amber-100 text-amber-800",
    ctaColor: "bg-amber-600 hover:bg-amber-700",
  },
  investing: {
    label: "Sponsored",
    title: "Start Investing With as Little as $1",
    description:
      "Beginner-friendly investment platform. Build a diversified portfolio of ETFs automatically, with zero commissions.",
    cta: "Start Investing Free",
    href: "https://financecalcai.vercel.app/blog/how-to-start-investing-1000",
    bg: "bg-emerald-50 border-emerald-200",
    labelColor: "bg-emerald-100 text-emerald-800",
    ctaColor: "bg-emerald-600 hover:bg-emerald-700",
  },
  debt: {
    label: "Recommended",
    title: "Lower Your Interest Rate With a Balance Transfer",
    description:
      "Move high-interest credit card debt to a 0% APR card. Stop paying interest and pay down principal faster.",
    cta: "Compare Balance Transfer Cards",
    href: "https://financecalcai.vercel.app/blog/how-to-get-out-of-credit-card-debt",
    bg: "bg-blue-50 border-blue-200",
    labelColor: "bg-blue-100 text-blue-800",
    ctaColor: "bg-blue-600 hover:bg-blue-700",
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
