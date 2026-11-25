// db/seed.mjs — loads data.json into Postgres. Safe to run again: it wipes the tables first.
import pg from "pg";
import data from "../data.json" with { type: "json" };

const client = new pg.Client({ connectionString: process.env.DATABASE_URL });
const cents = (dollars) => Math.round(dollars * 100); // 55.5 -> 5550

await client.connect();
try {
  await client.query("BEGIN"); // all-or-nothing: if anything fails, nothing is saved
  await client.query("TRUNCATE pots, budgets, transactions, account RESTART IDENTITY");

  // ✅ Worked example: pots
  for (const pot of data.pots) {
    await client.query(
      "INSERT INTO pots (name, target_cents, total_cents, theme) VALUES ($1, $2, $3, $4)",
      [pot.name, cents(pot.target), cents(pot.total), pot.theme]
    );
  }

  // ✍️ Your turn: budgets (data.budgets has category, maximum, theme)
  for (const budget of data.budgets) {
    await client.query(
        "INSERT INTO budgets (category, maximum_cents, theme) VALUES ($1, $2, $3)", 
        [budget.category, cents(budget.maximum), budget.theme]
    );
  }
  // ✍️ Your turn: transactions (data.transactions has name, avatar, category, date, amount, recurring)
  for (const transaction of data.transactions) {
    await client.query("INSERT INTO transactions (name, avatar, category, occurred_at, amount_cents, recurring) VALUES ($1, $2, $3, $4, $5, $6)",
      [transaction.name, transaction.avatar, transaction.category, transaction.date, cents(transaction.amount), transaction.recurring]
    );
  }
  // ✍️ Your turn: account (one row, from data.balance.opening)
    await client.query("INSERT INTO account (opening_balance_cents) VALUES ($1)",
      [cents(data.balance.opening)]
    )

  await client.query("COMMIT");
  console.log("Seeded!");
} catch (err) {
  await client.query("ROLLBACK");
  throw err;
} finally {
  await client.end();
}