import Link from "next/link";
import { Calculator, ArrowRight, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-100">
        <Calculator className="h-10 w-10 text-emerald-600" />
      </div>
      <h1 className="mb-3 text-4xl font-extrabold text-gray-900">
        Page Not Found
      </h1>
      <p className="mb-8 max-w-md text-lg text-gray-500">
        Looks like this page doesn&apos;t exist. Try one of our free financial
        calculators below.
      </p>
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
        >
          <Home className="h-5 w-5" />
          Go Home
        </Link>
        <Link
          href="/compound-interest-calculator"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          Try a Calculator
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
