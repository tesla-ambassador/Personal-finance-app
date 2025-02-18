import { Button } from "../ui/button";
import { Plus } from "lucide-react";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
} from "../ui/dialog";
import { GeneralForm } from "../forms/general-form";

interface PageHeaderProps {
  pageName: string;
  containsForm: boolean;
  uploadFormType?: "budget" | "pots";
}

export function PageHeader({
  pageName,
  containsForm,
  uploadFormType,
}: PageHeaderProps) {
  return (
    <>
      <Dialog>
        <div className="py-8 flex justify-between items-center">
          <h1 className="text-[2rem] font-bold">Pots</h1>
          {containsForm && (
            <DialogTrigger asChild>
              <Button className="p-4 bg-[#201F24] text-white text-[0.875rem] flex items-center gap-1">
                <Plus />
                <span>Add New Pot</span>
              </Button>
            </DialogTrigger>
          )}
        </div>
        <DialogContent>
          <DialogHeader className="sr-only">
            <DialogTitle>Dialog uploading new {pageName}</DialogTitle>
            <DialogDescription>
              This Contains an upload form for uploading new {pageName}
            </DialogDescription>
          </DialogHeader>
          {uploadFormType && (
            <GeneralForm isEdit={false} type={uploadFormType} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
