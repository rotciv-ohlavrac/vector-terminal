import { InputAtoms } from "@/components/atoms";
import { forwardRef } from "react";

interface InputProps {
  containerProps?: InputAtoms.InputContainerProps;
  iconProps?: InputAtoms.InputIconProps;
  rootProps?: InputAtoms.InputRootProps;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ containerProps, iconProps, rootProps }, ref) => {
    return (
      <InputAtoms.Container {...containerProps}>
        <InputAtoms.Icon {...iconProps} />
        <InputAtoms.Root {...rootProps} ref={ref} />
      </InputAtoms.Container>
    );
  }
);

export { Input };
export type { InputProps };
