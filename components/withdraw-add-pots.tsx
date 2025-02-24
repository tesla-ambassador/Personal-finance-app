"use client";
import React from "react";
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

interface UpdatePotsTotalProps {
  name: string;
  total: number;
  target: number;
  theme: string;
}

export function UpdatePotsTotal({
  name,
  total,
  target,
  theme,
}: UpdatePotsTotalProps) {
  const [typeOfUpdate, setTypeOfUpdate] = React.useState<"Withdraw" | "Add">(
    "Withdraw"
  );
  return (
    <Dialog>
      <div className="transition-all duration-100 ease-in-out w-full flex justify-between items-center gap-4">
        <DialogTrigger asChild>
          <Button
            onClick={() => setTypeOfUpdate("Add")}
            className="bg-[#F8F4F0] text-black hover:bg-white hover:border-[#98908B] hover:border-2 active:scale-95 w-full"
          >
            <Plus />
            <span>Add Money</span>
          </Button>
        </DialogTrigger>
        <DialogTrigger asChild>
          <Button
            onClick={() => setTypeOfUpdate("Withdraw")}
            className="bg-[#F8F4F0] text-black hover:bg-white hover:border-[#98908B] hover:border-2 active:scale-95 w-full"
          >
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
        <WithdrawOrAddPotsForm
          target={target}
          total={total}
          type={typeOfUpdate}
          name={name}
          theme={theme}
        />
      </DialogContent>
    </Dialog>
  );
}
