"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { DollarSign, Users, Percent } from "lucide-react";

function useNumInput(initial: number) {
  const [str, setStr] = useState(String(initial));
  return [str, setStr, parseFloat(str) || 0] as const;
}

const TIP_PRESETS = [10, 15, 18, 20, 25];

export function TipCalc() {
  const [billStr, setBill, bill] = useNumInput(85);
  const [tipStr, setTip, tip] = useNumInput(18);
  const [peopleStr, setPeople, people] = useNumInput(2);

  const results = useMemo(() => {
    const safePeople = Math.max(1, Math.round(people));
    const tipAmount = bill * (tip / 100);
    const total = bill + tipAmount;
    const perPerson = total / safePeople;
    const tipPerPerson = tipAmount / safePeople;
    return { tipAmount, total, perPerson, tipPerPerson, safePeople };
  }, [billStr, tipStr, peopleStr]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Calculate Your Tip</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label className="flex items-center gap-1">
              <DollarSign className="h-4 w-4 text-gray-400" /> Bill Amount
            </Label>
            <Input
              type="text"
              inputMode="decimal"
              value={billStr}
              onChange={(e) => setBill(e.target.value)}
              onFocus={(e) => e.target.select()}
              className="text-lg"
            />
          </div>

          <div className="space-y-3">
            <Label className="flex items-center gap-1">
              <Percent className="h-4 w-4 text-gray-400" /> Tip Percentage
            </Label>
            <div className="flex flex-wrap gap-2">
              {TIP_PRESETS.map((p) => (
                <button
                  key={p}
                  onClick={() => setTip(String(p))}
                  className={`rounded-lg border px-4 py-2 text-sm font-semibold transition ${
                    Math.round(tip) === p
                      ? "border-emerald-500 bg-emerald-500 text-white"
                      : "border-gray-200 bg-white text-gray-700 hover:border-emerald-300"
                  }`}
                >
                  {p}%
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Input
                type="text"
                inputMode="decimal"
                value={tipStr}
                onChange={(e) => setTip(e.target.value)}
                onFocus={(e) => e.target.select()}
                className="max-w-[120px]"
              />
              <span className="text-gray-500">% custom</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-1">
              <Users className="h-4 w-4 text-gray-400" /> Split Between (people)
            </Label>
            <Input
              type="text"
              inputMode="numeric"
              value={peopleStr}
              onChange={(e) => setPeople(e.target.value)}
              onFocus={(e) => e.target.select()}
              className="max-w-[120px]"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="border-emerald-200 bg-emerald-50">
          <CardContent className="pt-6">
            <p className="text-sm text-emerald-700">Tip Amount</p>
            <p className="text-3xl font-bold text-emerald-800">
              ${results.tipAmount.toFixed(2)}
            </p>
            {results.safePeople > 1 && (
              <p className="text-sm text-emerald-600">
                ${results.tipPerPerson.toFixed(2)} per person
              </p>
            )}
          </CardContent>
        </Card>
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <p className="text-sm text-blue-700">Total Bill</p>
            <p className="text-3xl font-bold text-blue-800">
              ${results.total.toFixed(2)}
            </p>
            {results.safePeople > 1 && (
              <p className="text-sm text-blue-600">
                ${results.perPerson.toFixed(2)} per person
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {results.safePeople > 1 && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Each person pays</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${results.perPerson.toFixed(2)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Split {results.safePeople} ways</p>
                <p className="text-sm text-gray-500">
                  Tip: ${results.tipPerPerson.toFixed(2)} + Bill: ${(bill / results.safePeople).toFixed(2)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="border-amber-100 bg-amber-50">
        <CardContent className="pt-5">
          <Separator className="mb-4" />
          <div className="space-y-2 text-sm text-amber-800">
            <div className="flex justify-between">
              <span>Bill subtotal</span>
              <span className="font-medium">${bill.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tip ({tip}%)</span>
              <span className="font-medium">${results.tipAmount.toFixed(2)}</span>
            </div>
            <Separator className="my-1" />
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${results.total.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
