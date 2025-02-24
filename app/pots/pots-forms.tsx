"use client";
import { GeneralForm } from "@/components/forms/general-form";
import { usePotsStore } from "@/provider/pots-provider";
import { Pot } from "@/store/pots-store";
import { Budget } from "@/store/budgets-store";
import { EditForm } from "@/components/forms/edit-form";

export function PotsUploadForm() {
  const { pots, addPot } = usePotsStore((state) => state);
  function handleFormSubmit(formData: Pot | Budget) {
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

export function PotsEditForm({ target, name, theme, total }: PotsEditFormProps) {
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
