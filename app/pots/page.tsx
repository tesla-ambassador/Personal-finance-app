import React from "react";
import { PotsStoreProvider } from "@/provider/pots-provider";
import PotsApp from "./pots-app";

export default function Pots() {
  return (
    <PotsStoreProvider>
      <div className="min-h-screen w-full pb-24">
        <PotsApp />
      </div>
    </PotsStoreProvider>
  );
}
