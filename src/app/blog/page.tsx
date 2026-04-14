import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/lib/blog";
import { ArrowRight, Clock, Tag } from "lucide-react";

export const metadata: Metadata = {
  title: "Financial Tips & Guides",
  description:
    "Free personal finance guides: how to pay off debt, compound interest explained, budgeting rules, mortgage advice, and more.",
  alternates: { canonical: "/blog" },
};

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
};

const categories = ["All", "Savings", "Debt", "Investing", "Budgeting", "Mortgage", "Taxes", "Credit", "Retirement", "Personal Finance", "Net Worth"];

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const activeCategory = category ?? "All";
  const filtered =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-10 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-emerald-600">
          Free Guides
        </p>
        <h1 className="mb-4 text-4xl font-extrabold text-gray-900">
          Personal Finance Tips
        </h1>
        <p className="text-lg text-gray-500">
          Practical guides to help you budget smarter, invest better, and reach
          financial freedom.
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <Link
            key={cat}
            href={cat === "All" ? "/blog" : `/blog?category=${cat}`}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              activeCategory === cat
                ? "bg-emerald-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {cat}
            {cat === "All" && (
              <span className="ml-1.5 text-xs opacity-70">{blogPosts.length}</span>
            )}
          </Link>
        ))}
      </div>

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
    </div>
  );
}
