import {
  DetailedHTMLProps,
  HTMLAttributes,
  type HtmlHTMLAttributes,
} from "react";

interface ContainerProps
  extends DetailedHTMLProps<
    HtmlHTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  size?: Size;
}

export type { ContainerProps };
