import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Icon as InputIcon } from "./Icon";

describe("(Atoms) InputIcon test suite", () => {
  it("should render correctly", () => {
    render(<InputIcon />);
    expect(screen.getByTestId("component-input-icon")).toBeTruthy();
  });
});
