import { cva } from "class-variance-authority";
import type { DetailedHTMLProps, HTMLAttributes } from "react";

interface InputContainerProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const containerStyles = cva(["flex", "items-center"]);

function InputContainer({ className = "", ...props }: InputContainerProps) {
  return (
    <div
      {...props}
      className={`${containerStyles()} ${className}`}
      data-testid="component-input-container"
    />
  );
}

export { InputContainer as Container };
export type { InputContainerProps };
