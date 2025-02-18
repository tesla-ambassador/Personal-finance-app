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
import { EditForm } from "./forms/edit-form";
import { DeleteModal } from "./icons/delete-modal";
import { captitalizeFirst } from "@/hooks/capitalize-first-word";

interface EllipsisDropdownProps {
  name: string;
  type: "budget" | "pots";
  amount: string;
  theme: string;
  total: number;
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
            <EditForm
              type={type}
              name={name}
              amount={amount}
              theme={theme}
              total={total}
            />
          ) : (
            <DeleteModal
              name={name}
              type={type}
              theme={theme}
              description={`Are you sure you want to delete this ${type}? This action cannot be
        reversed, and all the data inside it will be removed forever.`}
              cancelDelete={() => {
                console.log("Closed Modal");
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
