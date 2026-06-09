"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { GraduationCap, DollarSign, Percent, Sparkles, Info, Plus, Trash2 } from "lucide-react";
import { SaveCalculationButton } from "@/components/save-calculation-button";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function useNumInput(initial: number) {
  const [str, setStr] = useState(String(initial));
  return [str, setStr, parseFloat(str) || 0] as const;
}

function fmt(n: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

interface Loan {
  id: string;
  name: string;
  balance: string;
  rate: string;
  minPayment: string;
}

function calcMinPayment(balance: number, annualRate: number, termYears: number): number {
  const r = annualRate / 100 / 12;
  const n = termYears * 12;
  if (r === 0) return balance / n;
  return (balance * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

function simulateLoan(
  loans: { balance: number; rate: number; minPayment: number }[],
  extraPayment: number
): { months: number; totalInterest: number; chartData: { month: number; balance: number }[] } {
  const remaining = loans.map((l) => ({ ...l }));
  let months = 0;
  let totalInterest = 0;
  const chartData: { month: number; balance: number }[] = [];
  chartData.push({ month: 0, balance: Math.round(remaining.reduce((s, l) => s + l.balance, 0)) });
  const maxMonths = 600;

  while (remaining.some((l) => l.balance > 0.01) && months < maxMonths) {
    months++;
    let extra = extraPayment;
    const active = remaining.filter((l) => l.balance > 0.01);
    // Apply extra to highest rate first (avalanche)
    active.sort((a, b) => b.rate - a.rate);

    for (const loan of remaining) {
      if (loan.balance <= 0.01) continue;
      const interest = loan.balance * (loan.rate / 100 / 12);
      totalInterest += interest;
      const isTarget = active[0] === loan;
      const payment = Math.min(loan.minPayment + (isTarget ? extra : 0), loan.balance + interest);
      loan.balance = Math.max(0, loan.balance + interest - payment);
    }

    if (months % 6 === 0 || !remaining.some((l) => l.balance > 0.01)) {
      chartData.push({ month: months, balance: Math.round(remaining.reduce((s, l) => s + l.balance, 0)) });
    }
  }

  return { months, totalInterest, chartData };
}

export function StudentLoanCalc() {
  const [loans, setLoans] = useState<Loan[]>([
    { id: "1", name: "Federal Subsidized", balance: "15000", rate: "5.5", minPayment: "163" },
    { id: "2", name: "Federal Unsubsidized", balance: "20000", rate: "7.05", minPayment: "233" },
  ]);
  const [extraStr, setExtraStr, extra] = useNumInput(100);
  const [calculated, setCalculated] = useState(false);

  const addLoan = () =>
    setLoans([...loans, { id: Date.now().toString(), name: `Loan ${loans.length + 1}`, balance: "0", rate: "0", minPayment: "0" }]);

  const removeLoan = (id: string) => {
    if (loans.length > 1) setLoans(loans.filter((l) => l.id !== id));
  };

  const updateLoan = (id: string, field: keyof Loan, value: string) =>
    setLoans(loans.map((l) => (l.id === id ? { ...l, [field]: value } : l)));

  const numericLoans = useMemo(
    () => loans.map((l) => ({ balance: parseFloat(l.balance) || 0, rate: parseFloat(l.rate) || 0, minPayment: parseFloat(l.minPayment) || 0 })),
    [loans]
  );

  const results = useMemo(() => {
    if (!calculated) return null;
    const valid = numericLoans.filter((l) => l.balance > 0);
    if (valid.length === 0) return null;

    const withExtra = simulateLoan(valid, extra);
    const noExtra = simulateLoan(valid, 0);
    const totalBalance = valid.reduce((s, l) => s + l.balance, 0);
    const totalMinPayment = valid.reduce((s, l) => s + l.minPayment, 0);
    const monthsSaved = noExtra.months - withExtra.months;
    const interestSaved = noExtra.totalInterest - withExtra.totalInterest;

    return { withExtra, noExtra, totalBalance, totalMinPayment, monthsSaved, interestSaved };
  }, [calculated, numericLoans, extra]);

  const aiInsight = useMemo(() => {
    if (!results) return "";
    const { withExtra, noExtra, totalBalance, totalMinPayment, monthsSaved, interestSaved } = results;
    const lines: string[] = [];

    lines.push(
      `You have ${fmt(totalBalance)} in student loans. Paying ${fmt(totalMinPayment + extra)}/month (minimums + ${fmt(extra)} extra), you'll be debt-free in ${withExtra.months} months (${(withExtra.months / 12).toFixed(1)} years) and pay ${fmt(withExtra.totalInterest)} in interest.`
    );

    if (monthsSaved > 0) {
      lines.push(
        `Your extra ${fmt(extra)}/month saves you ${monthsSaved} months and ${fmt(interestSaved)} in interest compared to minimum payments only. That's an excellent return on every extra dollar.`
      );
    }

    const highestRate = [...numericLoans].filter(l => l.balance > 0).sort((a, b) => b.rate - a.rate)[0];
    if (highestRate && highestRate.rate > 6) {
      lines.push(
        `Focus extra payments on your highest-rate loan (${highestRate.rate}%) first — this avalanche approach maximizes interest savings. Once it's paid off, roll that payment to the next loan.`
      );
    }

    if (noExtra.months > 120) {
      lines.push(
        `Tip: If your federal loans are overwhelming, explore income-driven repayment (IDR) plans which cap payments at 10% of discretionary income. After 20–25 years, remaining balances may be forgiven.`
      );
    }

    return lines.join("\n\n");
  }, [results, numericLoans, extra]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <GraduationCap className="h-5 w-5 text-violet-600" />
            Your Student Loans
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loans.map((loan) => (
            <div key={loan.id} className="mb-4 rounded-lg border bg-gray-50 p-4">
              <div className="mb-3 flex items-center justify-between">
                <Input
                  value={loan.name}
                  onChange={(e) => updateLoan(loan.id, "name", e.target.value)}
                  className="max-w-[220px] border-none bg-transparent text-sm font-semibold"
                />
                {loans.length > 1 && (
                  <button onClick={() => removeLoan(loan.id)} className="text-gray-400 hover:text-red-500">
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-1">
                  <Label className="flex items-center gap-1 text-xs">
                    <DollarSign className="h-3 w-3" /> Balance
                  </Label>
                  <Input
                    type="text"
                    inputMode="numeric"
                    value={loan.balance}
                    onChange={(e) => updateLoan(loan.id, "balance", e.target.value)}
                    onFocus={(e) => e.target.select()}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="flex items-center gap-1 text-xs">
                    <Percent className="h-3 w-3" /> Interest Rate (%)
                  </Label>
                  <Input
                    type="text"
                    inputMode="decimal"
                    value={loan.rate}
                    onChange={(e) => updateLoan(loan.id, "rate", e.target.value)}
                    onFocus={(e) => e.target.select()}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="flex items-center gap-1 text-xs">
                    <DollarSign className="h-3 w-3" /> Monthly Payment
                  </Label>
                  <Input
                    type="text"
                    inputMode="numeric"
                    value={loan.minPayment}
                    onChange={(e) => updateLoan(loan.id, "minPayment", e.target.value)}
                    onFocus={(e) => e.target.select()}
                  />
                </div>
              </div>
            </div>
          ))}

          <Button variant="outline" onClick={addLoan} className="mb-6 w-full">
            <Plus className="mr-2 h-4 w-4" /> Add Another Loan
          </Button>

          <Separator className="my-4" />

          <div className="space-y-2">
            <Label className="flex items-center gap-1">
              <DollarSign className="h-4 w-4 text-gray-400" />
              Extra Monthly Payment (on top of required payments)
            </Label>
            <Input
              type="text"
              inputMode="numeric"
              value={extraStr}
              onChange={(e) => setExtraStr(e.target.value)}
              onFocus={(e) => e.target.select()}
            />
          </div>

          <Button
            className="mt-6 w-full bg-violet-600 hover:bg-violet-700"
            size="lg"
            onClick={() => setCalculated(true)}
          >
            Calculate Payoff Plan
          </Button>
        </CardContent>
      </Card>

      {results && (
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-500">Total Loan Balance</p>
                <p className="text-2xl font-bold text-gray-900">{fmt(results.totalBalance)}</p>
              </CardContent>
            </Card>
            <Card className="border-violet-200 bg-violet-50">
              <CardContent className="pt-6">
                <p className="text-sm text-violet-700">Debt-Free In</p>
                <p className="text-2xl font-bold text-violet-800">{results.withExtra.months} months</p>
                <p className="text-xs text-violet-600">Total interest: {fmt(results.withExtra.totalInterest)}</p>
              </CardContent>
            </Card>
            <Card className="border-emerald-200 bg-emerald-50">
              <CardContent className="pt-6">
                <p className="text-sm text-emerald-700">Interest Saved</p>
                <p className="text-2xl font-bold text-emerald-800">{fmt(Math.max(0, results.interestSaved))}</p>
                <p className="text-xs text-emerald-600">{results.monthsSaved} months sooner</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold text-gray-800">Loan Balance Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={results.withExtra.chartData} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="loanGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tickFormatter={(v) => `${v}mo`} tick={{ fontSize: 11 }} tickLine={false} />
                  <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, "Balance"]} labelFormatter={(l) => `Month ${l}`} />
                  <Area type="monotone" dataKey="balance" stroke="#7c3aed" strokeWidth={2} fill="url(#loanGrad)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sparkles className="h-5 w-5 text-purple-600" />
                AI Insight
                <Badge variant="secondary" className="bg-purple-100 text-purple-700">Payoff Strategy</Badge>
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
                <Info className="h-3 w-3" />
                For informational purposes only. Not financial advice.
              </p>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <SaveCalculationButton
              calculatorType="student-loan"
              title={`${fmt(results.totalBalance)} student loans, ${fmt(results.totalMinPayment + extra)}/mo`}
              inputs={{ loans: numericLoans, extraPayment: extra }}
              results={{
                totalBalance: Math.round(results.totalBalance),
                months: results.withExtra.months,
                totalInterest: Math.round(results.withExtra.totalInterest),
                monthsSaved: results.monthsSaved,
                interestSaved: Math.round(results.interestSaved),
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}
