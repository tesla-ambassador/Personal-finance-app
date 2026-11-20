import { expect, test } from "vitest";
import { aggregateData } from "./recurring-bills-summary";

test("Returns an aggregate of bills due soon", () => {
  const result = aggregateData("Due Soon");
  expect(result.counter).toBe(2);
  expect(result.total).toBeCloseTo(59.98, 2);
});
