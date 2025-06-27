export interface TerminalCommand {
  input: string;
  arguments: Array<string>;
  execute: (...args: Array<unknown>) => string | void;
}
