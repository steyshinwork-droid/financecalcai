import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPost, getAllSlugs, type BlogPost } from "@/lib/blog";
import { ArrowLeft, Clock, Tag, ArrowRight, Calculator } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

function renderSection(section: BlogPost["content"][0], index: number) {
  switch (section.type) {
    case "intro":
      return (
        <p key={index} className="text-lg leading-relaxed text-gray-700">
          {section.text}
        </p>
      );
    case "h2":
      return (
        <h2 key={index} className="mt-8 text-2xl font-bold text-gray-900">
          {section.text}
        </h2>
      );
    case "h3":
      return (
        <h3 key={index} className="mt-6 text-xl font-semibold text-gray-900">
          {section.text}
        </h3>
      );
    case "p":
      return (
        <p key={index} className="leading-relaxed text-gray-700">
          {section.text}
        </p>
      );
    case "ul":
      return (
        <ul key={index} className="space-y-2 pl-4">
          {section.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-gray-700">
              <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-emerald-500" />
              {item}
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={index} className="space-y-2 pl-4">
          {section.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-700">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
                {i + 1}
              </span>
              {item}
            </li>
          ))}
        </ol>
      );
    case "tip":
      return (
        <div
          key={index}
          className="rounded-lg border border-amber-200 bg-amber-50 p-4"
        >
          <p className="text-sm text-amber-800">
            <span className="font-semibold">💡 </span>
            {section.text}
          </p>
        </div>
      );
    case "cta":
      return (
        <div
          key={index}
          className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center"
        >
          <Calculator className="mx-auto mb-3 h-8 w-8 text-emerald-600" />
          <p className="mb-4 text-gray-700">{section.text}</p>
          <Link
            href={section.ctaHref ?? "/"}
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 font-semibold text-white transition hover:bg-emerald-700"
          >
            {section.ctaText}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      );
    default:
      return null;
  }
}

const categoryColors: Record<string, string> = {
  Debt: "bg-red-100 text-red-700",
  Investing: "bg-emerald-100 text-emerald-700",
  Mortgage: "bg-blue-100 text-blue-700",
  Budgeting: "bg-purple-100 text-purple-700",
  Savings: "bg-amber-100 text-amber-700",
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      {/* Back link */}
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-emerald-600"
      >
        <ArrowLeft className="h-4 w-4" />
        All guides
      </Link>

      {/* Header */}
      <header className="mb-8">
        <div className="mb-4 flex items-center gap-3">
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
        <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl">
          {post.title}
        </h1>
        <p className="text-lg text-gray-500">{post.description}</p>
      </header>

      {/* Content */}
      <div className="space-y-5">
        {post.content.map((section, index) => renderSection(section, index))}
      </div>

      {/* Related calculator footer */}
      <div className="mt-12 border-t pt-8">
        <p className="mb-3 text-sm text-gray-500">Related tool:</p>
        <Link
          href={post.relatedCalculator.href}
          className="inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-white px-4 py-2 text-sm font-medium text-emerald-700 transition hover:bg-emerald-50"
        >
          <Calculator className="h-4 w-4" />
          {post.relatedCalculator.name}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
