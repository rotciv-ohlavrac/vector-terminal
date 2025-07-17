import type { CommandExecutionApi } from "../components/contexts/TerminalContext";

export type CommandExecutor = (
  api: CommandExecutionApi,
  ...args: string[]
) => string | void | Promise<string | void>;

export interface TerminalCommand {
  input: string;
  description?: string;
  execute: CommandExecutor;
}
