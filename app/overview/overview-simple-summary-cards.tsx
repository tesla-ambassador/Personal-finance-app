import { cn } from "@/lib/utils";
import { PotsIcon } from "@/components/icons/pots-icons";
import { CaretRightIcon } from "@/components/icons/chevron-icons";
import { Pot } from "@/store/pots-store";
import { Budget } from "@/store/budgets-store";
import { ProgressBudgetSummary } from "@/components/progress-bars";
import { Transaction } from "@/@types/data-types";
import { convertToDollar } from "@/hooks/convert-to-dollar";
import { BudgetPieChart } from "@/components/budget-chart";
import { aggregateData } from "@/hooks/recurring-bills-summary";
import { EmptyPotsAndBudgetsCards } from "@/components/empty-pots-budget";
import Link from "next/link";

interface SimpleSummaryCardProps {
  className?: string;
  title: string;
  value: number;
}

export function SimpleSummaryCard({
  title,
  value,
  className,
}: SimpleSummaryCardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-lg w-full p-6 shadow-sm space-y-3",
        className,
      )}
    >
      <p className={cn("text-[#686969] text-[0.875rem]", className)}>{title}</p>
      <span className={cn("font-bold text-[2rem] text-[#201F24]", className)}>
        {convertToDollar(value)}
      </span>
    </div>
  );
}

interface PotsProps {
  dataArray: Pot[];
  totalPots: number;
}

export function PotsOverviewSummaryCard({ dataArray, totalPots }: PotsProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm w-full p-6 sm:p-8 space-y-5">
      <CardHeader
        cardTitle="Pots"
        linkName={dataArray.length !== 0 ? "See Details" : "Click to create"}
        link="/pots"
      />
      {dataArray.length !== 0 ? (
        <div className="space-y-5 sm:flex sm:space-y-0 gap-5">
          <div className="bg-[#F8F4F0] w-full h-full max-h-[110px] p-4 rounded-lg flex items-center gap-4">
            <div>
              <PotsIcon className="size-10" />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[#696868] text-[0.875rem]">
                Total Saved
              </span>
              <span className="text-[#201F24] font-bold text-[2rem]">
                ${totalPots.toLocaleString()}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 w-full">
            {dataArray.map((pot, index) => (
              <ProgressBudgetSummary
                key={index}
                theme={pot.theme}
                name={pot.name}
                amount={pot.total}
              />
            ))}
          </div>
        </div>
      ) : (
        <EmptyPotsAndBudgetsCards
          name="No pots exist"
          description="Please add a pot to see how much you can save 😁"
        />
      )}
    </div>
  );
}

interface CardHeader {
  cardTitle: string;
  linkName: string;
  link: string;
}

export function CardHeader({ cardTitle, linkName, link }: CardHeader) {
  return (
    <div className="w-full flex justify-between items-center">
      <h2 className="text-[1.25rem] text-[#201F24] font-bold">{cardTitle}</h2>
      <Link href={link}>
        <div className="flex items-center gap-2">
          <span className="text-[#696868] text-[0.875rem]">{linkName} </span>
          <CaretRightIcon className="fill-[#686969]" />
        </div>
      </Link>
    </div>
  );
}

interface TransactionListOverviewProps {
  dataArray: Transaction[];
}

export function TransactionListOverview({
  dataArray,
}: TransactionListOverviewProps) {
  return (
    <div className="space-y-8 mx-auto bg-white rounded-lg shadow-sm w-full p-6 sm:p-8">
      <div>
        <CardHeader
          cardTitle="Transactions"
          link="/transactions"
          linkName="View All"
        />
      </div>
      <div>
        {dataArray
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
          )
          .slice(0, 5)
          .map((transaction, index) => (
            <div key={index} className="w-full">
              <div
                key={index}
                className="transition-all duration-200 ease-in-out w-full flex justify-between items-center py-3"
              >
                <div className="flex gap-3 items-center">
                  <div className="hidden proMax:block overflow-hidden rounded-full h-8 w-8">
                    <img
                      className="object-cover object-center"
                      src={transaction.avatar.replace("assets/", "")}
                      alt="Avatar"
                    />
                  </div>
                  <span className="font-bold">{transaction.name}</span>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span
                    className={`font-bold ${
                      transaction.amount > 0 && "text-[#277C78]"
                    }`}
                  >
                    {convertToDollar(transaction.amount)}
                  </span>
                  <span>
                    {Intl.DateTimeFormat("en-UK", {
                      dateStyle: "medium",
                    }).format(new Date(transaction.date))}
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

interface BudgetSummaryOverviewProps {
  dataArray: Budget[];
}

export function BudgetSummaryOverview({
  dataArray,
}: BudgetSummaryOverviewProps) {
  return (
    <div className="bg-white mx-auto p-6 sm:p-8 space-y-5 rounded-lg shadow-sm w-full">
      <CardHeader
        cardTitle="Budgets"
        link="/budgets"
        linkName={
          dataArray.length !== 0 ? "See Details" : "Click to add a budget"
        }
      />
      {dataArray.length !== 0 ? (
        <div className="sm:flex items-center justify-between">
          <div className="w-full">
            <BudgetPieChart data={dataArray} />
          </div>
          <div className="grid grid-cols-2 gap-4 w-full lg:grid-cols-1 lg:max-w-[101px]">
            {dataArray.map((budget, index) => (
              <ProgressBudgetSummary
                key={index}
                name={budget.category}
                amount={budget.maximum}
                theme={budget.theme}
              />
            ))}
          </div>
        </div>
      ) : (
        <EmptyPotsAndBudgetsCards
          name="No budgets added"
          description="Add a budget to see how much you spend! 😬"
        />
      )}
    </div>
  );
}

const billSummary = [
  {
    id: 1,
    name: "Paid Bills",
    theme: "#277C78",
  },
  {
    id: 2,
    name: "Total Upcoming",
    theme: "#F2CDAC",
  },
  {
    id: 3,
    name: "Due Soon",
    theme: "#82C9D7",
  },
];

export function RecurringBillsOverview() {
  return (
    <div className="bg-white mx-auto p-6 sm:p-8 rounded-lg shadow-sm w-full space-y-8">
      <CardHeader
        cardTitle="Recurring Bills"
        link="/recurringbills"
        linkName="See Details"
      />
      <div className="space-y-4">
        {billSummary.map((bill) => (
          <BillSummaryListItem
            key={bill.id}
            theme={bill.theme}
            billName={bill.name}
          />
        ))}
      </div>
    </div>
  );
}

interface BillSummaryListItemProps {
  theme: string;
  billName: string;
}

export function BillSummaryListItem({
  theme,
  billName,
}: BillSummaryListItemProps) {
  return (
    <div
      className="bg-[#F8F4F0] p-5 flex justify-between items-center rounded-lg border-l-4"
      style={{ borderColor: `${theme}` }}
    >
      <p className="text-[#696868] text-[0.875rem]">{billName}</p>
      <span className="text-[#201F24] font-bold text-[0.875rem]">
        {convertToDollar(aggregateData(billName).total)}
      </span>
    </div>
  );
}
