import { cva } from "class-variance-authority";
import type { ContainerProps } from "./Container";

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

export function Container({
  className = "",
  size = "sm",
  ...props
}: ContainerProps) {
  return (
    <div className={`${containerStyles({ size })} ${className}`} {...props} />
  );
}

export type { ContainerProps };
