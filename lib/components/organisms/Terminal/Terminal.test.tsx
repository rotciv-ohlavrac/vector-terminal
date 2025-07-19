import { render, screen, fireEvent } from "@/test/utils";
import { describe, it, expect } from "vitest";
import { Terminal } from "./Terminal";

describe("(Molecules) Terminal test suite", () => {
  it("should render correctly", () => {
    render(<Terminal />);
    expect(screen.getByTestId("component-terminal-container")).toBeTruthy();
  });
  it("should render output history correctly", async () => {
    render(<Terminal />);

    const terminalInput = screen.getByTestId("component-input-root");

    fireEvent.change(terminalInput, { target: { value: "whois" } });
    fireEvent.keyDown(terminalInput, { key: "Enter", code: "Enter" });

    // Use findByTestId to wait for the output to appear asynchronously.
    const outputItem = await screen.findByTestId(
      "component-terminal-output-item"
    );

    // To debug, you can print the element's HTML to the console like this:
    // screen.debug(outputItem);

    expect(outputItem).toBeTruthy();
    expect(outputItem.textContent).toBe("Victor Rodrigues (Gelado)");
  });
});
