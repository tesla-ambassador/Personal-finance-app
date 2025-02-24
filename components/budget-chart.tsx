"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";
import { useBudgetStore } from "@/provider/budgets-provider";
import { convertToDollar } from "@/hooks/convert-to-dollar";
import { Budget } from "@/store/budgets-store";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export function BudgetPieChart() {
  const { budgets, transactions } = useBudgetStore((state) => state);

  const totalMaximums = React.useMemo(() => {
    return budgets.reduce((acc, curr) => acc + curr.maximum, 0);
  }, []);

  const totalExpenditures = React.useMemo(() => {
    return transactions.reduce((acc, curr) => acc + curr.amount, 0);
  }, []);

  const chartData = budgets.map((budget) => ({
    name: budget.category,
    value: budget.maximum,
    fill: budget.theme,
  }));

  const generateConfig = (budgets: Budget[]): ChartConfig => {
    const config: Record<string, any> = {
      maximum: {
        label: "Budget Maximum",
      },
    };

    budgets.forEach((budget) => {
      // Generate Key as camelCase for safety.
      const safeKey = budget.category
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (_: string, chr: string) =>
          chr.toUpperCase()
        );
      config[safeKey] = {
        label: budget.category,
        color: budget.theme,
      };
    });

    return config as ChartConfig;
  };

  const chartConfig = React.useMemo(() => generateConfig(budgets), []);

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
          dataKey="value"
          nameKey="name"
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
                      {convertToDollar(Math.abs(totalExpenditures))}
                    </tspan>
                    <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-[#696868]">
                      of {convertToDollar(totalMaximums)} limit
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
