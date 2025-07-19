import { cva, type VariantProps } from "class-variance-authority";
import type { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";
import * as Icons from "../Icons";

const iconContainerStyles = cva(
  ["flex", "items-center", "justify-center", "text-emerald-500", "w-4", "h-4"],
  {
    variants: {
      side: {
        left: "mr-2",
        right: "ml-2",
      },
    },
    defaultVariants: {
      side: "left",
    },
  }
);

interface InputIconProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>,
    VariantProps<typeof iconContainerStyles> {
  icon?: keyof typeof Icons;
}

function InputIcon({
  className,
  side,
  icon = "RightIcon",
  ...props
}: InputIconProps) {
  const IconComponent = Icons[icon];
  return (
    <span className={iconContainerStyles({ side, className })} {...props}>
      <IconComponent data-testid="component-input-icon" />
    </span>
  );
}

export { InputIcon as Icon };
export type { InputIconProps };
