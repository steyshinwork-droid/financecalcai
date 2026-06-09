"use client";

import { useState, useEffect } from "react";
import { Bookmark, BookmarkCheck, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase";
import Link from "next/link";

interface Props {
  calculatorType: string;
  title: string;
  inputs: Record<string, unknown>;
  results: Record<string, unknown>;
}

export function SaveCalculationButton({ calculatorType, title, inputs, results }: Props) {
  const [isPro, setIsPro] = useState<boolean | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function checkPro() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setIsPro(false); return; }
      const { data } = await supabase.from("profiles").select("is_pro").eq("id", user.id).single();
      setIsPro(!!data?.is_pro);
    }
    checkPro();
  }, []);

  async function handleSave() {
    if (isSaving || saved) return;
    setIsSaving(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setIsSaving(false); return; }
    await supabase.from("saved_calculations").insert({
      user_id: user.id,
      calculator_type: calculatorType,
      title,
      inputs,
      results,
    });
    setIsSaving(false);
    setSaved(true);
  }

  if (isPro === null) return null;

  if (!isPro) {
    return (
      <Link href="/pricing">
        <Button variant="outline" size="sm" className="gap-2 text-gray-400 border-dashed">
          <Lock className="h-4 w-4" />
          Save Calculation (PRO)
        </Button>
      </Link>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className={`gap-2 transition-colors ${saved ? "border-emerald-300 text-emerald-600 bg-emerald-50" : "hover:border-emerald-300 hover:text-emerald-600"}`}
      onClick={handleSave}
      disabled={isSaving}
    >
      {saved ? (
        <><BookmarkCheck className="h-4 w-4" /> Saved!</>
      ) : (
        <><Bookmark className="h-4 w-4" /> {isSaving ? "Saving..." : "Save Calculation"}</>
      )}
    </Button>
  );
}
