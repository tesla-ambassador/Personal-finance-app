import React from "react";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import { afterEach, describe, expect, it, vi } from "vitest";

import { GeneralForm } from "./general-form";
import { Dialog } from "@/components/ui/dialog";
import { Pot } from "@/store/pots-store";
import data from "@/data.json";

function renderPotForm(handleOnSubmit = vi.fn()) {
  render(
    <Dialog>
      <GeneralForm
        type="pot"
        handleOnSubmit={handleOnSubmit}
        dataArray={data.pots as Pot[]}
      />
    </Dialog>
  );
  return handleOnSubmit;
}

describe("GeneralForm (pot)", () => {
  afterEach(cleanup);

  it("shows validation messages and does not submit when empty", async () => {
    const onSubmit = renderPotForm();
    await userEvent.click(screen.getByRole("button", { name: /add pot/i }));

    expect(
      await screen.findByText("Pot name should be 2 characters or more.")
    ).toBeInTheDocument();
    expect(screen.getByText("Please set a target")).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("rejects a non-numeric target", async () => {
    const onSubmit = renderPotForm();
    await userEvent.type(screen.getByPlaceholderText("e.g. Rainy Days"), "Trip");
    await userEvent.type(screen.getByPlaceholderText("e.g. 2000"), "abc");
    await userEvent.click(screen.getByRole("button", { name: /add pot/i }));

    expect(await screen.findByText("Must be a number")).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("submits a new pot with a numeric target and zero total", async () => {
    const onSubmit = renderPotForm();
    await userEvent.type(screen.getByPlaceholderText("e.g. Rainy Days"), "Trip");
    await userEvent.type(screen.getByPlaceholderText("e.g. 2000"), "500");
    await userEvent.click(screen.getByRole("button", { name: /add pot/i }));

    await waitFor(() =>
      expect(onSubmit).toHaveBeenCalledWith({
        name: "Trip",
        target: 500,
        theme: "",
        total: 0,
      })
    );
  });
});
