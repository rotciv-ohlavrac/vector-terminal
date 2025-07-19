import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Container as InputContainer } from "./Container";

describe("(Atoms) InputContainer test suite", () => {
  it("should render correctly", () => {
    render(<InputContainer />);
    expect(screen.getByTestId("component-input-container")).toBeTruthy();
  });

  it("should render children correctly", () => {
    render(
      <InputContainer>
        <span data-testid="component-children">Child</span>
      </InputContainer>
    );

    expect(screen.getByTestId("component-children")).toBeTruthy();
  });
});
