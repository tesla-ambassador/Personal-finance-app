"use client";
import React from "react";
import { PageHeader } from "@/components/page-headers";
import { PotsCard } from "@/components/pots-cards";
import { EmptyPotsAndBudgets } from "@/components/empty-pots-budget";
import { usePotsStore } from "@/provider/pots-provider";

export default function PotsApp() {
  const { pots } = usePotsStore((state) => state);
  return (
    <>
      <div>
        <PageHeader containsForm={true} pageName="Pots" uploadFormType="pot" />
      </div>
      {pots.length === 0 ? (
        <EmptyPotsAndBudgets
          name="Pot not found 😭"
          description="Create a new pot to start tracking your budget."
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 desktop:grid-cols-2">
          {pots.map((pot) => (
            <PotsCard
              key={pot.theme}
              name={pot.name}
              target={pot.target}
              total={pot.total}
              theme={pot.theme}
            />
          ))}
        </div>
      )}
    </>
  );
}
