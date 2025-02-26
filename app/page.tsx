import { BudgetStoreProvider } from "@/provider/budgets-provider";
import { PotsStoreProvider } from "@/provider/pots-provider";
import { OverViewApp } from "./overview/overview-app";

export default function Home() {
  return (
    <BudgetStoreProvider>
      <PotsStoreProvider>
        <OverViewApp />
      </PotsStoreProvider>
    </BudgetStoreProvider>
  );
}
