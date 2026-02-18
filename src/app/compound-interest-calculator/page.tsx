import type { Metadata } from "next";
import { CompoundInterestCalc } from "./calculator";

export const metadata: Metadata = {
  title: "Compound Interest Calculator - Free AI-Powered | FinanceCalcAI",
  description:
    "Calculate compound interest with AI-powered insights. See how your money grows over time with personalized advice and beautiful charts. Free, no signup required.",
  keywords:
    "compound interest calculator, compound interest, investment calculator, savings calculator, interest rate calculator",
};

export default function CompoundInterestPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8">
        <h1 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">
          Compound Interest Calculator
        </h1>
        <p className="text-lg text-gray-600">
          See how your money grows with compound interest. Our AI explains the
          results and gives personalized tips.
        </p>
      </div>

      <CompoundInterestCalc />

      {/* SEO Content */}
      <section className="mt-16 space-y-8">
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            What is Compound Interest?
          </h2>
          <p className="text-gray-600">
            Compound interest is interest calculated on both the initial
            principal and the accumulated interest from previous periods. It's
            often called &quot;interest on interest&quot; and is one of the most
            powerful forces in finance. Albert Einstein reportedly called it the
            &quot;eighth wonder of the world.&quot;
          </p>
        </div>
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            How Does Compound Interest Work?
          </h2>
          <p className="text-gray-600">
            When you invest or save money, you earn interest on your initial
            deposit. With compound interest, you then earn interest on both your
            original deposit AND the interest you've already earned. Over time,
            this creates exponential growth — your money starts growing faster
            and faster.
          </p>
        </div>
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            The Compound Interest Formula
          </h2>
          <p className="mb-2 text-gray-600">
            A = P(1 + r/n)^(nt)
          </p>
          <ul className="list-inside list-disc space-y-1 text-gray-600">
            <li><strong>A</strong> = Final amount</li>
            <li><strong>P</strong> = Principal (initial investment)</li>
            <li><strong>r</strong> = Annual interest rate (decimal)</li>
            <li><strong>n</strong> = Number of times interest compounds per year</li>
            <li><strong>t</strong> = Number of years</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
