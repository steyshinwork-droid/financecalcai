"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DollarSign, Percent, Calendar, Sparkles, Info, BarChart2 } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

function useNumInput(initial: number) {
  const [str, setStr] = useState(String(initial));
  return [str, setStr, parseFloat(str) || 0] as const;
}

function formatMoney(n: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

function generateInsight(
  loanAmount: number,
  rate: number,
  years: number,
  monthlyPayment: number,
  totalInterest: number,
  income: number
): string {
  const parts: string[] = [];
  const dti = income > 0 ? (monthlyPayment / income) * 100 : 0;

  if (income > 0) {
    if (dti <= 15) {
      parts.push(`Your monthly payment is ${dti.toFixed(1)}% of your income — very manageable. This loan fits comfortably in your budget.`);
    } else if (dti <= 28) {
      parts.push(`Your monthly payment is ${dti.toFixed(1)}% of your income — within the acceptable range. Keep total debt payments under 36% of income to stay financially healthy.`);
    } else {
      parts.push(`Warning: your payment is ${dti.toFixed(1)}% of your income. This is high — lenders typically limit personal loan payments to 28% of gross income. Consider a smaller loan amount or longer term.`);
    }
  }

  const interestRatio = (totalInterest / loanAmount) * 100;
  parts.push(
    `You'll pay ${formatMoney(totalInterest)} in interest over ${years} year${years > 1 ? "s" : ""} — ${interestRatio.toFixed(0)}% of the original loan. A higher rate or longer term multiplies this cost significantly.`
  );

  if (years > 3) {
    const monthlyRate = rate / 100 / 12;
    const months3 = 36;
    const payment3 =
      monthlyRate > 0
        ? (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, months3))) / (Math.pow(1 + monthlyRate, months3) - 1)
        : loanAmount / months3;
    const interest3 = payment3 * months3 - loanAmount;
    const saved = totalInterest - interest3;
    if (saved > 0) {
      parts.push(`Tip: paying off this loan in 3 years instead of ${years} would cost ${formatMoney(payment3)}/month but save you ${formatMoney(saved)} in interest.`);
    }
  }

  if (rate >= 15) {
    parts.push(`At ${rate}%, this is a high-interest loan. If your credit improves, refinancing could meaningfully reduce your rate — even a 3% drop would save hundreds of dollars per year.`);
  } else if (rate < 8) {
    parts.push(`At ${rate}%, this is a competitive rate. You're borrowing efficiently — focus on making payments on time to protect your credit score.`);
  }

  return parts.join("\n\n");
}

export function LoanCalc() {
  const [amountStr, setAmount, loanAmount] = useNumInput(10000);
  const [rateStr, setRate, rate] = useNumInput(8.5);
  const [yearsStr, setYears, years] = useNumInput(3);
  const [incomeStr, setIncome, income] = useNumInput(5000);
  const [calculated, setCalculated] = useState(false);

  const results = useMemo(() => {
    if (loanAmount <= 0 || rate <= 0 || years <= 0) return null;
    const monthlyRate = rate / 100 / 12;
    const months = Math.round(years * 12);

    const monthlyPayment =
      monthlyRate > 0
        ? (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, months))) / (Math.pow(1 + monthlyRate, months) - 1)
        : loanAmount / months;

    const totalPaid = monthlyPayment * months;
    const totalInterest = totalPaid - loanAmount;

    const chunkMonths = months <= 36 ? 6 : 12;
    const chartData: { period: string; principal: number; interest: number }[] = [];
    let remaining = loanAmount;

    for (let m = 0; m < months; m += chunkMonths) {
      let principalChunk = 0;
      let interestChunk = 0;
      const end = Math.min(m + chunkMonths, months);

      for (let i = m; i < end; i++) {
        const interestPayment = remaining * monthlyRate;
        const principalPayment = monthlyPayment - interestPayment;
        interestChunk += interestPayment;
        principalChunk += principalPayment;
        remaining = Math.max(0, remaining - principalPayment);
      }

      const label = months <= 36 ? `Mo ${m + 1}–${end}` : `Yr ${Math.floor(m / 12) + 1}–${Math.ceil(end / 12)}`;
      chartData.push({ period: label, principal: Math.round(principalChunk), interest: Math.round(interestChunk) });
    }

    return { monthlyPayment, totalPaid, totalInterest, chartData };
  }, [amountStr, rateStr, yearsStr]);

  const aiInsight = useMemo(
    () => (calculated && results ? generateInsight(loanAmount, rate, years, results.monthlyPayment, results.totalInterest, income) : ""),
    [calculated, amountStr, rateStr, yearsStr, incomeStr, results]
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Loan Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <DollarSign className="h-4 w-4 text-gray-400" /> Loan Amount
              </Label>
              <Input
                type="text"
                inputMode="numeric"
                value={amountStr}
                onChange={(e) => setAmount(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <Percent className="h-4 w-4 text-gray-400" /> Annual Interest Rate (%)
              </Label>
              <Input
                type="text"
                inputMode="decimal"
                value={rateStr}
                onChange={(e) => setRate(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-gray-400" /> Loan Term (Years)
              </Label>
              <Input
                type="text"
                inputMode="decimal"
                value={yearsStr}
                onChange={(e) => setYears(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <DollarSign className="h-4 w-4 text-gray-400" /> Monthly Income (for AI check)
              </Label>
              <Input
                type="text"
                inputMode="numeric"
                value={incomeStr}
                onChange={(e) => setIncome(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
            </div>
          </div>
          <Button className="mt-6 w-full bg-blue-600 hover:bg-blue-700" size="lg" onClick={() => setCalculated(true)}>
            Calculate Loan Payment
          </Button>
        </CardContent>
      </Card>

      {calculated && results && (
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="pt-6">
                <p className="text-sm text-blue-700">Monthly Payment</p>
                <p className="text-2xl font-bold text-blue-800">{formatMoney(results.monthlyPayment)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-500">Total Paid</p>
                <p className="text-2xl font-bold text-gray-900">{formatMoney(results.totalPaid)}</p>
              </CardContent>
            </Card>
            <Card className="border-red-200 bg-red-50">
              <CardContent className="pt-6">
                <p className="text-sm text-red-700">Total Interest</p>
                <p className="text-2xl font-bold text-red-800">{formatMoney(results.totalInterest)}</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base text-gray-800">
                <BarChart2 className="h-5 w-5 text-blue-600" /> Principal vs Interest Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={results.chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="period" tick={{ fontSize: 11 }} tickLine={false} />
                  <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} axisLine={false} tickLine={false} />
                  <Tooltip formatter={(value) => formatMoney(Number(value))} />
                  <Bar dataKey="principal" name="Principal" stackId="a" fill="#3b82f6" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="interest" name="Interest" stackId="a" fill="#fca5a5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sparkles className="h-5 w-5 text-purple-600" /> AI Insight
                <Badge variant="secondary" className="bg-purple-100 text-purple-700">Loan Analysis</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {aiInsight.split("\n\n").map((p, i) => (
                  <p key={i} className="leading-relaxed text-gray-700">{p}</p>
                ))}
              </div>
              <Separator className="my-4" />
              <p className="flex items-center gap-1 text-xs text-gray-400">
                <Info className="h-3 w-3" /> For informational purposes only. Not financial advice.
              </p>
            </CardContent>
          </Card>
        </>
      )}

      {calculated && !results && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <p className="text-red-700">Please enter a valid loan amount, interest rate, and term greater than zero.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
