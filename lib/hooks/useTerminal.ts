import { useContext } from "react";
import { TerminalContext } from "../components/TerminalContext/TerminalContext";

export function useTerminal() {
  const ctx = useContext(TerminalContext);
  if (!ctx) throw new Error("useTerminal should be use within TerminalContext");
  return ctx;
}
