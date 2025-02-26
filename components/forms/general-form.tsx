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
  Cyan: "#82C9D7",
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

const themeArray = Object.entries(themeObject).map(([key, val]) => val);

import {
  Select,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
  SelectSeparator,
} from "@/components/ui/select";
import { Separator } from "@radix-ui/react-select";
import { Button } from "@/components/ui/button";
import { Pot } from "@/store/pots-store";
import { Budget } from "@/store/budgets-store";

interface GeneralFormProps {
  name?: string;
  amount?: string;
  type: "budget" | "pot";
  category?: string;
  theme?: string;
  total?: number;
  handleOnSubmit: (data: Pot | Budget) => void;
  dataArray: Budget[] | Pot[];
}

export function GeneralForm({
  type,
  handleOnSubmit,
  dataArray,
}: GeneralFormProps) {
  const formSchema = z.object(
    type === "pot"
      ? {
          name: z
            .string({ required_error: "Pots name is Required" })
            .min(2, { message: "Pot name should be 2 characters or more." })
            .max(30, { message: "Pot name should be less than 30 characters." })
            .nonempty({ message: "Pots name is Required." }),
          amount: z
            .string()
            .nonempty({
              message: "Plese set a target",
            })
            .regex(/^\d+$/, "Must be a number"),
          theme: z.string(),
        }
      : {
          amount: z.string(),
          theme: z.string(),
          budgetCategory: z.string(),
        },
  );

  const closeRef = React.useRef<HTMLButtonElement>(null);

  const availableCategories = budgetCategories.filter(
    (category) =>
      !(dataArray as Budget[]).some((data) => data.category === category),
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      amount: "",
      theme: "",
      budgetCategory: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (type === "pot") {
      const newPot: Pot = {
        name: values.name,
        target: Number(values.amount),
        theme: values.theme,
        total: 0,
      };
      if ((dataArray as Pot[]).some((data) => data.theme === newPot.theme)) {
        toast({
          title: "Error",
          description: "Theme is already in use",
          className:
            "bg-white border-0 sm:border-[1px] text-[#C94736] sm:bg-transparent sm:text-white",
          variant: "destructive",
        });
        return;
      }
      handleOnSubmit(newPot);
    } else if (type === "budget") {
      const newBudget: Budget = {
        category: values.budgetCategory,
        maximum: Number(values.amount),
        theme: values.theme,
      };
      if (
        (dataArray as Budget[]).some((data) => data.theme === newBudget.theme)
      ) {
        toast({
          title: "Error",
          description: "Theme is already in use",
          className:
            "bg-white border-0 sm:border-[1px] text-[#C94736] sm:bg-transparent sm:text-white",
          variant: "destructive",
        });
        return;
      }
      handleOnSubmit(newBudget);
    } else {
      throw new Error(`Type of transaction isn't recognized.`);
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
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {budgetCategories.map((category, index) => (
                          <div key={index}>
                            <SelectItem
                              value={category}
                              className="text-[0.875rem]"
                              disabled={
                                type === "budget" &&
                                (dataArray as Budget[]).some(
                                  (data) =>
                                    data.category === category &&
                                    category !== field.value,
                                )
                              }
                            >
                              {category}
                            </SelectItem>
                            {index !== budgetCategories.length - 1 && (
                              <SelectSeparator />
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
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="px-5 py-3">
                      <SelectValue placeholder="Select a theme" />
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
                          disabled={dataArray.some(
                            (data) => data.theme === val,
                          )}
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

export function ToastErrorTitle() {
  return <div className="text-[#C94736]">Error</div>;
}
