import { useTerminal } from "../../main";
import type { DetailedHTMLProps, HTMLAttributes } from "react";

export interface TerminalProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export function Terminal({ children, ...props }: TerminalProps) {
  const { outputHistory } = useTerminal();

  function renderOutputHistory() {
    return outputHistory.map((output, index) => (
      <p key={`output-${index}`} className="text-emerald-500">
        {output}
      </p>
    ));
  }

  return (
    <div {...props}>
      {renderOutputHistory()}
      {children}
    </div>
  );
}
