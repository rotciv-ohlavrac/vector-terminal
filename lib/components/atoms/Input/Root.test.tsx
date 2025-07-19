import { render, screen } from "@/test/utils";
import { describe, it, expect } from "vitest";
import { Root as InputRoot } from "./Root";

describe("(Atoms) InputRoot test suite", () => {
  it("should render correctly", () => {
    render(<InputRoot />);
    expect(screen.getByTestId("component-input-root")).toBeTruthy();
  });
});
