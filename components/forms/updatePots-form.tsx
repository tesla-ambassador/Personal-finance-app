"use client";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
  FormField,
} from "@/components/ui/form";
import { FormHeading } from "./general-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { DialogClose } from "@radix-ui/react-dialog";

import { WithdrawAddPotsProgressBar } from "../progress-bars";
import { usePotsStore } from "@/provider/pots-provider";

const formSchema = z.object({
  amount: z
    .string()
    .nonempty({ message: "Amount must contain at least 1 digit." })
    .regex(/^\d+$/, "Must be a number"),
});

interface WithdrawOrAddPotsFormProps {
  type: "Withdraw" | "Add";
  name: string;
  total: number;
  target: number;
  theme: string;
}

export function WithdrawOrAddPotsForm({
  type,
  name,
  total,
  target,
  theme,
}: WithdrawOrAddPotsFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
    },
  });
  const [progressValue, setProgressValue] = React.useState<number>(0);
  const closeRef = React.useRef<HTMLButtonElement>(null);
  const { updateTotal, balance } = usePotsStore((state) => state);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const validNewValue = Math.max(
      0,
      Math.min(progressValue, type === "Add" ? target - total : total),
    );
    if (type === "Add") {
      const finalValue = validNewValue + total;
      const remainingBalance = balance.current - validNewValue;
      updateTotal(finalValue, theme, remainingBalance);
    } else {
      const finalValue = total - validNewValue;
      const remainingBalance = balance.current + validNewValue;
      updateTotal(finalValue, theme, remainingBalance);
    }
    if (closeRef.current) {
      closeRef.current.click();
    }
  }
  return (
    <div className="space-y-4">
      {type === "Add" ? (
        <FormHeading
          title={`Add to '${name}'?`}
          desc="Add money to your pot to keep it separate from your main balance. As soon as you add this money, it will be deducted from your current balance."
        />
      ) : (
        <FormHeading
          title={`Withdraw from '${name}'?`}
          desc="Withdraw from your pot to put money back in your main balance. This will reduce the amount you have in this pot."
        />
      )}
      <WithdrawAddPotsProgressBar
        newValue={progressValue}
        total={total}
        target={target}
        type={type}
      />
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                {type === "Withdraw" ? (
                  <FormLabel className="text-[#696868] font-semibold">
                    Amount To Withdraw
                  </FormLabel>
                ) : (
                  <FormLabel className="text-[#696868] font-semibold">
                    Amount To Add
                  </FormLabel>
                )}
                <FormControl>
                  <div className="relative flex">
                    <Input
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        setProgressValue(Number(e.target.value));
                      }}
                      placeholder="e.g. 20"
                      className="px-5 pl-8 placeholder:text-[#B3B3B3]"
                      autoComplete="off"
                    />
                    <span className="absolute left-5 top-0 h-full flex items-center text-[#B3B3B3]">
                      $
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full p-4">
            {type === "Withdraw" ? "Confirm Withdrawal" : "Confirm Addition"}
          </Button>
          <DialogClose ref={closeRef} className="hidden" />
        </form>
      </Form>
    </div>
  );
}
