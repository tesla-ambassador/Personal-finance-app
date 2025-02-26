"use client";
import { GeneralForm } from "@/components/forms/general-form";
import { EditForm } from "@/components/forms/edit-form";
import { useBudgetStore } from "@/provider/budgets-provider";
import { Pot } from "@/store/pots-store";
import { Budget } from "@/store/budgets-store";

export function BudgetsUploadForm() {
  const { budgets, createBudget } = useBudgetStore((state) => state);

  function handleFormSubmit(formData: Pot | Budget) {
    createBudget(formData as Budget);
  }

  return (
    <>
      <GeneralForm
        type="budget"
        handleOnSubmit={handleFormSubmit}
        dataArray={budgets}
      />
    </>
  );
}

interface BudgetEditFormProps {
  category: string;
  maximum: number;
  theme: string;
}

export function BudgetsEditForm({
  category,
  maximum,
  theme,
}: BudgetEditFormProps) {
  const { budgets, editBudget } = useBudgetStore((state) => state);

  function handleFormSubmit(formData: Pot | Budget, themeId: string) {
    console.log(formData as Budget)
    editBudget(themeId, formData as Budget);
  }

  return (
    <>
      <EditForm
        dataArray={budgets}
        handleOnSubmit={handleFormSubmit}
        theme={theme}
        amount={maximum.toString()}
        category={category}
        type="budget"
      />
    </>
  );
}
