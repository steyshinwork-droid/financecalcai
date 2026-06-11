"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Sparkles, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SaveCalculationButton } from "@/components/save-calculation-button";

function useNumInput(initial: number) {
  const [str, setStr] = useState(String(initial));
  return [str, setStr, parseFloat(str) || 0] as const;
}

type FilingStatus = "single" | "married";
type PayFreq = "weekly" | "biweekly" | "semimonthly" | "monthly";

const PAY_FREQS: { key: PayFreq; label: string; periods: number }[] = [
  { key: "weekly", label: "Weekly", periods: 52 },
  { key: "biweekly", label: "Bi-Weekly", periods: 26 },
  { key: "semimonthly", label: "Semi-Monthly", periods: 24 },
  { key: "monthly", label: "Monthly", periods: 12 },
];

const STANDARD_DEDUCTIONS: Record<FilingStatus, number> = {
  single: 15000,
  married: 30000,
};

const BRACKETS_SINGLE = [
  { rate: 0.37, over: 626350 },
  { rate: 0.35, over: 250525 },
  { rate: 0.32, over: 197300 },
  { rate: 0.24, over: 103350 },
  { rate: 0.22, over: 48475 },
  { rate: 0.12, over: 11925 },
  { rate: 0.10, over: 0 },
];

const BRACKETS_MARRIED = [
  { rate: 0.37, over: 751600 },
  { rate: 0.35, over: 501050 },
  { rate: 0.32, over: 394600 },
  { rate: 0.24, over: 206700 },
  { rate: 0.22, over: 96950 },
  { rate: 0.12, over: 23850 },
  { rate: 0.10, over: 0 },
];

function calcFederalTax(taxableIncome: number, status: FilingStatus): number {
  if (taxableIncome <= 0) return 0;
  const brackets = status === "single" ? BRACKETS_SINGLE : BRACKETS_MARRIED;
  let tax = 0;
  for (let i = 0; i < brackets.length; i++) {
    const { rate, over } = brackets[i];
    const next = i === 0 ? Infinity : brackets[i - 1].over;
    if (taxableIncome > over) {
      tax += (Math.min(taxableIncome, next) - over) * rate;
    }
  }
  return tax;
}

function fmt(n: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(n);
}

function pct(n: number): string {
  return (n * 100).toFixed(1) + "%";
}

