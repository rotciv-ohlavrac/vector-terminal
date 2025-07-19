import { cva } from "class-variance-authority";
import type { DetailedHTMLProps, HTMLAttributes } from "react";
import type { Size } from "@/types";

interface TerminalContainerProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  size?: Size;
}

const containerStyles = cva(["bg-black", "p-4"], {
  variants: {
    size: {
      sm: ["h-72", "w-72"],
      md: ["h-80", "w-80"],
      lg: ["h-96", "w-96"],
      full: ["h-screen", "w-full"],
    },
  },
});

function TerminalContainer({
  className = "",
  size = "full",
  ...props
}: TerminalContainerProps) {
  return (
    <div
      className={`${containerStyles({ size })} ${className}`}
      {...props}
      data-testid="component-terminal-container"
    />
  );
}

export { TerminalContainer as Container };
export type { TerminalContainerProps };
