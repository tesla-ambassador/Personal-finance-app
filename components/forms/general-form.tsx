import React from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";

import {
  Form,
  FormLabel,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { DialogClose } from "../ui/dialog";

import { Input } from "@/components/ui/input";
import { BillPaidIcon } from "../icons/success-error-icons";

export const budgetCategories = [
  "Entertainment",
  "Bills",
  "Groceries",
  "Dining Out",
  "Transportation",
  "Personal Care",
  "Education",
  "Lifestyle",
  "Shopping",
  "General",
];

export const themeObject: { [key: string]: string } = {
  Green: "#277C78",
  Yellow: "#F2CDAC",
  Cyan: "#82C97D",
  Navy: "#626070",
  Red: "#C94736",
  Purple: "#826CB0",
  "Light Purple": "#AF81BA",
  Turquoise: "#597C7C",
  Brown: "#93674F",
  Magenta: "#934F6F",
  Blue: "#3F82B2",
  "Navy Gray": "#97A0AC",
  "Army Green": "#7F9161",
  Gold: "#CAB361",
  Orange: "#BE6C49",
};

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
import { Budget } from "@/store/budgets-store";

interface GeneralFormProps {
  name?: string;
  amount?: string;
  type: "budget" | "pots";
  isEdit: boolean;
  category?: string;
  theme?: string;
  total?: number;
  action: (newData: Pot | Budget) => void;
  dataArray: Pot[] | Budget[];
}

export function GeneralForm({ type, action, dataArray }: GeneralFormProps) {
  const generalFormSchema = z.object({
    name: z
      .string({ required_error: "Pots name is Required" })
      .min(2, { message: "Pot name should be 2 characters or more." })
      .max(30, { message: "Pot name should be less than 30 characters." })
      .nonempty({ message: "Pots name is Required." }),
    amount: z
      .string()
      .nonempty({
        message:
          type === "budget"
            ? "Please set a Maximum Limit"
            : "Plese set a target",
      })
      .regex(/^\d+$/, "Must be a number"),
    maximumSpend: z.string(),
    theme: z.string(),
    budgetCategory: z.string(),
  });

  const closeRef = React.useRef<HTMLButtonElement>(null);

  const form = useForm<z.infer<typeof generalFormSchema>>({
    resolver: zodResolver(generalFormSchema),
    defaultValues: {
      name: "",
      amount: "",
      maximumSpend: "",
      theme: "#277C78",
      budgetCategory: "Entertainment",
    },
  });

  function onSubmit(values: z.infer<typeof generalFormSchema>) {
    if (type === "pots") {
      const newPot: Pot = {
        name: values.name,
        target: Number(values.amount),
        total: 0,
        theme: values.theme,
      };
      if (dataArray.some((data) => data.theme === newPot.theme)) {
        toast({
          title: "Something isn't right!",
          description: "This theme is already in use.",
          variant: "destructive",
          className: "bg-[#C94736] text-lg",
        });
        return;
      } else {
        action(newPot)
      }
    } else {
      console.log("Type shiii");
    }
    if (closeRef.current) {
      closeRef.current.click();
    }
  }
  return (
    <div className="space-y-4">
      {type === "budget" ? (
        <FormHeading
          title="Add Budget"
          desc="Choose a category to set a spending budget. These categories can help you monitor spending."
        />
      ) : (
        <FormHeading
          title="Add Pot"
          desc="Create a pot to set savings targets. These can help keep you on track as you save for special purchases."
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
                      {dataArray.some((data) => data.theme === field.value) ? (
                        <div className="flex items-center gap-4">
                          <div
                            style={{
                              backgroundColor: `${form.formState.defaultValues?.theme}`,
                            }}
                            className={`h-5 w-5 rounded-full`}
                          ></div>
                          <span>
                            {Object.keys(themeObject).filter(
                              (key) =>
                                themeObject[key] ===
                                form.formState.defaultValues?.theme
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
                          disabled={dataArray.some((data) => data.theme === val)}
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
                              {dataArray.some((data) => data.theme === val) &&
                                val !== form.formState.defaultValues?.theme && (
                                  <span>Already used</span>
                                )}
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
            Add {type}
          </Button>
          <DialogClose ref={closeRef} className="hidden" />
        </form>
      </Form>
    </div>
  );
}

export function FormHeading({
  title,
  desc,
}: {
  title?: string;
  desc?: string;
}) {
  return (
    <div className="space-y-4 w-full">
      <h2 className="text-[2rem] text-[#201F24] font-bold">{title}</h2>
      <p className="text-[0.875rem] text-[#696868]">{desc}</p>
    </div>
  );
}
