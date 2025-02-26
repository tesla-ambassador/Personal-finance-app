import { Button } from "./ui/button";
import { DialogClose } from "./ui/dialog";

interface DeleteModalProps {
  name: string;
  type: "budget" | "pot";
  theme: string;
  handleDelete: (themeId: string) => void;
}

export function DeleteModal({
  name,
  theme,
  type,
  handleDelete,
}: DeleteModalProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-[#201F24] font-bold text-[2rem]">
        Delete &apos;{name}&apos;?
      </h2>
      <p className="text-[#696868] text-[0.875rem]">{`Are you sure you want to delete this ${type}? This action cannot be
        reversed, and all the data inside it will be removed forever.`}</p>
      <div>
        <Button
          variant={"destructive"}
          onClick={() => {
            handleDelete(theme);
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
