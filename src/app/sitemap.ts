import type { MetadataRoute } from "next";

const BASE_URL = "https://financecalcai.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const calculators = [
    "/compound-interest-calculator",
    "/mortgage-calculator",
    "/budget-calculator",
    "/debt-payoff-calculator",
    "/savings-goal-calculator",
    "/retirement-calculator",
    "/investment-calculator",
    "/net-worth-calculator",
    "/emergency-fund-calculator",
    "/tax-bracket-calculator",
  ];

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...calculators.map((path) => ({
      url: `${BASE_URL}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
