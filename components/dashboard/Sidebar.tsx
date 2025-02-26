"use client";
import React from "react";
import Link from "next/link";
import { useSideBarStore } from "@/provider/sidebar-provider";
import { usePathname } from "next/navigation";
import {
  OverviewIcon,
  BudgetsIcon,
  TransactionsIcon,
  RecurringBillsIcon,
  PotsIcon,
} from "../icons/nav-icons";

const pages = [
  {
    id: 1,
    name: "Overview",
    url: "/",
    icon: OverviewIcon,
  },
  {
    id: 2,
    name: "Transactions",
    url: "/transactions",
    icon: TransactionsIcon,
  },

  {
    id: 3,
    name: "Budgets",
    url: "/budgets",
    icon: BudgetsIcon,
  },

  {
    id: 4,
    name: "Pots",
    url: "/pots",
    icon: PotsIcon,
  },

  {
    id: 5,
    name: "Recurring Bills",
    url: "/recurringbills",
    icon: RecurringBillsIcon,
  },
];

interface SideBarProps {
  ref: React.RefObject<HTMLDivElement | null>;
}

export default function Sidebar({ ref }: SideBarProps) {
  const { isFullWidth, setIsFullWidth } = useSideBarStore((state) => state);
  const currentPath = usePathname();
  return (
    <div
      className="hidden h-full lg:flex flex-col justify-between bg-[#201F24] pr-4 fixed top-0 bottom-0 rounded-tr-2xl rounded-br-2xl transition-all duration-150 ease-in-out"
      style={isFullWidth ? { width: "300px" } : { width: "150px" }}
      ref={ref}
    >
      <div>
        <div className="w-full py-10 px-8">
          <div className="w-[150px]">
            <img
              src="/images/logo-large.svg"
              alt="logo"
              className={`${
                isFullWidth ? "w-full opacity-100" : "w-0 opacity-0"
              } object-cover object-center transition-all duration-700 ease-in-out`}
            />
          </div>
          <div className="w-[30px] xl:w-[35px]">
            <img
              src="/images/logo-small.svg"
              alt="logo"
              className={`${
                !isFullWidth ? "w-full opacity-100" : "w-0 opacity-0"
              } object-cover object-center transition-all duration-700 ease-in-out`}
            />
          </div>
        </div>
        <div>
          <div className="text-[#B3B3B3] mt-6">
            {pages.map((page) => (
              <Link key={page.id} href={page.url}>
                <div
                  className={`flex items-center gap-6 py-4 px-8 group ${
                    currentPath === page.url &&
                    "bg-[#F8F4F0] rounded-tr-lg rounded-br-lg border-l-4 text-[#201F24] border-l-[#277C78] py-3"
                  }`}
                >
                  <page.icon
                    className={
                      isFullWidth
                        ? `${
                            currentPath === page.url
                              ? "transition-all duration-200 ease-in-out fill-[#277C78]"
                              : "transition-all duration-200 ease-in-out fill-[#B3B3B3] group-hover:fill-white"
                          }`
                        : `${
                            currentPath === page.url
                              ? "transition-all duration-200 ease-in-out size-7 mx-auto fill-[#201F24]"
                              : "transition-all duration-200 ease-in-out fill-[#B3B3B3] group-hover:fill-white size-7 mx-auto"
                          }`
                    }
                  />
                  <div
                    className={`${
                      isFullWidth ? "w-full opacity-100" : "w-0 opacity-0"
                    } ${
                      currentPath !== page.url && "group-hover:text-white"
                    } transition-all duration-200 ease-in-out overflow-hidden`}
                  >
                    {page.name}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full mb-32">
        <button
          onClick={setIsFullWidth}
          className="text-gray-400 flex items-center gap-3 px-8 py-4"
        >
          <img
            src="/images/icon-minimize-menu.svg"
            alt="Minimize Icon"
            className={`${
              isFullWidth ? "rotate-0" : "rotate-180 w-7 mx-auto"
            } transform-all duration-700 ease-in-out`}
          />
          <div
            className={`transform-all duration-75 ease-in-out overflow-hidden`}
          >
            <span
              className={`${isFullWidth ? "opacity-100" : "opacity-0"} transition-all duration-75 ease-in-out`}
            >
              Minimize Menu
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}

// Navigation for tablet and mobile screens
export function NavBar() {
  const currentPath = usePathname();
  return (
    <div className="px-4 sm:px-10 bg-[#201F24] w-full h-[3.25rem] sm:h-[4.625rem] rounded-tl-2xl rounded-tr-2xl lg:hidden fixed z-10 bottom-0 left-0">
      <div className="flex justify-between items-center gap-3 h-full pt-2">
        {pages.map((page) => (
          <a
            key={page.id}
            href={page.url}
            className={`w-full text-[#B3B3B3] h-full flex justify-center md:flex-col items-center gap-2 rounded-tr-lg rounded-tl-lg py-2 transition-all duration-200 ease-in-out
          ${
            currentPath === page.url &&
            "bg-[#F8F4F0] border-b-4 border-b-[#277C78]"
          }`}
          >
            <page.icon
              className={`${
                currentPath === page.url ? "fill-[#277C78]" : "fill-[#b3b3b3]"
              } sm:size-7 `}
            />
            <span
              className={`hidden md:inline-flex text-sm ${
                currentPath === page.url
                  ? "text-[#201F24] font-semibold"
                  : "text-[#B3B3B3]"
              }`}
            >
              {page.name}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
