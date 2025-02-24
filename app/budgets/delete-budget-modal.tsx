import { DeleteModal } from "@/components/icons/delete-modal";
import { useBudgetStore } from "@/provider/budgets-provider";

interface DeleteBudgetProps {
  theme: string;
  name: string;
}
export function DeleteBudgetModal({ theme, name }: DeleteBudgetProps) {
  const { deleteBudget } = useBudgetStore((state) => state);
  function onDelete(themeId: string) {
    deleteBudget(themeId);
  }
  return (
    <>
      <DeleteModal
        theme={theme}
        name={name}
        type="budget"
        handleDelete={onDelete}
      />
    </>
  );
}
