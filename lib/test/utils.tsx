import React from "react";
import { render, RenderOptions } from "@testing-library/react";
import { TerminalContextProvider } from "@/components/contexts/TerminalContext";

const allProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <TerminalContextProvider
      commands={[
        {
          input: "whois",
          execute: () => "Victor Rodrigues (Gelado)",
        },
      ]}
    >
      {children}
    </TerminalContextProvider>
  );
};

const customRender = (ui: React.ReactNode, options?: RenderOptions) =>
  render(ui, { wrapper: allProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
