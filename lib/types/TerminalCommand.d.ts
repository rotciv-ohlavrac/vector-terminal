import type { CommandExecutionApi } from "../components/TerminalContext/TerminalContext";

export type CommandExecutor = (
  api: CommandExecutionApi,
  ...args: string[]
) => string | void | Promise<string | void>;

export interface TerminalCommand {
  input: string;
  description?: string;
  execute: CommandExecutor;
}
