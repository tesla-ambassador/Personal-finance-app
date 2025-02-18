import React from "react";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GeneralForm } from "./general-form";
import { Pot } from "@/store/pots-store";
import "@testing-library/jest-dom/vitest";
import Pots from "@/app/pots/page";

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import data from "@/data.json";

interface PotState {
  pots: Pot[];
}

describe("GeneralForm", () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve<PotState>({
            pots: data.pots,
          }),
      })
    ) as ReturnType<typeof vi.fn>;
  });

  afterEach(() => {
    vi.resetAllMocks();
  });
});
