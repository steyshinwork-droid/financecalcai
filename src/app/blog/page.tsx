import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/lib/blog";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Financial Tips & Guides",
  description:
    "Free personal finance guides: how to pay off debt, compound interest explained, budgeting rules, mortgage advice, and more.",
};

const categoryColors: Record<string, string> = {
  Debt: "bg-red-100 text-red-700",
  Investing: "bg-emerald-100 text-emerald-700",
  Mortgage: "bg-blue-100 text-blue-700",
  Budgeting: "bg-purple-100 text-purple-700",
  Savings: "bg-amber-100 text-amber-700",
};

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-12 text-center">
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

      <div className="space-y-6">
        {blogPosts.map((post) => (
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
