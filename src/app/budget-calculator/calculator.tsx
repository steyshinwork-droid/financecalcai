"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Wallet,
  DollarSign,
  Sparkles,
  Info,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

function useNumInput(initial: number) {
  const [str, setStr] = useState(String(initial));
  return [str, setStr, parseFloat(str) || 0] as const;
}

function formatMoney(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

interface ExpenseCategory {
  label: string;
  key: string;
  type: "need" | "want";
  placeholder: string;
}

const categories: ExpenseCategory[] = [
  { label: "Housing (Rent/Mortgage)", key: "housing", type: "need", placeholder: "1500" },
  { label: "Utilities (Electric, Water, Internet)", key: "utilities", type: "need", placeholder: "200" },
  { label: "Groceries", key: "groceries", type: "need", placeholder: "400" },
  { label: "Transportation (Car, Gas, Transit)", key: "transport", type: "need", placeholder: "300" },
  { label: "Insurance (Health, Car)", key: "insurance", type: "need", placeholder: "200" },
  { label: "Dining Out & Takeout", key: "dining", type: "want", placeholder: "200" },
  { label: "Entertainment & Subscriptions", key: "entertainment", type: "want", placeholder: "100" },
  { label: "Shopping & Personal", key: "shopping", type: "want", placeholder: "150" },
  { label: "Savings & Investments", key: "savings", type: "need", placeholder: "500" },
  { label: "Debt Payments", key: "debt", type: "need", placeholder: "200" },
];

function parseExp(v: string): number {
  return parseFloat(v) || 0;
}

export function BudgetCalc() {
  const [incomeStr, setIncome, income] = useNumInput(5000);
  const [expenses, setExpenses] = useState<Record<string, string>>({
    housing: "1500",
    utilities: "200",
    groceries: "400",
    transport: "300",
    insurance: "200",
    dining: "200",
    entertainment: "100",
    shopping: "150",
    savings: "500",
    debt: "200",
  });
  const [calculated, setCalculated] = useState(false);

  const numericExpenses = useMemo(() => {
    const result: Record<string, number> = {};
    for (const key of Object.keys(expenses)) {
      result[key] = parseExp(expenses[key]);
    }
    return result;
  }, [expenses]);

  const results = useMemo(() => {
    const totalNeeds = categories
      .filter((c) => c.type === "need")
      .reduce((sum, c) => sum + (numericExpenses[c.key] || 0), 0);
    const totalWants = categories
      .filter((c) => c.type === "want")
      .reduce((sum, c) => sum + (numericExpenses[c.key] || 0), 0);
    const totalExpenses = totalNeeds + totalWants;
    const remaining = income - totalExpenses;

    const needsPercent = income > 0 ? (totalNeeds / income) * 100 : 0;
    const wantsPercent = income > 0 ? (totalWants / income) * 100 : 0;
    const savingsPercent = income > 0 ? ((numericExpenses.savings || 0) / income) * 100 : 0;

    const chartData = categories.map((c) => ({
      name: c.label.split("(")[0].trim(),
      amount: numericExpenses[c.key] || 0,
      type: c.type,
    }));

    return {
      totalNeeds,
      totalWants,
      totalExpenses,
      remaining,
      needsPercent,
      wantsPercent,
      savingsPercent,
      chartData,
    };
  }, [incomeStr, expenses]);

  const aiInsight = useMemo(() => {
    if (!calculated) return "";
    const insights: string[] = [];

    // 50/30/20 check
    if (results.needsPercent <= 50) {
      insights.push(
        `Your needs are ${results.needsPercent.toFixed(0)}% of income — within the recommended 50%. Nice job keeping essential costs under control!`
      );
    } else {
      insights.push(
        `Your needs consume ${results.needsPercent.toFixed(0)}% of income — above the recommended 50%. Your housing alone is ${(((numericExpenses.housing || 0) / income) * 100).toFixed(0)}% of income. ${(numericExpenses.housing || 0) / income > 0.3 ? "Consider finding cheaper housing or getting a roommate to reduce this." : ""}`
      );
    }

    if (results.wantsPercent <= 30) {
      insights.push(
        `Wants spending at ${results.wantsPercent.toFixed(0)}% is within the 30% guideline. You have a healthy balance between enjoying life and being responsible.`
      );
    } else {
      insights.push(
        `Wants spending at ${results.wantsPercent.toFixed(0)}% exceeds the 30% guideline. Look at dining out (${formatMoney(numericExpenses.dining || 0)}) and shopping (${formatMoney(numericExpenses.shopping || 0)}) — small reductions here add up fast.`
      );
    }

    if (results.savingsPercent >= 20) {
      insights.push(
        `Excellent — you're saving ${results.savingsPercent.toFixed(0)}% of income! This meets the 20% savings goal. At this rate, you'll have a solid emergency fund and retirement savings.`
      );
    } else if (results.savingsPercent >= 10) {
      insights.push(
        `You're saving ${results.savingsPercent.toFixed(0)}% of income — good, but below the 20% target. Try to increase by ${formatMoney(income * 0.2 - (numericExpenses.savings || 0))}/month to reach the goal.`
      );
    } else {
      insights.push(
        `You're only saving ${results.savingsPercent.toFixed(0)}% of income. The target is 20% (${formatMoney(income * 0.2)}/month). Start with automating even ${formatMoney(50)}/month — building the habit matters more than the amount.`
      );
    }

    if (results.remaining < 0) {
      insights.push(
        `You're spending ${formatMoney(Math.abs(results.remaining))} more than you earn! This is unsustainable. Cut wants first, then look at reducing needs.`
      );
    } else if (results.remaining > 0) {
      insights.push(
        `You have ${formatMoney(results.remaining)} unallocated. Consider putting this toward savings, investments, or extra debt payments.`
      );
    }

    return insights.join("\n\n");
  }, [calculated, results, incomeStr, expenses]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Wallet className="h-5 w-5 text-purple-600" />
            Your Monthly Budget
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 space-y-2">
            <Label htmlFor="income" className="flex items-center gap-1 text-base font-semibold">
              <DollarSign className="h-4 w-4 text-gray-400" />
              Monthly After-Tax Income
            </Label>
            <Input
              id="income"
              type="text"
              inputMode="numeric"
              value={incomeStr}
              onChange={(e) => setIncome(e.target.value)}
              onFocus={(e) => e.target.select()}
              className="text-lg"
            />
          </div>

          <Separator className="my-6" />

          <h3 className="mb-4 font-semibold text-gray-700">Monthly Expenses</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {categories.map((cat) => (
              <div key={cat.key} className="space-y-1">
                <Label htmlFor={cat.key} className="text-sm">
                  <Badge
                    variant="secondary"
                    className={`mr-1 text-xs ${cat.type === "need" ? "bg-blue-100 text-blue-700" : "bg-orange-100 text-orange-700"}`}
                  >
                    {cat.type === "need" ? "Need" : "Want"}
                  </Badge>
                  {cat.label}
                </Label>
                <Input
                  id={cat.key}
                  type="text"
                  inputMode="numeric"
                  value={expenses[cat.key] ?? "0"}
                  onChange={(e) =>
                    setExpenses({ ...expenses, [cat.key]: e.target.value })
                  }
                  onFocus={(e) => e.target.select()}
                />
              </div>
            ))}
          </div>
          <Button
            className="mt-6 w-full bg-purple-600 hover:bg-purple-700"
            size="lg"
            onClick={() => setCalculated(true)}
          >
            Analyze My Budget
          </Button>
        </CardContent>
      </Card>

      {calculated && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-500">Needs (target: 50%)</p>
                <p className="text-2xl font-bold text-gray-900">
                  {results.needsPercent.toFixed(0)}%
                </p>
                <p className="text-sm text-gray-400">
                  {formatMoney(results.totalNeeds)}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-500">Wants (target: 30%)</p>
                <p className="text-2xl font-bold text-gray-900">
                  {results.wantsPercent.toFixed(0)}%
                </p>
                <p className="text-sm text-gray-400">
                  {formatMoney(results.totalWants)}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-500">Savings (target: 20%)</p>
                <p className="text-2xl font-bold text-gray-900">
                  {results.savingsPercent.toFixed(0)}%
                </p>
                <p className="text-sm text-gray-400">
                  {formatMoney(numericExpenses.savings || 0)}
                </p>
              </CardContent>
            </Card>
            <Card
              className={
                results.remaining >= 0
                  ? "border-emerald-200 bg-emerald-50"
                  : "border-red-200 bg-red-50"
              }
            >
              <CardContent className="pt-6">
                <p
                  className={`flex items-center gap-1 text-sm ${results.remaining >= 0 ? "text-emerald-700" : "text-red-700"}`}
                >
                  {results.remaining >= 0 ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <AlertTriangle className="h-4 w-4" />
                  )}
                  {results.remaining >= 0 ? "Remaining" : "Over Budget"}
                </p>
                <p
                  className={`text-2xl font-bold ${results.remaining >= 0 ? "text-emerald-800" : "text-red-800"}`}
                >
                  {formatMoney(Math.abs(results.remaining))}
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Expense Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={results.chartData} layout="vertical">
                    <XAxis
                      type="number"
                      tick={{ fontSize: 12 }}
                      tickFormatter={(v) => `$${v}`}
                    />
                    <YAxis
                      type="category"
                      dataKey="name"
                      tick={{ fontSize: 11 }}
                      width={120}
                    />
                    <Tooltip
                      formatter={(value) => formatMoney(Number(value))}
                    />
                    <Bar dataKey="amount" name="Amount" radius={[0, 4, 4, 0]}>
                      {results.chartData.map((entry, idx) => (
                        <Cell
                          key={idx}
                          fill={entry.type === "need" ? "#3b82f6" : "#f97316"}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sparkles className="h-5 w-5 text-purple-600" />
                AI Insight
                <Badge
                  variant="secondary"
                  className="bg-purple-100 text-purple-700"
                >
                  Budget Analysis
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {aiInsight.split("\n\n").map((paragraph, i) => (
                  <p key={i} className="leading-relaxed text-gray-700">
                    {paragraph}
                  </p>
                ))}
              </div>
              <Separator className="my-4" />
              <p className="flex items-center gap-1 text-xs text-gray-400">
                <Info className="h-3 w-3" />
                Based on the 50/30/20 budgeting rule. Not financial advice.
              </p>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
