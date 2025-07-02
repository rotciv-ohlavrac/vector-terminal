import { useTerminal } from "../../main";
import type { DetailedHTMLProps, HTMLAttributes } from "react";

export interface TerminalProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export function Terminal({ children, ...props }: TerminalProps) {
  const { getOutputHistory } = useTerminal();

  function renderOutputHistory() {
    const outputHistory = getOutputHistory();
    return outputHistory.map((output) => (
      <p className="text-emerald-500">{output}</p>
    ));
  }

  return (
    <div {...props}>
      {renderOutputHistory()}
      {children}
    </div>
  );
}
