import transactions from "@/data.json";
import { RecurringBills } from "@/components/data-table/columns";

const data: RecurringBills[] = transactions.transactions.filter(
  (transaction) => transaction.recurring === true
);

function getDuePayment(latestDate: Date, currentDate: Date) {
  const current = currentDate.getDate();
  const latest = latestDate.getDate();
  const difference = current - latest;

  if (difference <= 5 && difference >= 0) {
    return true;
  } else if (current < latest) {
    return false;
  } else undefined;
}

function aggregateData(aggregateCase: string) {
  const aggregates = {
    counter: 0,
    total: 0,
  };
  switch (aggregateCase) {
    case "Paid Bills":
      data.forEach((transaction) => {
        if (
          getDuePayment(
            new Date("2024-08-19T14:23:11Z"),
            new Date(transaction.date)
          ) === false
        ) {
          aggregates.counter += 1;
          aggregates.total += Math.abs(transaction.amount);
        }
      });
      break;
    case "Due Soon":
      data.forEach((transaction) => {
        if (
          getDuePayment(
            new Date("2024-08-19T14:23:11Z"),
            new Date(transaction.date)
          ) === true
        ) {
          aggregates.counter += 1;
          aggregates.total += Math.abs(transaction.amount);
        }
      });
      break;
    default:
      data.forEach((transaction) => {
        if (
          getDuePayment(
            new Date("2024-08-19T14:23:11Z"),
            new Date(transaction.date)
          ) === undefined
        ) {
          aggregates.counter += 1;
          aggregates.total += Math.abs(transaction.amount);
        }
      });
      break;
  }
  return aggregates;
}

export { aggregateData };
