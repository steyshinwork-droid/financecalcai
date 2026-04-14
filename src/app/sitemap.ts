import type { MetadataRoute } from "next";
import { getAllSlugs, blogPosts } from "@/lib/blog";

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
    "/credit-card-payoff-calculator",
    "/loan-comparison-calculator",
  ];

  const blogSlugs = getAllSlugs();

  // Build a map of slug -> date for blog posts
  const blogDateMap = new Map(blogPosts.map((p) => [p.slug, p.date]));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/glossary`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...calculators.map((path) => ({
      url: `${BASE_URL}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...blogSlugs.map((slug) => ({
      url: `${BASE_URL}/blog/${slug}`,
      lastModified: new Date(blogDateMap.get(slug) ?? "2025-02-10"),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
