import { createContext, useState } from "react";
import type {
  TerminalContextProps,
  TerminalContextProviderProps,
} from "./TerminalContext";

export const TerminalContext = createContext({} as TerminalContextProps);

export function TerminalContextProvider({
  children,
  commands,
}: TerminalContextProviderProps) {
  const [inputHistory, setInputHistory] = useState<Array<string>>([]);
  const [outputHistory, setOutputHistory] = useState<Array<string>>([]);

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

  function commandFormatter(value: string): [string, Array<string>] {
    const [command, rawArgs] = value.split(" ");
    if (!rawArgs) return [command, []];
    const args = rawArgs.split(" ");
    return [command, [...args]];
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

  console.log(outputHistory);
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
