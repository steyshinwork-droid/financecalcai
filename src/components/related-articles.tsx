import Link from "next/link";
import { blogPosts } from "@/lib/blog";

export function RelatedArticles({ calculatorHref }: { calculatorHref: string }) {
  const articles = blogPosts
    .filter((post) => post.relatedCalculator.href === calculatorHref)
    .slice(0, 3);

  if (articles.length === 0) return null;

  return (
    <section className="mt-10">
      <h2 className="mb-4 text-xl font-bold text-gray-900">Related Articles</h2>
      <div className="space-y-3">
        {articles.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 transition hover:border-emerald-400 hover:shadow-sm"
          >
            <div className="flex-1">
              <p className="font-semibold text-gray-900">{post.title}</p>
              <p className="mt-1 text-sm text-gray-500">{post.description}</p>
            </div>
            <span className="shrink-0 text-sm text-emerald-600">Read →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
