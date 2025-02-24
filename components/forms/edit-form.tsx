import React from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePotsStore } from "@/provider/pots-provider";

import {
  Form,
  FormLabel,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { FormHeading, budgetCategories, themeObject } from "./general-form";
import { DialogClose } from "../ui/dialog";
import { BillPaidIcon } from "../icons/success-error-icons";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import { Separator } from "@radix-ui/react-select";
import { Button } from "@/components/ui/button";
import { Pot } from "@/store/pots-store";

interface EditFormProps {
  name?: string;
  amount: string;
  type: "budget" | "pots";
  category?: string;
  theme: string;
  total?: number;
}

export function EditForm({
  name,
  amount,
  type,
  category,
  theme,
  total,
}: EditFormProps) {
  const editFormSchema = z.object({
    name: z
      .string({ required_error: "Pots name is Required" })
      .min(2, { message: "Pot name should be 2 characters or more." })
      .max(30, { message: "Pot name should be less than 30 characters." })
      .nonempty({ message: "Pots name is Required." }),
    amount: z.string().nonempty({
      message:
        type === "budget" ? "Please set a Maximum Limit" : "Plese set a target",
    }),
    theme: z.string(),
    budgetCategory: z.string(),
  });

  const closeRef = React.useRef<HTMLButtonElement>(null);

  const { editPot, pots } = usePotsStore((state) => state);

  const form = useForm<z.infer<typeof editFormSchema>>({
    resolver: zodResolver(editFormSchema),
    defaultValues: {
      name: name ? name : "",
      amount: amount,
      theme: theme,
      budgetCategory: category ? category : "",
    },
  });

  function onSubmit(values: z.infer<typeof editFormSchema>) {
    if (type === "pots" && total) {
      const updatedPot: Pot = {
        name: values.name,
        target: Number(values.amount),
        total: total,
        theme: values.theme,
      };
      editPot(theme, updatedPot);
    } else {
      console.log("Somn ain't right");
    }
    if (closeRef.current) {
      closeRef.current.click();
    }
  }
  return (
    <div className="space-y-4">
      {type === "budget" ? (
        <FormHeading
          title="Edit Budget"
          desc="As your budgets change, feel free to update your spending limits."
        />
      ) : (
        <FormHeading
          title="Edit Pot"
          desc="If your savings target change, feel free to edit your pots."
        />
      )}
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          {type === "budget" ? (
            <FormField
              control={form.control}
              name="budgetCategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#696868] font-semibold">
                    Budget Category
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {budgetCategories.map((category, index) => (
                          <div key={index}>
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                            {index !== budgetCategories.length - 1 && (
                              <Separator />
                            )}
                          </div>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          ) : (
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#696868] font-semibold">
                    Pot Name
                  </FormLabel>
                  <FormControl>
                    <div>
                      <Input
                        {...field}
                        className="px-5 py-3 placeholder:text-[#B3B3B3]"
                        placeholder="e.g. Rainy Days"
                        autoComplete="off"
                      />
                      <div className="pt-1 text-[0.75rem] text-end w-full">
                        {form.control._formState.errors?.name ? (
                          <FormMessage />
                        ) : 30 - field.value.length < 0 ? (
                          <span className="text-[#C94736]">
                            Pot name should be less than 30 characters.
                          </span>
                        ) : (
                          <span className="text-[#696868]">
                            {30 - field?.value.length} of 30 characters left
                          </span>
                        )}
                      </div>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                {type === "budget" ? (
                  <FormLabel className="text-[#696868] font-semibold">
                    Maximum Spend
                  </FormLabel>
                ) : (
                  <FormLabel className="text-[#696868] font-semibold">
                    Target
                  </FormLabel>
                )}
                <FormControl>
                  <div className="relative flex">
                    <Input
                      {...field}
                      placeholder="e.g. 2000"
                      className="px-5 pl-8 py-3 placeholder:text-[#B3B3B3]"
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
          <FormField
            control={form.control}
            name="theme"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#696868] font-semibold">
                  Theme
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="px-5 py-3">
                      {pots.some((pot) => pot.theme === field.value) ? (
                        <div className="flex items-center gap-4">
                          <div
                            style={{ backgroundColor: `${theme}` }}
                            className={`h-5 w-5 rounded-full`}
                          ></div>
                          <span>
                            {Object.keys(themeObject).filter(
                              (key) => themeObject[key] === theme
                            )}
                          </span>
                        </div>
                      ) : (
                        <SelectValue />
                      )}
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent
                    avoidCollisions={false}
                    className="max-h-[18.625rem]"
                  >
                    <SelectGroup className="space-y-3">
                      {Object.entries(themeObject).map(([key, val]) => (
                        <SelectItem
                          key={key}
                          value={val}
                          disabled={pots.some((pot) => pot.theme === val)}
                        >
                          <div className="w-full flex items-center">
                            <div className="flex items-center gap-4">
                              <div
                                style={{ backgroundColor: `${val}` }}
                                className={`h-5 w-5 rounded-full`}
                              ></div>
                              <span>{key}</span>
                            </div>
                            <div className="absolute right-10">
                              {pots.some((pot) => pot.theme === val) &&
                                val !== theme && <span>Already used</span>}
                              {val === form.formState.defaultValues?.theme && (
                                <div className="hide-from-trigger">
                                  <BillPaidIcon />
                                </div>
                              )}
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full p-4">
            Save Changes
          </Button>
          <DialogClose ref={closeRef} asChild className="hidden" />
        </form>
      </Form>
    </div>
  );
}