export function PaycheckCalc() {
  const [salaryStr, setSalary, salary] = useNumInput(75000);
  const [stateTaxStr, setStateTax, stateTax] = useNumInput(5);
  const [k401Str, setK401, k401Pct] = useNumInput(0);
  const [filingStatus, setFilingStatus] = useState<FilingStatus>("single");
  const [payFreq, setPayFreq] = useState<PayFreq>("biweekly");

  const result = useMemo(() => {
    const freq = PAY_FREQS.find((f) => f.key === payFreq)!;
    const annualGross = salary;
    const k401Amount = annualGross * (k401Pct / 100);
    const standardDeduction = STANDARD_DEDUCTIONS[filingStatus];
    const federalTaxableIncome = Math.max(0, annualGross - k401Amount - standardDeduction);

    const annualFederal = calcFederalTax(federalTaxableIncome, filingStatus);
    const annualSS = Math.min(annualGross, 176100) * 0.062;
    const annualMedicare = annualGross * 0.0145 + (annualGross > (filingStatus === "single" ? 200000 : 250000) ? (annualGross - (filingStatus === "single" ? 200000 : 250000)) * 0.009 : 0);
    const annualState = Math.max(0, annualGross - k401Amount - standardDeduction) * (stateTax / 100);
    const annual401k = k401Amount;

    const annualNet = annualGross - annualFederal - annualSS - annualMedicare - annualState - annual401k;

    const p = freq.periods;
    return {
      periods: p,
      grossPerPeriod: annualGross / p,
      federalPerPeriod: annualFederal / p,
      ssPerPeriod: annualSS / p,
      medicarePerPeriod: annualMedicare / p,
      statePerPeriod: annualState / p,
      k401PerPeriod: annual401k / p,
      netPerPeriod: annualNet / p,
      annualGross,
      annualNet,
      effectiveRate: annualGross > 0 ? (annualFederal + annualSS + annualMedicare + annualState) / annualGross : 0,
      federalEffective: annualGross > 0 ? annualFederal / annualGross : 0,
    };
  }, [salary, stateTax, k401Pct, filingStatus, payFreq]);

  const aiInsight = useMemo(() => {
    const parts: string[] = [];
    parts.push(`Your effective total tax rate is ${pct(result.effectiveRate)} — meaning you keep ${fmt(result.annualNet)} of your ${fmt(result.annualGross)} annual salary. Federal income tax alone is ${pct(result.federalEffective)} effective rate (lower than your marginal rate because lower income is taxed at lower brackets).`);

    if (k401Pct === 0 && salary >= 40000) {
      parts.push(`You're contributing 0% to a 401(k). Contributing even 6% ($${((salary * 0.06) / 1000).toFixed(0)}k/year) would reduce your taxable income and likely earn you an employer match — effectively free money. The tax savings partially offset the paycheck reduction.`);
    } else if (k401Pct > 0) {
      parts.push(`Your ${k401Pct}% 401(k) contribution reduces your federal and state taxable income by ${fmt(salary * k401Pct / 100)} per year, saving you ${fmt((salary * k401Pct / 100) * result.federalEffective * 1.5)} in taxes annually (approximate).`);
    }

    if (salary < 50000) {
      parts.push(`At this income level, you may qualify for the Earned Income Tax Credit (EITC), the Saver's Credit (if contributing to retirement), and other deductions. A tax professional or free VITA site (IRS.gov) can help maximize your return.`);
    }

    return parts.join("\n\n");
  }, [result, k401Pct, salary]);

  const rows = [
    { label: "Gross Pay", value: result.grossPerPeriod, className: "font-semibold text-gray-900" },
    { label: "Federal Income Tax", value: -result.federalPerPeriod, className: "text-red-600" },
    { label: "Social Security (6.2%)", value: -result.ssPerPeriod, className: "text-red-600" },
    { label: "Medicare (1.45%)", value: -result.medicarePerPeriod, className: "text-red-600" },
    { label: `State Tax (${stateTax}%)`, value: -result.statePerPeriod, className: "text-red-600" },
    ...(k401Pct > 0 ? [{ label: `401(k) (${k401Pct}%)`, value: -result.k401PerPeriod, className: "text-amber-700" }] : []),
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Paycheck Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label>Annual Gross Salary ($)</Label>
            <Input
              type="text"
              inputMode="decimal"
              value={salaryStr}
              onChange={(e) => setSalary(e.target.value)}
              onFocus={(e) => e.target.select()}
              className="text-lg"
            />
          </div>

          <div className="space-y-2">
            <Label>Pay Frequency</Label>
            <div className="flex flex-wrap gap-2">
              {PAY_FREQS.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setPayFreq(f.key)}
                  className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition ${
                    payFreq === f.key
                      ? "border-amber-500 bg-amber-500 text-white"
                      : "border-gray-200 bg-white text-gray-700 hover:border-amber-300"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Filing Status</Label>
            <div className="flex gap-3">
              {(["single", "married"] as FilingStatus[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setFilingStatus(s)}
                  className={`rounded-lg border px-4 py-1.5 text-sm font-medium transition ${
                    filingStatus === s
                      ? "border-amber-500 bg-amber-500 text-white"
                      : "border-gray-200 bg-white text-gray-700 hover:border-amber-300"
                  }`}
                >
                  {s === "single" ? "Single" : "Married (Joint)"}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>State Tax Rate (%)</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={stateTaxStr}
                onChange={(e) => setStateTax(e.target.value)}
                onFocus={(e) => e.target.select()}
                placeholder="e.g. 5"
              />
              <p className="text-xs text-gray-400">0% = FL, TX, WA, NV · ~5% = NY, IL · ~9% = CA</p>
            </div>
            <div className="space-y-2">
              <Label>401(k) Contribution (%)</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={k401Str}
                onChange={(e) => setK401(e.target.value)}
                onFocus={(e) => e.target.select()}
                placeholder="e.g. 6"
              />
              <p className="text-xs text-gray-400">Pre-tax, reduces taxable income</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base text-gray-800">
            {PAY_FREQS.find((f) => f.key === payFreq)?.label} Paycheck Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {rows.map((row) => (
              <div key={row.label} className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-2.5">
                <span className="text-sm text-gray-600">{row.label}</span>
                <span className={`font-semibold ${row.className}`}>
                  {row.value >= 0 ? fmt(row.value) : `−${fmt(Math.abs(row.value))}`}
                </span>
              </div>
            ))}
            <Separator className="my-1" />
            <div className="flex items-center justify-between rounded-xl bg-amber-50 px-4 py-3">
              <span className="font-semibold text-gray-900">Take-Home Pay</span>
              <span className="text-xl font-bold text-amber-600">{fmt(result.netPerPeriod)}</span>
            </div>
          </div>
          <p className="mt-3 text-xs text-gray-400">
            Annual: {fmt(result.annualNet)} take-home · Effective tax rate: {pct(result.effectiveRate)}
          </p>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <SaveCalculationButton
          calculatorType="paycheck"
          title={`$${salaryStr}/yr, ${filingStatus}, ${stateTaxStr}% state`}
          inputs={{ salary: salaryStr, stateTax: stateTaxStr, k401: k401Str, filingStatus, payFreq }}
          results={{
            netPerPeriod: Math.round(result.netPerPeriod),
            grossPerPeriod: Math.round(result.grossPerPeriod),
            annualNet: Math.round(result.netPerPeriod * (payFreq === "weekly" ? 52 : payFreq === "biweekly" ? 26 : payFreq === "semimonthly" ? 24 : 12)),
          }}
        />
      </div>

      <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Sparkles className="h-5 w-5 text-amber-600" /> AI Insight
            <Badge variant="secondary" className="bg-amber-100 text-amber-700">Paycheck Analysis</Badge>
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
            <Info className="h-3 w-3" /> Uses 2025 federal brackets & standard deduction. State tax is an estimate.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
