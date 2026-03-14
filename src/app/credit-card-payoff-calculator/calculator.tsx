"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CreditCard, DollarSign, Percent, Sparkles, Clock } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

function formatMoney(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

function calcPayoff(balance: number, apr: number, monthlyPayment: number) {
  if (monthlyPayment <= 0 || balance <= 0) return null;
  const monthlyRate = apr / 100 / 12;
  const minPayment = balance * monthlyRate * 1.01; // just above interest
  if (monthlyPayment <= balance * monthlyRate) return null; // payment doesn't cover interest

  let remaining = balance;
  let months = 0;
  let totalInterest = 0;

  while (remaining > 0 && months < 600) {
    const interest = remaining * monthlyRate;
    totalInterest += interest;
    const principal = Math.min(monthlyPayment - interest, remaining);
    remaining -= principal;
    months++;
  }

  return { months, totalInterest, totalPaid: balance + totalInterest, minPayment };
}

function generateInsight(
  balance: number,
  apr: number,
  monthly: number,
  months: number,
  totalInterest: number
): string {
  const parts: string[] = [];

  if (apr >= 25) {
    parts.push(
      `At ${apr}% APR, this card is extremely expensive — you're paying nearly ${((apr / 100 / 12) * 100).toFixed(1)}% of the balance in interest every single month.`
    );
  } else if (apr >= 18) {
    parts.push(`At ${apr}% APR, this is high-interest debt. Prioritize paying this off before investing.`);
  } else {
    parts.push(`At ${apr}% APR, this is moderate-rate debt. Still worth paying off, but you can consider investing simultaneously.`);
  }

  if (months > 60) {
    parts.push(
      `At your current payment, it takes ${Math.floor(months / 12)} years and ${months % 12} months. Increasing your payment by just $50/month would save significant time and interest.`
    );
  } else if (months > 24) {
    parts.push(`You'll be debt-free in ${months} months. Stay consistent — don't miss a payment.`);
  } else {
    parts.push(`Great progress — you're on track to eliminate this debt in under 2 years.`);
  }

  if (totalInterest > balance * 0.5) {
    parts.push(
      `Warning: You'll pay ${formatMoney(totalInterest)} in interest — ${((totalInterest / balance) * 100).toFixed(0)}% of your original balance. Consider a 0% balance transfer to reduce this cost.`
    );
  }

  return parts.join(" ");
}

export function CreditCardPayoffCalc() {
  const [balance, setBalance] = useState("5000");
  const [apr, setApr] = useState("22");
  const [monthly, setMonthly] = useState("200");

  const bal = parseFloat(balance) || 0;
  const rate = parseFloat(apr) || 0;
  const pay = parseFloat(monthly) || 0;

  const result = useMemo(() => calcPayoff(bal, rate, pay), [bal, rate, pay]);

  const minPayResult = useMemo(() => {
    if (bal <= 0 || rate <= 0) return null;
    const minPay = Math.max(bal * 0.02, 25); // typical minimum: 2% or $25
    return calcPayoff(bal, rate, minPay);
  }, [bal, rate]);

  const chartData = result
    ? [
        { name: "Principal", value: bal, color: "#10b981" },
        { name: "Interest", value: Math.round(result.totalInterest), color: "#ef4444" },
      ]
    : [];

  const insight =
    result
      ? generateInsight(bal, rate, pay, result.months, result.totalInterest)
      : null;

  const paymentTooLow = bal > 0 && rate > 0 && pay > 0 && !result;

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <CreditCard className="h-5 w-5 text-blue-600" />
            Your Credit Card Details
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-1.5">
            <Label htmlFor="balance" className="flex items-center gap-1 text-sm">
              <DollarSign className="h-3.5 w-3.5" /> Current Balance
            </Label>
            <Input
              id="balance"
              type="number"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              placeholder="5000"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="apr" className="flex items-center gap-1 text-sm">
              <Percent className="h-3.5 w-3.5" /> APR (%)
            </Label>
            <Input
              id="apr"
              type="number"
              step="0.1"
              value={apr}
              onChange={(e) => setApr(e.target.value)}
              placeholder="22"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="monthly" className="flex items-center gap-1 text-sm">
              <DollarSign className="h-3.5 w-3.5" /> Monthly Payment
            </Label>
            <Input
              id="monthly"
              type="number"
              value={monthly}
              onChange={(e) => setMonthly(e.target.value)}
              placeholder="200"
            />
          </div>
        </CardContent>
      </Card>

      {paymentTooLow && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          Your monthly payment doesn&apos;t cover the interest charges. Increase it to make progress on your balance.
        </div>
      )}

      {/* Results */}
      {result && (
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            <Card className="border-blue-100 bg-blue-50">
              <CardContent className="pt-5">
                <div className="flex items-center gap-2 text-sm text-blue-600">
                  <Clock className="h-4 w-4" /> Time to Payoff
                </div>
                <p className="mt-1 text-2xl font-bold text-gray-900">
                  {result.months < 12
                    ? `${result.months} mo`
                    : `${Math.floor(result.months / 12)}y ${result.months % 12}mo`}
                </p>
              </CardContent>
            </Card>
            <Card className="border-red-100 bg-red-50">
              <CardContent className="pt-5">
                <div className="text-sm text-red-600">Total Interest Paid</div>
                <p className="mt-1 text-2xl font-bold text-gray-900">
                  {formatMoney(result.totalInterest)}
                </p>
              </CardContent>
            </Card>
            <Card className="border-gray-100 bg-gray-50">
              <CardContent className="pt-5">
                <div className="text-sm text-gray-600">Total Cost</div>
                <p className="mt-1 text-2xl font-bold text-gray-900">
                  {formatMoney(result.totalPaid)}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Minimum payment comparison */}
          {minPayResult && (
            <Card className="border-amber-200 bg-amber-50">
              <CardContent className="pt-5">
                <p className="mb-1 text-sm font-semibold text-amber-800">
                  vs. Minimum Payment (~{formatMoney(minPayResult.minPayment ?? 0)}/mo)
                </p>
                <p className="text-sm text-amber-700">
                  Minimum payments would take{" "}
                  <strong>
                    {minPayResult.months < 12
                      ? `${minPayResult.months} months`
                      : `${Math.floor(minPayResult.months / 12)} years`}
                  </strong>{" "}
                  and cost{" "}
                  <strong>{formatMoney(minPayResult.totalInterest)}</strong> in interest.
                  Your plan saves you{" "}
                  <strong>
                    {formatMoney(minPayResult.totalInterest - result.totalInterest)}
                  </strong>
                  .
                </p>
              </CardContent>
            </Card>
          )}

          {/* Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Principal vs. Interest Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={chartData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis
                    type="number"
                    tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={65} />
                  <Tooltip formatter={(v: number) => formatMoney(v)} />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Bar>
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
