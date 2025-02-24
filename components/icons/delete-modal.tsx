import { Button } from "../ui/button";
import { usePotsStore } from "@/provider/pots-provider";
import { DialogClose } from "../ui/dialog";

interface DeleteModalProps {
  name: string;
  description: string;
  type: "budget" | "pots";
  theme: string;
}

export function DeleteModal({
  name,
  description,
  type,
  theme,
}: DeleteModalProps) {
  const { deletePot } = usePotsStore((state) => state);
  return (
    <div className="space-y-4">
      <h2 className="text-[#201F24] font-bold text-[2rem]">
        Delete &apos;{name}&apos;?
      </h2>
      <p className="text-[#696868] text-[0.875rem]">{description}</p>
      <div>
        <Button
          variant={"destructive"}
          onClick={() => {
            type === "pots" && deletePot(theme);
          }}
          className="bg-[#C94736] hover:bg-[#C94736]/90 w-full p-4"
        >
          Yes, Confirm Deletion
        </Button>
        <DialogClose asChild>
          <Button
            variant={"link"}
            className="w-full hover:no-underline text-[#696868] hover:text-[#201F24]"
          >
            No, Go Back
          </Button>
        </DialogClose>
      </div>
    </div>
  );
}
