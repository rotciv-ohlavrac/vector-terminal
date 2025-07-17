import { useTerminal } from "@/components/contexts/TerminalContext";
import { cva } from "class-variance-authority";
import { useState } from "react";
import type {
  DetailedHTMLProps,
  InputHTMLAttributes,
  KeyboardEventHandler,
  ChangeEventHandler,
} from "react";

interface InputRootProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

const inputStyles = cva([
  "text-emerald-500",
  "w-full",
  "focus:border-0",
  "focus:outline-0",
]);

function InputRoot({ onChange, onKeyDown, ...props }: InputRootProps) {
  const [value, setValue] = useState<string>("");
  const { updateInputHistory } = useTerminal();

  const changeHandler: ChangeEventHandler<HTMLInputElement> = (
    inputChangeEvent
  ) => {
    if (onChange) onChange(inputChangeEvent);
    setValue(inputChangeEvent.target.value);
  };

  const keyDownHandler: KeyboardEventHandler<HTMLInputElement> = (
    keyDownEvent
  ) => {
    if (onKeyDown) onKeyDown(keyDownEvent);
    const { key } = keyDownEvent;
    if (key !== "Enter" || !value) return;
    updateInputHistory(value);
    setValue("");
  };
  return (
    <input
      value={value}
      className={inputStyles()}
      {...props}
      onChange={changeHandler}
      onKeyDown={keyDownHandler}
    />
  );
}

export { InputRoot as Root };
export type { InputRootProps };
