import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

// Blog posts that were merged away during deduplication. Their old URLs are
// still linked from Pinterest pins and may sit in Google's index, so point each
// one at the article that absorbed it instead of serving a 404.
const mergedBlogSlugs: Record<string, string> = {
  "50-30-20-budget-rule-explained": "50-30-20-budget-rule",
  "what-is-the-50-30-20-budget-rule": "50-30-20-budget-rule",
  "dollar-cost-averaging-investing-strategy": "what-is-dollar-cost-averaging",
  "high-yield-savings-account-explained": "what-is-a-high-yield-savings-account",
  "how-to-build-1000-emergency-fund-fast": "how-to-build-emergency-fund-fast",
  "how-to-build-an-emergency-fund-fast": "how-to-build-emergency-fund-fast",
  "how-to-build-credit-score-fast": "how-to-build-credit-score",
  "how-to-calculate-compound-interest": "how-compound-interest-works",
  "what-is-compound-interest": "how-compound-interest-works",
  "what-is-compound-interest-and-how-does-it-work": "how-compound-interest-works",
  "what-is-compound-interest-explained": "how-compound-interest-works",
  "what-is-compound-interest-investing": "how-compound-interest-works",
  "how-to-calculate-your-net-worth": "how-to-calculate-net-worth",
  "what-is-net-worth-and-how-to-calculate": "how-to-calculate-net-worth",
  "what-is-net-worth-and-why-it-matters": "what-is-net-worth",
  "how-to-negotiate-a-salary": "how-to-negotiate-salary",
  "how-to-save-for-a-down-payment-on-a-house": "how-to-save-for-a-house-down-payment",
  "how-to-save-for-house-down-payment": "how-to-save-for-a-house-down-payment",
  "hsa-health-savings-account-explained": "what-is-a-health-savings-account-hsa",
  "what-is-hsa-health-savings-account": "what-is-a-health-savings-account-hsa",
  "roth-vs-traditional-ira-comparison": "roth-ira-vs-traditional-ira",
  "traditional-ira-vs-roth-ira": "roth-ira-vs-traditional-ira",
  "what-is-a-401k": "what-is-a-401k-and-how-does-it-work",
  "what-is-a-balance-transfer": "how-to-do-a-balance-transfer",
  "what-is-a-cash-out-refinance": "what-is-cash-out-refinance",
  "what-is-a-good-debt-to-income-ratio": "debt-to-income-ratio",
  "what-is-debt-to-income-ratio": "debt-to-income-ratio",
  "what-is-good-debt-vs-bad-debt": "good-debt-vs-bad-debt",
  "what-is-home-equity-line-of-credit": "what-is-a-heloc",
  "what-is-home-equity-loan": "what-is-a-heloc",
  "what-is-pmi-and-how-to-avoid-it": "what-is-pmi-and-when-can-you-remove-it",
  "what-is-pmi-mortgage": "what-is-pmi-and-when-can-you-remove-it",
  "what-is-private-mortgage-insurance-pmi": "what-is-pmi-and-when-can-you-remove-it",
  "zero-based-budgeting-explained": "zero-based-budgeting",
};

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      // The Vercel deployment domain serves the whole site as a duplicate and is
      // still the destination of every Pinterest pin. Send it to the canonical host.
      {
        source: "/:path*",
        has: [{ type: "host", value: "financecalcai.vercel.app" }],
        destination: "https://www.financecalcai.com/:path*",
        permanent: true,
      },
      ...Object.entries(mergedBlogSlugs).map(([from, to]) => ({
        source: `/blog/${from}`,
        destination: `/blog/${to}`,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
