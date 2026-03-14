"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DollarSign, Percent, Calendar, Sparkles, Scale } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

function formatMoney(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

function calcLoan(principal: number, aprPercent: number, years: number) {
  if (principal <= 0 || aprPercent <= 0 || years <= 0) return null;
  const r = aprPercent / 100 / 12;
  const n = years * 12;
  const monthly = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalPaid = monthly * n;
  const totalInterest = totalPaid - principal;
  return { monthly, totalPaid, totalInterest, n };
}

function generateInsight(
  p1: number, r1: number, y1: number, m1: number, i1: number,
  p2: number, r2: number, y2: number, m2: number, i2: number
): string {
  const parts: string[] = [];

  const monthlySavings = Math.abs(m1 - m2);
  const interestSavings = Math.abs(i1 - i2);
  const betterMonthly = m1 < m2 ? "Loan A" : "Loan B";
  const betterTotal = i1 < i2 ? "Loan A" : "Loan B";

  if (betterMonthly === betterTotal) {
    parts.push(
      `${betterMonthly} is the clear winner — it has both a lower monthly payment (by ${formatMoney(monthlySavings)}/month) and saves ${formatMoney(interestSavings)} in total interest.`
    );
  } else {
    parts.push(
      `There's a trade-off: ${betterMonthly} has the lower monthly payment (saves ${formatMoney(monthlySavings)}/month), but ${betterTotal} costs less overall (saves ${formatMoney(interestSavings)} in total interest).`
    );
    parts.push(
      `Choose ${betterMonthly} if cash flow is tight. Choose ${betterTotal} if you can afford the higher payment and want to minimize total cost.`
    );
  }

  if (Math.abs(r1 - r2) > 0) {
    parts.push(
      `The ${Math.abs(r1 - r2).toFixed(2)}% difference in APR accounts for most of the cost difference — even small rate differences add up to thousands over the life of a loan.`
    );
  }

  return parts.join(" ");
}

export function LoanComparisonCalc() {
  const [a, setA] = useState({ principal: "20000", apr: "6.5", years: "5" });
  const [b, setB] = useState({ principal: "20000", apr: "8.9", years: "5" });

  const loanA = useMemo(
    () => calcLoan(parseFloat(a.principal), parseFloat(a.apr), parseFloat(a.years)),
    [a]
  );
  const loanB = useMemo(
    () => calcLoan(parseFloat(b.principal), parseFloat(b.apr), parseFloat(b.years)),
    [b]
  );

  const chartData =
    loanA && loanB
      ? [
          {
            name: "Monthly Payment",
            "Loan A": Math.round(loanA.monthly),
            "Loan B": Math.round(loanB.monthly),
          },
          {
            name: "Total Interest",
            "Loan A": Math.round(loanA.totalInterest),
            "Loan B": Math.round(loanB.totalInterest),
          },
          {
            name: "Total Cost",
            "Loan A": Math.round(loanA.totalPaid),
            "Loan B": Math.round(loanB.totalPaid),
          },
        ]
      : [];

  const insight =
    loanA && loanB
      ? generateInsight(
          parseFloat(a.principal), parseFloat(a.apr), parseFloat(a.years), loanA.monthly, loanA.totalInterest,
          parseFloat(b.principal), parseFloat(b.apr), parseFloat(b.years), loanB.monthly, loanB.totalInterest
        )
      : null;

  const inputClass = "grid gap-3 sm:grid-cols-3";

  function LoanInputs({
    values,
    onChange,
    label,
    color,
  }: {
    values: typeof a;
    onChange: (v: typeof a) => void;
    label: string;
    color: string;
  }) {
    return (
      <Card className={`border-2 ${color}`}>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">{label}</CardTitle>
        </CardHeader>
        <CardContent className={inputClass}>
          <div className="space-y-1.5">
            <Label className="flex items-center gap-1 text-sm">
              <DollarSign className="h-3.5 w-3.5" /> Loan Amount
            </Label>
            <Input
              type="number"
              value={values.principal}
              onChange={(e) => onChange({ ...values, principal: e.target.value })}
              placeholder="20000"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="flex items-center gap-1 text-sm">
              <Percent className="h-3.5 w-3.5" /> APR (%)
            </Label>
            <Input
              type="number"
              step="0.1"
              value={values.apr}
              onChange={(e) => onChange({ ...values, apr: e.target.value })}
              placeholder="6.5"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="flex items-center gap-1 text-sm">
              <Calendar className="h-3.5 w-3.5" /> Term (years)
            </Label>
            <Input
              type="number"
              value={values.years}
              onChange={(e) => onChange({ ...values, years: e.target.value })}
              placeholder="5"
            />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <LoanInputs
          values={a}
          onChange={setA}
          label="Loan A"
          color="border-blue-200"
        />
        <LoanInputs
          values={b}
          onChange={setB}
          label="Loan B"
          color="border-purple-200"
        />
      </div>

      {loanA && loanB && (
        <>
          {/* Side-by-side results */}
          <div className="overflow-hidden rounded-xl border">
            <div className="grid grid-cols-3 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-500">
              <div></div>
              <div className="text-center text-blue-700">Loan A</div>
              <div className="text-center text-purple-700">Loan B</div>
            </div>
            {[
              { label: "Monthly Payment", a: formatMoney(loanA.monthly), b: formatMoney(loanB.monthly) },
              { label: "Total Interest", a: formatMoney(loanA.totalInterest), b: formatMoney(loanB.totalInterest) },
              { label: "Total Cost", a: formatMoney(loanA.totalPaid), b: formatMoney(loanB.totalPaid) },
              { label: "# of Payments", a: `${loanA.n} months`, b: `${loanB.n} months` },
            ].map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-3 px-4 py-3 text-sm ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
              >
                <div className="font-medium text-gray-700">{row.label}</div>
                <div className="text-center font-semibold text-blue-700">{row.a}</div>
                <div className="text-center font-semibold text-purple-700">{row.b}</div>
              </div>
            ))}
          </div>

          {/* Winner badges */}
          <div className="flex flex-wrap gap-3">
            {loanA.monthly < loanB.monthly && (
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                Loan A: Lower Monthly Payment
              </Badge>
            )}
            {loanB.monthly < loanA.monthly && (
              <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
                Loan B: Lower Monthly Payment
              </Badge>
            )}
            {loanA.totalInterest < loanB.totalInterest && (
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                Loan A: Less Total Interest
              </Badge>
            )}
            {loanB.totalInterest < loanA.totalInterest && (
              <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
                Loan B: Less Total Interest
              </Badge>
            )}
          </div>

          {/* Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Scale className="h-4 w-4" /> Side-by-Side Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(v: number) => formatMoney(v)} />
                  <Legend />
                  <Bar dataKey="Loan A" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Loan B" fill="#a855f7" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* AI Insight */}
          {insight && (
            <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-white">
              <CardContent className="pt-5">
                <div className="mb-2 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm font-semibold text-emerald-700">AI Insight</span>
                  <Badge variant="secondary" className="text-xs">Personalized</Badge>
                </div>
                <p className="text-sm leading-relaxed text-gray-700">{insight}</p>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
