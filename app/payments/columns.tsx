"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
  category: "anime" | "show" | "movie" | "music" | "all";
};

// Column def: This defines the shape of our table.
export const columns: ColumnDef<Payment>[] = [
  { accessorKey: "status", header: "Status" },
  {
    accessorKey: "email",
    // header: ({ column }) => {
    //   return (
    //     <Button
    //       variant={"ghost"}
    //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //     >
    //       Email
    //       <ArrowUpDown className="h-4 w-4 ml-2" />
    //     </Button>
    //   );
    // },
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-Us", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  { accessorKey: "category", header: "Category" },
];
