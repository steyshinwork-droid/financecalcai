import type { Metadata } from "next";
import { blogPosts } from "@/lib/blog";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Financial Tips & Guides",
  description:
    "Free personal finance guides: how to pay off debt, compound interest explained, budgeting rules, mortgage advice, and more.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const sorted = [...blogPosts].reverse();

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

      <BlogClient posts={sorted} />
    </div>
  );
}
