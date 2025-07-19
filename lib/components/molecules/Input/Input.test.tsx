import { render, screen } from "@/test/utils";
import { describe, it, expect } from "vitest";
import { Input } from "./Input";

describe("(Molecules) Input test suite", () => {
  it("should render correctly", () => {
    render(<Input />);
    expect(screen.getByTestId("component-input-container")).toBeTruthy();
  });
});
