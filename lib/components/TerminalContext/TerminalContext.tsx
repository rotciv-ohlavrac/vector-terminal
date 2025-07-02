import { createContext, useState, useContext, type ReactNode } from "react";
import type { TerminalCommand } from "../../types/TerminalCommand";

interface TerminalContextProps {
  getInputHistory: () => string[];
  getOutputHistory: () => string[];
  updateInputHistory: (newInput: string) => void;
  clearOutputHistory: () => void;
}

interface TerminalContextProviderProps {
  children: ReactNode;
  commands: TerminalCommand[];
}

export const TerminalContext = createContext<TerminalContextProps | null>(null);

export function useTerminalContext() {
  const context = useContext(TerminalContext);
  if (!context) {
    throw new Error(
      "useTerminalContext must be used within a TerminalContextProvider"
    );
  }
  return context;
}

export function TerminalContextProvider({
  children,
  commands,
}: TerminalContextProviderProps) {
  const [inputHistory, setInputHistory] = useState<string[]>([]);
  const [outputHistory, setOutputHistory] = useState<string[]>([]);

  function clearOutputHistory() {
    setOutputHistory([]);
  }

  const baseCommands = [
    { input: "clear", args: [], execute: () => clearOutputHistory() },
    ...commands,
  ];

  function getInputHistory() {
    return inputHistory;
  }

  function getOutputHistory() {
    return outputHistory;
  }

  function commandFormatter(value: string): [string, string[]] {
    const [command, ...args] = value.split(" ");
    return [command, args];
  }

  function updateInputHistory(newInput: string) {
    const [rawCommand, args] = commandFormatter(newInput);
    const newCommand = baseCommands.find(
      (command) => command.input === rawCommand
    );
    if (!newCommand || !newInput) return;
    setInputHistory((state) => [newInput, ...state]);
    setOutputHistory((state) => {
      const result = newCommand.execute(...args);
      if (!result) return state;
      return [result, ...state];
    });
  }

  return (
    <TerminalContext.Provider
      value={{
        getInputHistory,
        updateInputHistory,
        clearOutputHistory,
        getOutputHistory,
      }}
    >
      {children}
    </TerminalContext.Provider>
  );
}

export type { TerminalContextProps, TerminalContextProviderProps };
