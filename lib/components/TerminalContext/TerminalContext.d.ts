import type { TerminalCommand } from "../../types/TerminalCommand";

interface TerminalContextProps {
  getInputHistory: () => Array<string>;
  getOutputHistory: () => Array<string>;
  updateInputHistory: (newInput: string) => void;
  clearOutputHistory: () => void;
}

export interface TerminalContextProviderProps {
  children: any;
  commands: Array<TerminalCommand>;
}
