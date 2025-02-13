"use client";
import React, { useRef } from "react";
import Sidebar, { NavBar } from "./Sidebar";
import { useSideBarStore } from "@/provider/sidebar-provider";

interface DashboardProps {
  children: React.ReactNode;
}

export default function Dashboard({ children }: DashboardProps) {
  const { isFullWidth } = useSideBarStore((state) => state);
  const sideBarWidth = useRef<HTMLDivElement>(null);

  return (
    <div className="grid grid-cols-2 w-full">
      <Sidebar ref={sideBarWidth} />
      <NavBar />
      <main className=" w-full col-span-3 flex justify-end">
        <div
          className={`${
            isFullWidth ? "lg:w-[calc(100%-300px)]" : "lg:w-[calc(100%-150px)]"
          } w-full min-h-screen  transition-all duration-200 ease-in-out px-4 md:px-10`}
        >
          {children}
        </div>
      </main>
    </div>
  );
}
