import { expect, test } from "vitest";
import { getDateOfMonth, getDuePayment } from "./recurring-dates-formatter";

test("Takes in Date to return the day", () => {
  expect(getDateOfMonth(new Date("2024-07-29T11:55:29Z"))).toBe("29th");
});

test("Lets us know if a payment is due or not", () => {
  expect(
    getDuePayment(
      new Date("2024-08-19T14:23:11Z"),
      new Date("2024-08-04T11:15:22Z")
    )
  ).toBe(false);
  expect(
    getDuePayment(
      new Date("2024-08-19T14:23:11Z"),
      new Date("2024-07-21T10:05:42Z")
    )
  ).toBe(true);
});
