import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Container as TerminalContainer } from "./Container";

describe("(Atoms) TerminalContainer test suite", () => {
  it("should render correctly", () => {
    render(<TerminalContainer />);
    expect(screen.getByTestId("component-terminal-container")).toBeTruthy();
  });
});
