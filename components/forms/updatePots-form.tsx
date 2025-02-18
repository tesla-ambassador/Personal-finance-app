"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "../ui/input";

import { WithdrawAddPotsProgressBar } from "../progress-bars";

const formSchema = z.object({
  amount: z.string().nonempty().regex(/^\d+$/, "Must be a number"),
});

export function WithdrawOrAddPotsForm() {
  return (
    <div>
      <WithdrawAddPotsProgressBar
        newValue={200}
        total={139}
        target={2000}
        type="Add"
      />
    </div>
  );
}
