"use client";
import React from "react";
import { GeneralForm } from "@/components/forms/general-form";
import { usePotsStore } from "@/provider/pots-provider";
import { Pot } from "@/store/pots-store";
import { Budget } from "@/store/budgets-store";
import { EditForm } from "@/components/forms/edit-form";
import { toast } from "@/hooks/use-toast";

export function PotsUploadForm() {
  const { pots, addPot, balance } = usePotsStore((state) => state);
  const totalTargets = React.useMemo(() => {
    return pots.reduce((acc, pot) => acc + pot.target, 0);
  }, [pots]);

  function handleFormSubmit(formData: Pot | Budget) {
    const checkFormData = formData as Pot;
    if (
      checkFormData.target > balance.current ||
      totalTargets > balance.current
    ) {
      toast({
        title: "Insufficient Balance",
        description: "You do not have enough balance to create this pot.",
        variant: "destructive",
      });
      return;
    }
    addPot(formData as Pot);
  }
  return (
    <>
      <GeneralForm
        dataArray={pots}
        handleOnSubmit={handleFormSubmit}
        type="pot"
      />
    </>
  );
}

interface PotsEditFormProps {
  target: number;
  name: string;
  theme: string;
  total: number;
}

export function PotsEditForm({
  target,
  name,
  theme,
  total,
}: PotsEditFormProps) {
  const { pots, editPot } = usePotsStore((state) => state);
  function handleFormSubmit(formData: Pot | Budget, themeId: string) {
    editPot(themeId, formData as Pot);
  }
  return (
    <>
      <EditForm
        handleOnSubmit={handleFormSubmit}
        type="pot"
        theme={theme}
        name={name}
        amount={target.toString()}
        dataArray={pots}
        total={total}
      />
    </>
  );
}
