import { expect, test } from "vitest";
import { aggregateData } from "./recurring-bills-summary";

test("Returns an aggregate of paid bills", () => {
  expect(aggregateData("Due Soon")).toBe({
    counter: 2,
    total: 59.98,
  });
});
