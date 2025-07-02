import type { DetailedHTMLProps, HTMLAttributes } from "react";
import type { Size } from "../../main";

interface ContainerProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  size?: Size;
}

export type { ContainerProps };
