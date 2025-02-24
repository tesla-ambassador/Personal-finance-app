import { DeleteModal } from "@/components/icons/delete-modal";
import { usePotsStore } from "@/provider/pots-provider";

interface DeletePotProps {
  theme: string;
  name: string;
}

export function DeletePotModal({ theme, name }: DeletePotProps) {
  const { deletePot } = usePotsStore((state) => state);
  function onDelete(themeId: string) {
    deletePot(themeId);
  }
  return (
    <>
      <DeleteModal
        theme={theme}
        name={name}
        type="pot"
        handleDelete={onDelete}
      />
    </>
  );
}
