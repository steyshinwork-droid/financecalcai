"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Home, DollarSign, Percent, Sparkles, Info, TrendingUp } from "lucide-react";
import { SaveCalculationButton } from "@/components/save-calculation-button";

function useNumInput(initial: number) {
  const [str, setStr] = useState(String(initial));
  return [str, setStr, parseFloat(str) || 0] as const;
}

function fmt(n: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

function fmtPct(n: number): string {
  return n.toFixed(1) + "%";
}

function calcMonthlyPayment(principal: number, annualRate: number, termYears: number): number {
  const r = annualRate / 100 / 12;
  const n = termYears * 12;
  if (r === 0) return principal / n;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

export function HomeAffordabilityCalc() {
  const [incomeStr, setIncomeStr, income] = useNumInput(85000);
  const [monthlyDebtStr, setMonthlyDebtStr, monthlyDebt] = useNumInput(500);
  const [downPaymentStr, setDownPaymentStr, downPayment] = useNumInput(50000);
  const [rateStr, setRateStr, rate] = useNumInput(6.8);
  const [termYears, setTermYears] = useState(30);
  const [propTaxRateStr, setPropTaxRateStr, propTaxRate] = useNumInput(1.1);
  const [insuranceStr, setInsuranceStr, insurance] = useNumInput(1500);
  const [hoaStr, setHoaStr, hoa] = useNumInput(0);
  const [calculated, setCalculated] = useState(false);

  const results = useMemo(() => {
    if (!calculated) return null;
    if (income <= 0) return null;

    const monthlyGross = income / 12;

    // 28% front-end ratio: housing costs ≤ 28% of gross income
    const maxHousingPayment = monthlyGross * 0.28;
    // 36% back-end ratio: total debt ≤ 36% of gross income
    const maxTotalDebt = monthlyGross * 0.36;
    const maxHousingFromBackEnd = Math.max(0, maxTotalDebt - monthlyDebt);

    // Use the more restrictive of front-end and back-end
    const maxPITIA = Math.min(maxHousingPayment, maxHousingFromBackEnd);

    // Monthly taxes + insurance + HOA (non-loan components)
    // We need to estimate home price iteratively since tax is % of price
    // Approximate: solve for loan amount first, then iterate
    const propTaxMonthly = (price: number) => (price * propTaxRate) / 100 / 12;
    const insuranceMonthly = insurance / 12;
    const hoaMonthly = hoa;

    // Iterate to find max home price
    let homePrice = 300000;
    for (let i = 0; i < 50; i++) {
      const loanAmount = homePrice - downPayment;
      if (loanAmount <= 0) { homePrice = downPayment; break; }
      const pi = calcMonthlyPayment(loanAmount, rate, termYears);
      const totalHousing = pi + propTaxMonthly(homePrice) + insuranceMonthly + hoaMonthly;
      const diff = maxPITIA - totalHousing;
      if (Math.abs(diff) < 1) break;
      homePrice += diff * 10;
    }
    homePrice = Math.max(downPayment, homePrice);

    const loanAmount = homePrice - downPayment;
    const pi = calcMonthlyPayment(loanAmount, rate, termYears);
    const taxMonthly = propTaxMonthly(homePrice);
    const insMonthly = insuranceMonthly;
    const totalMonthlyHousing = pi + taxMonthly + insMonthly + hoaMonthly;
    const totalMonthlyDebt = totalMonthlyHousing + monthlyDebt;

    const frontEndDTI = (totalMonthlyHousing / monthlyGross) * 100;
    const backEndDTI = (totalMonthlyDebt / monthlyGross) * 100;

    const downPaymentPct = downPayment > 0 ? (downPayment / homePrice) * 100 : 0;
    const totalInterest = pi * termYears * 12 - loanAmount;

    return {
      homePrice,
      loanAmount,
      downPaymentPct,
      pi,
      taxMonthly,
      insMonthly,
      hoaMonthly,
      totalMonthlyHousing,
      totalMonthlyDebt,
      frontEndDTI,
      backEndDTI,
      monthlyGross,
      maxHousingPayment,
      totalInterest,
    };
  }, [calculated, income, monthlyDebt, downPayment, rate, termYears, propTaxRate, insurance, hoa]);

  const aiInsight = useMemo(() => {
    if (!results) return "";
    const lines: string[] = [];

    lines.push(
      `Based on your ${fmt(income)} income and ${fmt(monthlyDebt)}/month in existing debts, you can afford a home up to ${fmt(results.homePrice)} with ${fmt(downPayment)} down. Your estimated monthly housing cost is ${fmt(results.totalMonthlyHousing)}.`
    );

    if (results.frontEndDTI > 28) {
      lines.push(
        `Your housing-to-income ratio (${fmtPct(results.frontEndDTI)}) is above the recommended 28%. Lenders may still approve you, but consider increasing your down payment or targeting a lower price to reduce monthly payments.`
      );
    } else {
      lines.push(
        `Your housing-to-income ratio is ${fmtPct(results.frontEndDTI)} — well within the recommended 28% guideline. This gives you a comfortable cushion for unexpected expenses.`
      );
    }

    if (results.downPaymentPct < 20) {
      lines.push(
        `Your down payment is ${fmtPct(results.downPaymentPct)} of the home price — below the 20% threshold. You'll likely need to pay private mortgage insurance (PMI), typically 0.5–1.5% of the loan annually. Adding PMI to your budget would reduce affordability slightly.`
      );
    } else {
      lines.push(
        `Your ${fmtPct(results.downPaymentPct)} down payment exceeds 20%, so you avoid private mortgage insurance (PMI) — saving you hundreds per month.`
      );
    }

    lines.push(
      `Remember: lender qualification and true affordability differ. Just because a bank approves you for this amount doesn't mean it's the right choice for your lifestyle. Factor in maintenance (1–2% of home value/year), utilities, and future goals before committing.`
    );

    return lines.join("\n\n");
  }, [results, income, monthlyDebt, downPayment]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Home className="h-5 w-5 text-blue-600" />
            Your Financial Picture
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-1">
              <Label className="flex items-center gap-1">
                <DollarSign className="h-3.5 w-3.5 text-gray-400" />
                Annual Gross Income
              </Label>
              <Input
                type="text"
                inputMode="numeric"
                value={incomeStr}
                onChange={(e) => { setIncomeStr(e.target.value); setCalculated(false); }}
                onFocus={(e) => e.target.select()}
              />
            </div>
            <div className="space-y-1">
              <Label className="flex items-center gap-1">
                <DollarSign className="h-3.5 w-3.5 text-gray-400" />
                Monthly Debt Payments (car, student loans, etc.)
              </Label>
              <Input
                type="text"
                inputMode="numeric"
                value={monthlyDebtStr}
                onChange={(e) => { setMonthlyDebtStr(e.target.value); setCalculated(false); }}
                onFocus={(e) => e.target.select()}
              />
            </div>
            <div className="space-y-1">
              <Label className="flex items-center gap-1">
                <DollarSign className="h-3.5 w-3.5 text-gray-400" />
                Down Payment
              </Label>
              <Input
                type="text"
                inputMode="numeric"
                value={downPaymentStr}
                onChange={(e) => { setDownPaymentStr(e.target.value); setCalculated(false); }}
                onFocus={(e) => e.target.select()}
              />
            </div>
            <div className="space-y-1">
              <Label className="flex items-center gap-1">
                <Percent className="h-3.5 w-3.5 text-gray-400" />
                Mortgage Interest Rate (%)
              </Label>
              <Input
                type="text"
                inputMode="decimal"
                value={rateStr}
                onChange={(e) => { setRateStr(e.target.value); setCalculated(false); }}
                onFocus={(e) => e.target.select()}
              />
            </div>
          </div>

          <Separator />

          <div>
            <Label className="mb-2 block">Loan Term</Label>
            <div className="flex gap-3">
              {[15, 20, 30].map((y) => (
                <Button
                  key={y}
                  variant={termYears === y ? "default" : "outline"}
                  size="sm"
                  className={termYears === y ? "bg-blue-600 hover:bg-blue-700" : ""}
                  onClick={() => { setTermYears(y); setCalculated(false); }}
                >
                  {y} years
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            <div className="space-y-1">
              <Label className="flex items-center gap-1">
                <Percent className="h-3.5 w-3.5 text-gray-400" />
                Property Tax Rate (%)
              </Label>
              <Input
                type="text"
                inputMode="decimal"
                value={propTaxRateStr}
                onChange={(e) => { setPropTaxRateStr(e.target.value); setCalculated(false); }}
                onFocus={(e) => e.target.select()}
              />
            </div>
            <div className="space-y-1">
              <Label className="flex items-center gap-1">
                <DollarSign className="h-3.5 w-3.5 text-gray-400" />
                Annual Home Insurance ($)
              </Label>
              <Input
                type="text"
                inputMode="numeric"
                value={insuranceStr}
                onChange={(e) => { setInsuranceStr(e.target.value); setCalculated(false); }}
                onFocus={(e) => e.target.select()}
              />
            </div>
            <div className="space-y-1">
              <Label className="flex items-center gap-1">
                <DollarSign className="h-3.5 w-3.5 text-gray-400" />
                Monthly HOA ($)
              </Label>
              <Input
                type="text"
                inputMode="numeric"
                value={hoaStr}
                onChange={(e) => { setHoaStr(e.target.value); setCalculated(false); }}
                onFocus={(e) => e.target.select()}
              />
            </div>
          </div>

          <Button
            className="w-full bg-blue-600 hover:bg-blue-700"
            size="lg"
            onClick={() => setCalculated(true)}
          >
            Calculate Affordability
          </Button>
        </CardContent>
      </Card>

      {results && (
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            <Card className="border-blue-200 bg-blue-50 sm:col-span-1">
              <CardContent className="pt-6">
                <p className="text-sm text-blue-700">Max Home Price</p>
                <p className="text-3xl font-bold text-blue-800">{fmt(results.homePrice)}</p>
                <p className="mt-1 text-xs text-blue-600">{fmt(downPayment)} down · {fmt(results.loanAmount)} loan</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-500">Monthly Housing Cost</p>
                <p className="text-2xl font-bold text-gray-900">{fmt(results.totalMonthlyHousing)}</p>
                <p className="mt-1 text-xs text-gray-400">P&amp;I + taxes + insurance{hoa > 0 ? " + HOA" : ""}</p>
              </CardContent>
            </Card>
            <Card className={results.backEndDTI <= 36 ? "border-emerald-200 bg-emerald-50" : "border-amber-200 bg-amber-50"}>
              <CardContent className="pt-6">
                <p className={`text-sm ${results.backEndDTI <= 36 ? "text-emerald-700" : "text-amber-700"}`}>Total DTI Ratio</p>
                <p className={`text-2xl font-bold ${results.backEndDTI <= 36 ? "text-emerald-800" : "text-amber-800"}`}>{fmtPct(results.backEndDTI)}</p>
                <p className={`mt-1 text-xs ${results.backEndDTI <= 36 ? "text-emerald-600" : "text-amber-600"}`}>
                  {results.backEndDTI <= 36 ? "Within 36% guideline" : "Above 36% — may be harder to qualify"}
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base font-semibold text-gray-800">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                Monthly Payment Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { label: "Principal & Interest", value: results.pi, color: "bg-blue-500" },
                  { label: "Property Tax", value: results.taxMonthly, color: "bg-amber-400" },
                  { label: "Home Insurance", value: results.insMonthly, color: "bg-emerald-400" },
                  ...(hoa > 0 ? [{ label: "HOA", value: results.hoaMonthly, color: "bg-purple-400" }] : []),
                ].map(({ label, value, color }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className={`h-3 w-3 rounded-full ${color}`} />
                    <div className="flex flex-1 items-center justify-between">
                      <span className="text-sm text-gray-600">{label}</span>
                      <span className="text-sm font-semibold text-gray-800">{fmt(value)}/mo</span>
                    </div>
                    <div className="w-24">
                      <div className="h-2 rounded-full bg-gray-100">
                        <div
                          className={`h-2 rounded-full ${color}`}
                          style={{ width: `${Math.min(100, (value / results.totalMonthlyHousing) * 100).toFixed(0)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <Separator />
                <div className="flex items-center justify-between font-semibold">
                  <span className="text-sm text-gray-700">Total Monthly Housing</span>
                  <span className="text-sm text-gray-900">{fmt(results.totalMonthlyHousing)}/mo</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4 rounded-lg bg-gray-50 p-4">
                <div>
                  <p className="text-xs text-gray-500">Front-end DTI</p>
                  <p className={`text-lg font-bold ${results.frontEndDTI <= 28 ? "text-emerald-600" : "text-amber-600"}`}>
                    {fmtPct(results.frontEndDTI)}
                  </p>
                  <p className="text-xs text-gray-400">Guideline: ≤ 28%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Back-end DTI</p>
                  <p className={`text-lg font-bold ${results.backEndDTI <= 36 ? "text-emerald-600" : "text-amber-600"}`}>
                    {fmtPct(results.backEndDTI)}
                  </p>
                  <p className="text-xs text-gray-400">Guideline: ≤ 36%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sparkles className="h-5 w-5 text-purple-600" />
                AI Insight
                <Badge variant="secondary" className="bg-purple-100 text-purple-700">Affordability Analysis</Badge>
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
              calculatorType="home-affordability"
              title={`${fmt(income)}/yr income, ${fmt(downPayment)} down → ${fmt(results.homePrice)} max`}
              inputs={{ income, monthlyDebt, downPayment, rate, termYears, propTaxRate, insurance, hoa }}
              results={{
                homePrice: Math.round(results.homePrice),
                loanAmount: Math.round(results.loanAmount),
                monthlyPayment: Math.round(results.totalMonthlyHousing),
                frontEndDTI: parseFloat(results.frontEndDTI.toFixed(1)),
                backEndDTI: parseFloat(results.backEndDTI.toFixed(1)),
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}
