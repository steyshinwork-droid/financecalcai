"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Clock, Tag, Search, X } from "lucide-react";
import type { BlogPost } from "@/lib/blog";

const categoryColors: Record<string, string> = {
  Debt: "bg-red-100 text-red-700",
  Investing: "bg-emerald-100 text-emerald-700",
  Mortgage: "bg-blue-100 text-blue-700",
  Budgeting: "bg-purple-100 text-purple-700",
  Savings: "bg-amber-100 text-amber-700",
  Taxes: "bg-orange-100 text-orange-700",
  Credit: "bg-pink-100 text-pink-700",
  Retirement: "bg-indigo-100 text-indigo-700",
  "Personal Finance": "bg-teal-100 text-teal-700",
  "Net Worth": "bg-cyan-100 text-cyan-700",
  Insurance: "bg-sky-100 text-sky-700",
  "Real Estate": "bg-lime-100 text-lime-700",
  Income: "bg-violet-100 text-violet-700",
  Career: "bg-violet-100 text-violet-700",
  "Financial Planning": "bg-teal-100 text-teal-700",
  "Estate Planning": "bg-teal-100 text-teal-700",
  Planning: "bg-teal-100 text-teal-700",
  Loans: "bg-blue-100 text-blue-700",
};

const CATEGORIES = [
  "All",
  "Investing",
  "Budgeting",
  "Savings",
  "Debt",
  "Retirement",
  "Mortgage",
  "Taxes",
  "Credit",
  "Insurance",
  "Personal Finance",
  "Net Worth",
  "Loans",
];

export default function BlogClient({ posts }: { posts: BlogPost[] }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      const matchCategory = activeCategory === "All" || p.category === activeCategory;
      if (!matchCategory) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    });
  }, [posts, query, activeCategory]);

  return (
    <>
      {/* Search box */}
      <div className="relative mb-6 mx-auto max-w-xl">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles…"
          className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-9 pr-9 text-sm text-gray-800 shadow-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Category filter */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              activeCategory === cat
                ? "bg-emerald-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {cat}
            {cat === "All" && (
              <span className="ml-1.5 text-xs opacity-70">{posts.length}</span>
            )}
          </button>
        ))}
      </div>

      {/* Results count when searching */}
      {query && (
        <p className="mb-4 text-center text-sm text-gray-500">
          {filtered.length === 0
            ? "No articles found"
            : `${filtered.length} article${filtered.length === 1 ? "" : "s"} found`}
        </p>
      )}

      {/* Article list */}
      <div className="space-y-6">
        {filtered.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
            <article className="rounded-xl border border-gray-200 bg-white p-6 transition hover:border-emerald-200 hover:shadow-md">
              <div className="mb-3 flex items-center gap-3">
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    categoryColors[post.category] ?? "bg-gray-100 text-gray-700"
                  }`}
                >
                  <Tag className="h-3 w-3" />
                  {post.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  <Clock className="h-3 w-3" />
                  {post.readTime}
                </span>
              </div>
              <h2 className="mb-2 text-xl font-bold text-gray-900 group-hover:text-emerald-600">
                {post.title}
              </h2>
              <p className="mb-4 text-gray-500">{post.description}</p>
              <div className="flex items-center gap-1 text-sm font-medium text-emerald-600">
                Read guide <ArrowRight className="h-4 w-4" />
              </div>
            </article>
          </Link>
        ))}
      </div>
    </>
  );
}
