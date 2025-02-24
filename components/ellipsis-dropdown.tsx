import React from "react";
import { Ellipsis } from "./icons/pots-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "./ui/dropdown-menu";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog";

import { Separator } from "./ui/separator";
import { BudgetsEditForm } from "@/app/budgets/budgets-forms";
import { PotsEditForm } from "@/app/pots/pots-forms";
import { DeleteBudgetModal } from "@/app/budgets/delete-budget-modal";
import { DeletePotModal } from "@/app/pots/delete-pot-modal";
import { captitalizeFirst } from "@/hooks/capitalize-first-word";

interface EllipsisDropdownProps {
  name: string;
  type: "budget" | "pot";
  amount: number;
  theme: string;
  total?: number;
}

export function EllipsisDropdown({
  name,
  type,
  amount,
  theme,
  total,
}: EllipsisDropdownProps) {
  const [isEdit, setIsEdit] = React.useState<boolean>(true);
  const typeOfTransaction = captitalizeFirst(type);
  return (
    <>
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-[#201F24] p-1">
            <Ellipsis className="fill-[#B3B3B3]" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="sr-only">
                Edit or Delete {typeOfTransaction}
              </DropdownMenuLabel>
              <DialogTrigger
                onClick={() => {
                  setIsEdit(true);
                }}
                asChild
              >
                <DropdownMenuItem className="text-[#201F24] focus:cursor-pointer focus:text-[#201F24]">
                  Edit {typeOfTransaction}
                </DropdownMenuItem>
              </DialogTrigger>
              <Separator className="my-1" />
              <DialogTrigger
                onClick={() => {
                  setIsEdit(false);
                }}
                asChild
              >
                <DropdownMenuItem className="text-[#C94736] focus:cursor-pointer focus:text-[#C94736]">
                  Delete {typeOfTransaction}
                </DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogContent>
          <DialogHeader className="sr-only">
            <DialogTitle>Edit or Delete Model</DialogTitle>
            <DialogDescription>
              This is a model that contains a form to edit your {type}
            </DialogDescription>
          </DialogHeader>
          {isEdit ? (
            type === "budget" ? (
              <BudgetsEditForm category={name} theme={theme} maximum={amount} />
            ) : (
              total && (
                <PotsEditForm
                  name={name}
                  theme={theme}
                  target={amount}
                  total={total}
                />
              )
            )
          ) : type === "budget" ? (
            <DeleteBudgetModal name={name} theme={theme} />
          ) : (
            <DeletePotModal name={name} theme={theme} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
