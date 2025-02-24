import React from "react";
import { PotsProgressBar } from "./progress-bars";
import { EllipsisDropdown } from "./ellipsis-dropdown";
import { convertToDollar } from "@/hooks/convert-to-dollar";
import { UpdatePotsTotal } from "./withdraw-add-pots";

interface PotsCard {
  name: string;
  theme: string;
  target: number;
  total: number;
}

export function PotsCard({ name, theme, target, total }: PotsCard) {
  return (
    <div className="bg-white mx-auto space-y-8 py-6 px-5 sm:p-6 w-full md:max-w-[41.75rem] desktop:mx-0 desktop:max-w-none rounded-lg shadow-sm">
      {/* Card Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div
            style={{ background: `${theme}` }}
            className="w-4 h-4 rounded-full"
          />
          <span className="font-bold text-[#201F24] text-[1.25rem]">
            {name}
          </span>
        </div>
        <EllipsisDropdown
          name={name}
          type="pot"
          amount={target}
          theme={theme}
          total={total}
        />
      </div>
      {/* Card Body */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-[#696868] text-[0.875rem]">Total Saved</span>
          <span className="font-semibold text-[2rem]">
            {convertToDollar(total)}
          </span>
        </div>
        <div>
          <PotsProgressBar target={target} total={total} theme={theme} />
        </div>
      </div>
      {/* Card Footer */}
      <UpdatePotsTotal
        theme={theme}
        name={name}
        target={target}
        total={total}
      />
    </div>
  );
}
