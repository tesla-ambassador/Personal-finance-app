import { db } from "@/lib/db";

export async function GET() {
  // ✅ Worked example: income
  const income = await db.query(
    "SELECT COALESCE(SUM(amount_cents), 0) AS cents FROM transactions WHERE amount_cents > 0"
  );

  // ✍️ Your turn: expenses (positive number)
  const expenses = await db.query("SELECT -COALESCE(SUM(amount_cents), 0) AS  cents FROM transactions WHERE amount_cents < 0");
  // ✍️ Your turn: current balance
  const currentBalance = await db.query("SELECT (SELECT opening_balance_cents from account) - (SELECT COALESCE(SUM(total_cents), 0) FROM pots) + (SELECT SUM(amount_cents) FROM transactions) AS cents");

  return Response.json({
    currentCents: Number(currentBalance.rows[0].cents),
    incomeCents: Number(income.rows[0].cents),
    expensesCents: Number(expenses.rows[0].cents),
  });
}