import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { WithdrawOrAddPotsForm } from "./forms/updatePots-form";

import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

export function UpdatePotsTotal() {
  return (
    <Dialog>
      <div className="transition-all duration-100 ease-in-out w-full flex justify-between items-center gap-4">
        <DialogTrigger asChild>
          <Button className="bg-[#F8F4F0] text-black hover:bg-white hover:border-[#98908B] hover:border-2 active:scale-95 w-full">
            <Plus />
            <span>Add Money</span>
          </Button>
        </DialogTrigger>
        <DialogTrigger asChild>
          <Button className="bg-[#F8F4F0] text-black hover:bg-white hover:border-[#98908B] hover:border-2 active:scale-95 w-full">
            Withdraw
          </Button>
        </DialogTrigger>
      </div>
      <DialogContent>
        <DialogHeader className="sr-only">
          <DialogTitle>Form to Update Pots total</DialogTitle>
          <DialogDescription>
            This is a simple form with one input to perform a withdrawal or
            addition of a pot
          </DialogDescription>
        </DialogHeader>
        <WithdrawOrAddPotsForm />
      </DialogContent>
    </Dialog>
  );
}
