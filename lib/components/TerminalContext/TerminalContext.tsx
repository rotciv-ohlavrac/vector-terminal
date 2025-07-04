import {
  createContext,
  useState,
  useContext,
  type ReactNode,
  useCallback,
  useMemo,
} from "react";
import type { TerminalCommand } from "../../types/TerminalCommand";

export interface CommandExecutionApi {
  write: (data: string) => void;
}

interface TerminalContextProps {
  inputHistory: string[];
  outputHistory: string[];
  updateInputHistory: (newInput: string) => Promise<void>;
  clearOutputHistory: () => void;
}

interface TerminalContextProviderProps {
  children: ReactNode;
  commands: TerminalCommand[];
}

export const TerminalContext = createContext<TerminalContextProps | null>(null);

function commandFormatter(value: string): [string, string[]] {
  const [command, ...args] = value.split(" ");
  return [command, args];
}

export function TerminalContextProvider({
  children,
  commands,
}: TerminalContextProviderProps) {
  const [inputHistory, setInputHistory] = useState<string[]>([]);
  const [outputHistory, setOutputHistory] = useState<string[]>([]);

  const clearOutputHistory = useCallback(() => {
    setOutputHistory([]);
  }, []);

  const baseCommands = useMemo(
    () => [
      {
        input: "clear",
        execute: () => {
          clearOutputHistory();
        },
      },
      ...commands,
    ],
    [commands, clearOutputHistory]
  );

  const updateInputHistory = useCallback(
    async (newInput: string) => {
      const [rawCommand, args] = commandFormatter(newInput);
      const newCommand = baseCommands.find(
        (command) => command.input === rawCommand
      );
      if (!newCommand || !newInput) return;
      setInputHistory((state) => [newInput, ...state]);

      // Add a placeholder for the new output. We'll be updating this entry.
      setOutputHistory((state) => ["", ...state]);

      const api: CommandExecutionApi = {
        write: (data: string) => {
          setOutputHistory((state) => {
            return [data, ...state];
          });
        },
      };

      // The `execute` function can now be async and use the `write` api.
      const result = await newCommand.execute(api, ...args);

      // If the command returns a string directly (for simple, non-streaming commands),
      // we set it as the final output, overwriting any streamed chunks.
      if (typeof result === "string") {
        setOutputHistory((currentOutput) => {
          const newOutput = [...currentOutput];
          newOutput[0] = result;
          return newOutput;
        });
      }
    },
    [baseCommands]
  );

  const value = useMemo(
    () => ({
      inputHistory,
      outputHistory,
      updateInputHistory,
      clearOutputHistory,
    }),
    [inputHistory, outputHistory, updateInputHistory, clearOutputHistory]
  );

  return (
    <TerminalContext.Provider value={value}>
      {children}
    </TerminalContext.Provider>
  );
}

export type { TerminalContextProps, TerminalContextProviderProps };
