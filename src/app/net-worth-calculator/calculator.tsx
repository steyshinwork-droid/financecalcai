"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DollarSign, Sparkles, Info, Calendar } from "lucide-react";

function formatMoney(n: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

const assetFields = [
  { key: "cash", label: "Cash & Savings" },
  { key: "investments", label: "Investments (Stocks, 401k, IRA)" },
  { key: "realEstate", label: "Real Estate (Home Value)" },
  { key: "vehicles", label: "Vehicles" },
  { key: "otherAssets", label: "Other Assets" },
];

const liabilityFields = [
  { key: "mortgage", label: "Mortgage Balance" },
  { key: "studentLoans", label: "Student Loans" },
  { key: "carLoans", label: "Car Loans" },
  { key: "creditCards", label: "Credit Card Debt" },
  { key: "otherDebts", label: "Other Debts" },
];

// Median net worth by age (US Federal Reserve data approximation)
const benchmarks: Record<number, number> = {
  25: 10400, 30: 35000, 35: 55000, 40: 84000, 45: 135000,
  50: 170000, 55: 215000, 60: 275000, 65: 290000, 70: 280000,
};

function getBenchmark(age: number): number {
  const ages = Object.keys(benchmarks).map(Number).sort((a, b) => a - b);
  if (age <= ages[0]) return benchmarks[ages[0]];
  if (age >= ages[ages.length - 1]) return benchmarks[ages[ages.length - 1]];
  for (let i = 0; i < ages.length - 1; i++) {
    if (age >= ages[i] && age < ages[i + 1]) {
      const ratio = (age - ages[i]) / (ages[i + 1] - ages[i]);
      return benchmarks[ages[i]] + ratio * (benchmarks[ages[i + 1]] - benchmarks[ages[i]]);
    }
  }
  return 100000;
}

export function NetWorthCalc() {
  const [age, setAge] = useState(30);
  const [assets, setAssets] = useState<Record<string, number>>({
    cash: 15000, investments: 30000, realEstate: 0, vehicles: 15000, otherAssets: 5000,
  });
  const [liabilities, setLiabilities] = useState<Record<string, number>>({
    mortgage: 0, studentLoans: 20000, carLoans: 10000, creditCards: 3000, otherDebts: 0,
  });
  const [calculated, setCalculated] = useState(false);

  const results = useMemo(() => {
    const totalAssets = Object.values(assets).reduce((s, v) => s + v, 0);
    const totalLiabilities = Object.values(liabilities).reduce((s, v) => s + v, 0);
    const netWorth = totalAssets - totalLiabilities;
    const benchmark = getBenchmark(age);
    const percentile = netWorth >= benchmark ? "above" : "below";
    return { totalAssets, totalLiabilities, netWorth, benchmark, percentile };
  }, [assets, liabilities, age]);

  const aiInsight = useMemo(() => {
    if (!calculated) return "";
    const insights: string[] = [];
    const { netWorth, benchmark, totalAssets, totalLiabilities } = results;

    if (netWorth >= benchmark * 2) {
      insights.push(`Your net worth of ${formatMoney(netWorth)} is significantly above the median of ${formatMoney(benchmark)} for age ${age}. You're in excellent financial shape!`);
    } else if (netWorth >= benchmark) {
      insights.push(`Your net worth of ${formatMoney(netWorth)} is above the median of ${formatMoney(benchmark)} for age ${age}. You're doing better than most people your age.`);
    } else if (netWorth >= 0) {
      insights.push(`Your net worth of ${formatMoney(netWorth)} is below the median of ${formatMoney(benchmark)} for age ${age}. Focus on paying down debt and increasing savings to catch up.`);
    } else {
      insights.push(`Your net worth is negative (${formatMoney(netWorth)}). This is common for young adults with student loans. Priority: pay off high-interest debt first, then build savings.`);
    }

    const debtToAssetRatio = totalAssets > 0 ? (totalLiabilities / totalAssets) * 100 : 100;
    if (debtToAssetRatio > 50) {
      insights.push(`Your debt-to-asset ratio is ${debtToAssetRatio.toFixed(0)}% — you owe more than half of what you own. Focus on debt reduction.`);
    } else if (debtToAssetRatio > 0) {
      insights.push(`Your debt-to-asset ratio is ${debtToAssetRatio.toFixed(0)}% — this is ${debtToAssetRatio < 30 ? "healthy" : "manageable"}. Keep paying down debt while building assets.`);
    }

    if ((liabilities.creditCards || 0) > 0) {
      insights.push(`Priority: Pay off ${formatMoney(liabilities.creditCards)} in credit card debt first — it likely has 20%+ interest rate, which costs you ${formatMoney(liabilities.creditCards * 0.2)}/year in interest alone.`);
    }

    return insights.join("\n\n");
  }, [calculated, results, age, liabilities]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader><CardTitle className="text-lg">Your Financial Snapshot</CardTitle></CardHeader>
        <CardContent>
          <div className="mb-4 space-y-2">
            <Label className="flex items-center gap-1"><Calendar className="h-4 w-4 text-gray-400" /> Your Age</Label>
            <Input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} min={18} max={90} className="max-w-[200px]" />
          </div>
          <Separator className="my-4" />
          <h3 className="mb-3 font-semibold text-emerald-700">Assets (What You Own)</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {assetFields.map((f) => (
              <div key={f.key} className="space-y-1">
                <Label className="text-sm"><DollarSign className="mr-1 inline h-3 w-3" />{f.label}</Label>
                <Input type="number" value={assets[f.key] || 0} onChange={(e) => setAssets({ ...assets, [f.key]: Number(e.target.value) })} min={0} step={1000} />
              </div>
            ))}
          </div>
          <Separator className="my-4" />
          <h3 className="mb-3 font-semibold text-red-700">Liabilities (What You Owe)</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {liabilityFields.map((f) => (
              <div key={f.key} className="space-y-1">
                <Label className="text-sm"><DollarSign className="mr-1 inline h-3 w-3" />{f.label}</Label>
                <Input type="number" value={liabilities[f.key] || 0} onChange={(e) => setLiabilities({ ...liabilities, [f.key]: Number(e.target.value) })} min={0} step={1000} />
              </div>
            ))}
          </div>
          <Button className="mt-6 w-full bg-teal-600 hover:bg-teal-700" size="lg" onClick={() => setCalculated(true)}>
            Calculate Net Worth
          </Button>
        </CardContent>
      </Card>

      {calculated && (
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            <Card className="border-emerald-200 bg-emerald-50">
              <CardContent className="pt-6">
                <p className="text-sm text-emerald-700">Total Assets</p>
                <p className="text-2xl font-bold text-emerald-800">{formatMoney(results.totalAssets)}</p>
              </CardContent>
            </Card>
            <Card className="border-red-200 bg-red-50">
              <CardContent className="pt-6">
                <p className="text-sm text-red-700">Total Liabilities</p>
                <p className="text-2xl font-bold text-red-800">{formatMoney(results.totalLiabilities)}</p>
              </CardContent>
            </Card>
            <Card className={results.netWorth >= 0 ? "border-blue-200 bg-blue-50" : "border-red-200 bg-red-50"}>
              <CardContent className="pt-6">
                <p className="text-sm">Net Worth</p>
                <p className="text-2xl font-bold">{formatMoney(results.netWorth)}</p>
                <p className="text-xs text-gray-500">Median for age {age}: {formatMoney(results.benchmark)}</p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sparkles className="h-5 w-5 text-purple-600" /> AI Insight
                <Badge variant="secondary" className="bg-purple-100 text-purple-700">Net Worth Analysis</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {aiInsight.split("\n\n").map((p, i) => (<p key={i} className="leading-relaxed text-gray-700">{p}</p>))}
              </div>
              <Separator className="my-4" />
              <p className="flex items-center gap-1 text-xs text-gray-400"><Info className="h-3 w-3" /> Benchmarks based on US Federal Reserve data. Not financial advice.</p>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
