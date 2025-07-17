import { useTerminal } from "@/components/contexts/TerminalContext";
import { Input } from "@/components/molecules";
import { TerminalAtoms } from "@/components/atoms";
import { useRef } from "react";

import type { InputProps } from "@/components/molecules";

export interface TerminalProps extends TerminalAtoms.TerminalContainerProps {
  inputProps?: InputProps;
}

export function Terminal({
  inputProps,
  onFocus,
  onClick,
  ...props
}: TerminalProps) {
  const { outputHistory } = useTerminal();
  const inputRef = useRef<HTMLInputElement>(null);

  function renderOutputHistory() {
    return outputHistory.map((output, index) => (
      <p key={`output-${index}`} className="text-emerald-500">
        {output}
      </p>
    ));
  }

  function handleClick(event: React.MouseEvent<HTMLDivElement>) {
    if (inputRef.current) inputRef.current.focus();
    if (onClick) onClick(event);
  }

  return (
    <TerminalAtoms.Container onClick={handleClick} {...props}>
      {renderOutputHistory()}
      <Input ref={inputRef} {...inputProps} />
    </TerminalAtoms.Container>
  );
}
