"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";
import { sumOfBudgets, sumOfTransactions } from "@/hooks/budgets-summary";
import { Budget } from "@/store/budgets-store";
import { useBudgetStore } from "@/provider/budgets-provider";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface BudgetPieChartProps {
  data: Budget[];
}

export function BudgetPieChart({ data }: BudgetPieChartProps) {
  const { budgets, transactions } = useBudgetStore((state) => state);

  const totalSpent = React.useMemo(() => {
    return transactions.reduce((acc, cur) => acc + cur.amount, 0);
  }, [budgets]);

  const chartData = React.useMemo(() => {
    return data.map((budget) => ({
      category: budget.category,
      maximum: budget.maximum,
      fill: budget.theme,
    }));
  }, [data]);

  const generateConfig = (data: Budget[]): ChartConfig => {
    const config: Record<string, any> = {
      maximum: {
        label: "Budget Maximum",
      },
    };

    data.forEach((budget) => {
      // Generate Key as camelCase for safety.
      const safeKey = budget.category
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (_: string, chr: string) =>
          chr.toUpperCase(),
        );
      config[safeKey] = {
        label: budget.category,
        color: budget.theme,
      };
    });

    return config as ChartConfig;
  };

  const chartConfig = React.useMemo(() => generateConfig(data), [data]);

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[280px]"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="maximum"
          nameKey="category"
          innerRadius={75}
          strokeWidth={5}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-[#201F24] text-2xl lg:text-[2rem] font-bold"
                    >
                      $
                      {sumOfTransactions(
                        budgets,
                        transactions,
                      ).toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-[#696868]"
                    >
                      of ${sumOfBudgets(budgets).toLocaleString()} limit
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
