"use client";
import React from "react";
import { PageHeader } from "@/components/icons/page-headers";
import { PotsCard } from "@/components/pots-cards";
import { usePotsStore } from "@/provider/pots-provider";

export default function PotsApp() {
  const { pots, addPot } = usePotsStore((state) => state);
  return (
    <>
      <div>
        <PageHeader
          dataArray={pots}
          action={() => {
            addPot;
          }}
          containsForm={true}
          pageName="Pots"
          uploadFormType="pots"
        />
      </div>
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
    </>
  );
}
